const { checkSchema, param } = require('express-validator')
const { checkAdminToken, checkStudentToken } = require('../Auth')
const { signup, signin, verifyAccount, resendConfirmationLink, activateAccount, getAccounts, signinAdmin, getEnrollRequests, updateAccount, forgetPassword, resetPassword } = require('../Controllers/AccountControllers')
const { deleteEnrollRequest } = require('../Controllers/StudentControllers')

const router = require('express').Router()

router.post("/signup", checkSchema({
    name: {
        isLength: {
            errorMessage: "name should not be empty",
            options: {
                min: 1
            }
        }
    },
    email: {
        isEmail: {
            errorMessage: "invalid email.",
        }
    },
    password: {
        isLength: {
            errorMessage: "password should be at least 8 chars long.",
            options: {
                min: 8
            }
        }
    },
    course_name: {
        isLength: {
            errorMessage: "course name should not be empty",
            options: {
                min: 1
            }
        }
    }
}), signup)
router.post("/signin", checkSchema({
    email: {
        isEmail: {
            errorMessage: "invalid email.",
        }
    },
    password: {
        isLength: {
            errorMessage: "password should be at least 8 chars long.",
            options: {
                min: 8
            }
        }
    },
}), signin)
router.post("/admin/signin", checkSchema({
    password: {
        isLength: {
            errorMessage: "password should be at least 8 chars long.",
            options: {
                min: 8
            }
        }
    },
}), signinAdmin)
router.post("/resend", resendConfirmationLink)
router.put("/verify", verifyAccount)
router.get("/accounts", checkAdminToken, getAccounts)
router.get("/requests/", checkAdminToken, getEnrollRequests)
router.delete("/requests/:enrollRequest_id", checkAdminToken, param("enrollRequest_id", "invalid enroll request id"), deleteEnrollRequest)
router.put("/account/:account_id", checkStudentToken, param("account_id", "invalid account id"), updateAccount)
router.post("/forget", forgetPassword)
router.put("/reset", resetPassword)

module.exports = router 