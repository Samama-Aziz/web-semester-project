import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import '../CSS/Shop.css';

const Income = () => {
    const [toggleState, setToggleState] = useState(1);
    const [Income, setIncome] = useState([]);
    const [search, setSearch] = useState('');
    const [incomeId, setIncomeId] = useState('');
    const [incomeData, setIncomeData] = useState({
        Income_Source: "",
        price: '',
        date: ""
    });
    const [updateIncomeData, setUpdateIncomeData] = useState({
        _id: "",
        Income_Source: "",
        price:'',
        date: ""
    });

    useEffect(() => {
        getIncomeData();

    }, []);

    const handleIncomeInputs = (e) => {
        const { name, value } = e.target;
        setIncomeData({ ...incomeData, [name]: value });
    };

    const handleUpdateInputs = (e) => {
        const { name, value } = e.target;
        setUpdateIncomeData({ ...updateIncomeData, [name]: value });
    };

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getIncomeData = async () => {
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
    
            const data = await res.json() ;
            setIncome(data);
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
                body: JSON.stringify({ userid: localStorage.getItem("user") ,searchQuery}),
            });
    
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const data = await res.json();
            setIncome(data);
            setSearch("");  
        } catch (err) {
            console.error("Error fetching search income data:", err);
        }
    };
    const addIncome = async (e) => {
        e.preventDefault();
        try {
            const { Income_Source, price, date } = incomeData;
            const userid = localStorage.getItem("user");
            const res = await fetch('/addincome', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid, Income_Source, price, date })
            });
            const data = await res.json();
            if (res.status === 201) {
                window.alert("Added Successfully");
                setIncomeData({ Income_Source: "", price: '', date: "" });
                getIncomeData();
            } else {
                window.alert("Please fill all the fields properly");
            }
        } catch (err) {
            console.error("Error adding income:", err);
            window.alert("Error occurred while submitting the form");
        }
    };

    const updateIncome = async (e) => {
        e.preventDefault();
        try {
            const { _id, Income_Source, price, date } = updateIncomeData;
            const res = await fetch('/updateincome', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id, Income_Source, price, date })
            });
            const data = await res.json();
            if (res.status === 200) {
                window.alert("Updated Successfully");
                setUpdateIncomeData({ _id: "", Income_Source: "", price: 0, date: "" });
                getIncomeData();
            } else if (res.status === 422 || res.status === 406 || !data) {
                window.alert("Error: " + data.message);
            }
        } catch (err) {
            console.error("Error updating income:", err);
            window.alert("Error occurred while submitting the form");
        }
    };

    const deleteIncome = async (e) => {
        e.preventDefault();
        const _id = incomeId;
        try {
            const res = await fetch('/deleteincome', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({_id})
            });
            const data = await res.json();
            if (res.status === 200) {
                window.alert("Deleted Successfully");
                setIncomeId("");
                getIncomeData();
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
                        <h2>Income</h2>
                    </div>
                    <div className="navlinks">
                        <button className={toggleState === 1 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(1); }}>Add</button>
                        <button className={toggleState === 2 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(2); getIncomeData(); }}>Update</button>
                        <button className={toggleState === 3 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(3); getIncomeData(); }}>Delete</button>
                    </div>
                    <div className="content-container">
                        <div className="content">
                            <div className={toggleState === 1 ? "active1" : "non-active1"}>
                                <div className="input-container">
                                    <label htmlFor="Income_Source" className='label'>Income Source<span>*</span></label>
                                    <input type="text" id='Income_Source' name='Income_Source' autoComplete='off' required placeholder='Enter income source' className='text-input' value={incomeData.Income_Source} onChange={handleIncomeInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="price" className='label'>Amount<span>*</span></label>
                                    <input type='number' id='price' name='price' autoComplete='off' required placeholder='Enter amount' className='text-input' value={incomeData.price} onChange={handleIncomeInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="date" className='label'>Date<span>*</span></label>
                                    <input type="date" id='date' name='date' className='text-input' value={incomeData.date} onChange={handleIncomeInputs} />
                                </div>
                                <button type="submit" className='submit-btn' onClick={addIncome}>Add Income</button>
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
                                        {Income === undefined ? (
    <tr>
        <td colSpan="5">Loading...</td>
    </tr>
) : Income.length > 0 ? (
    Income.map((element, index) => (
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
        <td colSpan="5">No income data available</td>
    </tr>
)}
</tbody>
                                    </table>
                                </div>

                                <div className="input-container">
                                    <label htmlFor="_id" className='label'>Income ID<span>*</span></label>
                                    <input type="text" id='_id' name='_id' autoComplete='off' placeholder='Enter icome id'
                                        className='text-input' value={updateIncomeData._id} onChange={handleUpdateInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="Income_Source" className='label'>
                                        Income Source<span>*</span></label>
                                    <input type="text" id='Income_Source' name='Income_Source' autoComplete='off' required placeholder='Enter source'
                                        className='text-input' value={updateIncomeData.Income_Source} onChange={handleUpdateInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="price" className='label'>
                                        Amount<span>*</span></label>
                                    <input type='number' id='price' name='price' autoComplete='off' required placeholder='Enter amount'
                                        className='text-input' value={updateIncomeData.price} onChange={handleUpdateInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="date" className='label'>Date<span>*</span></label>
                                    <input type="date" id='date' name='date'
                                        className='text-input' value={updateIncomeData.date} onChange={handleUpdateInputs} />
                                </div>
                                <button type="submit" className='submit-btn' onClick={updateIncome}>Update Income</button>
                            </div>
                            <div className={toggleState === 3 ? "active3" : "non-active1"}>
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
                                        {Income === undefined ? (
    <tr>
        <td colSpan="5">Loading...</td>
    </tr>
) : Income.length > 0 ? (
    Income.map((element, index) => (
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
        <td colSpan="5">No income data available</td>
    </tr>
)}
</tbody>

                                    </table>
                                </div>

                                <div className="input-container">
                                    <label htmlFor="_id" className='label'>Income ID<span>*</span></label>
                                    <input type="text" id='_id' name='_id' autoComplete='off' placeholder='Enter income id' className='text-input' value={incomeId} onChange={(e) => setIncomeId(e.target.value)} />
                                </div>
                                <button type="submit" className='submit-btn' onClick={deleteIncome}>Delete Income</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Income;
