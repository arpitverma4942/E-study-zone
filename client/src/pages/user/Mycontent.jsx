import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Mycontent = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem('id');

  const handlefetch = async () => {
    try {
      const res = await axios.get(`https://e-study-zone-nsky.onrender.com/api/content/getcontent/${userId}`);
      console.log(res.data);
      setData(res.data.data); // backend returns { msg, data }
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="p-3 mb-4 text-white rounded shadow-sm" style={{ background: 'linear-gradient(90deg, #007bff, #6610f2)' }}>
        <h2 className="mb-0">📂 My Content</h2>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>S.N</th>
                <th>Skill</th>
                <th>Trainer Name</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {data?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No content available yet
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>
                      <span className="badge bg-info text-dark">{item.skillId?.skill}</span>
                    </td>
                    <td>{item.userId?.name || "Unknown"}</td>
                    <td>
                      <Link
                        to={`http://localhost:5000/api/${item.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm"
                      >
                        View File
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mycontent;