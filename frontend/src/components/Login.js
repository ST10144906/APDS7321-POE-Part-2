import React, { useState, useContext } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (res.data.userId && res.data.role) {
        setUser({ userId: res.data.userId, role: res.data.role });
        alert(res.data.msg || 'Login successful');
        navigate('/dashboard');
      } else {
        alert('Error: Incomplete server response.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Login failed. Please try again.';
      alert('Error: ' + errorMessage);
      console.log(err);
    }
  };

  const goBackToHome = () => {
    navigate('/'); 
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
