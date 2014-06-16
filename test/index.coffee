socketio = require 'socket.io'

# only socket.io < 1.0 have version attribute
oldVersion = socketio.version?
if oldVersion
    wildcard = require 'socket.io-wildcard'
    socketio = wildcard(socketio)
else
    wildcard = require 'socketio-wildcard'
    socketio = socketio()
    socketio.use(wildcard())

module.exports = exports =
    onConnection: (socket)->
        socket.emit 'test.hello', {hello: true}
        setTimeout( ->
            socket.emit 'test.old', {msg: 'few seconds after init'}
        , 5000)

        socket.on 'echo', (msg)->
            socket.emit 'test.echo', {msg: msg}

        socket.on '*', (wildcardArgs)->
            {name, args} = wildcardArgs
            socket.emit.apply socket, ["#{name}.echo"].concat(args)


    start: (server)->
        if oldVersion
            @io = socketio.listen(server)
            # disable too verbose logs for version < 1.0
            @io.set('log level', 1) if oldVersion
            @io.sockets.on('connection', @onConnection)
        else
            socketio.on('connection', @onConnection)
            socketio.listen server
