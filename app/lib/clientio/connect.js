"use strict";

namespace('clientio', function() {

  this.connect = function(address, success) {
    $.getScript(address + '/socket.io/socket.io.js')
     .done(libFinded).fail(libError);

    function libFinded() {
      var socket = prepareSocket(address);
      success(socket);
    }
    function libError(jqxhr, settings, exception ) {
      console.error(exception);
    }
  };

  function prepareSocket(address) {
    var socket = io.connect(address);
    // socket.io versions smaller than 1.0
    if(socket.$emit) {
      var _$emit = socket.$emit;
      socket.$emit = function() {
        var args = Array.prototype.slice.call(arguments);
        _$emit.apply(socket, ['*'].concat(args));
        _$emit.apply(socket, arguments);
      };
    }
    else {
      // var _socket = socket.io.engine;
      // var _emit = _socket.emit;
      // _socket.emit = function(first) {
      //   // console.log(first);
      //   _emit.apply(_socket, arguments);
      // };
      // var _emit = _socket.emit;
      // _socket.emit = function() {
      //   var args = Array.prototype.slice.call(arguments);
      //   _emit.apply(_socket, ['*'].concat(args));
      //   _emit.apply(_socket, arguments);
      // };
    }
    return socket;
  }
});
