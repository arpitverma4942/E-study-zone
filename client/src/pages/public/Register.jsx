import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    qualification: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://e-study-zone-nsky.onrender.com/api/user/register",
        data
      );
      alert(res.data.msg);
    } catch (err) {
      console.log(err);
      alert("Sorry try again later");
    }
  };

  return (
    <div
      className="vh-100 d-flex"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      {/* Overlay */}
      <div
        className="w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <div className="container-fluid h-100">
          <div className="row h-100">

            {/* LEFT SIDE */}
            <div className="col-md-6 d-none d-md-flex flex-column justify-content-center text-white px-5">
              <h1 className="display-4 fw-bold">E-Study-Zone</h1>
              <p className="mt-3 fs-5">
                Join the future of learning 📚 <br />
                Learn, teach, and grow with us.
              </p>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div
                className="p-4 rounded-4"
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  backdropFilter: "blur(15px)",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                }}
              >
                <h2 className="text-center mb-4 fw-bold">Register</h2>

                <form onSubmit={handleSubmit}>
                  
                  {/* NAME */}
                  <div className="mb-3 position-relative">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="form-control ps-5 p-3"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="mb-3 position-relative">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="form-control ps-5 p-3"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-3 position-relative">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="form-control ps-5 pe-5 p-3"
                      onChange={handleChange}
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  {/* ROLE */}
                  <div className="mb-3">
                  
                    <select
                    
                      className="form-select p-3"
                      name="role"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Learner">Learner</option>
                      <option value="Trainer">Trainer</option>
                    </select>
                  </div>

                  {/* QUALIFICATION */}
                  <div className="mb-3 position-relative">
                    <FaBook className="input-icon" />
                    <input
                      type="text"
                      name="qualification"
                      placeholder="Your qualification"
                      className="form-control ps-5 p-3"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* BUTTON */}
                  <div className="d-grid">
                    <button className="btn btn-success p-3 fw-bold">
                      Register
                    </button>
                  </div>
                </form>

                {/* LINKS */}
                <div className="text-center mt-4">
                  Already have an account?{" "}
                  <a href="/" className="text-warning">
                    Login
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* EXTRA STYLES */}
      <style>{`
        .input-icon {
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
        }

        .password-toggle {
          position: absolute;
          top: 50%;
          right: 15px;
          transform: translateY(-50%);
          cursor: pointer;
        }

        input, select {
          background: rgba(255,255,255,0.2) !important;
          color:  #ddd; !important;
          border: none !important;
        }

        input::placeholder {
          color: #ddd;
        }
      `}</style>
    </div>
  );
};

export default Register;