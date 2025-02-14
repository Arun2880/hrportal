import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import './login.css';
import Swal from 'sweetalert2';
import axios from 'axios';
const Login = () => {
    const [id, setId] = useState(""); // Single state for adminId or employeeId
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    // Handle login submission
    const handleLogin = async (e) => {
      e.preventDefault();
  
      // Ensure the ID and password are provided
      if (!id || !password) {
        Swal.fire("Error", "Please enter ID and password", "error");
        return;
      }
  
      try {
        // We will conditionally send either adminId or employeeId
        const body = {};
        if (id.includes("admin")) {
          body.adminId = id; // Set adminId if ID contains 'admin' (or based on your logic)
        } else {
          body.employeeId = id; // Otherwise, assume it's an employeeId
        }
  
        body.password = password; // Always send password
  
        const response = await axios.post(
          "https://hrportal.dreambytesolution.com/hr/admin/login",
          body
        );
  // console.log("response of login api",response);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Login successful!",
            text: "Please enter the OTP sent to your email.",
          });
  
          // Save the token and role in session storage
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("role", response.data.role);
  
          // Redirect based on role
          const role = response.data.role;
          const token = sessionStorage.getItem("token");
  
          if (!token || !role) {
            navigate("/");
          } else if (role === "admin") {
            navigate("/admindashboard"); // Redirect to admin dashboard
          } else if (role === "employee") {
            navigate("/franchisedashboard"); // Redirect to franchise dashboard
          }
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Login failed",
          "error"
        );
      }
    };
  return (
    <>
    <section className="vh-100" style={{ backgroundColor: "#fff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Login Illustration"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleLogin}>
              {/* ID Field for either Admin or Employee */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Admin ID or Employee ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default Login