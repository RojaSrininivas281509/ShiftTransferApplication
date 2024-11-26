import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header  from './Header';
import LoginForm from './LoginForm';
import RegistrationForm from './Registration';
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";



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
        </Routes>
      </Router>  
    </div>
  );
};

export default App;