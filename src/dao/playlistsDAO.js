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

  /**
   * @property {Playlist} playlist
   * @returns {DAOResponse}
   */
  static async createPlaylist(playlist) {
    try {
        await playlists.insertOne(playlist, { w: 'majority' })
        return { success: true }
    } catch (err) {
        console.error(`Error occured while creating new playlist: ${e}`)
        return { error: err }
    }
  }

  /**
   * @property {string} name
   * @property {number} page
   * @property {number} playlistsPerPage
   * @returns {Playlist[]}
   */
  static async getPlaylistsByName(name, page = 0, playlistsPerPage = 20) {
    return await playlists
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

  /**
   * @property {string} id
   * @returns {Playlist}
   */
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

  static async deletePlaylist(id) {
    try {
        await playlists.deleteOne({ id })

        if (!(await this.getPlaylistById(id))) {
            return { success: true } 
        } else {
            console.error('Deletion unsuccessful')
            return { error: 'Deletion unsuccessful' }
        }
    } catch (err) {
        console.error(`Error occured while deleting playlist: ${e}`)
        return { error: err }
    }
  }

  static async editPlaylist(id, name, description, content, updateDate) {
    try {
      const updateResponse = await playlists.updateOne(
        { 
          _id: ObjectId(id)
        },
        { 
          $set: { 
            name: name,
            description: description,
            content: content,
            lastUpdateDate: updateDate
          } 
      },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update playlist: ${e}`)
      return { error: e }
    }
  }
}

/**
* @typedef Playlist
* @property {string} name
* @property {string} description
* @property {Author} author
* @property {string[]} content
* @property {Date} creationDate
* @property {Date} lastUpdateDate
*/

/**
 * @typedef Author
 * @property {"guild" | "user"} type
 * @property {string} name 
 */

/**
* @typedef DAOResponse
* @property {boolean} [success]
* @property {string} [error]

*/