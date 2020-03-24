const express = require('express');
const router = express.Router();
const mysql = require('mysql');
// const popup = require('popups');
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

router.get('/new',(req,res)=>{
    let sql = 'Select activity as activity, sum(duration) as time, count(activity) as c FROM details GROUP BY activity ORDER BY time';
    console.log('WHy');
    db.query(sql,(err,result)=>{
        if(err) throw err;
        //console.log(result);
        let i = 0;
        let test = "";
        let data = [['Activity', 'Hours']]; 
        while(result[i]!=undefined)
        {
            //console.log(result[i].activity);
            //console.log(result[i].time);
            data.push([result[i].activity,result[i].time])
            // concat(test,result[i].activity,' ',result[i].time,'.');
            test = test + result[i].activity + ' ' + result[i].time + '.';
            // console.log(data);
            i++;
        }
        //console.log(data);
        res.render('pie',{temp:test});
        //console.log(test);
    });
    //console.log(temp1);
    //console.log('test',test);

});


router.post('/submit', (req,res)=>{
    //Handle post req.


    let time = req.body.stime.split(':');
    const stime = parseInt(time[0])*60 + parseInt(time[1]);
    time = req.body.etime.split(':');
    const etime = parseInt(time[0])*60 + parseInt(time[1]);
    const duration = etime - stime;
    const dt = req.body.date + ' ' + req.body.stime + ':00';
    console.log(req.body);
    /* //console.log(req.body.stime.split(':'));
    let time = req.body.stime.split(':');
    const stime = parseInt(time[0])*60 + parseInt(time[1]);
    //console.log(stime);
    time = req.body.etime.split(':');
    const etime = parseInt(time[0])*60 + parseInt(time[1]);
    //console.log(etime);
    const duration = etime - stime;
    const dt = req.body.date + ' ' + req.body.stime + ':00'; */
    console.log(dt);
    let sql = `INSERT INTO details(activity,day,duration) VALUES('${req.body.activity}', '${dt}', ${duration});`;
    //let sql = 'Select * From details;';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
    });
    /* popup.alert({
        content : 'Success'
    }); */
    res.render('home');
});



module.exports = router;