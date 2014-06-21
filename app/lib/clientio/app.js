"use strict";

namespace('clientio', function () {

  this.tryConnect = function (address) {
    var ADDRESS = $.trim(address);

    this.connect(ADDRESS, function (socket) {
      //we need ask user for his socket.io server instance
      //download socket.io client library, override $emit function
      //and we will can catch all events by "*" pattern
      $('#modal-server-chose').dialog("close");
      clientio.cookieHandler.setCookie('last-connect', ADDRESS, 1);

      var $element1 = $('#event-wrapper1');
      clientio.eventEmit(socket, $element1);

      var $element2 = $('#event-wrapper2');
      clientio.eventEmit(socket, $element2);

      var $list = $('#events-list');
      var listIo = new clientio.ListIo($list, socket);
    });
  };
});
