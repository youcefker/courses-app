const { getAccount } = require("../Services/AccountService");
const jwt = require('jsonwebtoken');
const { getStudentCourses } = require("../Controllers/StudentControllers");
module.exports = {
  checkStudentToken: (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];
    }
    console.log("token", token)

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        console.log(decoded)
        if (err) {
          return res.status(401).json({
            error: true,
            success: false,
            message: "Invalid Token...",
            data: null
          });
        } else {
          getAccount(decoded.id, (err, account) => {
            if (err) {
              return res.status(400).json({
                error: true,
                message: "Something went wrong",
                data: null
              });
            }
            if (!account) {
              return res.status(400).json({
                error: true,
                message: "Invalid Token...",
                data: null
              });
            }
            if (account.role != "student" && account.role != "admin") {
              return res.status(400).json({
                error: true,
                message: "Access Denied! Unauthorized User",
                data: null
              });
            }
            req.decoded = { ...decoded, email: account.email, student_id: account.student, role: account.role };
            next();
          })
        }
      });
    } else {
      return res.status(401).json({
        error: true,
        success: false,
        message: "Access Denied! Unauthorized User",
        data: {},
      });
    }
  },
  checkAdminToken: (req, res, next) => {
    let token;
    console.log(token)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        console.log(decoded)
        if (err) {
          return res.status(401).json({
            error: true,
            success: false,
            message: "Invalid Token...",
            data: null
          });
        } else {
          getAccount(decoded.id, (err, account) => {
            if (err) {
              return res.status(400).json({
                error: true,
                message: "Something went wrong",
                data: null
              });
            }
            if (!account) {
              return res.status(400).json({
                error: true,
                message: "Invalid Token...",
                data: null
              });
            }
            if (account.role != "admin") {
              return res.status(401).json({
                error: true,
                message: "Access Denied! Unauthorized User",
                data: null
              });
            }
            console.log(req.decoded)
            req.decoded = decoded;
            next();
          })
        }
      });
    } else {
      console.log("Access Denied! Unauthorized User")
      return res.status(401).json({
        error: true,
        success: false,
        message: "Access Denied! Unauthorized User",
        data: {},
      });
    }
  },
  checkToken: (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];
    }
    console.log("token", token)

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        console.log(decoded)
        if (err) {
          return res.status(401).json({
            error: true,
            success: false,
            message: "Invalid Token...",
            data: null
          });
        } else {
          getAccount(decoded.id, (err, account) => {
            if (err) {
              return res.status(400).json({
                error: true,
                message: "Something went wrong",
                data: null
              });
            }
            if (!account) {
              return res.status(400).json({
                error: true,
                message: "Invalid Token...",
                data: null
              });
            }
            if (account.role != "student" && account.role != "admin") {
              return res.status(400).json({
                error: true,
                message: "Access Denied! Unauthorized User",
                data: null
              });
            }
          })
          console.log(req.decoded)
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({
        error: true,
        success: false,
        message: "Access Denied! Unauthorized User",
        data: {},
      });
    }
  }
}