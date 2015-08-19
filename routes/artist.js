var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

//  Get all artist

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


//  Searches database for artist by name

router.get('/search', function (req, res) {
      db.collection('artist').find({artist: req.query.artist}).toArray(function (err, artist) {
      res.render('templates/artistindex', {artists: artist});
  });
})


//  Saves artist to the database

router.post('/', function (req, res) {
	var collection = global.db.collection('artist');
    collection.save(req.body, function() {
		res.redirect('/artist')
   });
});


//  Deletes artist from artist index page and database

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