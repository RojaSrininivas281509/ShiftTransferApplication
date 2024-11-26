import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header  from './Header';
import Login from './Login';


function App() {
  return (
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
