import React, { useEffect, useState } from "react";
import {
  FaUserAlt,
  FaCloudUploadAlt,
  FaHandshake,
  FaLock,
  FaSignOutAlt,
  FaBars,
  FaCode,
} from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";

const TrainerDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const trainerName = localStorage.getItem('name') || 'Trainer';

  useEffect(() => {
    if (role !== "Trainer" || !token) navigate("/");
  }, []);

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="logo">
          {isCollapsed ? "E" : "E-study-zone"}
        </div>

        <div className="menu">
          <Link to="trainerProfile" className="menu-item">
            <FaUserAlt /> {!isCollapsed && <span>Profile</span>}
          </Link>

          <Link to="skill" className="menu-item">
            <FaCode /> {!isCollapsed && <span>Skills</span>}
          </Link>

          <Link to="content" className="menu-item">
            <FaCloudUploadAlt /> {!isCollapsed && <span>Upload Content</span>}
          </Link>

          <Link to="handshake" className="menu-item">
            <FaHandshake /> {!isCollapsed && <span>Handshake</span>}
          </Link>

          <Link to="changePassword" className="menu-item">
            <FaLock /> {!isCollapsed && <span>Password</span>}
          </Link>

          <div
            className="menu-item logout"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <FaSignOutAlt /> {!isCollapsed && <span>Logout</span>}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">
        {/* NAVBAR */}
        <div className="navbar-custom">
          <button
            className="toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FaBars />
          </button>

          <div className="d-none d-md-flex align-items-center gap-3 ">
            <span className="text-white fw-bold ">Welcome, {trainerName}</span>
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
              {trainerName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          <Outlet />
        </div>
      </div>

      {/* DESIGNER CSS */}
      <style>{`
        .dashboard {
          display: flex;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b, #020617);
          color: white;
        }

        /* SIDEBAR */
        .sidebar {
          width: 250px;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
          border-right: 1px solid rgba(255,255,255,0.1);
          position: fixed;
          height: 100%;
          transition: 0.3s;
        }

        .sidebar.collapsed {
          width: 80px;
        }

        .logo {
          font-size: 22px;
          font-weight: 700;
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          letter-spacing: 1px;
        }

        .menu {
          margin-top: 10px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 20px;
          font-size: 15px;
          color: #cbd5f5;
          text-decoration: none;
          transition: 0.25s;
          border-radius: 10px;
          margin: 5px 10px;
        }

        .menu-item:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .logout {
          color: #f87171;
        }

        /* MAIN */
        .main {
          margin-left: 250px;
          width: 100%;
          transition: 0.3s;
        }

        .sidebar.collapsed ~ .main {
          margin-left: 80px;
        }

        /* NAVBAR */
        .navbar-custom {
          position: fixed;
          top: 0;
          left: 250px;
          right: 0;
          height: 65px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 25px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          z-index: 1000;
          transition: 0.3s;
        }

        .sidebar.collapsed ~ .main .navbar-custom {
          left: 80px;
        }

        .toggle-btn {
          border: none;
          background: transparent;
          color: white;
          font-size: 18px;
        }

        .profile-area {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .username {
          font-size: 14px;
          font-weight: 600;
          color: #e2e8f0;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.5);
        }

        /* CONTENT */
        .content {
          margin-top: 65px;
          padding: 25px;
          height: calc(100vh - 65px);
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default TrainerDashboard;