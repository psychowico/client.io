"use strict";

namespace('clientio', function () {

    this.setcookie = function (name, val, hours) {
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime()+(hours*1000*60*60));
            var expire = "; expires="+date.toGMTString();
        } else {
            var expire ="";
        }
        document.cookie = name+"="+val+expire+"; path=/";
    };
});