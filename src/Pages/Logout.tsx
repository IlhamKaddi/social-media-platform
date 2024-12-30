import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

async function Logoutprofil() {

    const response = await axios.get('http://127.0.0.1:8000/api/profil/logout');
    if (response) {
      localStorage.removeItem("profile_id");

    } else {
      console.log("Logout failed");
    }

}

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    Logoutprofil().then(() => {
      navigate('/');

    });
  }, [navigate]);
  

  return     <div className="d-flex justify-content-center align-items-center" style={{ height: '500px', color: "#FFC400" }}>
  <div className="spinner-border custom-spinner" role="status">
  </div>
      <span className="loader-charg"> Chargement..</span>
</div>;
}
export default Logout;

// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const Logout= () => {
//     const logoutProfileStyle = {
//         marginLeft: '1200px',
//         color: 'red', 
//         border: 'solid red', 
//         backgroundColor: 'white', 
//         padding: '5px', 
//         borderRadius: '2px', 
//       };
      
//     const navigate=useNavigate();
//   const handleLogout = async () => {
//     try {
//       await axios.post("http://127.0.0.1:8000/api/profil/logout");
//       //remove-----------
//       localStorage.removeItem("profile_id");

//       // alert("Logout successful!");
//       navigate("/")
//     } catch {
//       // alert("An error occurred during logout.");
//       console.log("logout failed")
//     }
//   };

//   // return <button style={logoutProfileStyle} onClick={handleLogout}>Logout</button>;
//   return <div>
//     chargemet...
//   </div>  

// };

// export default Logout;
