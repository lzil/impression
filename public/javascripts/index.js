// DOM =========================================================
$(document).ready(function () {
    $('#uploadBtn').on('click', uploadFile);
});

// FUNCTIONS ===================================================

function uploadFile (event) {
    $('#invisiload').change(function() {
        document.getElementById('searchBtn').disabled = false;
        $('#searchSpan').css('cursor', 'pointer');
        var filename = $('#invisiload').val();
        $('#uploadBox').val(filename.replace("C:\\fakepath\\", ""));
        $('#searchBtn').css({'opacity': '0.8'});
    });
};

$(function(){
    $('#uploadBtn').click(function(){
        $('#invisiload').click();
    });
});