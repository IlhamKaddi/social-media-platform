import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

async function Logoutprofil() {
    const response = await axios.get('http://127.0.0.1:8000/api/logout_admin');
    if (response) {
      localStorage.removeItem("admin_id");

    } else {
      console.log("Logout failed");
    }

}

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    Logoutprofil().then(() => {
      navigate('/admin');
    });
  }, [navigate]);
  return     <div className="d-flex justify-content-center align-items-center" style={{ height: '500px', color: "#FFC400" }}>
  <div className="spinner-border custom-spinner" role="status">
  </div>
      <span className="loader-charg"> Chargement..</span>
</div>;
}

export default Logout;


