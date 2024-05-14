import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../CSS/Shop.css';
import Sidebar from './Sidebar';
import { Navigate } from 'react-router-dom';

const Admin = () => {
    const [toggleState, setToggleState] = useState(1);
    const [investments, setinvestments] = useState([]);
    const [income, setincome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [users, setusers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if(localStorage.getItem("user") === "6641c1625e1786ab3e7924dd"){
        getusersdata();
        getinvestmentsData();
        getincomeData();
        getusersdata();
        }
        else{
            alert("You are not authorized to view this page");
            Navigate("/dashboard");
        }
    }, []);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getusersdata = async () => {
        try {
            const res = await fetch('/users', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setusers(data);
            setSearch("");
        } catch (err) {
            console.error("Error fetching users data:", err);
        }
    };
            
        const getuserssearchdata = async () => {
            try {
                let searchQuery = search;
                const res = await fetch('/searchUsers', {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                body: JSON.stringify({searchQuery}),

                });
                if(!res.ok){
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setusers(data);
                setSearch("");
            } catch (err) {
                console.error("Error fetching users data:", err);
            }
        };
    const getinvestmentsData = async () => {
        try {
            const res = await fetch('/investments', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setinvestments(data);
            setSearch("");
        } catch (err) {
            console.error("Error fetching income data:", err);
        }
    };
    const getSearchinvestmentsData = async () => {
        try {
            const searchQuery = search;
            const res = await fetch('/searchInvestments', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ searchQuery }),
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
            const res = await fetch('/income', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setincome(data);
            setSearch("");
        } catch (err) {
            console.error("Error fetching income data:", err);
        }
    };
    const getSearchIncomeData = async () => {
        try {
            const searchQuery = search;
            const res = await fetch('/searchIncome', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ searchQuery }),
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
            const res = await fetch('/expenses', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setExpenses(data);
            setSearch("");
        } catch (err) {
            console.error("Error fetching income data:", err);
        }
    };
    const getSearchexpensesData = async () => {
        try {
            const searchQuery = search;
            const res = await fetch('/searchExpenses', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({searchQuery }),
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
                        <h2>admin dashboard</h2>
                    </div>
                    <div className="navlinks">
                        <button className={toggleState === 1 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(1); getusersdata(); }}>Users</button>
                        <button className={toggleState === 2 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(2); getincomeData(); }}>Income</button>
                        <button className={toggleState === 3 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(3); getexpensesData(); }}>Expenses</button>
                        <button className={toggleState === 4 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(4); getinvestmentsData(); }}>Investments</button>
                    </div>
                    <div className="content-container">
                        <div className="content">
                            <div className={toggleState === 1 ? "active2" : "non-active1"}>
                                <div className="search_bar">
                                    <input type="text" className='search' name='search' value={search} onChange={(e) => setSearch(e.target.value)} autoComplete='off' placeholder='Search..' />
                                    <button className='search_btn' onClick={getuserssearchdata}><SearchIcon /></button>
                                </div>
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users === undefined ? (
                                                <tr>
                                                    <td colSpan="5">Loading...</td>
                                                </tr>
                                            ) : users.length > 0 ? (
                                                users.map((element, index) => (
                                                    <tr key={index}>
                                                        <td>{element._id}</td>
                                                        <td>{element.Name}</td>
                                                        <td>{element.phone}</td>
                                                        <td>{element.email}</td>
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
                            <div className={toggleState === 3 ? "active2" : "non-active1"}>
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
                            <div className={toggleState === 4 ? "active2" : "non-active1"}>
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
export default Admin;
