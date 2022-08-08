const nodemailer = require("nodemailer")
const sgTransport = require('nodemailer-sendgrid-transport');

module.exports = {
  sendMail : (to, from, body, callBack) => {
    var options = {
      auth: {
        api_key: process.env.SENDGRID_API_KEY
      }
    }
    
    var client = nodemailer.createTransport(sgTransport(options));
    
    var email = {
      from,
      to,
      subject: 'Confirm your account',
      text: 'Hello,',
      html: body
    };
    
    client.sendMail(email, function(err, info){
        if (err ){
          console.log(err)
          return callBack(true)
        }
        else {
          console.log(info)
          return callBack(false, info)
        }
    });
  }
}