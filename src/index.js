const app = require('./server')
const http = require('http').Server(app)
const io = require('./api')(http)
const { MongoClient } = require('mongodb')
const UsersDAO = require('./dao/usersDAO')

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.DB_URI
)
.catch(err => {
    console.error(err.stack)
    process.exit()
})
.then(async client => {
    // Init DAO
    await UsersDAO.injectDB(client)

    app.listen(port, () => {
        console.log(`NovLab | Listening on port ${port}.`)
    })
})