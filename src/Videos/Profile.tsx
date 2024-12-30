import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Logout from "../Pages/Logout";
import SideBarProfie from "./SidBarprofile";
import './Profile.css';

function Profile() {
  const { profileId } = useParams<{ profileId: string }>();
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleVideo = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setVideo(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!profileId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Profile ID is missing! Please log in again.",
      });
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("profile_id", profileId);

    if (video) {
      formData.append("video", video);
    }
    try {
      await axios.post("http://127.0.0.1:8000/api/upload-video", formData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your video has been uploaded successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate(`/VideoUser/${profileId}/list_Videos`);
      }, 2000);

      setTitle("");
      setVideo(null);
    } catch (error) {
      console.error("Error uploading video:", error);
      Swal.fire({
        
        icon: "error",
        title: "Oops...",
        text: "There was an error uploading the video!",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="profile-layout">
      <SideBarProfie />
      <div className="profile-content">
        {profileId && (
          <>
           <Link to={`/VideoUser/${profileId}/list_Videos`} className="video-link">
            Go to Your Videos
          </Link>
          <br />

          <Link to={`/VideoList`} className="video-link">
            All videos
          </Link>
           
          </>
         
        )}
      
        <form className="video-form" onSubmit={handleSubmit}>
          <h2>Upload Video</h2>
          <input
            className="video-input"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="video-file-input"
            type="file"
            accept="video/*"
            onChange={handleVideo}
          />  
          <button className="video-submit-button" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
