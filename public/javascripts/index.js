// DOM =========================================================
$(document).ready(function () {

    $('#uploadBtn').on('click', function() {
        
        $('#invisiload').change(function() {
            document.getElementById('searchBtn').disabled = false;
            $('#searchSpan').css('cursor', 'pointer');
            var filename = $('#invisiload').val();
            $('#uploadBox').val(filename.replace("C:\\fakepath\\", ""));
            $('#searchBtn').css({'opacity': '0.8'});
        });
        
    });
});

$(function(){
    $('#uploadBtn').click(function(){
        $('#invisiload').click();
    });
});

// FUNCTIONS ===================================================
/*function uploadFile (event) {
	event.preventDefault();
    var files = $('#uploadBox').files;
    var musicFile = new FormData();
    musicFile.append('filename', 'test.wav');
    musicFile.append('data', musicFile);

    $.ajax({
        type: 'POST',
        data: musicFile,
        url: '/upload',
        processData: false,
        contentType: false
    }).done(function( response ) {

        if (response.msg === '') {
            $('fieldset input').val('');
            alert('success!!');
        }
        else {
            alert('Error: ' + response.msg);
        }
    });
};
*/