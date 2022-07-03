const { checkAdminToken } = require('../Auth')
const { signup, signin, verifyAccount, resendConfirmationLink, activateAccount, getAccounts, signinAdmin } = require('../Controllers/AccountControllers')
const { getEnrollRequests } = require('../Services/EnrollRequestService')

const router = require('express').Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/admin/signin", signinAdmin)
router.post("/resend", resendConfirmationLink)
router.put("/verify", verifyAccount)
router.get("/accounts",checkAdminToken, getAccounts)
router.get("/requests", checkAdminToken, getEnrollRequests)

module.exports = router 