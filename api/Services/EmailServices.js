const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")

module.exports = {
  sendMail : (to, from, body, callBack) => {
    const mailgunAuth = {
      auth: {
        api_key: "5e442170964c5a8bc60bf4f1710ef1b8-1b3a03f6-ed8f68f8",
        domain: "investinsmart.com"
      }
    }
    
    const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))
    
    const mailOptions = {
      from,
      to,
      subject: "Confirm your Investinsmart account",
      html: body
    }
    
    smtpTransport.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log(error)
        return callBack(true)
      } else {
        return callBack(false, response)
      }
    })
  }
}