$(document).ready(()=> {
	$('#searchForm').on('submit', (e) => {
		let searchText = ($('#searchText').val());
		getMovies(searchText);
		e.preventDefault();
	});
});

function getMovies (searchText) {
	axios.get('http://www.omdbapi.com?s=' + searchText)
		.then((response) => {
			console.log(response);
			let movies = response.data.Search;
			let output = '';

			$.each(movies, (index, movie) => {
				output += `
					<div class="col-md-3">
						<div class="well text-center">
							<img src="${movie.Poster}">
							<h4>
								${movie.Title}
							</h4>
							<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Detils</a>
						</div>
					</div>
				`
			});
			$('#movies').html(output);
		}).catch((err) => {
			console.log(err);
		});
}

function movieSelected (id) {
	sessionStorage.setItem('movieId', id);
	window.location = '/movies/singleMovies';
	return false;
}

function getMovie () {
	let movieId = sessionStorage.getItem('movieId');

	axios.get('http://www.omdbapi.com?i=' + movieId)
		.then((response) => {
			console.log(response);
			let movie = response.data;

			let output = `
				<div class="row">
					<div class="col-md-4">
						<img src="${movie.Poster}" class="thumbnail">
					</div>
					<div class="col-md-8">
						<h2>${movie.Title}</h2>
						<ul class="list-group">
							<li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
							<li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
							<li class="list-group-item"><strong>Awards: </strong>${movie.Awards}</li>
							<li class="list-group-item"><strong>Runtime: </strong>${movie.Runtime}</li>							
							<li class="list-group-item"><strong>Type: </strong>${movie.Type}</li>														
							<li class="list-group-item"><strong>Total seasons: </strong>${movie.totalSeasons}</li>														
							<li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
							<li class="list-group-item"><strong>IMDB Rated: </strong>${movie.imdbRating}</li>
							<li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
							<li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
							<li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
							<li class="list-group-item"><strong>Origin language: </strong>${movie.Language}</li>
						</ul>
					</div>
				</div>
				<div class="row">
					<div class="well">
						<h3>Plot</h3>
						${movie.Plot}
						<hr />
						<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
						<a href="index.html" class="btn btn-default">Back to search</a>
						<a href="https://www.youtube.com/results?search_query=${movie.Title}+movie" target="_blank" class="btn btn-danger">Watch Triailer (YT)</a>
						<a href="#" target="" class="btn btn-info">Add to watch</a>						
						<a href="#" target="" class="btn btn-success">Add to watched</a>
						<a href="#" target="" class="btn btn-warning">Add to favourite</a>
					</div>
				</div>
			`
			$('#movie').html(output);
		}).catch((err) => {
			console.log(err);
		});


}