import React from "react";
import { useLocation } from "react-router-dom";

interface Video {
  id: number;
  title: string;
  video: string;
  profile: { name: string };
  isLiked: boolean;
  comments_count: number;
}

function FavVideos() {
  const location = useLocation();
  const videos: Video[] = location.state?.videos || [];

  const likedVideos = videos.filter((video) => video.isLiked);

  return (
    <div className="fav-videos-container">
      <h3>Favorited Videos</h3>

      {likedVideos.length === 0 ? (
        <p>No videos liked yet.</p>
      ) : (
        <div className="video-grid">
          {likedVideos.map((video) => (
            <div key={video.id} className="video-card">
              <video
                width="100%"
                height="180"
                controls
                src={`http://127.0.0.1:8000/storage/${video.video}`}
              >
                Your browser does not support the video tag.
              </video>
              <p className="video-title">{video.title || "Untitled"}</p>
              <p className="video-profile">Created by: {video.profile.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavVideos;