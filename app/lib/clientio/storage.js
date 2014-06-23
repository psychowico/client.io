"use strict";

namespace('clientio', function () {
    this.storage = {
        get: function (name) {
            var result = localStorage.getItem(name);
            return JSON.parse(result);
        },
        set: function (name, value) {
            var json = JSON.stringify(value);
            localStorage.setItem(name, json);
            return this;
        }
    };
});
