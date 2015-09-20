$(document).ready(function(){
	results = document.getElementsByClassName("resultsList");
	resultsTable = document.getElementsByClassName('results-table');

	for (i = 0; i < results.length; i++) {
		results[i].id = 'result' + i;

		if (i != 0) {
			$(results[i]).css('display', 'none')
		}
	}
	console.log(results)
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
			console.log($(this))
			var numThis = $(this).attr('id').substring(6, 1)
			var numClicked = $(clicked).attr('id').substring(6, 1)
			$("#result"+numClicked).css('display', 'none');
			$("#result"+numThis).css('display', "block");
			$(clicked).css({'border':0, 'font-weight': 'normal', 'background-color':'#222222', 'padding-left': '10px'})
			clicked = this;
			$(this).css({'border-left': '1px white solid', 'border-right': '1px white solid', 'font-weight':'bold', 'background-color': '#555555', 'padding-left':'20px'})
		} else {
			clicked = $('#invis');
		}
		
	})
})