const express = require("express");
const router = express.Router();

//importing controllers here
const {
  createStudent,
  getStudent,
  getCourseStudents,
  updateStudentDetails,
  deleteStudent,
  login,
} = require("../controllers/studentControllers");
const { verifyRole } = require("../middlewares/roleMiddleware");
const { isAdmin } = require("../middlewares/verifyToken");

router.post("/add", verifyRole, isAdmin, createStudent);
router.get("/get/:student_id", verifyRole, getStudent);
router.get("/get-students/:course_id", verifyRole, isAdmin, getCourseStudents);
router.put("/update/:student_id", verifyRole, isAdmin, updateStudentDetails);
router.delete("/delete/:student_id", verifyRole, isAdmin, deleteStudent);
router.post("/login", login);

module.exports = router;
