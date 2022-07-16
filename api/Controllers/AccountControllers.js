const { getAccountByEmail, createAccount, getAccount, updateAccount, getAccounts } = require("../Services/AccountService")
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { sendMail } = require("../Services/EmailServices")
const Account = require("../Models/Account")
const ConfirmationToken = require("../Models/ConfirmationToken")
const { createConfirmationToken, getConfirmationToken } = require("../Services/ConfirmationTokenServices")
const { getCourseByName, getCourse } = require("../Services/CourseServices")
const { createStudent, getStudent, getStudentByName, updateStudent } = require("../Services/StudentService")
const Student = require("../Models/Student")
const { createEnrollRequest, getEnrollRequests, deleteEnrollRequest } = require("../Services/EnrollRequestService")
const { createResetToken, getResetToken } = require("../Services/ResetTokenService")
const ResetToken = require("../Models/ResetToken")

module.exports = {
    signup: async (req, res) => {
        console.log(req.body)
        await getAccountByEmail(req.body.email, async (err, result) => {
            if(err) {
                console.log("email exists ?", err)
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(result){
                return res.status(400).json({
                    error: true,
                    message: "Email exist, go to sign in",
                    data: null
                })
            }
            try {
                if(!req.body.course_name) {
                    return res.status(400).json({
                        error: true, 
                        message: "You need to choose a course.",
                        data: null
                    })
                }
                await getCourseByName(req.body.course_name, async (err, course) => {
                    if(err){
                        return res.json({
                            error: true,
                            status: 401, 
                            message: "something went wrong!",
                            data: null
                        })
                    }
                    if(!course){
                        return res.json({
                            error: true,
                            status: 401, 
                            message: "the course you choose not found!",
                            data: null
                        })
                    }
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(req.body.password, salt)
                    const account = {
                        email: req.body.email, 
                        password : hashedPassword, 
                        role: "student"
                    }
                    await createAccount(account, async (err, account) => {
                        if(err){
                            console.log("create account", err)
                            return res.status(400).json({
                                error: true,
                                message: "something went wrong!",
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
                                console.log("create confirmation token", err)
                                return res.status(400).json({
                                    error: true,
                                    message: "something went wrong!",
                                    data: null
                                })
                            }
                            const body = `<p>http://localhost:3000/verify/${savedConfirmationToken.token}</p>`
                            await sendMail(account.email, "hello@gmail.com", body, async (err, result) => {
                                if(err) {
                                    console.log(err)
                                    await Account.deleteOne({
                                        id: account.id
                                    })
                                    return res.status(400).json({
                                        error: true,
                                        message: "Email not sent",
                                        data: null
                                    })
                                }
                                const studentData = {
                                    name: req.body.name,
                                    courses: [],
                                    progress: []
                                }
                                await createStudent(studentData, async(err, student) => {
                                    if(err){
                                        return res.status(400).json({
                                            error: true,
                                            message: "something went wrong!",
                                            data: null
                                        })
                                    }
                                    const enrollRequestData = {
                                        course_id: course.id,
                                        course_name: course.name,
                                        student_id: student.id,
                                        student_name: student.name
                                    }
                                    await createEnrollRequest(enrollRequestData, async(err, enrollRequest) => {
                                        if(err){
                                            return res.status(400).json({
                                                error: true, 
                                                message: "something went wrong!",
                                                data: null
                                            })
                                        }
                                        try {
                                            console.log("account",account)
                                            account.student = student._id
                                            await account.save()
                                            return res.status(201).json({
                                                error: false, 
                                                message: "Student signed up succesfully. please check your email"
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
                                    
                                })
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
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!account) {
                return res.status(400).json({
                    error: true,
                    message: "invalid Email or Password.",
                    data: null
                })
            }
            if(account.role != "student"){
                return res.status(400).json({
                    error: true,
                    message: "invalid User.",
                    data: null
                })
            }
            const validPassword = await bcrypt.compare(req.body.password, account.password)
            if(!validPassword){
                return res.status(400).json({
                    error: true, 
                    message: "invalid Email or Password.",
                    data: null
                })
            }
            if(!account.isVerified){
                return res.status(400).json({
                    error: true,
                    message: "Please confirm your account first.",
                    data: null
                })
            }
            try {
                const accountWithStudent = await account.populate("student")
                accountWithStudent.role = undefined
                accountWithStudent.isVerified = undefined
                const access_token = jwt.sign({
                    id: account._id,
                    student_id: account.student._id
                 }, process.env.SECRET_KEY, {expiresIn: '30d'})
                return res.status(200).json({
                    error: false, 
                    message: "Signed in succesfully.",
                    data: accountWithStudent,
                    access_token
                })
            } catch(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }

        })
    },
    signinAdmin: async (req, res) => {
        await getAccountByEmail(req.body.email, async (err, account) => {
            if(err){
                    return res.status(400).json({
                        error: true, 
                        message: "something went wrong!",
                        data: null
                    })
            }
            if(!account) {
                return res.status(400).json({
                    error: true,
                    message: "invalid Email or Password.",
                    data: null
                })
            }
            if(account.role != "admin"){
                return res.status(400).son({
                    error: true, 
                    message: "invalid User.",
                    data: null
                })
            }
            const validPassword = await bcrypt.compare(req.body.password, account.password)
            if(!validPassword){
                return res.status(400).json({
                    error: true,
                    message: "invalid Email or Password.",
                    data: null
                })
            }
            const access_token = jwt.sign({
                id: account.id,
             }, process.env.SECRET_KEY, {expiresIn: '30d'})
            account.password = undefined
            account.role = undefined
            return res.status(200).json({
                error: false,
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
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                console.log(account)
                if(account.isVerified){
                    return res.status(400).json({
                        error: true, 
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
                        return res.status(400).json({
                            error: true, 
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
                            return res.status(400).json({
                                error: true,
                                message: "something went wrong!",
                                data: null
                            })
                        }
                        return res.status(200).json({
                            error: false,
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
            await getConfirmationToken(token, async (err, confirmationToken) => {
                if(err){
                    return res.status(400).json({
                        error: true, 
                        message: "something went wrong!",
                        data: null
                    })
                }
                if(!confirmationToken) {
                    return res.status(400).json({
                        error: true,
                        message: "Confirmation token not found!",
                        data: null
                    })
                }
                if(Date.now() > confirmationToken.expiresAt){
                    return res.status(400).json({
                        error: true, 
                        message: "token expired.",
                        data: null
                    })
                } 
                await getAccount(confirmationToken.account_id, async (err, account) => {
                    if(err) {
                        return res.status(400).json({
                            error: true,
                            message: "something went wrong!",
                            data: null
                        }) 
                    }
                    if(!account){
                        return res.status(400).json({
                            error: true, 
                            message: "account might be deleted. token doesn't belong to any account!",
                            data: null
                        })
                    }
                    if(account.isVerified) {
                        return res.status(400).json({
                            error: true,
                            message: "Account is already verified",
                            data: null
                        })
                    }
                    const updateData = {
                        isVerified: true
                    }
                    await updateAccount(account.id, updateData, async (err, updatedAccount) => {
                        if(err) {
                            return res.status(400).json({
                                error: true, 
                                message: "something went wrong!",
                                data: null
                            }) 
                        }
                        updateAccount.password = undefined
                        updateAccount.role = undefined
                        return res.status(200).json({
                            error: false, 
                            message: "Account is verified Succesfully",
                            data: null
                        })
                    })
                })
            })
        } catch(err) {
            console.log(err)
            return res.status(400).json({
                error: true,
                message: "something went wrong!",
                data: null
            })
        }
    },
    getEnrollRequests: async (req, res) => {
        getEnrollRequests((err, enrollRequests) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(enrollRequests.length === 0){
                return res.status(200).json({
                    error: false, 
                    message: "No request found.",
                    data: enrollRequests
                })
            }
            return res.status(200).json({
                error: false, 
                message: "Requests fetched Succesfully",
                data: enrollRequests
            })

        })
    },
    getAccounts : async (req, res) => {
        getAccounts((err, accounts) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if((accounts.length === 0)){
                return res.status(200).json({
                    error: false,
                    message: "No account found!",
                    data: accounts
                })
            }
            return res.status(200).json({
                error: false,
                message: "Accounts fetched Succesfully",
                data: accounts
            })
        })
    }, 
    /*updateProfile: async (req, res) => {
        if(req.body.name){
            const updatedStudent = {
                name: req.body.name,
            }
            updatedStudent(req.params.student_id, (err, resu) => {
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
            })
        }
        let updatedAccount
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            updateAccount.password = hashedPassword
        } 
        if(req.body.email){
            updateAccount.email = req.body.email
            updatedAccount.isVerified = false
        }
        updateAccount(req.decoded._id, updatedAccount, (err, result) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(req.body.email){
                const currentDate = new Date();
                        const expiresAt = new Date(currentDate.getTime() + 15 * 60000);
                        const confirmationToken = new ConfirmationToken({
                            account_id: account.id,
                            token: crypto.randomBytes(16).toString('hex'),
                            expiresAt
                        })
                        await createConfirmationToken(confirmationToken, async (err, savedConfirmationToken) => {
                            if(err){
                                console.log("create confirmation token", err)
                                return res.status(400).json({
                                    error: true,
                                    message: "something went wrong!",
                                    data: null
                                })
                            }
                            const body = `<a href="http://localhost:3000/verify/${savedConfirmationToken.token}">verify</a>`
                            await sendMail(account.email, "hello@gmail.com", body, async (err, result) => {
                                if(err) {
                                    console.log(err)
                                    await Account.deleteOne({
                                        id: account.id
                                    })
                                    return res.status(400).json({
                                        error: true,
                                        message: "Email not sent",
                                        data: null
                                    })
                                }
                            })
                        })
            }
        })
    }*/
    updateAccount: async (req, res) => {
        try {
            console.log(req.params.account_id)
            let updateData = {}
            if(req.body.email){
                updateData.email = req.body.email
                updateData.isVerified = false
            }
            if(req.body.password){
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.password, salt)
                updateData.password = hashedPassword
            }
            updateAccount(req.params.account_id, updateData, async (err, account) => {
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                if(!account) {
                    return res.status(400).json({
                        error: true,
                        message: "Account not found!",
                        data: null
                    })
                }
                if(updateData.email) {
                    const currentDate = new Date();
                        const expiresAt = new Date(currentDate.getTime() + 15 * 60000);
                        const confirmationToken = new ConfirmationToken({
                            account_id: account.id,
                            token: crypto.randomBytes(16).toString('hex'),
                            expiresAt
                        })
                        createConfirmationToken(confirmationToken, async (err, savedConfirmationToken) => {
                            if(err){
                                console.log("create confirmation token", err)
                                return res.status(400).json({
                                    error: true,
                                    message: "something went wrong!",
                                    data: null
                                })
                            }
                            const body = `<a href="http://localhost:3000/verify/${savedConfirmationToken.token}">verify</a>`
                                sendMail(account.email, "hello@gmail.com", body, async (err, result) => {
                                    if(err) {
                                        console.log(err)
                                        return res.status(400).json({
                                            error: true,
                                            message: "Email not sent",
                                            data: null
                                        })
                                    }
                                    account.password = undefined
                                    return res.status(200).json({
                                        error: false,
                                        message: "Account updated Succesfully",
                                        data: account
                                    })    
                    })
                        })
                }
                account.password = undefined
                account.role = undefined
                return res.status(200).json({
                    error: false,
                    message: "Account updated Succesfully",
                    data: account
                })
            })
        } catch(err) {
            console.log(err)
            return res.status(400).json({
                error: true,
                message: "something went wrong!",
                data: null
            })
        }
    },
    forgetPassword: async (req, res) => {
        getAccountByEmail(req.body.email, async (err, account) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!account){
                return res.status(400).json({
                    error: true,
                    message: "no account found!",
                    data: null
                })
            }
            const currentDate = new Date();
            const expiresAt = new Date(currentDate.getTime() + 5 * 60000);
            const resetToken = new ResetToken({
                account_id: account.id,
                token: crypto.randomBytes(16).toString('hex'),
                expiresAt
            })
            createResetToken(resetToken, (err, savedResetToken) => {
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                const body = `<a href="http://localhost:3000/forget/${savedResetToken.token}">verify</a>`
                sendMail(account.email, "hello@gmail.com", body, async (err, result) => {
                    if(err) {
                        console.log(err)
                        return res.status(400).json({
                            error: true,
                            message: "Email not sent",
                            data: null
                        })
                    }
                    return res.status(400).json({
                        error: false,
                        message: "Reset token sent to your email.",
                        data: null
                    })
            })
        })
    })
    },
    resetPassword : async (req, res) => {
        const token = req.body.token 
        getResetToken(token, (err, resetToken) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!resetToken) {
                return res.status(400).json({
                    error: true,
                    message: "resetToken not found!",
                    data: null
                })
            }
            if(Date.now() > resetToken.expiresAt){
                return res.status(400).json({
                    error: true, 
                    message: "token expired.",
                    data: null
                })
            }
            getAccount(resetToken.account_id, async (err, account) => {
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                if(!account){
                    return res.status(400).json({
                        error: true,
                        message: "no account found!",
                        data: null
                    })
                }
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.password, salt)
                const updateData = {
                    password : hashedPassword
                }
                updateAccount(account._id, updateData, (err, result) => {
                    if(err) {
                        return res.status(400).json({
                            error: true,
                            message: "something went wrong!",
                            data: null
                        })
                    }
                    if(!result) {
                        return res.status(400).json({
                            error: true,
                            message: "account not found!",
                            data: null
                        })
                    }
                    return res.status(400).json({
                        error: true,
                        message: "Password updated succesfully",
                        data: null
                    })
                })
            })
        })
    }
}