const { signup, signin, verifyAccount, resendConfirmationLink } = require('../Controllers/AuthControllers')

const router = require('express').Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/resend", resendConfirmationLink)
router.get("/verify", verifyAccount)

module.exports = router