import axios from 'axios';
import React, { useState } from 'react';

const HandshakeRequest = () => {
  const userId = localStorage.getItem('id');
  const [form, setForm] = useState({ query: '' });
  const [request] = useState({ learnerId: userId, status: 'pending' });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/content/search', form);
    setData(res.data);
  };

  const sendRequest = async (item) => {
    const res = await axios.post(
      `http://localhost:5000/api/handshake/request/${item.userId._id}`,
      request
    );
    console.log(res);
    window.alert(res.data.msg || "Request sent successfully");
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div
        className="p-4 mb-4 text-white rounded shadow"
        style={{ background: 'linear-gradient(90deg, #007bff, #6610f2)' }}
      >
        <h2 className="mb-0 text-center">🤝 Handshake Request</h2>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="row g-3 mb-4 justify-content-center">
        <div className="col-md-6">
          <input
            onChange={handleChange}
            name="query"
            type="search"
            className="form-control form-control-lg shadow-sm"
            placeholder="Search skill..."
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary btn-lg w-100 shadow-sm fw-semibold">
            🔍 Search
          </button>
        </div>
      </form>

      {/* Results Table */}
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-hover table-bordered shadow-sm align-middle">
              <thead className="table-primary text-center">
                <tr>
                  <th>Sr. No.</th>
                  <th>Trainer Name</th>
                  <th>Skill</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={item._id}>
                    <td className="text-center">{i + 1}</td>
                    <td className="fw-bold text-center">{item.userId.name}</td>
                    <td className='text-center'>{item.skillId.skill}</td>
                    <td className='text-center'>{item.skillId.description}</td>
                    <td className="text-center">
                      <button
                        onClick={() => sendRequest(item)}
                        className="btn btn-success btn-sm shadow-sm"
                      >
                        🚀 Send Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length === 0 && (
            <p className="text-center text-muted mt-3">
              No trainers found. Try searching for another skill.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandshakeRequest;
