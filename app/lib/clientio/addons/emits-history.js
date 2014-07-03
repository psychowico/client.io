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
                addEntryToDOM.call(this, this.history[i]);
            }
        }

        // public methods
        EmitsHistory.prototype.addEventToHistory = function (name, eventArgs) {
            var entry = {
                name: name,
                args: eventArgs
            };
            this.history.push(entry);
            addEntryToDOM.call(this, entry);
            saveHistory.call(this);
        }
        EmitsHistory.prototype.clearHistory = function () {
            this.$history.empty();
            this.history = [];
            saveHistory.call(this);
        }

        // private methods

        function addEntryToDOM(entry) {
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
        function saveHistory() {
            storage.set(this.address + '-emits-history', this.history);
        }

        return EmitsHistory;
    })();

});
