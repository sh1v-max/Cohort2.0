-- Students & Courses Dataset
-- Reusable dataset for practice across multiple phases

CREATE TABLE students_ds (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    enrolled_year INT,
    gpa DECIMAL(3, 2)
);

CREATE TABLE courses_ds (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credits INT,
    instructor VARCHAR(100)
);

CREATE TABLE enrollments_ds (
    enrollment_id INT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    semester VARCHAR(20),
    grade CHAR(1),
    FOREIGN KEY (student_id) REFERENCES students_ds(student_id),
    FOREIGN KEY (course_id) REFERENCES courses_ds(course_id),
    UNIQUE (student_id, course_id, semester)
);

-- Sample Data
INSERT INTO students_ds VALUES
(1, 'Alice Johnson', 'alice@university.edu', 2022, 3.85),
(2, 'Bob Smith', 'bob@university.edu', 2023, 3.45),
(3, 'Charlie Brown', 'charlie@university.edu', 2022, 3.92),
(4, 'Diana Prince', 'diana@university.edu', 2023, 3.56),
(5, 'Eve Wilson', 'eve@university.edu', 2021, 3.78);

INSERT INTO courses_ds VALUES
(101, 'Database Design', 4, 'Dr. Smith'),
(102, 'Web Development', 3, 'Dr. Johnson'),
(103, 'Data Structures', 4, 'Dr. Williams'),
(104, 'Algorithms', 3, 'Dr. Brown'),
(105, 'Machine Learning', 3, 'Dr. Davis');

INSERT INTO enrollments_ds VALUES
(1, 1, 101, 'Fall 2023', 'A'),
(2, 1, 102, 'Fall 2023', 'A'),
(3, 2, 101, 'Fall 2023', 'B'),
(4, 2, 104, 'Fall 2023', 'C'),
(5, 3, 101, 'Fall 2023', 'A'),
(6, 3, 103, 'Fall 2023', 'A'),
(7, 3, 105, 'Spring 2024', 'A'),
(8, 4, 102, 'Fall 2023', 'B'),
(9, 4, 104, 'Fall 2023', 'B'),
(10, 5, 103, 'Fall 2023', 'A');
