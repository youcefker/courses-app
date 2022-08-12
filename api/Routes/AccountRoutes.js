const { checkAdminToken, checkStudentToken } = require('../Auth')
const { signup, signin, verifyAccount, resendConfirmationLink, activateAccount, getAccounts, signinAdmin, getEnrollRequests, updateAccount, forgetPassword, resetPassword } = require('../Controllers/AccountControllers')
const { deleteEnrollRequest } = require('../Services/EnrollRequestService')

const router = require('express').Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/admin/signin", signinAdmin)
router.post("/resend", resendConfirmationLink)
router.put("/verify", verifyAccount)
router.get("/accounts", checkAdminToken, getAccounts)
router.get("/requests/", checkAdminToken, getEnrollRequests)
router.delete("/requests/:enrollRequest_id", checkAdminToken, deleteEnrollRequest)
router.put("/account/:account_id", checkStudentToken, updateAccount)
router.post("/forget", forgetPassword)
router.put("/reset", resetPassword)

module.exports = router 