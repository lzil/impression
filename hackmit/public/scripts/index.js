// DOM =========================================================
$(document).ready(function () {

    $('#btnAddQuiz').on('click', addQuiz);
});

// FUNCTIONS ===================================================
function addQuiz (event) {

	event.preventDefault();

    var errorCount = 0;

    $('#addQuiz input').each(function(index, val) {

        if($(this).val() === '' && $(this).is(':visible')) { errorCount++; }

    });

    if(errorCount === 0) {

        if ($('#inputQuizType').val() === 'Multiple Choice') {

            var newQuiz = {
                'name': $('#inputQuizName').val(),
                'type': $('#inputQuizType').val(),
                'prompt': $('#addMultipleQuiz #inputQuizPrompt').val(),
                'files': null,
                'correct': $('#addMultipleQuiz #inputQuizCorrect').val(),
                'distract1': $('#addMultipleQuiz #inputQuizDistract1').val(),
                'distract2': $('#addMultipleQuiz #inputQuizDistract2').val(),
                'distract3': $('#addMultipleQuiz #inputQuizDistract3').val()
            };
        }
        else if ($('#inputQuizType').val() === 'True or False') {

            var newQuiz = {
                'name': $('#inputQuizName').val(),
                'type': $('#inputQuizType').val(),
                'prompt': $('#addBinaryQuiz #inputQuizPrompt').val(),
                'files': null,
                'correct': $('#addBinaryQuiz #inputQuizCorrect').val()
            };
        };

        $.ajax({
            type: 'POST',
            data: newQuiz,
            url: '/quizes/addquiz',
            dataType: 'JSON'
        }).done(function( response ) {

            if (response.msg === '') {
                $('fieldset input').val('');
                alert('success!!');
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }    
};
