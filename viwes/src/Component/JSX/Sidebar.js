import "../CSS/Sidebar.css";
import React from 'react';
import { AccountBalanceWalletRounded, AttachMoneyRounded, DashboardRounded, MonetizationOnRounded, PaymentRounded, TrendingUpRounded, AssessmentRounded } from '@mui/icons-material';
import logo from '../Images/IMG_3028.JPG'
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="sidebar_container">
        {/* sidebar div */}
        <div className="sidebar">
          {/* profile */}
          <div className="profile">
            <NavLink to='/'>
              <img className="Logo"
                src={logo}
                alt="profile_img"
              />
            </NavLink>
          </div>
          {/* groups */}
          <div className="groups">
            {/* group 1 */}
            <div className="group">
              <NavLink to='/dashboard' className='nav-links'>
                <DashboardRounded className="icon" style={{ color: 'white' }} /> <span>Dashboard</span>
              </NavLink>
              <NavLink to='/income' className='nav-links'>
                <AttachMoneyRounded className="icon" style={{ color: 'white' }} /> <span>Income</span>
              </NavLink>
              <NavLink to='/expenses' className='nav-links'>
                <PaymentRounded className="icon" style={{ color: 'white' }} /> <span>Expenses</span>
              </NavLink>
              <NavLink to='/investments' className='nav-links'>
                <TrendingUpRounded className="icon" style={{ color: 'white' }} /> <span>Investments</span>
              </NavLink>
            </div>
            {/* group 2 */}
            <div className="group">
              <NavLink to='/accounts' className='nav-links'>
                <AccountBalanceWalletRounded className="icon" style={{ color: 'white' }} /><span>Accounts</span>
              </NavLink>
              <NavLink to='/budget' className='nav-links'>
                <MonetizationOnRounded className="icon" style={{ color: 'white' }} /> <span>Budget</span>
              </NavLink>
              <NavLink to='/reports' className='nav-links'>
                <AssessmentRounded className="icon" style={{ color: 'white' }} /> <span>Reports</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
