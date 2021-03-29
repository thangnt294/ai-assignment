const express = require('express')
const apiRoute = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "client", "build")))

app.use('/api', apiRoute)

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('CONNECTED TO DATABASE')
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})