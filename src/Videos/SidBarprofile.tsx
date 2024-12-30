import React from 'react';
import './SideBarProfie.css';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';  // Updated icon for "Add Video"
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';

function SideBarProfie() {
    const profileId  = localStorage.getItem('profile_id');

    return (
        <> 
        <div className="profile-sidebar">
        <ul>
            <li> 
                 <Link to='/DashboardProfile'> <DashboardIcon />  Dashboard</Link> 
            </li>

            <li>
                <Link to={`/Profile/${profileId}`}> <VideoLibraryIcon /> Add Video </Link> 
            </li>

            <li>
                <Link to='/setting'>   <SettingsIcon /> Setting</Link>
            </li>

            <li>
                 <Link to='/logout'> <ExitToAppIcon /> Logout</Link>
            </li>

        </ul>
        </div>
        </>
    );
}

export default SideBarProfie;  
