"use strict";

(function(undefined) {
  //we need ask user for his socket.io server instance
  //download socket.io client library, override $emit function
  //and we will can catch all events by "*" pattern

  // var socket = io.connect('http://localhost:8080');

  // socket._$emit = socket.$emit;
  // socket.$emit = function() {
  //   var args = Array.prototype.slice.call(arguments);
  //   this._$emit(['*'].concat(args));
  //   this._$emit(arguments);
  // };
  // socket.on('*', function(eventName, args) {
  //     console.log(eventName, ' - ', args);
  // });
})();
