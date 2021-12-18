const { application } = require('express')
const express = require('express')
const res = require('express/lib/response')

const app = express()

/*
USERS
- ID Discord
(- Playlists )

GUILDS
- QUEUE
- PLAYLIST

*/

// app.use('/api/v1/users')

app.use('*', (req, res) => res.status(404).json({ error: 'not found' }))

module.exports = app