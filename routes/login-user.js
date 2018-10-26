var express = require('express');
var CryptoJS = require("crypto-js");

var router = express.Router();
var db = require('../db-connection.js');

var queryString = function (data) {
    return "SELECT * FROM users WHERE email ='" + data.email + "'";
}
var loginString = function (data,accessToken) {
    return "UPDATE users SET access_token = '" +accessToken+ "' WHERE email ='"+ data.email+"'";
}


router.use(function (req, res, next) {
    console.log(new Date(), process.env.MESSAGE_STYLE);
    next();
});

router.post('/login', function (req, res, next) {

    console.log(req.body);

    db.query(queryString(req.body), function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results, results && results.length>0 ? results[0].name :'');
          // Website you wish to allow to connect

          console.log(results);
        if(results && results.length >0){

            next();
           
        }
        else{
            res.json({
                'status': 404,
                'data': 'No Data Found'
            });
        }

    });



}, function(req,res,next){
    var accessToken = makeAccessToken(req.body);

    db.query(loginString(req.body,accessToken), function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results, results && results.length>0 ? results[0].name :'');
          // Website you wish to allow to connect
          console.log(results);
        if(results){
            res.json({
                'status': 200,
                'data': 'Login Successfully'
            });
        }
    });
});


function makeAccessToken(data){

    var string = data.name.substring(0,10)+data.email.substring(0,10);
    var accessToken = CryptoJS.HmacSHA1("Message", data.password);
    console.log(accessToken);
    return accessToken;

}
module.exports = router;