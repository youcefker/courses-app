const { checkAdminToken, checkStudentToken } = require('../Auth')
const { signup, signin, verifyAccount, resendConfirmationLink, activateAccount, getAccounts, signinAdmin, getEnrollRequests, updateAccount, forgetPassword, resetPassword } = require('../Controllers/AccountControllers')

const router = require('express').Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/admin/signin", signinAdmin)
router.post("/resend", resendConfirmationLink)
router.put("/verify", verifyAccount)
router.get("/accounts", getAccounts)
router.get("/requests", getEnrollRequests)
<<<<<<< HEAD
router.put("/account/:account_id",  updateAccount)
=======
router.put("/account/:account_id", updateAccount)
>>>>>>> 269658785727881df3ab2b54911803adc9794d4b
router.post("/forget", forgetPassword)
router.put("/reset", resetPassword)

module.exports = router 