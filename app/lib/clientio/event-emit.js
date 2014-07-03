"use strict";

namespace('clientio', function () {

    this.eventEmit = function (socket, element) {
        var self = this;
        self.$eventName = element.find('.event-name');
        self.$eventBody = element.find('.event-body');
        self.$eventButton = element.find('.btn-event-emit');

        self.$eventButton.click(function () {
            var pEventBody = null;
            var pEventName = $.trim(self.$eventName.val());
            if (pEventName !== '') {
                try {
                    pEventBody = JSON.parse(self.$eventBody.val());
                } catch (err) {
                    alert('Unrecognized format of event body!');
                }

                if (pEventBody != null) {
                    socket.emit(pEventName, pEventBody);
                    self.emit('event.emitted', {
                        name: pEventName,
                        args: pEventBody
                    });
                }
            } else {
                alert('Specify event name!');
            }

        }).keypress(function (key) {
            if (key.which == 13) {
                self.$eventButton.click();
            }
        });

        self.$eventName.keypress(function (key) {
            if (key.which == 13) {
                self.$eventButton.focus().click();
            }
        });

        return self;
    };
    this.eventEmit.prototype = new clientio.EventsBus();

    this.eventEmit.prototype.updateEmitterValues = function (eventName, eventArgs) {
        this.$eventName.val(eventName);
        var body = '';
        if (eventArgs !== null) {
            body = JSON.stringify(eventArgs);
        }
        this.$eventBody.val(body);
    }
});
