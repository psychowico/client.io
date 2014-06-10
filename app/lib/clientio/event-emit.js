namespace('clientio', function() {
  var ADDRESS = 'http://localhost:8080';
  
  this.eventEmit = function (socket) {
    $('.event-emit-container').load('partial/event-emit.html', function () {
    	$('#btn-event-emit').click(function () {
    		var	eventName = $('#event-name').val();
    		var	eventBody = JSON.parse($('#event-body').val());

    		if ($.trim(eventName) !== '') {
          socket.emit('passEvent', eventName, eventBody);
    		} else {
    			alert('Specify event name');
    		}
    	}).keypress(function (key) {
    		if (key.which == 13) {
    			$('#btn-event-emit').click();
    		}
    	});

    	$('#event-name').keypress(function (key) {
    		if (key.which == 13) {
    			$('#btn-event-emit').focus().click();
    		}
    	});
    });
  };
});