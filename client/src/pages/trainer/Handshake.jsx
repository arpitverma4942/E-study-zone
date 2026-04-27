import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Handshake = () => {
  const userid = localStorage.getItem('id');
  const [data, setData] = useState([]);

  const handleFetch = async () => {
    const res = await axios.get(`http://localhost:5000/api/handshake/${userid}`);
    setData(res.data);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const updateRequest = async (item) => {
    await axios.patch(`http://localhost:5000/api/handshake/accept/${item._id}`);
    handleFetch();
  };

  const rejectRequest = async (item) => {
    await axios.patch(`http://localhost:5000/api/handshake/reject/${item._id}`);
    handleFetch();
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div
        className="p-4 mb-4 text-white rounded shadow"
        style={{ background: 'linear-gradient(90deg, #28a745, #20c997)' }}
      >
        <h2 className="mb-0 text-center">👨‍🏫 Handshake Request</h2>
      </div>

      {/* Table */}
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-hover table-bordered shadow-sm align-middle">
              <thead className="table-success text-center">
                <tr>
                  <th>Sr. No.</th>
                  <th>Learner Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={item._id}>
                    <td className="text-center">{i + 1}</td>
                    <td className="fw-bold text-center">{item.learnerId.name}</td>
                    <td className='text-center'>
                      <span
                        className={`badge px-3 py-2  ${
                          item.status === 'accepted'
                            ? 'bg-success'
                            : item.status === 'rejected'
                            ? 'bg-danger'
                            : 'bg-warning text-dark'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          onClick={() => updateRequest(item)}
                          className="btn btn-success btn-sm shadow-sm"
                        >
                          ✅ Accept
                        </button>
                        <button
                          onClick={() => rejectRequest(item)}
                          className="btn btn-danger btn-sm shadow-sm"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length === 0 && (
            <p className="text-center text-muted mt-3">
              No handshake requests yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Handshake;
