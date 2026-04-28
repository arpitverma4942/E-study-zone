import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://e-study-zone-nsky.onrender.com/api/user/login",
        data
      );

       if(res.data.msg=="Login Successfully"){
        localStorage.setItem("name",res.data.data.name)
        localStorage.setItem("email",res.data.data.email)
        localStorage.setItem("id",res.data.data.id)
        localStorage.setItem("token",res.data.data.token)
        localStorage.setItem("role",res.data.data.role)

        if(res.data.data.role=="Trainer"){
          navigate('/trainerdashboard')}
          else if(res.data.data.role=="Learner"){
            navigate('/userdashboard')
          }
          
        } else {
        alert(res.data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }

    setLoading(false);
  };

  return (
    <div
      className="vh-100 d-flex"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      {/* Overlay */}
      <div
        className="w-100 h-100 d-flex"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <div className="container-fluid h-100">
          <div className="row h-100">

            {/* LEFT TEXT */}
            <div className="col-md-6 d-none d-md-flex flex-column justify-content-center text-white px-5">
              <h1 className="display-4 fw-bold">E-Study-Zone</h1>
              <p className="mt-3 fs-5">
                Upgrade your skills with modern learning. <br />
                Interactive courses, expert trainers, and real growth.
              </p>
            </div>

            {/* RIGHT LOGIN */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div
                className="p-4 rounded-4"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  backdropFilter: "blur(15px)",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                }}
              >
                <h2 className="text-center mb-4 fw-bold">Login</h2>

                <form onSubmit={handelSubmit}>
                  
                  {/* EMAIL */}
                  <div className="mb-3 position-relative">
                    <FaEnvelope
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "15px",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="form-control ps-5 p-3"
                      onChange={handelChange}
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-3 position-relative">
                    <FaLock
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "15px",
                        transform: "translateY(-50%)",
                      }}
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="form-control ps-5 pe-5 p-3"
                      onChange={handelChange}
                      required
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color:"black"
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  {/* BUTTON */}
                  <div className="d-grid">
                    <button
                      className="btn btn-success p-3 fw-bold"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>

                {/* LINKS */}
                <div className="d-flex justify-content-between mt-4 small">
                  <span>
                    Don’t have an account?{" "}
                    <a href="/register" className="text-warning">
                      Sign up
                    </a>
                  </span>
                  <a href="/" className="text-warning">
                    Forgot password
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;