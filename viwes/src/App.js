import React from 'react';
import Login from "./Component/JSX/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Component/JSX/Dashboard';
import Signup from './Component/JSX/signUp';
import Profile from './Component/JSX/Profile';
import 'bootstrap/dist/css/bootstrap.css';
import Income from '../src/Component/JSX/Income';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={ <Login/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/Signup" element={ <> <Signup/> </> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/profile" element={ <Profile/> } />
        <Route path="/income" element={ <Income/> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
