const { checkAdminToken, checkStudentToken } = require("../Auth")
const { createMeet, filterMeets, getMeet, updateMeet, deleteMeet, joinMeet, cancelMeet, getStudentMeetings } = require("../Controllers/MeetController")

const router = require("express").Router()

router.post("/", checkAdminToken, createMeet)
router.get("/", checkAdminToken, filterMeets)
router.get("/student", checkStudentToken, getStudentMeetings)
router.get("/:meet_id", checkStudentToken, getMeet)
router.put("/:meet_id", checkAdminToken, updateMeet)
router.delete("/:meet_id", checkAdminToken, deleteMeet)

router.get("/join/:meet_id", checkStudentToken, joinMeet)
router.get("/cancel/:meet_id", checkStudentToken, cancelMeet)

module.exports = router