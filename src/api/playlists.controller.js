const PlaylistsDAO = require('../dao/playlistsDAO')
const { response } = require('./utils')

module.exports = class PlaylistsController {

  static create(socket, appType) {
    return async (requestId, author, name, description, content) => {
      try {
        const playlist = {
          name: name,
          description: description,
          author: author,
          content: content
        }

        const insertResult = await PlaylistsDAO.createPlaylist(playlist)
        if (!insertResult.success) {
          socket.emit('playlists:create', response(requestId, 400, { error: insertResult.error }))
          return
        }
        const playlistFromDB = await PlaylistsDAO.getPlaylistById(insertResult.insertedId)
        if (!playlistFromDB) {
          socket.emit('playlists:create', response(requestId, 500, { error: 'Internal error, please try again later.' }))
          return
        }

        socket.emit('playlists:create', response(requestId, 200, { user: playlistFromDB }))
      } catch (err) {
        socket.emit('playlists:create', response(requestId, 500, { error: err }))
      }
    }
  }
}
