"use strict";

namespace('clientio.addons', function () {

    var storage      = clientio.localData.storage;

    this.EmitsHistory = (function () {

        function EmitsHistory($history, socket) {
            var self = this;

            self.$history = $history;
            self.socket = socket;
            //prepare event html psocketrototype
            self.$prototype = $history.find('.history-prototype')
                .removeClass('history-prototype').remove();

            var _originalEmit = socket.emit;
            socket.emit = function () {
                onEmit.apply(self, arguments);
                return _originalEmit.apply(socket, arguments);
            };
        }

        EmitsHistory.prototype.history = [];

        // private method
        function onEmit() {
            var args = [].slice.apply(arguments);

            var name = args[0];
            var eventArgs = args.slice(1);

            this.history.push({
                name: name,
                args: eventArgs
            });
            storage.set('emits-history', this.history);
        }

        return EmitsHistory;
    })();

});
