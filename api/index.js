const express = require("express")
const app = express()
const cors = require('cors')
const authRoutes = require("./Routes/AuthRoutes")
const mongoose = require('mongoose')
require("dotenv").config()
const port = process.env.PORT || 4000

app.use(express.json())

app.use('/api/v1/auth', authRoutes)

const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL)
    .then(result => {
        console.log(`database connected successfully`)
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`server is listening at port ${port}`)
        })
    })