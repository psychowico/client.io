"use strict";

namespace('clientio', function() {
  this.ListIo = (function() {

    function ListIo($list, socket) {
      var self = this;
      self.eventsList = [];

      self.$list = $list;
      self.socket = socket;
      //prepare event html psocketrototype
      self.$prototype = self.$list.find('.event-prototype')
                       .removeClass('event-prototype').remove();
      socket.on('*', function() {
        var args = [].slice.apply(arguments);
        onEvent.apply(self, ['on'].concat(args));
      });
      socket.emit = (function(socket, coreEmit) {
        return function() {
          var args = [].slice.apply(arguments);
          onEvent.apply(self, ['emit'].concat(args));
          return coreEmit.apply(socket, arguments);
        };
      })(socket, socket.emit);
    }

    //private methods

    /* type can be 'on' or 'emit' */
    function onEvent(type, eventId, eventArgs) {
      var fArgs = '';
      if(typeof eventArgs !== 'undefined') {
        fArgs = JSON.stringify(eventArgs);
      }

      // preparing event html representation
      var $event = this.$prototype.clone();
      $event.find('.event-io-id')
              .text(eventId).end()
            .find('.event-io-body')
              .text(fArgs).end()
            .addClass(type + '-event-io');

      this.$list.append($event);

      // store logic, for later filtering etc.
      this.eventsList.push({
        id: eventId,
        args: eventArgs,
        $rel: $event
      });

      var listHeight = this.$list.prop("scrollHeight");
      this.$list.scrollTop(listHeight);
    }

    //public

    // ListIo.prototype.ojoj = function() {
    //   // this.$prototype = this.$list.find('.event-prototype').remove();
    //   this.test();
    // };

    return ListIo;
  })();
});
