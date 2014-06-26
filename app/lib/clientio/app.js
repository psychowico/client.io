"use strict";

//we need ask user for his socket.io server instance
//download socket.io client library, override $emit function
//and we will can catch all events by "*" pattern

namespace('clientio', function () {
    var EmitsHistory = clientio.addons.EmitsHistory;
    var ListIo       = clientio.ListIo;
    var storage      = clientio.localData.storage;

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

            var emitter1 = new clientio.eventEmit(socket, $('#event-wrapper1'));
            var emitter2 = new clientio.eventEmit(socket, $('#event-wrapper2'));

            var $list = $('#events-list');
            var listIo = new ListIo($list, socket);

            var $emitsHistory = $('#emits-history .history-list');
            var emitsHistory = new EmitsHistory($emitsHistory, address, socket);
            emitsHistory.on('choosed', function(historyEntry) {
                emitter1.updateEmitterValues(historyEntry.name, historyEntry.args);
                emitter2.updateEmitterValues(historyEntry.name, historyEntry.args);
            });
            $('#emits-history .clear-history').on('click', function() {
                emitsHistory.clearHistory();
            });
        });
    };
});
