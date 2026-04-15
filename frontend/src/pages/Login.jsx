import { useState } from "react";
import api from "../api/axiosInstance"; // Import your custom axios object
import Button from "../components/button";
import Header from "../components/Header";
import "../style/page/login.css";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    // Prevent page reload
    if (e) e.preventDefault();

    // 1. Basic Sanitization
    // Trim whitespace and remove potentially malicious script tags/HTML
    const sanitizedEmail = email.trim().replace(/<[^>]*>?/gm, '');
    const sanitizedPassword = password.trim();

    if (!sanitizedEmail || !sanitizedPassword) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // 2. Make the API Call
      const response = await api.post("/login", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      // 3. Handle Success
      console.log("Login successful:", response.data);
      
      // Save token if your API returns one
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Redirect user
      // window.location.href = "/dashboard";
    } catch (error) {
      // 4. Handle Error (Interceptors usually catch 401s, but we catch others here)
      console.error("Login error:", error.response?.data?.message || error.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  function navigateToConsole() {
    navigate("/console");
  }
  return (
    <>
      <Header />
      <div className="container container-bg">
        <div className="form-container">
          <div>
            <h2>Welcome to Qlik Flow</h2>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Added type="submit" so the Enter key works too */}
            <Button 
              label="Log In" 
              className="btn btn-login active-btn" 
              type="submit" 
            />
          </form>
          <div
            style={{
              margin: "35px auto 10px",
              width: "fit-content",
              gap: "5px",
              display: "flex",
              cursor: "default",
            }}
          >
            <span>Don't have an account?</span>
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                color: "#2563eb",
              }}
              onClick={() => (window.location.href = "/register")}
            >
              Register here.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;