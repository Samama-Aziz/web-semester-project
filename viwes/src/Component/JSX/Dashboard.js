import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../CSS/Shop.css';

const Dashboard = () => {
    const navigate = useNavigate();


    return (
        <div className="main">
            <Sidebar />
            <div className="pagedata">
                <div className="title">
                    <h2>Pasia Care</h2>
                </div>
                {/* <div className="card-row"> */}
                <div class="ag-courses_box">

                    <div class="ag-courses_item">
                        <div class="ag-courses-item_link">
                            <div class="ag-courses-item_bg"></div>

                            <div class="ag-courses-item_title">
                                <h1>Total Income</h1>
                            </div>

                            <div class="ag-courses-item_date-box">
                                <h2 class="ag-courses-item_date">
                                Rs.15000
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="ag-courses_item">
                        <div class="ag-courses-item_link">
                            <div class="ag-courses-item_bg"></div>

                            <div class="ag-courses-item_title">
                                <h1>Total Expense</h1>
                            </div>

                            <div class="ag-courses-item_date-box">
                                <h2 class="ag-courses-item_date">
                                Rs.2500
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="ag-courses_item">
                        <div class="ag-courses-item_link">
                            <div class="ag-courses-item_bg" id></div>

                            <div class="ag-courses-item_title">
                                <h1>Total Investment</h1>
                            </div>

                            <div class="ag-courses-item_date-box">
                                <h2 class="ag-courses-item_date">
                                Rs.3500
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="ag-courses_item">
                        <div class="ag-courses-item_link">
                            <div class="ag-courses-item_bg"></div>

                            <div class="ag-courses-item_title">
                                <h1>Total Balance</h1>
                            </div>

                            <div class="ag-courses-item_date-box">
                                <h2 class="ag-courses-item_date">
                                    Rs.14520
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


