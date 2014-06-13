"use strict";

namespace('clientio', function() {
  var ADDRESS = 'http://localhost:8080';
  this.connect(ADDRESS, function(socket) {
    //we need ask user for his socket.io server instance
    //download socket.io client library, override $emit function
    //and we will can catch all events by "*" pattern
    socket.emit('echo', 'really');
    socket.on('message', function(eventName, args) {
        console.log(eventName, ' - ', args);
    });
    
    var element = $('body');
    
    clientio.eventEmit(socket, element);
  });
});
