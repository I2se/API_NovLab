const PlaylistsController = require('./playlists.controller')

module.exports = function (socket, appType) {
    socket.on('playlists:create', PlaylistsController.create(socket, appType))
    socket.on('playlists:delete', PlaylistsController.delete(socket, appType))
    socket.on('playlists:get', PlaylistsController.get(socket, appType))
    socket.on('playlists:getbyname', PlaylistsController.getByName(socket, appType))
    socket.on('playlists:edit', PlaylistsController.edit(socket, appType))
}