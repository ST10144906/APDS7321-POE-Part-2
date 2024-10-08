// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactionform" element={<TransactionForm />} />

      </Routes>
    </Router>
  );
};

export default App;
