import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import Header from '../../Header/Header';
import './Dashboard.css';
import axios from 'axios';
import { BarChart } from '@mui/x-charts';

const Dashboard: React.FC = () => {
    const [totalProfiles, setTotalProfiles] = useState<number>(0);
    const [totalCommenters, setTotalCommenters] = useState<number>(0);
    const [totalVideos, setTotalVideos] = useState<number>(0);
    const [chartData, setChartData] = useState({ users: [], totals: [] });

    // Fetch total profiles
    useEffect(() => {
        const fetchTotalProfiles = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/profil/total');
                setTotalProfiles(response.data.total);
            } catch (error) {
                console.error('Erreur lors de la récupération du total des profils:', error);
            }
        };
        fetchTotalProfiles();
    }, []);

    // Fetch total commenters
    useEffect(() => {
        const fetchTotalCommenters = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/total-comment');
                setTotalCommenters(response.data.total);
            } catch (error) {
                console.error('Erreur lors de la récupération du total des profils:', error);
            }
        };
        fetchTotalCommenters();
    }, []);

    // Fetch total videos
    useEffect(() => {
        const fetchTotalVideos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/total-video');
                setTotalVideos(response.data.total);
            } catch (error) {
                console.error('Erreur lors de la récupération du total des profils:', error);
            }
        };
        fetchTotalVideos();
    }, []);

    // Fetch videos data per user for chart
    useEffect(() => {
        const fetchVideosPerProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/profil/video-profile');
                const users = response.data.videosProfile.map((profile: { name: string }) => profile.name);
                const totals = response.data.videosProfile.map((profile: { videos_count: number }) => profile.videos_count);
                setChartData({ users, totals });
            } catch (error) {
                console.error('Error fetching video data per user:', error);
            }
        };
        fetchVideosPerProfile();
    }, []);

    return (
        <>
            <Header />
            <SideBar />
            <div className="dashboard-container">
                <div className="dashboard-content-card">
                    <div className="dashboard-card">
                        <span className="img-span">
                            <img
                                src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/users.png"
                                alt="Card Image"
                                className="card-img"
                            />
                        </span>
                        <span className="card-title">
                            <p>Total Users: <p className="profiles-number">{totalProfiles}</p></p>
                        </span>
                    </div>

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
                                src="https://png.pngtree.com/png-vector/20220515/ourmid/pngtree-long-shadow-glyph-icon-of-a-purple-flat-design-comment-box-vector-png-image_30363044.png"
                                alt="Card Image"
                                className="card-img"
                            />
                        </span>
                        <span className="card-title">
                            <p>Total Comments: <p className="profiles-number">{totalCommenters}</p></p>
                        </span>
                    </div>
                </div>

                <br />
                <br />

                <div className="chart">
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: chartData.users }]}
                        series={[{ data: chartData.totals }]}
                        width={500}
                        height={300}
                    />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
