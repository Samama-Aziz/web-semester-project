import "../CSS/Sidebar.css";
import React from 'react';
import logo from '../Images/logo.jpeg'
import { NavLink } from "react-router-dom";
import { Dashboard, AttachMoney, Payment, TrendingUp, AccountBalanceWallet, Assessment, Person, ExitToApp } from '@mui/icons-material';

function App() {
  return (
    <div className="App">
      <div className="sidebar_container">
        <div className="sidebar">
          <div className="profile">
            <NavLink to='/'>
              <img className="Logo"
                src={logo}
                alt="profile_img"
              />
            </NavLink>
          </div>
          <div className="groups">
            <div className="group">
              <NavLink to='/dashboard' className='nav-links'>
                <Dashboard className="icon" style={{ color: 'white' }} /> <span>Dashboard</span>
              </NavLink>
              <NavLink to='/income' className='nav-links'>
                <AttachMoney className="icon" style={{ color: 'white' }} /> <span>Income</span>
              </NavLink>
              <NavLink to='/expenses' className='nav-links'>
                <Payment className="icon" style={{ color: 'white' }} /> <span>Expenses</span>
              </NavLink>
              <NavLink to='/investments' className='nav-links'>
                <TrendingUp className="icon" style={{ color: 'white' }} /> <span>Investments</span>
              </NavLink>
            </div>
            <div className="group">
              <NavLink to='/accounts' className='nav-links'>
                <AccountBalanceWallet className="icon" style={{ color: 'white' }} /><span>Accounts</span>
              </NavLink>
              <NavLink to='/reports' className='nav-links'>
                <Assessment className="icon" style={{ color: 'white' }} /> <span>Reports</span>
              </NavLink>
            </div>
            <div className="group">
              <NavLink to='/Profile' className='nav-links'>
                <Person className="icon" style={{ color: 'white' }} /><span>Profile</span>
              </NavLink>
              <NavLink to='/login' className='nav-links'>
                <ExitToApp className="icon" style={{ color: 'white' }} /> <span>Logout</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;