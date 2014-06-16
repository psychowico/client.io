"use strict";

/**
 custom namespaces system.
 usage exmaple:

 namespace('clientio.msg', function() {
  //this means current namespace
  this.alert = function(arg) { alert(arg); };
  //__namespace is current namespace string object
  console.log('namespace: ', this.__namespace);
  //__parent is curent namespace parrent namespace object
  console.log('parent namespace: ', this.__parent.__namespace);
 });

 //somewhere else
 clientio.msg.alert('help me!');
 */

(function (exports, undefined) {
    exports.namespace = function (name, body) {
        var parts = name.split('.');
        var scope = exports;
        var parent = undefined;
        for (var i = 0; i < parts.length; i++) {
            if (scope[parts[i]] === undefined) {
                scope[parts[i]] = {
                    __parent: parent,
                    __namespace: parts.slice(0, i + 1).join('.')
                };
            }
            scope = scope[parts[i]];
            parent = scope;
        }
        if (body) body.apply(scope);
    }
})(window);
