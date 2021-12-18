const UsersController = require('./users.controller')

module.exports = function (socket, appType) {
    socket.on('users:create', UsersController.create(socket, appType))
    socket.on('users:delete', UsersController.delete(socket, appType))
    socket.on('users:get', UsersController.get(socket, appType))
}