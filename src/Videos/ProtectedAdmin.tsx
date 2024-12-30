import React from "react";
import { Navigate } from "react-router-dom";
import Notfound from "../Compenents/Notfound";


interface ProtectedRoutesProps {
  children: React.ReactNode;
}
const ProtectedAdmin: React.FC<ProtectedRoutesProps> = ({ children }) => {
  if ( localStorage.getItem("admin_id") === null)  {
    // alert('loing to access')------
    return <Navigate to='/Notfound'/>
  }
  return <>{children}</>;
  
};

export default ProtectedAdmin;
