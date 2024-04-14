import React from 'react';
import Login from "./Component/JSX/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Component/JSX/Dashboard';
import Signup from './Component/JSX/signUp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={ <Login/> } />
        <Route path="/Signup" element={ <> <Signup/> </> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
