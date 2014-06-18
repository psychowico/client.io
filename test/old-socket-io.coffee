socketio = require 'socket.io'

wildcard = require 'socket.io-wildcard'
socketio = wildcard(socketio)

module.exports = exports =
    onConnection: (socket)->
        socket.emit 'test.hello', {hello: true}
        setTimeout( ->
            socket.emit 'test.old', {msg: 'few seconds after init'}
        , 5000)

        socket.on '*', (wildcardArgs)->
            {name, args} = wildcardArgs
            socket.emit.apply socket, ["server-echo::#{name}"].concat(args)

    start: (server)->
        @io = socketio.listen(server)
        # disable too verbose logs for version < 1.0
        @io.set('log level', 1)
        @io.sockets.on('connection', @onConnection)
