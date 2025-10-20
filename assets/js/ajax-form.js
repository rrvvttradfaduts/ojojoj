$(function () {

    // Get the form and the message container
    var form = $('#contact-form');
    var formMessages = $('.ajax-response');

    // Handle form submit
    form.on('submit', function (e) {
        e.preventDefault();

        // Serialize the form data
        var formData = form.serialize();

        // Send the AJAX request
        $.ajax({
            type: 'POST',
            url: form.attr('action'), // Make sure 'action' in <form> has your PHP file path
            data: formData
        })
            .done(function (response) {
                // Success
                formMessages.removeClass('error').addClass('success').text(response);

                // Clear the form
                form.trigger('reset');
            })
            .fail(function (xhr) {
                // Error
                formMessages.removeClass('success').addClass('error');
                if (xhr.responseText) {
                    formMessages.text(xhr.responseText);
                } else {
                    formMessages.text('Oops! An error occurred and your message could not be sent.');
                }
            });
    });

});
