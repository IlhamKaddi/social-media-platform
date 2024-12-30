import React from 'react';
import { Routes,Route,Link } from 'react-router-dom';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import About from './Pages/Registre';
import Navbar from './Compenents/Navbar';
import Post from './Pages/Post';
import Create from './Compenents/Create';
import Edit from './Compenents/Edit';
import Notfound from './Compenents/Notfound';
import Registre from './Pages/Registre';
import Dashboard from './Pages/Sidebar/Dashboard';
import Settings from './Pages/Sidebar/Settings';
import Logout from './Pages/Logout';
import ManageUsers from './Pages/Sidebar/ManageUsers';
import SideBar from './Pages/Sidebar/SideBar';
import CommandeExample from './Commande/CommandeExample';
import Card from './Magasins/Card';
import Video from './Videos/Profile';
import FileV from './FileV/FileV';
import VideoList from './Videos/VideoList';
import VideoUser from './Videos/VideoUser';
import Profile from './Videos/Profile';
import ProtectedRoutes from './Videos/ProtectedRoutes';
import LoginAdmin from './Pages/LoginAdmin';
import LogoutAdmin from './Pages/LogoutAdmin';
import ProtectedAdmin from './Videos/ProtectedAdmin';
import Log from './Compenents/Log';
import DetailsProfile from './Pages/Sidebar/DetailsProfile';
import FavVideos from './Videos/FavVideos';
import AddProfile from './Pages/Sidebar/AddProfile';
import SideBarProfie from './Videos/SidBarprofile';
import DashboardProfile from './Videos/DashboardProfile';
import Invitations from './Videos/Invitations';
function App() {

  return (
    <>
  
   
      <Routes>
        <Route  path='/sidbar-profile' element={<SideBarProfie/>}/>
        <Route  path='/DashboardProfile' element={<DashboardProfile/>}/>


        <Route  path='/Home' element={<Home/>}/>
        <Route path='/' element={<Login/>} />
        <Route path='/admin' element={<LoginAdmin/>} />
        <Route path="/logout" element={<Logout />} /> 
        <Route path="/LogoutAdmin" element={<LogoutAdmin />} /> 

        <Route path='/Registre' element={<Registre />} /> 
        <Route path='/Post' element={<Post />} />    
        <Route path='/Create' element={<Create />} /> 
        <Route  path='/Edit/:id' element={<Edit  />} /> 
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/details/:id" element={<DetailsProfile />} />
        <Route path="/fav-videos" element={<FavVideos />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/sideBar" element={<SideBar />} /> 
       <Route path='/Notfound' element={<Notfound />} /> 
        <Route path="/VideoList" element={<VideoList/>} />
        <Route path="/AddProfile" element={<AddProfile/>} />
        <Route path="/Invitations" element={<Invitations/>} />



        {/* <Route path="/Profile/:profileId" element={<Profile />} />
        <Route path="/VideoUser/:profile_id/list_Videos" element={<VideoUser />} /> */}

    {/* Protected Routes  PROFILE---------------------------------------*/}
    
      <Route
        path="/Profile/:profileId"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/VideoUser/:profile_id/list_Videos"
        element={
          <ProtectedRoutes>
            <VideoUser />
          </ProtectedRoutes>
        }
      />

{/* Protected admin-------------------- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedAdmin>
            <Dashboard />
          </ProtectedAdmin>
        }
      />
    </Routes>
    
     {/* <CommandeExample/> */}
     {/* <Route path='/Notfound' element={<Notfound />} />  */}
     {/* <FileV/> */}

     
    </>
  );
}
export default App;