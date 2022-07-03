const { getAccount } = require("../Services/AccountService");
const jwt = require('jsonwebtoken')
module.exports = {
    checkStudentToken : (req, res, next) => {
        let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers.authorization) {
      token = req.headers.authorization;
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      token = req.body.token;
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
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Something went wrong",
                    data: null
                  });
            }
            if(!account){
                return res.status(400).json({
                    error: true,
                    message: "Invalid Token...",
                    data: null
                });
            }
            if(account.role != "student"){
                return res.status(400).json({
                    error: true,
                    message: "Access Denied! Unauthorized User",
                    data: null
                });
            }
        })
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
    },
    checkAdminToken : (req, res, next) => {
        let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers.authorization) {
      token = req.headers.authorization;
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      token = req.body.token;
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
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Something went wrong",
                    data: null
                  });
            }
            if(!account){
                return res.status(400).json({
                    error: true,
                    message: "Invalid Token...",
                    data: null
                });
            }
            if(account.role != "admin"){
                return res.status(400).json({
                    error: true,
                    message: "Access Denied! Unauthorized User",
                    data: null
                });
            }
        })
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
    },
}