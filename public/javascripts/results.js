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