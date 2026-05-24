const pool = require("../config/db");

exports.createStudent = async (req, res) => {
  try {
    const { student_name, course_id } = req.body;

    const result = await pool.query(
      "SELECT * FROM courses WHERE course_id = $1",
      [course_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no such course exists",
      });
    }

    const newStudent = await pool.query(
      "INSERT INTO students (student_name, course_id) VALUES ($1, $2) RETURNING *",
      [student_name, course_id],
    );

    return res.status(200).json({
      success: true,
      message: "new student created successfully",
      student: newStudent.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const { student_id } = req.params;

    const result = await pool.query(
      "SELECT students.student_id,students.student_name,courses.course_name,courses.course_code FROM students JOIN courses ON students.course_id = courses.course_id WHERE students.student_id = $1",
      [student_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no such student exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "student details fetched",
      student: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: err.message,
    });
  }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const { course_id } = req.params;

    const result1 = await pool.query(
      "SELECT courses.course_id, courses.course_name, courses.course_code FROM courses WHERE courses.course_id = $1",
      [course_id],
    );

    const result2 = await pool.query(
      "SELECT students.student_id, students.student_name FROM students JOIN courses ON students.course_id = courses.course_id WHERE courses.course_id = $1",
      [course_id],
    );

    if (result1.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no such course found",
      });
    }

    if (result2.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "no students enrolled in the course",
      });
    }

    return res.status(200).json({
      success: true,
      message: "course students fetched successfully",
      course: result1.rows[0],
      students: result2.rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: err,
    });
  }
};

exports.updateStudentDetails = async (req, res) => {
  try {
    const { student_id } = req.params;
    const { new_student_name, new_course_id } = req.body;

    if (!student_id) {
      return res.status(403).json({
        success: false,
        message: "student id required to proceed with the request",
      });
    }

    const student = await pool.query(
      "SELECT * FROM students WHERE student_id = $1",
      [student_id],
    );

    if (student.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no such student exists",
      });
    }

    const updatedStudentName = new_student_name || student.rows[0].student_name;
    const updatedCourseId = new_course_id || student.rows[0].course_id;

    const course = await pool.query(
      "SELECT * FROM courses WHERE course_id = $1",
      [updatedCourseId],
    );

    if (course.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no such course exists",
      });
    }

    const result = await pool.query(
      "UPDATE students SET student_name = $1,course_id = $2 WHERE student_id = $3 RETURNING *",
      [updatedStudentName, updatedCourseId, student_id],
    );

    return res.status(200).json({
      success: true,
      message: "student updated successfully",
      result: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: err.message,
    });
  }
};
