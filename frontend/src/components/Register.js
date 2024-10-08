// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Ensure you have a CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    idNumber: '',
    accountNumber: ''
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(res.data.msg);
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      alert('Error: ' + err.response.data.msg);
    }
  };

  const goBackToHome = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>ID Number:</label>
          <input
            type="text"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={e => setFormData({ ...formData, idNumber: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={e => setFormData({ ...formData, accountNumber: e.target.value })}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <lable style={{ color: 'blue' }} onClick={() => navigate('/login')}>Login Now</lable>
      </p>
      
      <button className="back-button" onClick={goBackToHome}>Back to Home</button>
    </div>
  );
};

export default Register;
