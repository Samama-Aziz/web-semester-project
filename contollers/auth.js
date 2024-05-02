const express = require('express');
const Routers = express.Router();


Routers.get('/', async (req, res) => {
    res.send('<h1>Welcome</h1>');
});

Routers.get('/login', async (req, res) => {
    res.send("login");});

Routers.get('/Signup', async (req, res) => {
    res.send("signUp"); 
});

Routers.get('/dashboard', async (req, res) => {
    res.send("dashboard"); 
});

module.exports = Routers;
