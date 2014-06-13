namespace('clientio', function() {

  this.eventEmit = function (socket, element) {
    $('.btn-event-emit').click(function () {
        var events = element.find('.event-wraper');
        var eventNumber = 1; //in future can be replaced with event name provided in layout, or sth simillar

        $.each(events, function () {
           var eventName = $(this).find('.event-name').val()
           var eventBody = $(this).find('.event-body').val()
           var pEventBody = null;

            if ($.trim(eventName) !== '') {
                try {
                    pEventBody = JSON.parse(eventBody);
                } catch (err) {
                    alert('Unrecognized format of '+ eventNumber +' event body!');    
                }

                if (pEventBody != null) {
                    socket.emit('passEvent', eventName, pEventBody);
                }
            } else {
               alert('Specify '+ eventNumber +' event name!');
            }
            eventNumber++;
        });

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