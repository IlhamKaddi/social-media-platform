import React, { useState } from 'react';
import './FileV.css'; 

const FileV = () => {
    const [videos, setVideos] = useState<string[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const handleFileSelect = (event:any) => {
        if (event.target.files && event.target.files[0]) {
            const videoURL = URL.createObjectURL(event.target.files[0]);
            setSelectedVideo(videoURL);
        }
    };

    const handleAddToList = () => {
        if (selectedVideo) {
            setVideos((prevVideos) => [...prevVideos, selectedVideo]);
            setSelectedVideo(null); 
        }
    };

    return (
        <div className="file-container">
            <div className="input-container">
                <input
                    type="file"
                    onChange={handleFileSelect}
                    className="file-input"
                />

                <button onClick={handleAddToList}   className="upload-button" >   Add to List  </button>
  
            </div>
            <div className="video-list">
                <h3>Uploaded Videos</h3>
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <video key={index} src={video} controls className="video-item"></video>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileV;
