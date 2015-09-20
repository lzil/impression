$(document).ready(function(){

	tags = $('#tags').text();
	tagsList = tags.split(",");
	query = "";
	for (i in tagsList) {
		query += tagsList[i] + '&';
	};
	query = query.substr(0,query.length-1);
	convertTags();
	alert(query);

	setTimeout(function(){
		console.log(final_results);
		totalPopulation1 = "";
		totalPopulation2 = "";
		for (entry in final_results) {
			totalPopulation1 += '<div class="row result"><div class="col-md-1">';
			numbering = Number(entry) + 1;
			totalPopulation1 += numbering;
			totalPopulation1 += '.';
			totalPopulation1 += '</div><div class="col-md-11">';
			totalPopulation1 += final_results[entry][0];
			totalPopulation1 += '&nbsp;-&nbsp;';
			totalPopulation1 += final_results[entry][1];
			totalPopulation1 += '</div></div>';

			totalPopulation2 += '<div class="resultsList"><img src="'+final_results[entry][3]+'" class="song-image")';
			totalPopulation2 += '<br><b>Title:&nbsp;'+final_results[entry][0]+'</b><br><b>';
			totalPopulation2 += 'Artist:&nbsp;'+final_results[entry][1]+'</b><br>';
			totalPopulation2 += '<div><a style="color:#e52d27;font-size:20pt"';
			totalPopulation2 += 'href="https://www.youtube.com/results?search_query=';
			totalPopulation2 += final_results[entry][0] + ' ' + final_results[entry][1]+ '">';
			totalPopulation2 += '<i class="fa fa-youtube-play"></i></a></div></div>';
		}
		console.log(totalPopulation1);
		console.log(totalPopulation2);
		$('#pop').html(totalPopulation1);
		$('.song-details').html(totalPopulation2);
		results = document.getElementsByClassName("resultsList");
		resultsTable = document.getElementsByClassName('result');

		for (i = 0; i < results.length; i++) {
			results[i].id = 'result' + i;
			resultsTable[i].id = 'resulT' + i;
			if (i != 0) {
				$(results[i]).css('display', 'none')
			}
		};
		resultsIndex = -1;
		var clicked = $('#invis');
		$('.result').hover(function() {
			if (this != clicked) {
				$(this).css({'border-left': '1px white solid', 'border-right': '1px white solid', 'font-weight':'bold', 'background-color': '#555555'})
				$(this).animate({
					paddingLeft:'20px'
				}, 100)
			}
		}, function() {
			if (this != clicked) {
				$(this).css({'border':0, 'font-weight': 'normal', 'background-color':'#222222'})
				$(this).animate({
					paddingLeft:'10px'
				}, 100)
			}
		})

		$('.result').on('click', function(event) {
			if (this != clicked) {
				console.log($(this)[0])
				var numThis = $(this)[0].id.substring(6, 7)
				console.log(numThis)
				for (i = 0; i < results.length; i++) {
					$("#result"+i).css('display', 'none');
				}
				$("#result"+numThis).css('display', "block");
				$(clicked).css({'border':0, 'font-weight': 'normal', 'background-color':'#222222', 'padding-left': '10px'})
				clicked = this;
				$(this).css({'border-left': '1px white solid', 'border-right': '1px white solid', 'font-weight':'bold', 'background-color': '#555555', 'padding-left':'20px'})
			} else {
				clicked = $('#invis');
			}
			
		})
	
	}, 2500);
})


// FUNCTIONS ======================================

function convertTags () {
	event.preventDefault();
	$.ajax({
        url: 'https://ancient-island-4243.herokuapp.com/' + query,
        type: 'GET',
        dataType: 'json',
    }).done(function (res) {

            convertMood(res);

        });
};

function convertMood (res) {
	var mood = [res[0], res[1]];
	var url = 'http://developer.echonest.com/api/v4/song/search?';
	for (var i = 0; i < mood.length; i++) {
		url += 'mood=' + mood[i] + '&';
	};
	url = url.substring(0, url.length - 1);
	$.ajax({
		type: 'GET',
		url: url,
 		data: {
 			'api_key': 'I6H7HYOS6INM7VZYR',
 			'results': 100,
 			'artist_min_familiarity': 0.7,
 			'sort': 'song_hotttnesss-desc'
 		}
 	}).done(function (songlist){
 		sortSongs(songlist);
 	});
};

function sortSongs (res) {
	var songs = res['response']['songs'];
	song_names = [];
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
		};
	};
	final_results = [];
	for (var i in results) {
		var url = 'https://itunes.apple.com/search?term='
		var search_terms = results[i][0].split(" ").concat(results[i][1].split(" "));

		for (var j in search_terms) {
			url += search_terms[j] + "+";
		};
		url = url.substring(0, url.length - 1);
		$.ajax({ 
			url: url,
			type: 'GET',
			dataType: 'jsonp'
		}).success(function (response) {
			successCase(response)
		});
	}; 			
};

function successCase (response) {
	var result = response['results'][0];
	var album_name = result['collectionName'];
	var image_url = result['artworkUrl100'];
	image_url = image_url.substring(0, image_url.length-16) + "400x400bb-85.jpg";
	final_results.push([result['trackName'], result['artistName'], album_name, image_url]);
	// console.log(album_name);
	// console.log(image_url);
	if (final_results.length === song_names.length) {
		// console.log(final_results);
		for (var i in final_results) {
			$('#results').append('<p>' + final_results[i] + '</p>');
		};
	};
};


