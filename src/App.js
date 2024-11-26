import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header  from './components/Header';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/Registration';
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
// import ShiftConfiguration from './components/ShiftConfiguration';



const App = () => {
  return (
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          {/* <Route path="/ShiftConfiguration" element={<ShiftConfiguration/>} /> */}
        </Routes>
      </Router>  
    </div>
  );
};

export default App;