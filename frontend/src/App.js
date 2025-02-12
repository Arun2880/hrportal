


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Main from "./components/Main";
import Login from "./Pages/Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/*' element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;