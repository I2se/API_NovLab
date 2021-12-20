const appTypes = Object.keys(require('../../api_keys.json'))

// TODO
module.exports = function (socket) {
  for (const appType of appTypes) {
    socket.on('to:' + appType, (args) => {
      socket.broadcast.emit('from', appType, args)
    })
  }
}