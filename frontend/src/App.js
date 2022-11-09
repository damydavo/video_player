import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/register';
import Home from './pages/home';
import Login from './pages/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Router>
      <ToastContainer />
    </>

  );
}

export default App;