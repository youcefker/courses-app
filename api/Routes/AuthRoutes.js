const { signup, signin, verifyAccount, resendConfirmationLink, activateAccount } = require('../Controllers/AuthControllers')

const router = require('express').Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/resend", resendConfirmationLink)
router.put("/verify", verifyAccount)
router.put("/activate/:account_id", activateAccount)

module.exports = router 