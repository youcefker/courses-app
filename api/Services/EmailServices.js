const nodemailer = require('nodemailer')
const mg = require("nodemailer-mailgun-transport")
module.exports = {
    sendMail: async (to, from, body, callBack) => {
        try {
            const mailgunAuth = {
                auth: {
                  api_key: "cc452de491c929915a10994843cf9867-18e06deb-6e302648",
                  domain: "sandboxf03f5c1e49764f9fbeba5ebcfed76422.mailgun.org"
                }
              }
              
              const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))
              
              const mailOptions = {
                from,
                to,
                subject: "Investinsmart email verification",
                html: body
              }
              
              smtpTransport.sendMail(mailOptions, function(error, response) {
                if (error) {
                    return callBack(true)
                } else {
                    return callBack(false, response)
                }
              })
        } catch(err){
            console.log(err)
            return callBack(true)
        }
    }
} 