const express = require('express');
const Routers = express.Router();
const income = require('./models/Income');
const expenses = require('./models/expenses');
const investments = require('./models/Investments');
const bcrypt = require('bcrypt');
const User = require('./models/User');

//get all users
Routers.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

//make search for users
Routers.post('/searchUsers', async (req, res) => {
    const { searchQuery } = req.body;

    // Validate input data
    if (!searchQuery) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        let users;
        if (searchQuery) {
            users = await User.find({
                $or: [
                    { Name: { $regex: searchQuery, $options: 'i' } },
                    { email: { $regex: searchQuery, $options: 'i' } },
                    { phone: { $regex: searchQuery, $options: 'i' } },
                ]
            });
        } else {
            users = await User.find({});
        }
        
        res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
//get all income
Routers.get('/income', async (req, res) => {
    try {
        const Incomes = await income.find();
        res.status(200).json(Incomes);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
//get all expenses
Routers.get('/expenses', async (req, res) => {
    try {
        const Expenses = await expenses.find();
        res.status(200).json(Expenses);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
//get all investments
Routers.get('/investments', async (req, res) => {
    try {
        const Investments = await investments.find();
        res.status(200).json(Investments);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
//income search 
Routers.post('/searchIncome', async (req, res) => {
    const { searchQuery } = req.body;

    // Validate input data
    if (!searchQuery) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        let IncomeData;
        if (searchQuery) {
            IncomeData = await income.find({
                $or: [
                    { Income_Source: { $regex: searchQuery, $options: 'i' } },
                    { date: { $regex: searchQuery, $options: 'i' } },

                ]
            }).sort({_id: -1});
        } else {
            IncomeData = await income.find({}).sort({_id: -1});
        }
        
        res.json(IncomeData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//search expenses
Routers.post('/searchExpenses', async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try{
        let ExpensesData;
        if (searchQuery) {
            ExpensesData = await expenses.find({
                $or: [
                    { note: { $regex: searchQuery, $options: 'i' } },
                    { date: { $regex: searchQuery, $options: 'i' } },
                ]
            }).sort({_id: -1});
        } else {
            ExpensesData = await expenses.find({}).sort({_id: -1});
        }
        res.json(ExpensesData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
        
    }
});
//search investments
Routers.post('/searchInvestments', async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try{
        let InvestmentsData;
        if (searchQuery) {
            InvestmentsData = await investments.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { date: { $regex: searchQuery, $options: 'i' } },
                ]
            }).sort({_id: -1});
        }
        else {
            InvestmentsData = await investments.find({}).sort({_id: -1});
        }
        res.json(InvestmentsData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// -----------------------------------------Profile---------------------------------------------

Routers.post('/Profileupdate', async (req, res) => {
  try {
    const { _id, Name, email,profilePic, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      _id,
      { Name, email, profilePic, phone },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// const authentication = require('./middleware/authentication');

// Routers.get('/dashboard',authentication, (req, res) => {
//     console.log('Hello Dashboard');
//     res.send(req.user);
// });

Routers.post('/Registration', async (req, res) => {
    try {
        const { Name, email, password } = req.body;
        if (!Name || !email || !password) {
            return res.status(422).json({ error: "Please fill all the fields properly" });
        }
        if (password.length < 8) {
            return res.status(422).json({ error: "Password length should be greater than 8" });
        }
        if(email.includes('@') === false || email.includes('.') === false){
            return res.status(422).json({ error: "Invalid Email" });
        }
        const userExist = await User.findOne({ email: email });

        if(userExist) {
            return res.status(422).json({ error: "Email already exists" });
        } else {
            const user = new User({ Name: Name, email: email, password: password });
            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

// -----------------------------------------Login---------------------------------------------


Routers.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await User.findOne({ email });
        if (!userLogin) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
        
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });
        res.status(200).json({ userId: userLogin._id });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// -----------------------------------------Get Data---------------------------------------------
Routers.post('/getdata', async (req, res) => { // Changed method to POST since you're sending data in the body
    try {
        const _id = req.body._id;
        const user = await User.findById(_id);
        if (!user) { // Added a check for user existence
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// -----------------------------------------Income---------------------------------------------
// -----------------------------------------Add Income---------------------------------------------

Routers.post('/addincome', async (req, res) => {
    let { userid, Income_Source, price, date } = req.body;

    if (!userid || !Income_Source || !price || !date) {
        return res.status(422).json({ error: "Please fill all the fields properly" });
    }
    try {
        const Income = new income({ userid, Income_Source, price, date });
        await Income.save();
        return res.status(201).json({ message: "Income added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Update Income---------------------------------------------

Routers.post('/updateincome', async (req, res) => {
    try {
        const { _id, Income_Source, price, date } = req.body;
        const Income = await income
            .findByIdAndUpdate(_id,
                { Income_Source, price, date },
                { new: true });
        if (!Income) {
            return res.status(404).json({ error: "Income not found" });
        }
        res.status(200).json(Income);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Delete Income---------------------------------------------

Routers.post('/deleteincome', async (req, res) => {
    try {
        const { _id } = req.body;
        const Income = await income.findByIdAndDelete(_id);
        if (!Income) {
            return res.status(404).json({ error: "Income not found" });
        }
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Get Income---------------------------------------------
Routers.post('/getincome', async (req, res) => {
    try {
        const {userid} = req.body;
        const Income = await income.find({userid}).sort({_id:-1});
        if (!Income) {
            return res.status(404).json({ error: "Income not found" });
        }
        res.status(200).json(Income);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

//------------------------------GET INCOME DATA ACCORDING TO SEARCH --------------------------------------------
Routers.post('/searchIncomedata', async (req, res) => {
    const { userid, searchQuery } = req.body;

    // Validate input data
    if (!userid || !searchQuery) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        let IncomeData;
        if (searchQuery) {
            IncomeData = await income.find({
                userid: userid,
                $or: [
                    { Income_Source: { $regex: searchQuery, $options: 'i' } },
                    { date: { $regex: searchQuery, $options: 'i' } },
                ]
            }).sort({_id: -1});
        } else {
            IncomeData = await income.find({ userid: userid }).sort({_id: -1});
        }
        
        res.json(IncomeData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// -----------------------------------------Expenses---------------------------------------------
// -----------------------------------------Add Expenses---------------------------------------------

Routers.post('/addexpenses', async (req, res) => {
    let { userid, note, price, date } = req.body;

    if (!userid || !note || !price || !date) {
        return res.status(422).json({ error: "Please fill all the fields properly" });
    }
    try {
        const Expenses = new expenses({ userid, note, price, date });
        await Expenses.save();
        return res.status(201).json({ message: "expens added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Update expenses---------------------------------------------

Routers.post('/updateexpenses', async (req, res) => {
    try {
        const { _id, note, price, date } = req.body;
        const Expenses = await expenses
            .findByIdAndUpdate(_id,
                { note, price, date },
                { new: true });
        if (!Expenses) {
            return res.status(404).json({ error: "Expens not found" });
        }
        res.status(200).json(Expenses);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Delete Expenses---------------------------------------------

Routers.post('/deleteexpenses', async (req, res) => {
    try {
        const { _id } = req.body;
        const Expenses = await expenses.findByIdAndDelete(_id);
        if (!Expenses) {
            return res.status(404).json({ error: "Expens not found" });
        }
        res.status(200).json({ message: "Expens deleted successfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Get Expenses---------------------------------------------
Routers.post('/getexpenses', async (req, res) => {
    try {
        const {userid} = req.body;
        const Expenses = await expenses.find({userid}).sort({_id:-1});
        if (!Expenses) {
            return res.status(404).json({ error: "Expens not found" });
        }
        res.status(200).json(Expenses);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

//------------------------------GET Expenses DATA ACCORDING TO SEARCH --------------------------------------------
Routers.post('/searchexpensesdata', async (req, res) => {
    const { userid, searchQuery } = req.body;

    // Validate input data
    if (!userid || !searchQuery) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        let ExpensesData;
        if (searchQuery) {
            ExpensesData = await expenses.find({
                userid: userid,
                $or: [
                    { note: { $regex: searchQuery, $options: 'i' } },
                    { date: { $regex: searchQuery, $options: 'i' } },
                ]
            }).sort({_id: -1});
        } else {
            ExpensesData = await expenses.find({ userid: userid }).sort({_id: -1});
        }
        
        res.json(ExpensesData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// -----------------------------------------Investments---------------------------------------------
// -----------------------------------------Add Investments---------------------------------------------

Routers.post('/addinvestments', async (req, res) => {
    let { userid, name, price, date } = req.body;

    if (!userid || !name || !price || !date) {
        return res.status(422).json({ error: "Please fill all the fields properly" });
    }
    try {
        const Investments = new investments({ userid, name, price, date });
        await Investments.save();
        return res.status(201).json({ message: "expens added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Update Investments---------------------------------------------

Routers.post('/updateinvestments', async (req, res) => {
    try {
        const { _id, name, price, date } = req.body;
        const Investments = await investments
            .findByIdAndUpdate(_id,
                { name, price, date },
                { new: true });
        if (!Investments) {
            return res.status(404).json({ error: "Expens not found" });
        }
        res.status(200).json(Investments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Delete Investments---------------------------------------------

Routers.post('/deleteinvestments', async (req, res) => {
    try {
        const { _id } = req.body;
        const Investments = await investments.findByIdAndDelete(_id);
        if (!Investments) {
            return res.status(404).json({ error: "Expens not found" });
        }
        res.status(200).json({ message: "Expens deleted successfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Get Investments---------------------------------------------
Routers.post('/getinvestments', async (req, res) => {
    try {
        const {userid} = req.body;
        const Investments = await investments.find({userid}).sort({_id:-1});
        if (!Investments) {
            return res.status(404).json({ error: "Expens not found" });
        }
        res.status(200).json(Investments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

//------------------------------GET Investments DATA ACCORDING TO SEARCH --------------------------------------------
Routers.post('/searchinvestmentsdata', async (req, res) => {
    const { userid, searchQuery } = req.body;

    // Validate input data
    if (!userid || !searchQuery) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        let investmentsData;
        if (searchQuery) {
            investmentsData = await investments.find({
                userid: userid,
                $or: [
                    { note: { $regex: searchQuery, $options: 'i' } },
                    { date: { $regex: searchQuery, $options: 'i' } },
                ]
            }).sort({_id: -1});
        } else {
            investmentsData = await investments.find({ userid: userid }).sort({_id: -1});
        }
        
        res.json(investmentsData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// -----------------------------------------Total Income---------------------------------------------
Routers.post('/totalincome', async (req, res) => {
    try {
        const { userid } = req.body;
        const totalincome = await income.aggregate([
            {
                $match: {
                    userid: userid
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$price" }
                }
            }
        ]);
        
        res.status(200).json(totalincome[0]?.total || 0);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Total Expenses---------------------------------------------
Routers.post('/totalexpenses', async (req, res) => {
    try {
        const { userid } = req.body;
        const totalexpenses = await expenses.aggregate([
            {
                $match: {
                    userid: userid
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$price" }
                }
            }
        ]);
        
        res.status(200).json(totalexpenses[0]?.total || 0);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Total Investments---------------------------------------------
Routers.post('/totalinvestments', async (req, res) => {
    try {
        const { userid } = req.body;
        const totalinvestments = await investments.aggregate([
            {
                $match: {
                    userid: userid
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$price" }
                }
            }
        ]);

        res.status(200).json(totalinvestments[0]?.total || 0);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = Routers;