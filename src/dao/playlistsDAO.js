let playlists

module.exports = class PlaylistsDAO {

  static async injectDB(client) {
      if (users)
          return
      
      try {
          users = await client.db(process.env.DB_NS).collection('playlists')
      } catch (err) {
          console.error(`Unable to establish collection handles in usersDAO: ${err}`)
          throw err
      } 
  }

  static async getPlaylistsByName(name, page = 0, playlistsPerPage = 20) {
    return await playlist
      .find({
        $text: {
          $search: name
        }
      })
      .project({
        score: {
          $meta: 'textScore'
        }
      })
      .sort([
        [
          "score", {
            $meta: 'textScore'
          }
        ]
      ])
      .skip(page * playlistsPerPage)
      .limit(playlistsPerPage)
      .toArray()
  }

  static async getPlaylistById(id) {
    try {
      return await playlists.aggregate(
        [
          {
            $match: {
              _id: ObjectId(id)
            }
          }
        ]
      ).next()
    } catch (err) {
      throw err
    }
  }
}

/**
* @typedef Playlist
* @property {string} name
* @property {string} description
* @property {string[]} content
* @property {Date} creationDate
* @property {Date} lastUpdateDate
*/

/**
* @typedef DAOResponse
* @property {boolean} [success]
* @property {string} [error]
*/