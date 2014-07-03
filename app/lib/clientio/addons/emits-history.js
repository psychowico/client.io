"use strict";

namespace('clientio.addons', function () {

    var storage = clientio.localData.storage;

    this.EmitsHistory = (function () {

        EmitsHistory.prototype = new clientio.EventsBus()
        function EmitsHistory($history, address, socket) {
            var self = this;

            self.history = storage.get(address + '-emits-history', []);
            self.$history = $history;
            self.address = address;
            self.socket = socket;

            //prepare event html psocketrototype
            self.$prototype = $history.find('.history-prototype')
                .removeClass('history-prototype').remove();

            var historyLength = this.history.length;
            for (var i = 0; i < historyLength; i++) {
                this.addEntryToDOM(this.history[i]);
            }

            var _originalEmit = socket.emit;
            socket.emit = function () {
                onEmit.apply(self, arguments);
                return _originalEmit.apply(socket, arguments);
            };
            $history.find('.clear-history').on('click', function() {
                clearHistory.apply(self);
            });
        }

        // public methods
        EmitsHistory.prototype.addEntryToDOM = function (entry) {
            var self = this;

            var $entry = this.$prototype.clone();
            $entry.data('rel', entry);
            $entry.on('click', function() {
                var historyEntry = $(this).data('rel');
                self.emit('choosed', historyEntry);
            });
            var args = JSON.stringify(entry.args);
            $entry
                .find('.event-name').text(entry.name).end()
                .find('.event-args').text(args);
            this.$history.prepend($entry);
        }

        EmitsHistory.prototype.clearHistory = function () {
            this.$history.empty();
            this.history = [];
            saveHistory.call(this);
        }

        // private methods

        function saveHistory() {
            storage.set(this.address + '-emits-history', this.history);
        }

        function onEmit() {
            var args = [].slice.apply(arguments);

            var name = args[0];
            var eventArgs = args.slice(1);

            eventArgs = eventArgs.length > 0 ? eventArgs[0] : null;
            var entry = {
                name: name,
                args: eventArgs
            };
            this.history.push(entry);
            this.addEntryToDOM(entry);
            saveHistory.call(this);
        }

        return EmitsHistory;
    })();

});
