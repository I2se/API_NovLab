const UsersDAO = require('../dao/usersDAO')
const { response } = require('./utils')

module.exports = class UsersController {

  static async create(socket, appType) {
    return (requestId, discordId) => {
      try {
        if (appType !== 'bot') {
          socket.emit('users:create', response(requestId, 401, { error: 'You are not allowed to do this action.' }))
          return
        }
          
        const userInfo = {
          discordId: discordId,
          creationDate: new Date()
        }

        const insertResult = await UsersDAO.addUser(userInfo)
        if (!insertResult.success) {
          socket.emit('users:create', response(requestId, 400, { error: insertResult.error }))
          return
        }
        const userFromDB = await UsersDAO.getUser(userInfo.discordId)
        if (!userFromDB) {
          socket.emit('users:create', response(requestId, 500, { error: 'Internal error, please try again later.' }))
          return
        }

        socket.emit('users:create', response(requestId, 200, { user: userFromDB }))
      } catch (err) {
        socket.emit('users:create', response(requestId, 500, { error: err }))
      }
    }
  }

  static async delete(socket, appType) {
    return (discordId) => {
      try {
        if (appType !== 'bot') {
          socket.emit('users:delete', response(requestId, 401, { error: 'You are not allowed to do this action.' }))
          return
        }

        const deleteResult = await UsersDAO.deleteUser(discordId)
        if (!deleteResult.success) {
          socket.emit('users:delete', response(requestId, 400, { error: insertResult.error }))
          return
        }

        socket.emit('users:delete', response(requestId, 200))
      } catch (err) {
        socket.emit('users:delete', response(requestId, 500, { error: err }))
      }
    }
  }

  static async get(socket, appType) {
    return (discordId) => {
      try {
        const userFromDB = await UsersDAO.getUser(discordId)
        if (!deleteResult.success) {
          socket.emit('users:get', response(requestId, 400, { error: insertResult.error }))
          return
        }

        socket.emit('users:get', response(requestId, 200, { user: userFromDB }))
      } catch (err) {
        socket.emit('users:get', response(requestId, 500, { error: err }))
      }
    }
    }
  }
}