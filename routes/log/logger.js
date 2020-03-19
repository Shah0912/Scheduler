const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//const db = require('../../index');


const db = mysql.createConnection({
    host : 'localhost',
    user :  'root',
    password : 'Aditya@0912',
    database : 'logger'
});

db.connect((err)=>{
    if(err) 
        throw err;
    else    
        console.log("MySQL Connected....");
});





router.get('/', (req,res)=>{
    res.render('home');
});

router.post('/submit', (req,res)=>{
    //Handle post req.
    console.log(req.body);
    //console.log(req.body.stime.split(':'));
    let time = req.body.stime.split(':');
    const stime = parseInt(time[0])*60 + parseInt(time[1]);
    //console.log(stime);
    time = req.body.etime.split(':');
    const etime = parseInt(time[0])*60 + parseInt(time[1]);
    //console.log(etime);
    const duration = etime - stime;
    const dt = req.body.date + ' ' + req.body.stime + ':00';
    console.log(dt);
    let sql = `INSERT INTO details(activity,day,duration) VALUES('${req.body.activity}', '${dt}', ${duration});`;
    //let sql = 'Select * From details;';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
    });

});

module.exports = router;