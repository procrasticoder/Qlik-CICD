import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

function IndividualRegForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    comp_id: "",
    first_name: "",
    last_name: "",
    user_email: "",
    user_password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function submitForm(e) {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
    };

    console.log("Submitting form with data:", updatedFormData);

    try {
      const response = await axios({
        method: "POST",
        url: `${apiUrl}/api/v1/company/registerUser`,
        data: updatedFormData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Success:", response.data);
      alert("User registered successfully");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Registration failed");
    }
  }

  function navigateToLoginPage() {
    navigate("/");
  }

  return (
    <form>
      <input
        placeholder="Company Id"
        className="input"
        onChange={handleInputChange}
        name="comp_id"
        required
      />
      <input
        placeholder="First Name"
        className="input"
        onChange={handleInputChange}
        name="first_name"
        required
      />
      <input
        placeholder="Last Name"
        className="input"
        onChange={handleInputChange}
        name="last_name"
        required
      />
      <input
        placeholder="Email"
        className="input"
        onChange={handleInputChange}
        name="user_email"
        required
      />
      <input
        placeholder="Password"
        className="input"
        type="password"
        onChange={handleInputChange}
        name="user_password"
        required
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button className="btn active-btn" onClick={submitForm}>
          Sign up
        </button>
        {/* <Button label="Log In" className="btn active-btn" /> */}
        <button className="btn active-btn" onClick={navigateToLoginPage}>
          Log In
        </button>
      </div>
    </form>
  );
}

export default IndividualRegForm;
