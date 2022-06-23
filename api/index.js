const express = require("express")
const app = express()
const cors = require('cors')
const authRoutes = require("./Routes/AuthRoutes")
const courseRoutes = require("./Routes/CourseRoutes")
const lessonRoutes = require("./Routes/LessonRoutes")
const mongoose = require('mongoose')
require("dotenv").config()
const multer = require('multer');
const Grid = require('gridfs-stream');
const port = process.env.PORT || 4000
const { GridFsStorage } = require('multer-gridfs-storage')

app.use(express.json())


const MONGO_URL = process.env.MONGO_URL
let storage, singleUpload;

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/lesson', lessonRoutes)

mongoose.connect(MONGO_URL)
    .then(result => {
        // set up connection to db for file storage
        Grid.mongo = mongoose.mongo;
        gfs = Grid(mongoose.connection.db);
        storage = new GridFsStorage({
            db: mongoose.connection.db,
            file: (req, file) => {
              return {
                filename: file.originalname
              }
            }
        });
        singleUpload = multer({ storage: storage }).single('file');
        console.log(`database connected successfully`)
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`server is listening at port ${port}`)
        })
    })