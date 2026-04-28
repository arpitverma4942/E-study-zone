import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Content = () => {
  const [data, setData] = useState([])
  const [contents, setContents] = useState([])
  const userId = localStorage.getItem('id')

  const [form, setForm] = useState({
    skillId: '',
    content: '',
    userId: userId
  })

  // Fetch skills
  const handleFetchSkills = async () => {
    const res = await axios.get(`https://e-study-zone-nsky.onrender.com/api/skill/getskill/${userId}`)
    setData(res.data.data)
  }

  // Fetch uploaded content
  const handleFetchContents = async () => {
    const res = await axios.get(`https://e-study-zone-nsky.onrender.com/api/content/get/${userId}`)
    setContents(res.data.data)
    console.log(res);
    
  }

  useEffect(() => {
    handleFetchSkills()
    handleFetchContents()
  }, [])

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setForm({ ...form, [e.target.name]: e.target.files[0] })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('https://e-study-zone-nsky.onrender.com/api/content/upload', form, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })
    window.alert(res.data.msg)
    window.location.reload()
    handleFetchContents() // refresh table after upload
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      const res = await axios.delete(`https://e-study-zone-nsky.onrender.com/api/content/delete/${id}`)
      window.alert(res.data.msg)
      handleFetchContents() // refresh table after delete
    }
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header text-center bg-dark text-white">
              Upload Content
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Skill select */}
                <div className="mb-3">
                  <label htmlFor="skillId" className="form-label">Select Skill</label>
                  <select name="skillId" onChange={handleChange} className='form-control'>
                    <option value="">--Select Skill--</option>
                    {data.map((item, i) => (
                      <option key={i} value={item._id}>{item.skill}</option>
                    ))}
                  </select>
                </div>

                {/* File input */}
                <div className="mb-3">
                  <label htmlFor="profilePic" className="form-label">Select Content</label>
                  <input
                    type="file"
                    className="form-control"
                    id="profilePic"
                    name="content"
                    onChange={handleChange}
                  />
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary w-100">
                  Upload Content
                </button>
              </form>
            </div>
          </div>

          {/* Table for uploaded content */}
          <div className="card shadow mt-4">
            <div className="card-header bg-secondary text-white text-center">
              Uploaded Content List
            </div>
            <div className="card-body">
              <table className="table table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Skill</th>
                    <th>Content</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.length > 0 ? contents.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.skillId?.skill || "N/A"}</td>
                      <td>
                        <a href={`https://e-study-zone-nsky.onrender.com/api/${item.file}`} target="_blank" rel="noreferrer">
                          View File
                        </a>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4">No content uploaded yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Content
