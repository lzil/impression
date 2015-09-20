// DOM =========================================================
$(document).ready(function () {

//    $('#uploadBtn').on('click', uploadFile);
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
};*/
