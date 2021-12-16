const UsersDAO = require('../dao/usersDAO')

class User {

    constructor ({ discordId } = {}) {
        this.discordId = discordId
    }

    toJSON() {
        return {
            discordId: this.discordId
        }
    }
}

class UsersController {

    static async register(req, res) {

    }
}

module.exports = {
    User,

}