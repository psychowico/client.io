"use strict";

namespace('clientio', function() {
  var ADDRESS = 'http://localhost:8080';

  this.connect(ADDRESS, function(socket) {
    //we need ask user for his socket.io server instance
    //download socket.io client library, override $emit function
    //and we will can catch all events by "*" pattern

    var $element1 = $('#event-wrapper1');
    clientio.eventEmit(socket, $element1);

    var $element2 = $('#event-wrapper2');
    clientio.eventEmit(socket, $element2);

    var $list = $('#events-list');
    var listIo = new clientio.ListIo($list, socket);
  });
});
