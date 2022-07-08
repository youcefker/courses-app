const { getAccountByEmail, createAccount, getAccount, updateAccount, getAccounts } = require("../Services/AccountService")
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { sendMail } = require("../Services/EmailServices")
const Account = require("../Models/Account")
const ConfirmationToken = require("../Models/ConfirmationToken")
const { createConfirmationToken, getConfirmationToken } = require("../Services/ConfirmationTokenServices")
const { getCourseByName, getCourse } = require("../Services/CourseServices")
const { createStudent, getStudent, getStudentByName } = require("../Services/StudentService")
const Student = require("../Models/Student")
const { createEnrollRequest, getEnrollRequests, deleteEnrollRequest } = require("../Services/EnrollRequestService")

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
            const access_token = jwt.sign({
                id: account._id
             }, process.env.SECRET_KEY, {expiresIn: '30d'})
            try {
                const accountWithStudent = await account.populate("student")
                accountWithStudent.password = undefined
                accountWithStudent.role = undefined
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
            await getConfirmationToken(token, async (err, token) => {
                if(err){
                    return res.status(400).json({
                        error: true, 
                        message: "something went wrong!",
                        data: null
                    })
                }
                if(!token) {
                    return res.status(400).json({
                        error: true,
                        message: "token not found!",
                        data: null
                    })
                }
                if(Date.now() > token.expiresAt){
                    return res.status(400).json({
                        error: true, 
                        message: "token expired.",
                        data: null
                    })
                } 
                await getAccount(token.account_id, async (err, account) => {
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
    }
}