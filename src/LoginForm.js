import React, { useState } from 'react';
import './utility/style.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shift, setShift] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      // Check if username and password match
      if (userData.username === username && userData.password === password) {
        setShift(userData.shift);
        navigate('/')
        setMessage(`Login successful. You are on the ${userData.shift} shift.`);
      } else {
        setMessage('Invalid credentials');
      }
    } else {
      setMessage('No user found. Please register first.');
    }
  };

  return (
    <div  className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
