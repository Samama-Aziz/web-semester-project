const express = require('express');
const Routers = express.Router();
const bcrypt = require('bcrypt'); // Corrected here
const User = require('./models/User');
const income = require('./models/Income');
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

//post to update data of user

Routers.post('/Profileupdate', async (req, res) => {
    try {
        const { _id, Name, email, phone } = req.body;
        const user = await User
            .findByIdAndUpdate(_id,
                { Name, email, phone },
                { new: true });
        if (!user) {
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
    console.log(userid, Income_Source, price, date);

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
            });
        } else {
            IncomeData = await income.find({ userid: userid });
        }
    
        IncomeData = IncomeData.sort({_id:-1});
        
        console.log(IncomeData);
        res.json(IncomeData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = Routers;