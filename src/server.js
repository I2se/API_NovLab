const express = require('express')

const app = express()

/*
USERS
- ID Discord
(- Playlists )

GUILDS
- QUEUE
- PLAYLIST

*/

//app.use('/api/v1/users')
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }))

module.exports = app