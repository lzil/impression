// DOM =========================================================
$(document).ready(function () {

	$('#Btn').on('click', postTags);
});

// FUNCTIONS ===================================================
function postTags (event) {
	event.preventDefault();

	var a = ['derp'];

	$.ajax({
        url: 'https://ancient-island-4243.herokuapp.com/mountain&snowy&happy&high&calm',
        type: 'GET',
        dataType: 'json',
    }).done(function (response) {
            a = response;
            console.log(response);
        });
	var response = ['groovy', 'happy', 'bouncy'];
	var mood = [];
	for (var i in response) {
		mood.push([response[i], 3-i]);
	};
	var url = 'http://developer.echonest.com/api/v4/song/search?';
	for (var i = 0; i < mood.length; i++) {
		url += 'mood=' + mood[i] + '&';
	}
	url = url.substring(0, url.length - 1);
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
 				if (song_names.length == 5) {
 					break;
 				}
 			}
 			var final_results = [];
 			for (var i in results) {
 				var url = 'https://itunes.apple.com/search?term='
 				var search_terms = results[i][0].split(" ").concat(results[i][1].split(" "));
 				console.log(search_terms);
 				for (var j in search_terms) {
 					url += search_terms[j] + "+";
 				}
				url = url.substring(0, url.length - 1);
 				$.ajax({ 
					url: url,
					type: 'GET',
					dataType: 'jsonp'
 				}).success(function(response) {
 					var result = response['results'][0];
 					var album_name = result['collectionName'];
 					var image_url = result['artworkUrl100'];
 					image_url = image_url.substring(0, image_url.length-16) + "400x400bb-85.jpg";
 					final_results.push([result['trackName'], result['artistName'], album_name, image_url]);
 					console.log(album_name);
 					console.log(image_url);
 					if (final_results.length === song_names.length) {
 						console.log(final_results);
 						for (var i in final_results) {
 							$('#results').append('<p>' + final_results[i] + '</p>');
 						}
 					}
 				});
 			} 			
		});
}