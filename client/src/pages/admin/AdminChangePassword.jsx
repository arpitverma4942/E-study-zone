import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminChangePassword.css';
import axios from 'axios';

const AdminChangePassword = () => {
  const userId = localStorage.getItem("id");

  const [data, setData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    userId: userId
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      return window.alert("Passwords do not match");
    }

    try {
      const res = await axios.post(
        'https://e-study-zone-nsky.onrender.com/api/admin/changepassword',
        data
      );

      window.alert(res.data.msg);
      window.location.reload();

    } catch (er) {
      console.log(er);
      window.alert("Error changing password");
    }
  };

  return (
    <div className="change-password-wrapper">

      <div className="change-password-card">

        <h3 className="title">Change Password</h3>
        <p className="subtitle">Update your account credentials securely</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter current password"
              onChange={handleChange}
              value={data.oldPassword}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              onChange={handleChange}
              value={data.newPassword}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              onChange={handleChange}
              value={data.confirmPassword}
              required
            />
          </div>

          <button type="submit" className="update-btn">
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminChangePassword;