import React, { useState } from 'react';
import LoginForm from './LoginForm';

const ShiftComparison = ({ assignedShift }) => {
  const [currentShift, setCurrentShift] = useState('');
  const [message, setMessage] = useState('');

  const getCurrentShift = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) {
      setCurrentShift('Morning');
    } else if (hour >= 14 && hour < 22) {
      setCurrentShift('Afternoon');
    } else {
      setCurrentShift('Night');
    }
  };

  const compareShifts = () => {
    getCurrentShift();
    if (assignedShift === currentShift) {
      setMessage(`You are on the correct shift: ${assignedShift}`);
    } else {
      setMessage(`You should be working the ${currentShift} shift, but you are assigned to the ${assignedShift} shift.`);
    }
  };

  return (
    <div>
      <h2>Shift Comparison</h2>
      <button onClick={compareShifts}>Check Your Shift</button>
      {message && <p>{message}</p>}
    </div>
  );
};

const LoginPage = () => {
  const [shift, setShift] = useState('');

  const handleLoginSuccess = (shift) => {
    setShift(shift);
  };

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
      {shift && <ShiftComparison assignedShift={shift} />}
    </div>
  );
};

export default LoginPage;
