import React, { useEffect, useState } from "react";
import {
  FaUserAlt,
  FaHandshake,
  FaLock,
  FaSignOutAlt,
  FaBars,
  FaCode,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const learnerName = localStorage.getItem("name");
console.log(learnerName);

  useEffect(() => {
    if (role !== "Learner" || !token) navigate("/");
  }, [role, token, navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="logo">
          {isCollapsed ? "E" : "E-study-zone"}
        </div>

        <div className="menu">
          <NavLink to="trainerProfile" className="menu-item">
            <FaUserAlt /> {!isCollapsed && <span>Profile</span>}
          </NavLink>

          <NavLink to="mycontent" className="menu-item">
            <FaCode /> {!isCollapsed && <span>My Content</span>}
          </NavLink>

          <NavLink to="handshakerequest" className="menu-item">
            <FaHandshake /> {!isCollapsed && <span>Handshake Request</span>}
          </NavLink>

          <NavLink to="changePassword" className="menu-item">
            <FaLock /> {!isCollapsed && <span>Password</span>}
          </NavLink>

          <div className="menu-item logout" onClick={handleLogout}>
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
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>

          <div className="d-none d-md-flex align-items-center gap-3">
            <span className="text-white fw-bold">
              Welcome, {learnerName || "User"}
            </span>
            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "38px", height: "38px" }}
            >
              {(learnerName?.charAt(0) || "U").toUpperCase()}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          <Outlet />
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .dashboard {
          display: flex;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b, #020617);
          color: white;
        }

        .sidebar {
          width: 250px;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
          border-right: 1px solid rgba(255,255,255,0.1);
          position: fixed;
          height: 100%;
          transition: 0.3s;
          z-index: 1000;
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
          border-radius: 10px;
          margin: 5px 10px;
          transition: 0.25s;
        }

        .menu-item:hover,
        .menu-item.active {
          background: rgba(255,255,255,0.15);
          color: white;
        }

        .logout {
          color: #f87171;
          cursor: pointer;
        }

        .main {
          margin-left: 250px;
          width: 100%;
          transition: 0.3s;
        }

        .sidebar.collapsed ~ .main {
          margin-left: 80px;
        }

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
          cursor: pointer;
        }

        .content {
          margin-top: 65px;
          padding: 25px;
          height: calc(100vh - 65px);
          overflow-y: auto;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .sidebar {
            position: absolute;
            left: ${isCollapsed ? "-250px" : "0"};
          }

          .main {
            margin-left: 0;
          }

          .navbar-custom {
            left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;