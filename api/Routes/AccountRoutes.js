const { signup, signin, verifyAccount, resendConfirmationLink, activateAccount, getAccounts } = require('../Controllers/AccountControllers')

const router = require('express').Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/resend", resendConfirmationLink)
router.put("/verify", verifyAccount)
router.put("/activate/:account_id", activateAccount)
router.get("/accounts", getAccounts)

module.exports = router 