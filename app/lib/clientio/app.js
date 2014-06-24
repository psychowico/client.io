"use strict";

namespace('clientio', function () {
    var EmitsHistory = clientio.addons.EmitsHistory;
    var ListIo       = clientio.ListIo;

    $(function () {
        clientio.showModal();
        clientio.checkLastAddress();
        clientio.readAddressList();
    });

    this.tryConnect = function (address) {
        this.connect(address, function (socket) {
            //we need ask user for his socket.io server instance
            //download socket.io client library, override $emit function
            //and we will can catch all events by "*" pattern
            $('#modal-server-chose').dialog("close");
            clientio.localData.setCookie('last-connect', address, 1);
            clientio.localData.setLocalStorageItem("server-addresses", address);

            var $element1 = $('#event-wrapper1');
            clientio.eventEmit(socket, $element1);

            var $element2 = $('#event-wrapper2');
            clientio.eventEmit(socket, $element2);

            var $list = $('#events-list');
            var listIo = new ListIo($list, socket);

            var $emitsHistory = $('#emits-history');
            var emitsHistory = new EmitsHistory($emitsHistory, socket);
        });
    };
});
