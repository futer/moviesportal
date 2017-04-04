var express = require('express');
var router = express.Router();

//Movies single
router.get('/singleMovies', function (req, res) {
	res.render('singleMovies');
});

//Fav Movies
router.get('/favouriteMovies', function (req, res) {
	res.render('favMovies');
});

//To watch Movies
router.get('/toWatchMovies', function (req, res) {
	res.render('toWatchMovies');
});

//Watched Movies
router.get('/watchedMovies', function (req, res) {
	res.render('watchedMovies');
});


module.exports = router;