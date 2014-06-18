socketio = require 'socket.io'

wildcard = require 'socketio-wildcard'
socketio = socketio()
socketio.use(wildcard())

module.exports = exports =
    onConnection: (socket)->
        socket.emit 'test.hello', {hello: true}
        setTimeout( ->
            socket.emit 'test.old', {msg: 'few seconds after init'}
        , 5000)

        socket.on '*', (wildcardArgs)->
            [name, args...] = wildcardArgs.data
            socket.emit.apply socket, ["server-echo::#{name}"].concat(args)

    start: (server)->
        socketio.on('connection', @onConnection)
        socketio.listen server
