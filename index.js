const express = require('express')
const setUpDb = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')
const path = require('path') 

const app = express()
const port = process.env.PORT || 3020; 

setUpDb()

app.get('/', (req, res) => {
    res.send('welcome to the website')
})

app.use(cors())
app.use(express.json())
app.use('/', router)

app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

app.listen(port, () => {
    console.log('listening to the port', port)
})