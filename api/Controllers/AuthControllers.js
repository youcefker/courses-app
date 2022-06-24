const { getAccountByEmail, createAccount, getAccount, updateAccount } = require("../Services/AccountService")
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { sendMail } = require("../Services/EmailServices")
const Account = require("../Models/Account")
const ConfirmationToken = require("../Models/ConfirmationToken")
const { createConfirmationToken, getConfirmationToken } = require("../Services/ConfirmationTokenServices")

module.exports = {
    signup: async (req, res) => {
        console.log(req.body)
        await getAccountByEmail(req.body.email, async (err, result) => {
            if(err) {
                console.log("email exists ?", err)
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            if(result){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "Email exist, go to sign in",
                    data: null
                })
            }
            try {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.password, salt)
                const account = {
                    email: req.body.email, 
                    password : hashedPassword, 
                    role: "student"
                }
                await createAccount(account, async (err, student) => {
                    if(err){
                        console.log("create account", err)
                        return res.json({
                            error: true,
                            status: 401, 
                            message: "something went wrong!",
                            data: null
                        })
                    }
                    student.password = undefined
                    student.role = undefined
                    const currentDate = new Date();
                    const expiresAt = new Date(currentDate.getTime() + 15 * 60000);
                    const confirmationToken = new ConfirmationToken({
                        account_id: student.id,
                        token: crypto.randomBytes(16).toString('hex'),
                        expiresAt
                    })
                    await createConfirmationToken(confirmationToken, async (err, savedConfirmationToken) => {
                        if(err){
                            console.log("create confirmation token", err)
                            return res.json({
                                error: true,
                                status: 401, 
                                message: "something went wrong!",
                                data: null
                            })
                        }
                        const body = `<p>http://localhost:3000/verify/${savedConfirmationToken.token}</p>`
                        await sendMail(student.email, "hello@gmail.com", body, async (err, result) => {
                            if(err) {
                                console.log(err)
                                await Account.deleteOne({
                                    id: student.id
                                })
                                return res.json({
                                    error: true,
                                    status: 400, 
                                    message: "Email not sent",
                                    data: null
                                })
                            }
                            return res.json({
                                error: false,
                                status: 201, 
                                message: "Student signed up succesfully",
                                data: student
                            })
                        })
                    })
                })
            } catch(err) {
                console.log(err)
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
        })
    }, 
    signin: async (req, res) => {
        await getAccountByEmail(req.body.email, async (err, account) => {
            if(err){
                if(err) {
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "something went wrong!",
                        data: null
                    })
                }
            }
            if(!account) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "invalid Email or Password.",
                    data: null
                })
            }
            const validPassword = await bcrypt.compare(req.body.password, account.password)
            if(!validPassword){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "invalid Email or Password.",
                    data: null
                })
            }
            if(!account.isVerified){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "Please confirm your account first.",
                    data: null
                })
            }
            const access_token = jwt.sign({
                id: account._id,
                email: account.email
             }, process.env.SECRET_KEY, {expiresIn: '30d'})
            account.password = undefined
            account.role = undefined
            return res.json({
                error: false,
                status: 200, 
                message: "Signed in succesfully.",
                data: account,
                access_token
            })

        })
    },
    signinAdmin: async (req, res) => {
        await getAccountByEmail(req.body.email, async (err, account) => {
            if(err){
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "something went wrong!",
                        data: null
                    })
            }
            if(!account) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "invalid Email or Password.",
                    data: null
                })
            }
            const validPassword = await bcrypt.compare(req.body.password, account.password)
            if(!validPassword){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "invalid Email or Password.",
                    data: null
                })
            }
            const access_token = jwt.sign({
                id: account._id,
                email: account.email
             }, process.env.SECRET_KEY, {expiresIn: '30d'})
            account.password = undefined
            account.role = undefined
            return res.json({
                error: false,
                status: 200, 
                message: "Signed in succesfully.",
                data: account,
                access_token
            })
        })
    },
    resendConfirmationLink: async (req, res) => {
        try {
            await getAccountByEmail(req.body.email, async (err, account) => {
                if(err){
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "something went wrong!",
                        data: null
                    })
                }
                console.log(account)
                if(account.isVerified){
                    return res.json({
                        error: true,
                        status: 400, 
                        message: "Account is already verified",
                        data: null
                    })
                }
                const currentDate = new Date();
                const expiresAt = new Date(currentDate.getTime() + 15 * 60000);
                const confirmationToken = new ConfirmationToken({
                    account_id: account.id,
                    token: crypto.randomBytes(16).toString('hex'),
                    expiresAt
                })
                await createConfirmationToken(confirmationToken, async (err, savedConfirmationToken) => {
                    if(err){
                        return res.json({
                            error: true,
                            status: 401, 
                            message: "something went wrong!",
                            data: null
                        })
                    }
                    const body = `<p>http://localhost:3000/verify/${savedConfirmationToken.token}</p>`
                    await sendMail(account.email, "no-reply@coursesapp.com", body, async (err, result) => {
                        if(err) {
                            console.log(err)
                            await Account.deleteOne({
                                id: account.id
                            })
                            return res.json({
                                error: true,
                                status: 400, 
                                message: "something went wrong!",
                                data: null
                            })
                        }
                        return res.json({
                            error: false,
                            status: 200, 
                            message: "Email sent succesfully.",
                            data: null
                        })
                        })
                    })

            })
        } catch(err) {
            console.log(err)
            return res.json({
                error: true,
                status: 400, 
                message: "something went wrong!",
                data: null
            })
        }
    },
    verifyAccount: async (req, res) => {
        const token = req.body.token
        try {
            await getConfirmationToken(token, async (err, token) => {
                if(err){
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "something went wrong!",
                        data: null
                    })
                }
                if(!token) {
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "token not found!",
                        data: null
                    })
                }
                if(Date.now() > token.expiresAt){
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "token expired.",
                        data: null
                    })
                } 
                await getAccount(token.account_id, async (err, account) => {
                    if(err) {
                        return res.json({
                            error: true,
                            status: 401, 
                            message: "something went wrong!",
                            data: null
                        }) 
                    }
                    if(!account){
                        return res.json({
                            error: true,
                            status: 401, 
                            message: "account might be deleted. token doesn't belong to any account!",
                            data: null
                        })
                    }
                    if(account.isVerified) {
                        return res.json({
                            error: true,
                            status: 401, 
                            message: "Account is already verified",
                            data: null
                        })
                    }
                    const updateData = {
                        isVerified: true
                    }
                    await updateAccount(account.id, updateData, async (err, updatedAccount) => {
                        if(err) {
                            return res.json({
                                error: true,
                                status: 401, 
                                message: "something went wrong!",
                                data: null
                            }) 
                        }
                        updateAccount.password = undefined
                        updateAccount.role = undefined
                        return res.json({
                            error: false,
                            status: 200, 
                            message: "Account is verified Succesfully",
                            data: null
                        })
                    })
                })
            })
        } catch(err) {
            console.log(err)
            return res.json({
                error: true,
                status: 400, 
                message: "something went wrong!",
                data: null
            })
        }
    },
    activateAccount: async (req, res) => {
        const account_id = req.params.account_id
        updateAccount(account_id, { isActive: true }, (err, account) => {
            if(err){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Account is activated Succesfully",
                data: null
            })
        })
    }
}