"use strict";

namespace('clientio', function () {

    this.readcookie = function (cookieName) {
        if (document.cookie != "") {
            var cookies = document.cookie.split('; ');

            for (var i=0; i<cookies.length; i++) {
                var iCookieName = cookies[i].split('=')[0];
                var iCookieVal = cookies[i].split('=')[1];

                if (iCookieName === cookieName) {
                    return iCookieVal;
                }
            }

            return false;
        }
    };
});