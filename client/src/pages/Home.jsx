import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authAPI";
import AuthService from "../utils/auth.js";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(loginData); 
      // If the response indicates a failed login, set an error message
      if (!data || !data.token) {
        setErrorMessage("Invalid email or password");
        return;
      }
      // Use AuthService to store the token
      AuthService.login(data.token);
      // Redirect to /guest after successful login
      navigate("/Guest");
    } catch (err) {
      setErrorMessage("Failed to login. Please check your credentials.");
      console.error("Failed to login", err);
    }
  };

  return (
    <div className="container mt-5">
      <form className="mb-3" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">Login</h1>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={loginData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;