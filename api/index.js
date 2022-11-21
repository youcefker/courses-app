const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

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



//----- middlewares -----
require('dotenv').config({ silent: true });
app.use("/api/v1/images", express.static("uploads/images"))
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
  .catch(err => {
    console.log("can't connect to database")
  })
