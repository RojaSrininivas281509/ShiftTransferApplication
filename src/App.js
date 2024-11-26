import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header  from './Header';
import LoginForm from './LoginForm';
import RegistrationForm from './Registration';


function App() {
  return (
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
