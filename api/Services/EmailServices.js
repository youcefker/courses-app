const nodemailer = require('nodemailer')
module.exports = {
    sendMail: async (to, from, body, callBack) => {
        try {
            let testAccount = await nodemailer.createTestAccount();
    
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "localhost",
                port: 1025,
                secure: false, // true for 465, false for other ports
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            });
    
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: from, // sender address
                to: to, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: body, // html body
            });
            return callBack(false, info)
        } catch(err){
            console.log(err)
            return callBack(true)
        }
    }
} 