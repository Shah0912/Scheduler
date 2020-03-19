const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();

app.use(express.urlencoded());
const router = express.Router();
app.set('view engine', 'ejs');




const db = mysql.createConnection({
    host : 'localhost',
    user :  'root',
    password : 'Aditya@0912',
    database : 'nodemysql'
});

db.connect((err)=>{
    if(err) 
        throw err;
    else    
        console.log("MySQL Connected....");
});

const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('<h1>Welcome<h1>')
});

app.use('/log', require('./routes/log/logger'));


app.listen(PORT,() =>{
    console.log(`Server Started on port: ${PORT}`);
});