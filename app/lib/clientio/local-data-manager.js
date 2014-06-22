"use strict";

namespace ('clientio', function () {

	this.localData = {

		"setCookie": function  (name, val, hours) {
            var val = val.toLowerCase();
            
			if (hours) {
            	var date = new Date();
            	date.setTime(date.getTime()+(hours*1000*60*60));
            	var expire = "; expires="+date.toGMTString();
        	} else {
            	var expire ="";
        	}
        	document.cookie = name+"="+val+expire+"; path=/";
		},

		"getCookie": function (cookieName) {
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
		},

        "setLocalStorage": function (name, val) {
            //in case if local storage item was array
            var val = val.toLowerCase();

            if (name === "server-addresses") {
                if (localStorage.getItem(name) === null) {
                    var  values = [];
                } else {
                    var values = localStorage.getItem(name).split(',');
                }

                if (values.indexOf(val) === -1) {
                    values.push(val);
                    localStorage.setItem(name, values); 
                }
            }
        }
	};
});