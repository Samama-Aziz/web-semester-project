import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../CSS/Shop.css';
import Sidebar from './Sidebar';

const Investments = () => {
    const [toggleState, setToggleState] = useState(1);
    const [investments, setinvestments] = useState([]);
    const [search, setSearch] = useState('');
    const [investmentsId, setinvestmentsId] = useState('');
    const [investmentsData, setinvestmentsData] = useState({
        name: "",
        price: '',
        date: ""
    });
    const [updateinvestmentsData, setUpdateinvestmentsData] = useState({
        _id: "",
        name: "",
        price:'',
        date: ""
    });

    useEffect(() => {
        getinvestmentsData();

    }, []);

    const handleIncomeInputs = (e) => {
        const { name, value } = e.target;
        setinvestmentsData({ ...investmentsData, [name]: value });
    };

    const handleUpdateInputs = (e) => {
        const { name, value } = e.target;
        setUpdateinvestmentsData({ ...updateinvestmentsData, [name]: value });
    };

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
    
            const data = await res.json() ;
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
                body: JSON.stringify({ userid: localStorage.getItem("user") ,searchQuery}),
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
    const addinvestments = async (e) => {
        e.preventDefault();
        try {
            const { name, price, date } = investmentsData;
            const userid = localStorage.getItem("user");
            const res = await fetch('/addinvestments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid, name, price, date })
            });
            const data = await res.json();
            if (res.status === 201) {
                window.alert("Added Successfully");
                setinvestmentsData({ name: "", price: '', date: "" });
                getinvestmentsData();
            } else {
                window.alert("Please fill all the fields properly");
            }
        } catch (err) {
            console.error("Error adding income:", err);
            window.alert("Error occurred while submitting the form");
        }
    };

    const updateinvestments = async (e) => {
        e.preventDefault();
        try {
            const { _id, name, price, date } = updateinvestmentsData;
            const res = await fetch('/updateinvestments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id, name, price, date })
            });
            const data = await res.json();
            if (res.status === 200) {
                window.alert("Updated Successfully");
                setUpdateinvestmentsData({ _id: "", name: "", price: 0, date: "" });
                getinvestmentsData();
            } else if (res.status === 422 || res.status === 406 || !data) {
                window.alert("Error: " + data.message);
            }
        } catch (err) {
            console.error("Error updating income:", err);
            window.alert("Error occurred while submitting the form");
        }
    };

    const deleteinvestments = async (e) => {
        e.preventDefault();
        const _id = investmentsId;
        try {
            const res = await fetch('/deleteinvestments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({_id})
            });
            const data = await res.json();
            if (res.status === 200) {
                window.alert("Deleted Successfully");
                setinvestmentsId("");
                getinvestmentsData();
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
                        <h2>Investments</h2>
                    </div>
                    <div className="navlinks">
                        <button className={toggleState === 1 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(1); }}>Add</button>
                        <button className={toggleState === 2 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(2); getinvestmentsData(); }}>Update</button>
                        <button className={toggleState === 3 ? "active-tabs" : "Tab-btn"} onClick={() => { toggleTab(3); getinvestmentsData(); }}>Delete</button>
                    </div>
                    <div className="content-container">
                        <div className="content">
                            <div className={toggleState === 1 ? "active1" : "non-active1"}>
                                <div className="input-container">
                                    <label htmlFor="name" className='label'>Name<span>*</span></label>
                                    <input type="text" id='name' name='name' autoComplete='off' required placeholder='Enter name' className='text-input' value={investmentsData.name} onChange={handleIncomeInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="price" className='label'>Amount<span>*</span></label>
                                    <input type='number' id='price' name='price' autoComplete='off' required placeholder='Enter amount' className='text-input' value={investmentsData.price} onChange={handleIncomeInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="date" className='label'>Date<span>*</span></label>
                                    <input type="date" id='date' name='date' className='text-input' value={investmentsData.date} onChange={handleIncomeInputs} />
                                </div>
                                <button type="submit" className='submit-btn' onClick={addinvestments}>Add Investment</button>
                            </div>
                            <div className={toggleState === 2 ? "active2" : "non-active1"}>
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

                                <div className="input-container">
                                    <label htmlFor="_id" className='label'>Investment ID<span>*</span></label>
                                    <input type="text" id='_id' name='_id' autoComplete='off' placeholder='Enter investment id'
                                        className='text-input' value={updateinvestmentsData._id} onChange={handleUpdateInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="name" className='label'>
                                        Name<span>*</span></label>
                                    <input type="text" id='name' name='name' autoComplete='off' required placeholder='Enter name'
                                        className='text-input' value={updateinvestmentsData.mote} onChange={handleUpdateInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="price" className='label'>
                                        Amount<span>*</span></label>
                                    <input type='number' id='price' name='price' autoComplete='off' required placeholder='Enter amount'
                                        className='text-input' value={updateinvestmentsData.price} onChange={handleUpdateInputs} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="date" className='label'>Date<span>*</span></label>
                                    <input type="date" id='date' name='date'
                                        className='text-input' value={updateinvestmentsData.date} onChange={handleUpdateInputs} />
                                </div>
                                <button type="submit" className='submit-btn' onClick={updateinvestments}>Update Investment</button>
                            </div>
                            <div className={toggleState === 3 ? "active3" : "non-active1"}>
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
        <td colSpan="5">No expens data available</td>
    </tr>
)}
</tbody>

                                    </table>
                                </div>

                                <div className="input-container">
                                    <label htmlFor="_id" className='label'>Investment ID<span>*</span></label>
                                    <input type="text" id='_id' name='_id' autoComplete='off' placeholder='Enter investment id' className='text-input' value={investmentsId} onChange={(e) => setinvestmentsId(e.target.value)} />
                                </div>
                                <button type="submit" className='submit-btn' onClick={deleteinvestments}>Delete Investment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Investments;
