"use strict";

namespace('clientio', function () {

    // browser feature check - later maybe we should consider use another
    // storage type if this one fail
    if (!localStorage || !localStorage.getItem || !localStorage.setItem) {
        console.error("window.localStorage is not supporting. Can not continue.");
        return;
    }

    this.localData = {

        setCookie: function (name, val, hours) {
            var val = val.toLowerCase();
            var expire = "";

            if (hours) {
                var date = new Date();
                date.setTime(date.getTime() + (hours * 1000 * 60 * 60));
                expire = "; expires=" + date.toGMTString();
            }

            document.cookie = name + "=" + val + expire + "; path=/";
        },

        getCookie: function (cookieName) {
            if (document.cookie != "") {
                var cookies = document.cookie.split('; ');

                for (var i = 0; i < cookies.length; i++) {
                    var iCookieName = cookies[i].split('=')[0];
                    var iCookieVal = cookies[i].split('=')[1];

                    if (iCookieName === cookieName) {
                        return iCookieVal;
                    }
                }

                return false;
            }
        },

        storage: {
            get: function (name, defaultValue) {
                var result = localStorage.getItem(name);
                if (result === null) {
                    return defaultValue || null;
                }

                try {
                    return JSON.parse(result);
                } catch (e) {
                    localStorage.removeItem(name);
                    return defaultValue;
                }
            },
            set: function (name, value) {
                var json = JSON.stringify(value);
                localStorage.setItem(name, json);
                return this;
            }
        }
    };
});
