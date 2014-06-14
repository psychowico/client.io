"use strict";

namespace('clientio', function() {
  this.ListIo = (function() {

    function ListIo($list, socket) {
      var self = this;
      self.$list = $list;
      self.socket = socket;
      //prepare event html prototype
      self.$prototype = self.$list.find('.event-prototype').remove();
      socket.on('*', function() {
        onEvent.apply(self, arguments);
      });
    }

    //private methods
    function onEvent(eventId, eventArgs) {
      var fArgs = '';
      if(typeof eventArgs !== 'undefined') {
        fArgs = JSON.stringify(eventArgs);
      }

      var $event = this.$prototype.clone();
      $event.find('.event-id').text(eventId);
      $event.find('.event-body').text(fArgs);
      this.$list.append($event);

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
