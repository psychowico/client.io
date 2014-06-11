namespace('clientio', function() {

  this.eventEmit = function (socket) {
    $('.btn-event-emit').click(function () {
        var	eventName = $('.event-name').val();
        var	eventBody = $('.event-body').val();

        if ($.trim(eventName) !== '') {
            try {
                var pEventBody = JSON.parse(eventBody);
            } catch (err) {
                alert('Unrecognized format of event body!');    
            }

            if (pEventBody != null) {
                socket.emit('passEvent', eventName, pEventBody);
            }
        } else {
           alert('Specify event name!');
        }
    }).keypress(function (key) {
        if (key.which == 13) {
            $('.btn-event-emit').click();
        }
    });

    $('.event-name').keypress(function (key) {
        if (key.which == 13) {
            $('.btn-event-emit').focus().click();
        }
    });
  };
});