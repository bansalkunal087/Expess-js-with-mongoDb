var express = require('express');
var router = express.Router();
var db = require('../db-connection.js');

var queryString = function(fName, lName){
    console.log(fName, lName);
    console.log('INSERT INTO users (name, email, phone) VALUES (' + (fName + lName) + ', al@yopmail.com, +91 2371283212)');
    
   return "INSERT INTO users (name, email, phone) VALUES ('" + (fName + lName) + "', 'al@yopmail.com', '+91 2371283212')";
}


router.use(function(req, res, next) {
    console.log(new Date(), process.env.MESSAGE_STYLE);
    next();
  });

router.get('/name', function (req, res) {

    console.log(req.query);
    setTimeout(()=>{
        db.query(queryString(req.query.first,req.query.last),function(error, results, fields){
            if (error) throw error;
            console.log('The solution is: ', results,fields);
            res.json({'status': 200});
        })
    
    },10000);
 
    

});
module.exports = router;