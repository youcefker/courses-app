const express = require("express")
const app = express()
const router = require("express").Router()
const cors = require('cors')
const authRoutes = require("./Routes/AccountRoutes")
const courseRoutes = require("./Routes/CourseRoutes")
const lessonRoutes = require("./Routes/LessonRoutes")
const mongoose = require('mongoose')
require("dotenv").config()
const multer = require('multer');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000
app.use(cors());
const { GridFsStorage } = require('multer-gridfs-storage')
const { addLessonToCourse } = require("./Controllers/CourseControllers")
const crypto = require("crypto");

app.use(express.json())




const MONGO_URL = process.env.MONGO_URL
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/lesson', lessonRoutes)

const getFileStream =  async (filename, gfs, callBack) => {
  gfs.files.find({ filename }).toArray((err, files) => {
      if(!files || files.length === 0){
        return callBack(true)
      }
      var readstream = gfs.createReadStream({
        filename: files[0].filename
      })
      return callBack(false, readstream)
})
}

mongoose.connect(MONGO_URL)
    .then(result => {
        // set up connection to db for file storage
        gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
          bucketName: "uploads"
        });
        const storage = new GridFsStorage({
            db: mongoose.connection.db,
            file: (req, file) => {
              return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                  if (err) {
                    return reject(err);
                  }
                  const filename = buf.toString("hex") + file.originalname;
                  const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                  };
                  resolve(fileInfo);
                });
              });
            }
        });
        const singleUpload = multer({ storage }).single('file');
        console.log(`database connected successfully`)
        const port = process.env.PORT || 3000
        app.post('/api/v1/course/:course_id/lesson', singleUpload, addLessonToCourse)
        app.get('/api/v1/lesson/files/:filename', (req, res) => {
          console.log(req.params.filename)
          const range = req.headers.range;
          const file = gfs
            .find({
              filename: req.params.filename
            })
            .toArray((err, files) => {
              console.log(files)
              if (!files || files.length === 0) {
                return res.status(404).json({
                  err: "no files exist"
                });
              }
              // Create response headers
              const videoSize = files[0].length;
              const start = Number(range.replace(/\D/g, ""));
              const end = videoSize - 1;

              const contentLength = end - start + 1;
              const headers = {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/quicktime",
              };

              // HTTP Status 206 for Partial Content
              res.writeHead(206, headers);
              gfs.openDownloadStreamByName(req.params.filename).pipe(res);
            });
        })
        app.get('/api/v1/lesson/files', (req, res) => {
          if(!gfs) {
            console.log("some error occured, check connection to db");
            res.send("some error occured, check connection to db");
            process.exit(0);
          }
          gfs.find().toArray((err, files) => {
            // check if files
            if (!files || files.length === 0) {
              return res.json({
                files: false
              });
            } else {
              return res.json("index", {
                files: files
              });
            }
          });
        })
        app.listen(port, () => {
            console.log(`server is listening at port ${port}`)
        })
    })
