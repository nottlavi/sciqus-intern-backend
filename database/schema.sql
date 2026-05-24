CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(255),
    course_code VARCHAR(100) UNIQUE,
    course_duration INTEGER
);

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(20) DEFAULT 'student',
    course_id INTEGER REFERENCES courses(course_id)
);

ALTER TABLE students
ADD CONSTRAINT valid_role
CHECK (role IN ('admin', 'student'));

INSERT INTO courses (course_name, course_code, course_duration)
VALUES
('MERN Stack', 'MERN101', 6),
('Data Science', 'DS201', 8),
('Cyber Security', 'CS301', 12);