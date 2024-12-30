import React from 'react';
import '../SideBar.css';
import {Link} from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';
// import Log from '../../Compenents/Log';

function SideBar() {
    return (

        <> 
        <div className="admin-sidebar">
        <ul>
            <li> 
                 <Link to='/Dashboard'> <DashboardIcon />  Dashboard</Link> 
            </li>

            <li>
                <Link to='/users'> <PeopleIcon /> Manage Uses</Link>
            </li>

          

            <li>
                <Link to='/setting'>   <SettingsIcon /> Setting</Link>
             </li>

            <li>
                 <Link to='/LogoutAdmin '> <ExitToAppIcon /> Logout</Link>
                 
                 {/* <button onClick={handleLogout} >
                 <ExitToAppIcon /> Logout
                </button> */}
            </li>
        </ul>
        </div>
        </>
    );
}

export default SideBar;