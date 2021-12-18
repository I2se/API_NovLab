const app = require('./server')
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

    const server = app.listen(port, () => {
        console.log(`NovLab | Listening on port ${port}.`)
    })
    
    const io = require('./api/index')(server)
})