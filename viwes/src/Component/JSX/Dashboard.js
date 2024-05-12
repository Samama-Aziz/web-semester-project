// import React, { useState,useEffect } from 'react';
import React from 'react';
import Sidebar from './Sidebar';
import '../CSS/Shop.css';


const Dashboard = () => {
    // const [StockData, setStockData] = useState([]);
    // const [SaleData, setSaleData] = useState([]);
    // const [SaleCount, setSaleCount] = useState(0);
    // const [StockNumber, setStockNumber] = useState(0);
    // const [CustomerCount, setCustomerCount] = useState(0);
    // const [TotalInvestment, settotalInvestment] = useState(0);
    // const [TotalReturn, setTotalReturn] = useState(0);
    // const [TotalCredit, setTotalCredit] = useState(0);
    // const [CustomerData, setCustomerData] = useState([]);

    // useEffect(() => {
    //     getnumbersofStock();
    //     getCustomerCount();
    //     getSaleCount();
    //     gettotalInvestment();
    //     getTotalReturn();
    //     getTotalCredit();
    // }, []);
    
    
    //     //---------------------------------------------GET NUMBER OF STOCKS FROM DATABASE-------------------------------------------
    //     const getnumbersofStock = async (e) => {
    //         const res = await fetch('/Stockcount', {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //         });
    //         const Data = await res.json();
    //         setStockNumber(Data);
    
    //     }
    //     //---------------------------------------------GET CUSTOMER COUNT FROM DATABASE-------------------------------------------
    //     const getCustomerCount = async (e) => {
    //         const res = await fetch('/Customercount', {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //         });
    //         const Data = await res.json();
    //         setCustomerCount(Data);
    
    //     }
    //     //---------------------------------------------GET SALE COUNT FROM DATABASE-------------------------------------------
    //     const getSaleCount = async (e) => {
    //         const res = await fetch('/Salecount', {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //         });
    //         const Data = await res.json();
    //         setSaleCount(Data);
    
    //     }
    //     //---------------------------------------------GET TOTAL INVESTMENT FROM DATABASE-------------------------------------------
    //     const gettotalInvestment = async (e) => {
    //         const res = await fetch('/totalInvestment', {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //         });
    //         const Data = await res.json();
    //         settotalInvestment(Data);
    
    //     }
    //     //---------------------------------------------GET TOTAL RETURN FROM DATABASE-------------------------------------------
    //     const getTotalReturn = async (e) => {
    //         const res = await fetch('/TotalReturn', {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //         });
    //         const Data = await res.json();
    //         setTotalReturn(Data);
    
    //     }
    //     //---------------------------------------------GET TOTAL RETURN FROM DATABASE-------------------------------------------
    //     const getTotalCredit = async (e) => {
    //         const res = await fetch('/TotalCredit', {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //         });
    //         const Data = await res.json();
    //         setTotalCredit(Data);
    
    //     }
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


