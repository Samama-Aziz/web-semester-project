import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../CSS/Shop.css';
import Sidebar from './Sidebar';

const Investments = () => {
    const [toggleState, setToggleState] = useState(1);
    const [investments, setinvestments] = useState([]);
    const [income, setincome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getinvestmentsData();
        getincomeData();
        getexpensesData();

    }, []);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getinvestmentsData = async () => {
        try {
            const res = await fetch('/getinvestments', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid: localStorage.getItem("user") }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setinvestments(data);
        } catch (err) {
            console.error("Error fetching income data:", err);
        }
    };
    const getSearchinvestmentsData = async () => {
        try {
            const searchQuery = search;
            const res = await fetch('/searchinvestmentsdata', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid: localStorage.getItem("user"), searchQuery }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setinvestments(data);
            setSearch("");
        } catch (err) {
            console.error("Error fetching search income data:", err);
        }
    };

    const getincomeData = async () => {
        try {
            const res = await fetch('/getincome', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid: localStorage.getItem("user") }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setincome(data);
        } catch (err) {
            console.error("Error fetching income data:", err);
        }
    };
    const getSearchIncomeData = async () => {
        try {
            const searchQuery = search;
            const res = await fetch('/searchIncomedata', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid: localStorage.getItem("user"), searchQuery }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setincome(data);
            setSearch("");
        } catch (err) {
            console.error("Error fetching search income data:", err);
        }
    };

    const getexpensesData = async () => {
        try {
            const res = await fetch('/getexpenses', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid: localStorage.getItem("user") }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setExpenses(data);
        } catch (err) {
            console.error("Error fetching income data:", err);
        }
    };
    const getSearchexpensesData = async () => {
        try {
            const searchQuery = search;
            const res = await fetch('/searchexpensesdata', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid: localStorage.getItem("user"), searchQuery }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setExpenses(data);
            setSearch("");
        } catch (err) {
            console.error("Error fetching search income data:", err);
        }
    };

    return (
        <>
            <div className="main">
                <Sidebar />
                <div className="pagedata">
                    <div className="title">
                        <h2>Records</h2>
                    </div>
                    <div className="navlinks">
                        <button className={toggleState === 1 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(1); getincomeData(); }}>Income</button>
                        <button className={toggleState === 2 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(2); getexpensesData(); }}>Expenses</button>
                        <button className={toggleState === 3 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(3); getinvestmentsData(); }}>Investments</button>
                    </div>
                    <div className="content-container">
                        <div className="content">
                            <div className={toggleState === 1 ? "active2" : "non-active1"}>
                                <div className="search_bar">
                                    <input type="text" className='search' name='search' value={search} onChange={(e) => setSearch(e.target.value)} autoComplete='off' placeholder='Search..' />
                                    <button className='search_btn' onClick={getSearchIncomeData}><SearchIcon /></button>
                                </div>
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>User ID</th>
                                                <th>Source</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {income === undefined ? (
                                                <tr>
                                                    <td colSpan="5">Loading...</td>
                                                </tr>
                                            ) : income.length > 0 ? (
                                                income.map((element, index) => (
                                                    <tr key={index}>
                                                        <td>{element._id}</td>
                                                        <td>{element.userid}</td>
                                                        <td>{element.Income_Source}</td>
                                                        <td>Rs.{element.price}</td>
                                                        <td>{element.date}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">No data available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={toggleState === 2 ? "active2" : "non-active1"}>
                                <div className="search_bar">
                                    <input type="text" className='search' name='search' value={search} onChange={(e) => setSearch(e.target.value)} autoComplete='off' placeholder='Search..' />
                                    <button className='search_btn' onClick={getSearchexpensesData}><SearchIcon /></button>
                                </div>
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>User ID</th>
                                                <th>Note</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {expenses === undefined ? (
                                                <tr>
                                                    <td colSpan="5">Loading...</td>
                                                </tr>
                                            ) : expenses.length > 0 ? (
                                                expenses.map((element, index) => (
                                                    <tr key={index}>
                                                        <td>{element._id}</td>
                                                        <td>{element.userid}</td>
                                                        <td>{element.note}</td>
                                                        <td>Rs.{element.price}</td>
                                                        <td>{element.date}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">No data available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={toggleState === 3 ? "active2" : "non-active1"}>
                                <div className="search_bar">
                                    <input type="text" className='search' name='search' value={search} onChange={(e) => setSearch(e.target.value)} autoComplete='off' placeholder='Search..' />
                                    <button className='search_btn' onClick={getSearchinvestmentsData}><SearchIcon /></button>
                                </div>
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>User ID</th>
                                                <th>Name</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {investments === undefined ? (
                                                <tr>
                                                    <td colSpan="5">Loading...</td>
                                                </tr>
                                            ) : investments.length > 0 ? (
                                                investments.map((element, index) => (
                                                    <tr key={index}>
                                                        <td>{element._id}</td>
                                                        <td>{element.userid}</td>
                                                        <td>{element.name}</td>
                                                        <td>Rs.{element.price}</td>
                                                        <td>{element.date}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">No data available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Investments;
