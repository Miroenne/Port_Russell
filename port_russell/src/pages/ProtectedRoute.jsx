import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children, isAuthenticated }) => {

  const navigate = useNavigate();

  useEffect(() => {
  if (!isAuthenticated) {
    navigate("/");
  }}, [isAuthenticated, navigate]);

  if(!isAuthenticated){
    return null;
  }
    return children;       
};

export default ProtectedRoute;



