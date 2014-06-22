"use strict";

namespace ('clientio', function () {
    $(function () {
        var $address = $('#server-address');

        function protocolCheck (address) {
            if (address.substr(0,7) === 'http://' || address.substr(0,8) === 'https://') {
                return address;
            } else {
                return 'http://' + address;
            }
        };

        $('#modal-server-chose').dialog({
            autoOpen: true,
            dialogClass: "no-close",
            width: 400,
            height: 280,
            modal: true,
            buttons: {
                "Connect": {
                    id: "modal-connect-button",
                    text: "Connect",
                    click:  function () {
                                var addres = protocolCheck($.trim($address.val()));

                                if (addres !== 'http://' && addres !== 'https://') {
                                    $(this).dialog(clientio.tryConnect(addres));
        
                                } else {
                                    alert('Empty server address!');
                                }
                            }
                }   
            }
        });

        $address
            .keypress(function (key) {
                if (key.which == 13) {
                        $('#modal-connect-button').focus().click();
                }
            })
            .click(function () {
                $address.autocomplete('search', $address.val());
            });


        var prevAddress = clientio.localData.getCookie('last-connect');

        if (prevAddress) {
            $address.val(prevAddress);
        }

        var addressesSaved = localStorage.getItem('server-addresses'); 

        if (addressesSaved !== null) {
            var addresses = addressesSaved.split(',').reverse();
        } else {
            var addresses = [];
        }

        $address.autocomplete({
                source: addresses,
                minLength: 0
        });
    });
});
