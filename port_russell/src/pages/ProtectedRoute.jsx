import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * ProtectedRoute Component
 * Acts as a Navigation Guard (Middleware) to restrict access to private routes.
 * It ensures that only authenticated users can view the wrapped child components.
 */
const ProtectedRoute = ({ children, isAuthenticated }) => {

  const navigate = useNavigate();

  /**
   * Authentication Check Side Effect
   * Monitors the 'isAuthenticated' state. If the user is not logged in,
   * it triggers a programmatic redirect to the login page.
   */
  useEffect(() => {
  // If session is absent or invalid, redirect to the root (Login) page
  if (!isAuthenticated) {
    navigate("/");
  }}, [isAuthenticated, navigate]);

  /**
   * Early Return Pattern
   * If not authenticated, we return null to prevent the private UI from 
   * flickering or rendering briefly before the redirection occurs.
   */
  if(!isAuthenticated){
    return null;
  }
    // If authenticated, render the children components (the private page)
    return children;       
};

export default ProtectedRoute;


