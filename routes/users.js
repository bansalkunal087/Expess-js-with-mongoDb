var express = require('express');
var router = express.Router();
var db = require('../index');

/* GET users listing. */
router.get('/', function (req, res, next) {

    console.log(db.get());

       
                db.get().collection('myCollection').find({
                            'x': 1
                        }).toArray(function (err, docs) {
                            console.log(docs);
                            res.send(docs);
                        }); //end collection.find 
                    
                //end db.collection
            
       
});

module.exports = router;
