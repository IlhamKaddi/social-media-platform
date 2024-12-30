import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./VideoUser.css";
import SideBarProfie from "./SidBarprofile";

interface Comment{
    id: number;
    comment: string;
    video_id: number;
    profile:{
        id:number,
        name:string
    }
}
interface Like{
    id:number,
    profile:{
        id:number,
        name:string
    }
}
interface Video {
    id: number;
    title: string;
    video: string;
    comments: Comment[];
    likes:Like[];
}
const VideoUser: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [profileName, setprofileName] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [commentVisibility, setCommentVisibility] = useState<{ [key: number]: boolean }>({});
    const [editComment, setEditComment] = useState<{ commentId: number; value: string } | null>(null);
    const [videoLikes, setVideoLikes] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const fetchVideos = async () => {
            const profileId = localStorage.getItem("profile_id");

            if (profileId) {
                try {
                    const response = await axios.post(`http://127.0.0.1:8000/api/user-videos/${profileId}`, {

                    });
                    setprofileName(response.data.profileName);
                    const sortedVideos = response.data.videos.sort(
                        (a: Video, b: Video) => b.comments.length - a.comments.length
                    );
                    setVideos(sortedVideos);
                    const visibilityState = sortedVideos.reduce(
                        (acc: { [key: number]: boolean }, video: Video) => {
                            acc[video.id] = false;
                            return acc;
                        },
                        {}
                    );
                    
                    setCommentVisibility(visibilityState);
                    // Fetch total likes for each video-----
                    sortedVideos.forEach((video:any) => fetchLikes(video.id));
                } catch (error) {
                    // console.error("Error fetching videos:", error);
                    
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to load your videos.",
                    });
                } finally {
                    setIsLoading(false);
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Access Denied",
                    text: "Please log in to view your videos.",
                });
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const fetchLikes = async (videoId: number) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/total-likes-video/${videoId}`
            );

            setVideoLikes((prev) => ({
                ...prev,
                [videoId]: response.data.totalLikesVideo|| 0,
            }));
        } catch (error) {
            console.error(`Error fetching likes for video ${videoId}:`, error);
        }
    };

    const toggleComments = (videoId: number) => {
        setCommentVisibility((prev) => ({
            ...prev,
            [videoId]: !prev[videoId],
        }));
    };

    const handleEditClick = (commentId: number, currentValue: string) => {
        setEditComment({ commentId, value: currentValue });
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editComment) {
            setEditComment({ ...editComment, value: e.target.value });
        }
    };
    const updateComment = async (commentId: number, videoId: number) => {
        if (!editComment) return;

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/update-comment/${commentId}`,
                { comment: editComment.value }
            );

            if (response.data.message === "Comment updated successfully") {
                Swal.fire("Success", "Comment updated successfully.", "success");

                setVideos((prevVideos) =>
                    prevVideos.map((video) => {
                        if (video.id === videoId) {
                            return {
                                ...video,
                                comments: video.comments.map((comment) =>
                                    comment.id === commentId
                                        ? { ...comment, comment: editComment.value }
                                        : comment
                                ),
                            };
                        }
                        return video;
                    })
                );

                setEditComment(null);
            } else {
                Swal.fire("Error", "Failed to update comment.", "error");
            }
        } catch (error) {
            console.error("Error updating comment:", error);
            Swal.fire("Error", "An error occurred while updating the comment.", "error");
        }
    };

    const cancelEdit = () => {
        setEditComment(null);
    };

    const deleteComment = async (commentId: number, videoId: number) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });
        if (confirm.isConfirmed) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/comments/${commentId}`);

                if (response.data.message === "Comment deleted successfully") {
                    Swal.fire("Deleted!", "Your comment has been deleted.", "success");
                    setVideos((prevVideos) =>
                        prevVideos.map((video) => {
                            if (video.id === videoId) {
                                return {
                                    ...video,
                                    comments: video.comments.filter((comment) => comment.id !== commentId),
                                };
                            }
                            return video;
                        })
                    );
                } else {
                    Swal.fire("Error!", "Failed to delete comment.", "error");
                }
            } catch (error) {
                console.error("Error deleting comment:", error);
                Swal.fire("Error!", "An error occurred while deleting the comment.", "error");
            }
        }
    };
// console.log("profileName",profileName);
    return (
        <div className="video-list-container">
            <SideBarProfie />
            <h1>Your Videos</h1>
            {isLoading ? (
                <p>Loading videos...</p>
            ) : videos.length === 0 ? (
                <p>No videos found. Please upload some videos to view them here.</p>
            ) : (
                <div className="video-card-grid">
                    {videos.map((video) => (
                        <div key={video.id} className="video-card">
                            <h3 className="video-title">{video.title}</h3>
                            <video controls className="video-preview">
                                <source
                                    src={`http://127.0.0.1:8000/storage/${video.video}`}
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>

                            <div className="icons_user">
                            <span className="like-container">
                                  <i className="bi bi-suit-heart"></i> {videoLikes[video.id] ?? 0}
                                 <ul className="like-list">
                                      {video.likes.map((like) => (
                                         <li className="like-item" key={like.profile.name}>
                                              {like.profile.name}
                                          </li>
                                      ))}
                                  </ul>
                              </span>

                                <span>
                                    {video.comments.length}{" "}
                                    <i
                                        className="bi bi-chat-dots"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => toggleComments(video.id)}
                                    ></i>
                                </span>
                                <span>
                                    <i className="bi bi-send"></i>
                                </span>
                            </div>

                          
                    

                            {commentVisibility[video.id] && (
                                <ul className="commenter-list">
                               
                                    {video.comments.map((comment) => (
                                        
                                        <li key={comment.id}>
                                            {editComment?.commentId === comment.id ? (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={editComment.value}
                                                        onChange={handleCommentChange}
                                                    />

                                                    <span>
                                                        <i
                                                            className="bi bi-check-circle-fill"
                                                            onClick={() =>
                                                                updateComment(comment.id, video.id)
                                                            }
                                                        ></i>
                                                        <i
                                                            className="bi bi-x-circle-fill"
                                                            onClick={cancelEdit}
                                                        ></i>
                                                    </span>
                                                </div>
                                            ) : (
                                                <>  

                                                    <i className="bi bi-person-circle"></i>
                                                   <span>
                                                      {comment.profile.name}
                                                    </span>  <br />
                                                    <div className="delete-edit_icons_commenter">
                                                      
                                                        <span>  {comment.comment}</span>
                                                      
                                                      
                                                        <span>
                                                     
                                                            <i
                                                                className="bi bi-pen-fill"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() =>
                                                                    handleEditClick(comment.id, comment.comment)
                                                                }
                                                            ></i>
                                                            <i
                                                                className="bi bi-trash3"
                                                                style={{ cursor: "pointer", color: "red" }}
                                                                onClick={() =>
                                                                    deleteComment(comment.id, video.id)
                                                                }
                                                            ></i>
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VideoUser;
