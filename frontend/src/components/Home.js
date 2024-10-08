import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to our customer portal</h1>
      <p>Please sign in or create an account to continue.</p>
      <div className="home-buttons">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/register" className="btn btn-success">Register</Link>
      </div>
    </div>
  );
};

export default Home; 
