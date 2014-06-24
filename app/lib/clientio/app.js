"use strict";

//we need ask user for his socket.io server instance
//download socket.io client library, override $emit function
//and we will can catch all events by "*" pattern

namespace('clientio', function () {
    var storage = clientio.localData.storage;

    $(function () {
        clientio.showModal();
        clientio.checkLastAddress();
        clientio.readAddressList();
    });

    function rememberAddress(address) {
        var lcAddress = address.toLowerCase();
        var servers = storage.get("server-addresses", []);
        if (servers.indexOf(lcAddress) === -1) {
            servers.push(lcAddress);
            storage.set("server-addresses", servers);
        }
    }

    this.tryConnect = function (address) {
        this.connect(address, function (socket) {
            $('#modal-server-chose').dialog("close");
            clientio.localData.setCookie('last-connect', address, 1);

            rememberAddress(address);

            var $element1 = $('#event-wrapper1');
            clientio.eventEmit(socket, $element1);

            var $element2 = $('#event-wrapper2');
            clientio.eventEmit(socket, $element2);

            var $list = $('#events-list');
            var listIo = new clientio.ListIo($list, socket);
        });
    };
});
