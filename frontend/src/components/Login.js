import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { userId, role, message } = res.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);

      alert(message);
      navigate('/dashboard'); 
    } catch (err) {
      alert('Error: ' + err.response.data.msg);
    }
  };

  const goBackToHome = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <div className="form-container" >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <lable style={{ color: 'blue' }} onClick={() => navigate('/register')}>Register Now</lable>
      </p>
      <button className="back-button" onClick={goBackToHome}>Back to Home</button>
    </div>
  );
};

export default Login;
