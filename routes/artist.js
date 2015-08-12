var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


router.get('/', function (req, res){
	var collection = global.db.collection('artist');

	collection.find().toArray(function (err, artists) {
		var formattedArtist = artists.map(function (artist) {
			return {
				_id:     artist._id,
				artist:  artist.artist,
				genre:   artist.genre
		 };
	  });
 		res.render('templates/artistindex', {artists: formattedArtist});
	});
});

router.get('/new', function (req, res) {
	res.render('templates/artistnew');
});

router.post('/', function (req, res) {
	var collection = global.db.collection('artist');

	collection.save(req.body, function() {
		res.redirect('/artist')
   });
});

router.post('/delete/:id', function (req, res) {
	var collection = global.db.collection('artist');
	collection.remove({_id: ObjectID(req.params.id)}, function() {
		res.redirect('/artist')
	})
});

router.post('/new/:id/submit', function (req, res) {
	var collection = global.db.collection('artist');

	collection.update(
    {_id: ObjectID(req.params.id)},
    {$set: {complete: true}},
    function () {
      res.redirect('/new')

    });
});

module.exports = router;