const express = require('express');
const Routers = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// -----------------------------------------Registration---------------------------------------------

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
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }
        const user = new User({ Name, email, password });
        await user.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// -----------------------------------------Login---------------------------------------------

Routers.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill in all the fields properly" });
        }
        if(email.includes('@') === false || email.includes('.') === false){
            return res.status(422).json({ error: "Invalid Email" });
        }
        
        const userLogin = await User.findOne({ email });
        if (!userLogin) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });
        res.status(200).json({ message: "User logged in successfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = Routers;
