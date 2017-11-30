var express = require('express');
var router = express.Router();


router.use(function(req, res, next) {
    console.log(new Date());
    next();
  });

router.get('/name', function (req, res) {
    res.send('respond with a resource');
});
module.exports = router;