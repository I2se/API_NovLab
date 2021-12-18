const socketIO = require('socket.io')
const api_keys = require('../../api_keys.json')

const heartbeat = require('../heartbeat')
const users = require('../users')

module.exports = function (server) {
    const io = socketIO(server)

    io.use((socket, next) => {
        try {
            const { app_type, api_key} = socket.handshake.auth

            if (api_keys[app_type] !== undefined) {
                if (api_keys[app_type].includes(api_key)) {
                    next()
                } else {
                    next(new Error('Api key not valid.'))
                }
            } else {
                next(new Error('App type not valid.'))
            }
        } catch (err) {
            next(new Error('Error while authenticating: ' + err))
        }
    })
    
    io.on('connection', (socket) => {
        heartbeat(socket)
        users(socket, socket.handshake.auth.app_type)
    })

    return io
}