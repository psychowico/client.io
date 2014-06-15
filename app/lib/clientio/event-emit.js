namespace('clientio', function() {

  this.eventEmit = function (socket, element) {
    var $eventName = element.find('.event-name');
    var $eventBody = element.find('.event-body');
    var $eventButton = element.find('.btn-event-emit');

    $eventButton.click(function () {
        var pEventBody = null;
        
        if ($.trim($eventName.val()) !== '') {
            try {
                pEventBody = JSON.parse($eventBody.val());
            } catch (err) {
                alert('Unrecognized format of event body!');
            }

            if (pEventBody != null) {
                socket.emit($eventName.val() , pEventBody);
            }
        } else {
            alert('Specify event name!');
        }

    }).keypress(function (key) {
        if (key.which == 13) {
            $eventButton.click();
        }
    });

    $eventName.keypress(function (key) {
        if (key.which == 13) {
            $eventButton.focus().click();
        }
    });
  };
});
