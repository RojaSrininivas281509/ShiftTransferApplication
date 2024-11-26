import React, { useState } from 'react';
import './utility/registration.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shift, setShift] = useState('Morning');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to validate the password
  const validatePassword = (password) => {
    const minLength = 6;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    if (password.length < minLength) {
      return 'Password must be at least 6 characters long.';
    }
    if (!specialCharPattern.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error state
    setError('');

    // Check if all fields are filled
    if (!username || !password) {
      setError('All fields are required.');
      return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check if the username already exists in localStorage
    const existingUser = JSON.parse(localStorage.getItem('userData'));
    if (existingUser && existingUser.username === username) {
      setError('Username already exists.');
      return;
    }

    // Save user data in localStorage
    const userData = { username, password, shift };
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate('/login')

    // Clear form and show success message
    setUsername('');
    setPassword('');
    setMessage('User registered successfully!');
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>
        <div  className='form-group'>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <div className='form-group'>
          <label>Shift: </label>
          <select value={shift} onChange={(e) => setShift(e.target.value)}>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default RegistrationForm;
