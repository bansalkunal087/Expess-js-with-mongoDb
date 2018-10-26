var express = require('express');
var router = express.Router();
var db = require('../db-connection.js');

var queryString = function (fName) {
    return "SELECT * FROM users WHERE email LIKE '%" + fName + "%'";
}


router.use(function (req, res, next) {
    console.log(new Date(), process.env.MESSAGE_STYLE);
    next();
});

router.get('/:name', function (req, res) {

    console.log(req.params);

    db.query(queryString(req.params.name), function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results, results && results.length>0 ? results[0].name :'');
          // Website you wish to allow to connect
        res.json({
            'status': 200,
            'data': results
        });
    })



});
module.exports = router;