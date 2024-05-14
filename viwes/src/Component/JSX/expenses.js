import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../CSS/Shop.css';
import Sidebar from './Sidebar';

const Expenses = () => {
    const [toggleState, setToggleState] = useState(1);
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState('');
    const [expensesId, setExpensesId] = useState('');
    const [expensesData, setExpensesData] = useState({
        note: "",
        price: '',
        date: ""
    });
    const [updateexpensesData, setUpdateExpensesData] = useState({
        _id: "",
        note: "",
        price:'',
        date: ""
    });

    useEffect(() => {
        getexpensesData();

    }, []);

    const handleIncomeInputs = (e) => {
        const { name, value } = e.target;
        setExpensesData({ ...expensesData, [name]: value });
    };

    const handleUpdateInputs = (e) => {
        const { name, value } = e.target;
        setUpdateExpensesData({ ...updateexpensesData, [name]: value });
    };

    const toggleTab = (index) => {
        setToggleState(index);
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
    
            const data = await res.json() ;
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
                body: JSON.stringify({ userid: localStorage.getItem("user") ,searchQuery}),
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
    const addexpenses = async (e) => {
        e.preventDefault();
        try {
            const { note, price, date } = expensesData;
            const userid = localStorage.getItem("user");
            const res = await fetch('/addexpenses', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid, note, price, date })
            });
            const data = await res.json();
            if (res.status === 201) {
                window.alert("Added Successfully");
                setExpensesData({ note: "", price: '', date: "" });
                getexpensesData();
            } else {
                window.alert("Please fill all the fields properly");
            }
        } catch (err) {
            console.error("Error adding income:", err);
            window.alert("Error occurred while submitting the form");
        }
    };

    const updateexpenses = async (e) => {
        e.preventDefault();
        try {
            const { _id, note, price, date } = updateexpensesData;
            const res = await fetch('/updateexpenses', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id, note, price, date })
            });
            const data = await res.json();
            if (res.status === 200) {
                window.alert("Updated Successfully");
                setUpdateExpensesData({ _id: "", note: "", price: 0, date: "" });
                getexpensesData();
            } else if (res.status === 422 || res.status === 406 || !data) {
                window.alert("Error: " + data.message);
            }
        } catch (err) {
            console.error("Error updating income:", err);
            window.alert("Error occurred while submitting the form");
        }
    };

    const deleteexpenses = async (e) => {
        e.preventDefault();
        const _id = expensesId;
        try {
            const res = await fetch('/deleteexpenses', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({_id})
            });
            const data = await res.json();
            if (res.status === 200) {
                window.alert("Deleted Successfully");
                setExpensesId("");
                getexpensesData();
            } else if (res.status === 422 || res.status === 400 || !data) {
                window.alert("Error: " + data.message);
            }
        } catch (err) {
            console.error("Error deleting income:", err);
            window.alert("Error occurred while submitting the form");
        }
    };

    return (
        <>
            <div className="main">
                <Sidebar />
                <div className="pagedata">
                    <div className="title">
                        <h2>Expenses</h2>
                    </div>
                    <div className="navlinks">
                        <button className={toggleState === 1 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(1); }}>Add</button>
                        <button className={toggleState === 2 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(2); getexpensesData(); }}>Update</button>
                        <button className={toggleState === 3 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(3); getexpensesData(); }}>Delete</button>
                    </div>
                    <div className="content-container">
                        <div className="content">
                            <div className={toggleState === 1 ? "active1" : "non-active1"}>
                                <div className="input-container">
                                    <label htmlFor="note" className='label'>Note<span>*</span></label>
                                    <input type="text" id='note' name='note' autoComplete='off' required placeholder='Enter note' className='text-input' value={expensesData.note} onChange={handleIncomeInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="price" className='label'>Amount<span>*</span></label>
                                    <input type='number' id='price' name='price' autoComplete='off' required placeholder='Enter amount' className='text-input' value={expensesData.price} onChange={handleIncomeInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="date" className='label'>Date<span>*</span></label>
                                    <input type="date" id='date' name='date' className='text-input' value={expensesData.date} onChange={handleIncomeInputs} />
                                </div>
                                <button type="submit" className='submit-btn' onClick={addexpenses}>Add Expens</button>
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
        <td colSpan="5">No   data available</td>
    </tr>
)}
</tbody>
                                    </table>
                                </div>

                                <div className="input-container">
                                    <label htmlFor="_id" className='label'>Expens ID<span>*</span></label>
                                    <input type="text" id='_id' name='_id' autoComplete='off' placeholder='Enter expens id'
                                        className='text-input' value={updateexpensesData._id} onChange={handleUpdateInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="note" className='label'>
                                        Note<span>*</span></label>
                                    <input type="text" id='note' name='note' autoComplete='off' required placeholder='Enter note'
                                        className='text-input' value={updateexpensesData.mote} onChange={handleUpdateInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="price" className='label'>
                                        Amount<span>*</span></label>
                                    <input type='number' id='price' name='price' autoComplete='off' required placeholder='Enter amount'
                                        className='text-input' value={updateexpensesData.price} onChange={handleUpdateInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="date" className='label'>Date<span>*</span></label>
                                    <input type="date" id='date' name='date'
                                        className='text-input' value={updateexpensesData.date} onChange={handleUpdateInputs} />
                                </div>
                                <button type="submit" className='submit-btn' onClick={updateexpenses}>Update Expens</button>
                            </div>
                            <div className={toggleState === 3 ? "active3" : "non-active1"}>
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
        <td colSpan="5">No expens data available</td>
    </tr>
)}
</tbody>

                                    </table>
                                </div>

                                <div className="input-container">
                                    <label htmlFor="_id" className='label'>Expens ID<span>*</span></label>
                                    <input type="text" id='_id' name='_id' autoComplete='off' placeholder='Enter expens id' className='text-input' value={expensesId} onChange={(e) => setExpensesId(e.target.value)} />
                                </div>
                                <button type="submit" className='submit-btn' onClick={deleteexpenses}>Delete Expens</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Expenses;
