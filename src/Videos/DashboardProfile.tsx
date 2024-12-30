import React, { useState, useEffect } from 'react';
import './DashboardProfile.css';
import axios from 'axios';
import SideBarProfie from './SidBarprofile';

const DashboardProfile = () => {
    const [totalLikes, setTotalLikes] = useState<number>(0);
    const [totalCommenters, setTotalCommenters] = useState<number>(0);
    const [totalVideos, setTotalVideos] = useState<number>(0);

    // Fetch total profiles
    useEffect(() => {
        const fetchTotalLikes = async () => {
            try {
                const profileId = localStorage.getItem('profile_id');
                if (profileId) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/total-likes/${profileId}`);
                    setTotalLikes(response.data.totalLikes);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du total des vidéos:', error);
            }
        };

        fetchTotalLikes();
    }, []);

    // Fetch total commenters
    // useEffect(() => {
    //     const fetchTotalCommenters = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/api/total-comment');
    //             setTotalCommenters(response.data.total);
    //         } catch (error) {
    //             console.error('Erreur lors de la récupération du total des profils:', error);
    //         }
    //     };
    //     fetchTotalCommenters();
    // }, []);

    // Fetch total videos dynamically based on logged-in profile ID
    useEffect(() => {
        const fetchTotalVideos = async () => {
            try {
                const profileId = localStorage.getItem('profile_id');
                if (profileId) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/total-videos-profile/${profileId}`);
                    setTotalVideos(response.data.totalV);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du total des vidéos:', error);
            }
        };

        fetchTotalVideos();
    }, []);

    return (
        <>
            <SideBarProfie />
            <div className="dashboard-container">
                <div className="dashboard-content-card">
                   
                    <div className="dashboard-card">
                        <span className="img-span">
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/026/991/762/small_2x/3d-render-of-purple-video-streaming-side-icon-for-ui-ux-web-mobile-apps-social-media-ads-design-png.png"
                                alt="Card Image"
                                className="card-img"
                            />
                        </span>
                        <span className="card-title">
                            <p>Total Videos: <p className="profiles-number">{totalVideos}</p></p>
                        </span>
                    </div>

                    <div className="dashboard-card">
                        <span className="img-span">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJfNJAmtYuBTpxodME1YEj8kQODcidJJZI4gxY070Tnr2UfiDzkOc4-y18u6lsiOX_7k&usqp=CAU"
                                alt="Card Image"
                                className="card-img"
                            />
                        </span>
                        <span className="card-title">
                            <p>Total Likes: <p className="profiles-number">{totalLikes}</p></p>
                        </span>
                    </div>

                    

                </div>
            </div>
        </>
    );
};

export default DashboardProfile;
