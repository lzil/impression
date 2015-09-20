// DOM =========================================================
$(document).ready(function () {

    $('#Btn').on('click', getTags);
});

// FUNCTIONS ===================================================
function getTags( event ) {
	event.preventDefault();

	// $.ajax({
	// 	type: 'GET',
	// 	url: '/submit'
	// }).done(function (response) {
	// 	console.log(response);
	// });
	var mood = ['happy', 'fun'];
	var url = 'http://developer.echonest.com/api/v4/song/search?';
	for (var i = 0; i < mood.length; i++) {
		url += 'mood=' + mood[i] + '&';
	}
	url = url.substring(0, url.length - 1);
	console.log(url);
	$.ajax({
		type: 'GET',
		url:url,
 		data: {
 			'api_key': 'I6H7HYOS6INM7VZYR',
 			'results': 100,
 			'artist_min_familiarity': 0.7,
 			'sort': 'song_hotttnesss-desc'
 		}
 		}).done(function (response) {
 			var songs = response['response']['songs'];
 			var song_names = [];
 			var artist_names = [];
 			var results = [];
 			for (var i = 0; i < songs.length; i++) {
 				var song = songs[i];
 				if (song_names.indexOf(song['title'].toLowerCase()) != -1) {
 					continue;
 				}
 				if (artist_names.indexOf(song['artist_name'].toLowerCase()) != -1) {
 					continue;
 				}
 				song_names.push(song['title'].toLowerCase());
 				artist_names.push(song['artist_name'].toLowerCase());
 				results.push([song['title'], song['artist_name']]);
 				if (song_names.length == 10) {
 					break;
 				}
 			}
 			console.log(results);
 			for (var i in results) {
 				$('#results').append('<p>' + results[i] + '</p>');
 			}
		});
}