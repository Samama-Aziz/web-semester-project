import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../CSS/Shop.css';

const Dashboard = () => {
    const [totalincome, settotleincome] = useState(0);
    const [totalexpenses, settotalexpenses] = useState(0);
    const [totalinvestments, settotalinvestments] = useState(0);
    useEffect(() => {
        gettotalincome();
        gettotalexpenses();
        gettotalinvestments();
        console.log("totalincome", totalincome);
        console.log("totalexpenses", totalexpenses);
        console.log("totalinvestments", totalinvestments);
    }, []);

    const gettotalincome = async () => {
        let result = await fetch("/totalincome"
            , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ userid: localStorage.getItem("user") })
            });
        result = await result.json();
        settotleincome(result);
    }
    const gettotalexpenses = async () => {
        let result = await fetch("/totalexpenses"
            , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ userid: localStorage.getItem("user") })
            });
        result = await result.json();
        settotalexpenses(result);
    }
    const gettotalinvestments = async () => {
        let result = await fetch("/totalinvestments"
            , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ userid: localStorage.getItem("user") })
            });
        result = await result.json();
        settotalinvestments(result);
    }

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
                                Rs.{totalincome?totalincome:0}
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
                                Rs.{totalexpenses?totalexpenses:0}
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
                                Rs.{totalinvestments?totalinvestments:0}
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
                                Rs.{totalincome - (totalexpenses+ totalinvestments)}

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


