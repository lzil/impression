$(document).ready(function(){
	$('.result').hover(function() {
		$(this).css({'border-left': '1px white solid', 'border-right': '1px white solid', 'font-weight':'bold', 'background-color': '#555555'})
		$(this).animate({
			paddingLeft:'20px'
		}, 100)
	}, function() {
		$(this).css({'border':0, 'font-weight': 'normal', 'background-color':'#222222'})
		$(this).animate({
			paddingLeft:'10px'
		}, 100)
	})
})


// FUNCTIONS ======================================

function postTags (event) {
	event.preventDefault();

	var a = ['derp'];

	$.ajax({
        url: 'https://ancient-island-4243.herokuapp.com/',
        type: 'GET',
        dataType: 'jsonp',
        data: 'mountain&snowy&happy&high&calm'
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
 				if (song_names.length == 10) {
 					break;
 				}
 			}
 			for (var i in results) {
 				$('#results').append('<p>' + results[i] + '</p>');
 			}
		});
}