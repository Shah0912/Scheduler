const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 5000;

app.get('/', (req,res)=>{
    res.render('home');
});

app.listen(PORT,() =>{
    console.log(`Server Started on port: ${PORT}`);
});