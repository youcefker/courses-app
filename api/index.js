const express = require("express")
const app = express()
const cors = require('cors')
const multer = require('multer');
const mongoose = require('mongoose')
const { GridFsStorage } = require('multer-gridfs-storage')

//----- virtual meeting tool packages -----
const server = require("http").Server(app)
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");

//----- import routes -------
const authRoutes = require("./Routes/AccountRoutes")
const courseRoutes = require("./Routes/CourseRoutes")
const lessonRoutes = require("./Routes/LessonRoutes")
const studentRoutes = require("./Routes/StudentRoutes")
const chapterRoutes = require("./Routes/ChapterRoutes")
const meetRoutes = require("./Routes/MeetRoutes")

//----- controllers if needed -----
const { addLessonToCourse } = require("./Controllers/CourseControllers")
const crypto = require("crypto");
const { checkAdminToken, checkStudentToken } = require("./Auth");
const { createAccount } = require("./Services/AccountService");



//----- middlewares -----
require('dotenv').config({ silent: true });
app.use(cors());
app.use(express.json())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/lesson', lessonRoutes)
app.use('/api/v1/student', studentRoutes)
app.use('/api/v1/chapter', chapterRoutes)
app.use('/api/v1/meet', meetRoutes)

//----- virtual meeting tool setup -----
const peerServer = ExpressPeerServer(server, { // Here we are actually defining our peer server that we want to host
  debug: true,
});

app.use("/peerjs", peerServer);

io.on("connection", (socket) => { // When a user coonnects to our server
  socket.on("join-room", (roomId, id, myname) => { // When the socket a event 'join room' event
      socket.join(roomId); // Join the roomid
      socket.to(roomId).broadcast.emit("user-connected", id, myname);// emit a 'user-connected' event to tell all the other users
      // in that room that a new user has joined

      socket.on("messagesend", (message) => { 
          console.log(message);
          io.to(roomId).emit("createMessage", message);
      });

      socket.on("tellName", (myname) => {
          console.log(myname);
          socket.to(roomId).broadcast.emit("AddName", myname);
      });

      socket.on("disconnect", () => { // When a user disconnects or leaves
          socket.to(roomId).broadcast.emit("user-disconnected", id);
      });
  });
});
//----- env -----
const MONGO_URL = process.env.MONGO_URL
//MONGO_URL = "mongodb://localhost:27017/courses"
mongoose.connect(MONGO_URL)
  .then(result => {
    // set up connection to db for file storage
    console.log(`database connected successfully`)
    const port = process.env.PORT || 4000
    //app.post('/api/v1/course/:course_id/lesson', checkAdminToken, singleUpload, addLessonToCourse)
    /*app.get('/api/v1/lesson/files/:filename', (req, res) => {
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
      if (!gfs) {
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
    })*/
    app.listen(port, () => {
      const admin = {
        email: "admin@admin.com",
        password: "$2a$10$q9fLVhmOEBOWHKizLnYbSOBp6.14P.oLrWbIDsko1rrcgQXcdFY5u",
        role: "admin"
      }
      // createAccount(admin, (err, account) => {
      //   if (err) {
      //     console.log(err)
      //   }
      //   console.log("admin created successfully")
      // })
      console.log(`server is listening at port ${port}`)
    })
  })
