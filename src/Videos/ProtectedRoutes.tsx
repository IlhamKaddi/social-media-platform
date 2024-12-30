import React from "react";
import { Navigate } from "react-router-dom";
import Notfound from "../Compenents/Notfound";


interface ProtectedRoutesProps {
  children: React.ReactNode;
}
const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  if ( localStorage.getItem("profile_id") === null)  {
    // alert('loing to access')-------

    return <Navigate to='/Notfound' />
  }
  return <>{children}</>;
  
};

export default ProtectedRoutes;
