var express = require('express');
var router = express.Router();
var db =  require('../index');

/* GET users listing. */
router.get('/', function(req, res, next) {

    console.log(db.get());
  res.send(db.get().myCollection.find());
});

module.exports = router;
