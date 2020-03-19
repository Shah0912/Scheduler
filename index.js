const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();

app.use(express.urlencoded());
const router = express.Router();
app.set('view engine', 'ejs');










const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.render('landing')
});

app.use('/log', require('./routes/log/logger'));


app.listen(PORT,() =>{
    console.log(`Server Started on port: ${PORT}`);
});

//module.exports(db);