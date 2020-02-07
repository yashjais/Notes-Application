const express = require('express')
const setUpDb = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')

const app = express()
const port = 3020

setUpDb()

app.get('/', (req, res) => {
    res.send('welcome to the website')
})

app.use(cors())
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log('listening to the port', port)
})