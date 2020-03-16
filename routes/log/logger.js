const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('home');
});

router.post('/submit', (req,res)=>{
    //Handle post req.
    console.log(req);
});

module.exports = router;