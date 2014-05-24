node_static = require 'node-static'
http        = require 'http'
testServer  = require './test/index.coffee'

tests_enabled = false
process.argv.forEach (val, index, array)->
  tests_enabled = true if val is 'test'

page = new node_static.Server './app/'
server = http.createServer (req, res)->
    req.addListener('end', ->
        page.serve req, res
    ).resume()
server.listen 8080

testServer.start server if tests_enabled
