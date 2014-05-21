socketio = require('socket.io')

module.exports = exports =
    start: (server)->
        @io = socketio.listen server

        @io.sockets.on 'connection', (socket)->
            socket.emit 'test.hello', {hello: true}
            setTimeout( ->
                socket.emit 'test.old', {msg: 'few seconds after init'}
            , 5000)

            socket.on 'echo', (msg)->
                socket.emit 'test.echo', {msg: msg}
