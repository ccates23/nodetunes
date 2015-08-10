var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
	res.render('templates/artistindex');
});

router.get('/new', function (req, res) {
	res.render('templates/artistnew');
});




module.exports = router;