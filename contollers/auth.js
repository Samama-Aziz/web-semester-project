const express = require('express');
const Routers = express.Router();
const login = require('../viwes/src/Component/JSX/Login')
const signUp = require('../viwes/src/Component/JSX/signUp')
const dashboard = require('../viwes/src/Component/JSX/Dashboard')






//------------------------------ADD SHOP--------------------------------------------
Routers.get('/', async (req, res) => {
    <login/>
});
Routers.get('/login', async (req, res) => {
    <login/>
});
Routers.get('/Signup', async (req, res) => {
    <signUp/>
});
Routers.get('/dashboard', async (req, res) => {
    <dashboard/>
});

module.exports = Routers;