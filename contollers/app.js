const express = require('express');
const app =express();
const doteenv =require('dotenv');

doteenv.config({path: './config.env'});
require('./DB/connection');
const port = process.env.PORT;

app.use(express.json());
app.use(require('./Routers'));



app.listen(port,() =>{
    console.log(`Sever is running at localhost ${port}`);
    
})