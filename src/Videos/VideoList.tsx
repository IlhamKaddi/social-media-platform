import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./VideoList.css";
interface Video {
  id: number;
  title: string;
  video: string;
  profile: { name: string };
  isLiked: boolean;
  comments_count: number;
  likes_count: number; 
}
interface Profile {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string;
  genre: string;
}
function VideoList() {
  //____________isInvitationsent
  const [isInvitationSent, setIsInvitationSent] = useState(false);


  const profileId = localStorage.getItem("profile_id");
  const [videos, setVideos] = useState<Video[]>([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [activeCommentInput, setActiveCommentInput] = useState<number | null>(null);
  const [commentInputValue, setCommentInputValue] = useState<{ [key: number]: string }>({});
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();


  // Fetch profiles_____________________________________________________

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profil/get");
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };
  useEffect(() => {
    fetchProfiles();
  }, []);


  // Fetch videos, likes, and total likes for each video--------------
  const fetchVideos = async () => {
    try {
      if (!profileId) {
        console.error("Profile ID not found in localStorage");
        return;
      }

      const videosResponse = await axios.get("http://127.0.0.1:8000/api/fetch-video");
      const likesResponse = await axios.get(`http://127.0.0.1:8000/api/get-liked-video/${profileId}`);
      const likedVideoIds = new Set(likesResponse.data.likes.map((like: any) => like.video_id));

      // Fetch likes count for each video__________________________________________
      const videosWithLikes = await Promise.all(
        videosResponse.data.videos.map(async (video: Video) => {
          const likesCountResponse = await axios.get(
            `http://127.0.0.1:8000/api/total-likes-video/${video.id}`
          );

          return {
            ...video,
            isLiked: likedVideoIds.has(video.id),
            likes_count: likesCountResponse.data.totalLikesVideo || 0, // Assign total likes count
          };
        })
      );

      setVideos(videosWithLikes);
    } catch (error) {
      console.error("Error fetching videos or likes:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Update total likes when videos change
  useEffect(() => {
    const likedVideosCount = videos.filter((video) => video.isLiked).length;
    setTotalLikes(likedVideosCount);
  }, [videos]);

  // Handle like toggle
  const handleLike = async (videoId: number) => {
    if (!profileId) {
      console.error("Profile ID not found in localStorage");
      return;
    }

    const videoToLike = videos.find((video) => video.id === videoId);

    if (!videoToLike) {
      console.error("Video not found");
      return;
    }

    try {
      if (videoToLike.isLiked) {
        const response = await axios.get(`http://127.0.0.1:8000/api/get-liked-video/${profileId}`);
        const like = response.data.likes.find((like: any) => like.video_id === videoId);

        if (like) {
          await axios.delete(`http://127.0.0.1:8000/api/delete-like/${like.id}`);
          console.log("Like removed successfully");

          setVideos((prevVideos) =>
            prevVideos.map((video) =>
              video.id === videoId
                ? { ...video, isLiked: false, likes_count: video.likes_count - 1 }
                : video
            )
          );
        }

      } else {
        await axios.post("http://127.0.0.1:8000/api/add-like", {
          profile_id: profileId,
          video_id: videoId,
        });
        console.log("Video liked successfully");
        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.id === videoId
              ? { ...video, isLiked: true, likes_count: video.likes_count + 1 }
              : video
          )
        );
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  const redirectToFavVideos = () => {
    navigate("/fav-videos", { state: { videos } });
  };


  const toggleCommentInput = (videoId: number) => {
    setActiveCommentInput((prev) => (prev === videoId ? null : videoId));
  };


  const handleCommentInputChange = (videoId: number, value: string) => {
    setCommentInputValue((prev) => ({ ...prev, [videoId]: value }));
  };

  const addComment = async (videoId: number) => {
    const comment = commentInputValue[videoId];
    if (comment?.trim()) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/add-comment", {
          video_id: videoId,
          profile_id:profileId ,
          comment: comment,
        });

        if (response.status === 201) {
          console.log("Comment added successfully to the database.");
          setVideos((prevVideos) =>
            prevVideos.map((video) =>
              video.id === videoId
                ? { ...video, comments_count: video.comments_count + 1 }
                : video
            )
          );
        } else {
          console.error("Failed to add comment: ", response.data.message);
        }
      } catch (error) {
        console.error("Error adding comment: ", error);
      } finally {
        setCommentInputValue((prev) => ({ ...prev, [videoId]: "" }));
        setActiveCommentInput(null);
      }
    }
  };

    // Handle invitation-----------------------------------


    //send /add  invitaion
    // const sendInvitation = async (receiverId: number) => {
    //   if (!profileId) {
    //     console.error("Profile ID not found in localStorage");
    //     return;
    //   }

    //   try {
    //     const response = await axios.post(`http://127.0.0.1:8000/api/send-invitation/${profileId}`, {
    //       receiver_id: receiverId,
    //     });
    //   } catch (error) {
      
    //     console.log('invitation already send ')
    //   }
    // };

    const sendInvitation = async (receiverId: number) => {
      if (!profileId) {
        console.error("Profile ID not found in localStorage");
        return;
      }
    
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/send-invitation/${profileId}`, {
          receiver_id: receiverId,
        });
        console.log("Invitation envoyée avec succès");
        setIsInvitationSent(true);
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'invitation:", error);
      }
    };
    
    
    //delete invitation
      // const handleDelete = (invitationId:number) => {
      //   axios.delete(`http://127.0.0.1:8000/api/delete-invitation/${invitationId}`)
      //     .then(() => {
      //       console.log("Invitation supprimée avec succès.");
      //     })
      //     .catch((error) => {
      //       if (error.response?.status === 404) {
      //         console.log("Invitation introuvable.");
      //       } else {
      //         console.log("Erreur lors de la suppression.");
      //       }
      //     });
      // };

      const handleDelete = (invitationId: number) => {
        axios.delete(`http://127.0.0.1:8000/api/delete-invitation/${invitationId}`)
          .then(() => {
            console.log("Invitation supprimée avec succès.");
            setIsInvitationSent(false);
          })
          .catch((error) => {
            if (error.response?.status === 404) {
              console.log("Invitation introuvable.");
            } else {
              console.log("Erreur lors de la suppression.");
            }
          });
      };
      
    //handelInvitation ____________
    const handleInvitation = () => {
      navigate('/invitations');
  };
  
  return (
    <div className="video-gallery-container">
      
    <div className="icons-invNotif">
    <i className="bi bi-bell"></i>
    <i className="bi bi-people"   onClick={handleInvitation}></i>
    </div>

      <Link to={`/Profile/${profileId}`}>Profile</Link>
     <div className="profile-list-container">
        <ul className="profile-list">
          {profiles.map((profile) => (
            <li key={profile.id} className="item">

              <i className="bi bi-person-circle"></i>
              <br />
              {profile.name}
              <br />
              <button
                onClick={() => sendInvitation(profile.id)}
                className="invitation-button"  >
                  invite
              </button>
              {/* <button 
  onClick={() => isInvitationSent ? handleDelete(invitationId) : sendInvitation(profile.id)}
  
  className={`invitation-button ${isInvitationSent ? 'cancel' : ''}`}
>
  {isInvitationSent ? 'Annuler invitation' : 'Envoyer invitation'}
</button> */}

            </li>
          ))}
        </ul>
      </div>

  {/* -------------_------------ */}
      <div className="total-likes" onClick={redirectToFavVideos} style={{ cursor: "pointer" }}>
        <i className="bi bi-suit-heart-fill" style={{ color: "red" }}></i>
        <span>{totalLikes} fav </span>
      </div>
      {/* <h3>Uploaded Videos</h3>  */}
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <video
              width="100%"
              height="180"
              controls
              src={`http://127.0.0.1:8000/storage/${video.video}`}
            >
              Your browser does not support the video tag.
            </video>
            <p className="video-title">{video.title ||"Untitled"}</p>
            <div className="videoList-icons">
            <span onClick={() => handleLike(video.id)}>
             <i
               className={`bi ${
                 video.isLiked ? "bi-suit-heart-fill" : "bi-suit-heart"
               }`}
               style={{
                color: video.isLiked ? "red" : "black",
                cursor: "pointer",
              }}
             ></i>
             {video.likes_count > 0 && <span>{video.likes_count}</span>} {/* Hide if 0---------*/}

          </span>

              <span onClick={() => toggleCommentInput(video.id)}>
                <i className="bi bi-chat-dots" style={{ cursor: "pointer" }}></i>
                {video.comments_count > 0 && <span>{video.comments_count}</span>}
              </span>

            
              <span>
                <i className="bi bi-send"></i>
              </span>
            </div>

            <p className="video-profile">Created by : {video.profile.name}</p>

            {activeCommentInput === video.id && (
              <div className="comment-section">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputValue[video.id] || ""}
                  onChange={(e) =>
                    handleCommentInputChange(video.id, e.currentTarget.value)
                  }
                />
                <i
                  onClick={() => addComment(video.id)}
                  className="bi bi-plus-circle btn-add"
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}


export default VideoList;

