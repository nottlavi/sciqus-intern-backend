const express = require("express");
const router = express.Router();

//importing controllers here
const {
  createStudent,
  getStudent,
  getCourseStudents,
  updateStudentDetails,
} = require("../controllers/studentControllers");

router.post("/add", createStudent);
router.get("/get/:student_id", getStudent);
router.get("/get-students/:course_id", getCourseStudents);
router.put("/update/:student_id", updateStudentDetails);

module.exports = router;
