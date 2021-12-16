let users

module.exports = class UsersDAO {

    static async injectDB(client) {
        if (users)
            return
        
        try {
            users = await client.db(process.env.DB_NS).collection('users')
        } catch (err) {
            console.error(`Unable to establish collection handles in usersDAO: ${err}`)
        } 
    }

    /**
     * @param {string} discordId
     * @returns {UserInfo | null}
     */
    static async getUser(discordId) {
        return await users.findOne({
            discordId: discordId
        })
    }

    /**
     * @param {UserInfo} userInfo
     */
    static async addUser(userInfo) {
        try {
            await users.insertOne({ 
                discordId: userInfo.discordId
            }, { w: 'majority' })
            return { success: true }
        } catch (err) {
            console.error(`Error occured while adding new user: ${e}`)
            return { error: err }
        }
    }

    /**
     * @param {string} discordId
     * @returns {DAOResponse}
     */
    static async deleteUser(discordId) {
        try {
            await users.deleteOne({ discordId })

            if (!(await this.getUser(discordId))) {
                return { success: true } 
            } else {
                console.error('Deletion unsuccessful')
                return { error: 'Deletion unsuccessful' }
            }
        } catch (err) {
            console.error(`Error occured while deleting new user: ${e}`)
            return { error: err }
        }
    }
}

/**
 * @typedef UserInfo
 * @property {string} discordId
 */

 /**
  * @typedef DAOResponse
  * @property {boolean} [success]
  * @property {string} [error]
  */