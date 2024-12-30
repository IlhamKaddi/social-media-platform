import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import SideBar from './SideBar';
import './DetailsProfile.css';

interface Comment {
  id: number;
  comment: string;
}

interface Video {
  id: number;
  title: string;
  video: string;
  comments: Comment[];
}

const DetailsProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [visibleComments, setVisibleComments] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/user-videos/${id}`)

       
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [id]);

  const toggleComments = (videoId: number) => {
    setVisibleComments((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const deleteVideo = async (videoId: number) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this video? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (confirm.isConfirmed) {
        await axios.delete(`http://127.0.0.1:8000/api/delete-video/${videoId}`);
        Swal.fire('Deleted!', 'The video has been deleted.', 'success');
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      Swal.fire('Error!', 'Failed to delete the video.', 'error');
    }
  };

  const deleteComment = async (commentId: number, videoId: number) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/comments/${commentId}`, {
          method: 'DELETE',
        });
        const data = await response.json();

        if (data.message === 'Comment deleted successfully') {
          Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
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
          Swal.fire('Error!', 'Failed to delete comment.', 'error');
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
        Swal.fire('Error!', 'An error occurred while deleting the comment.', 'error');
      }
    }
  };

  return (
    <div className="details-profile-container">
      <SideBar />
      <div className="details-profile-main">
        <h1>Videos Uploaded by  {id}</h1>
        <div className="video-card-grid">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video.id} className="video-card">
                <h3>{video.title}</h3>
                <video controls>
                  <source src={`http://127.0.0.1:8000/storage/${video.video}`} type="video/mp4" />

                </video>

                <i
                  className="bi bi-x-lg"
                  onClick={() => deleteVideo(video.id)}
                  style={{ cursor: 'pointer', color: 'red' }}
                ></i>

                <div className="commenter-section">
                  <i
                    className="bi bi-chat-dots"
                    onClick={() => toggleComments(video.id)}
                    style={{ cursor: 'pointer' }}
                  ></i>
                  <span>{video.comments.length} Comments</span>
                </div>
        
                {visibleComments[video.id] && (
                  <ul className="commenter-list">
                    {video.comments.map((comment) => (
                      <li key={comment.id}>
                        <i className="bi bi-person-circle"></i>
                        <span>{comment.comment}</span>
                        <span>
                          <i
                            className="bi bi-trash3"
                            style={{ cursor: 'pointer', color: 'red' }}
                            onClick={() => deleteComment(comment.id, video.id)}
                          ></i>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            ))
          ) : (
            <p>No videos found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsProfile;
