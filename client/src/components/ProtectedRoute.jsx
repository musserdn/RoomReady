/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import AuthService from '../utils/auth.js';

const ProtectedRoute = ({ children }) => {
  if (!AuthService.loggedIn()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;