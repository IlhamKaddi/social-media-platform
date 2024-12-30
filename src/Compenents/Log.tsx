import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Log(){
    
    const navigate=useNavigate();       
    const handleLogout = async () => {
        try {
          await axios.post("http://127.0.0.1:8000/api/profil/logout");
          //remove-----------
          localStorage.removeItem("profile_id");
    
          // alert("Logout successful!");
          navigate("/")
          console.log("good")
        } catch {
          alert("An error occurred during logout.");
          console.log("good")

        }
      };

      return<>
      
      
      </>

}
