"use strict";

namespace ('clientio', function () {
    $(function () {
        $('#modal-server-chose').dialog({
            autoOpen: true,
            dialogClass: "no-close",
            width: 400,
            height: 250,
            modal: true,
            buttons: {
                "Connect": {
                    id: "modal-connect-button",
                    text: "Connect",
                    click:  function () {
                                var addres = $('#server-address').val();

                                if ($.trim(addres) !== '') {
                                    $(this).dialog(clientio.tryConnect(addres));
        
                                } else {
                                    alert('Empty server address!');
                                }
                            }
                }   
            }
        });

        $('#server-address').keypress(function (key) {
            if (key.which == 13) {
                    $('#modal-connect-button').focus().click();
                }
        });

        var prevAddress = clientio.readcookie('last-connect');

        if (prevAddress) {
            $('#server-address').val(prevAddress);
        }
    });
});
