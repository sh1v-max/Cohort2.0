-- =============================================================
-- MODULE 01: SQL FOUNDATIONS - PRACTICAL EXAMPLES
-- =============================================================
-- This file contains working examples you can run directly
-- Each example is commented to explain what's happening

-- =============================================================
-- SETUP: Create sample data to work with
-- =============================================================

-- Create the students table
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INTEGER,
    enrollment_date DATE,
    gpa DECIMAL(3, 2)
);

-- Insert sample data
DELETE FROM students; -- Clear any existing data

INSERT INTO students VALUES
(1, 'John Smith', 'john@example.com', 22, '2022-09-15', 3.8),
(2, 'Jane Doe', 'jane@example.com', 21, '2022-09-20', 3.9),
(3, 'Bob Johnson', 'bob@example.com', 23, '2021-09-10', 3.5),
(4, 'Alice Williams', 'alice@example.com', 20, '2023-09-01', 3.2),
(5, 'Charlie Brown', 'charlie@example.com', 22, '2022-08-15', 3.6),
(6, 'Diana Davis', 'diana@example.com', 21, '2022-10-05', 3.7),
(7, 'Eve Wilson', NULL, 25, '2020-09-01', 3.9),
(8, 'Frank Miller', 'frank@example.com', 23, '2021-09-15', 3.4);

-- =============================================================
-- EXAMPLE 1: Basic SELECT - All Columns
-- =============================================================

-- Returns everything
SELECT * FROM students;

-- Output:
--  id | name           | email                | age | enrollment_date | gpa
-- ----+----------------+----------------------+-----+-----------------+-----
--   1 | John Smith     | john@example.com     |  22 | 2022-09-15      | 3.80
--   2 | Jane Doe       | jane@example.com     |  21 | 2022-09-20      | 3.90
--   ... etc


-- =============================================================
-- EXAMPLE 2: SELECT Specific Columns
-- =============================================================

-- Only get name and email
SELECT name, email FROM students;

-- Output:
--  name           | email
-- ----------------+----------------------
--  John Smith     | john@example.com
--  Jane Doe       | jane@example.com
--  ... etc

-- Get 3 columns in specific order
SELECT name, age, email FROM students;


-- =============================================================
-- EXAMPLE 3: WHERE - Equality
-- =============================================================

-- Find students who are exactly 22
SELECT name, age FROM students WHERE age = 22;

-- Output:
--  name           | age
-- ----------------+-----
--  John Smith     |  22
--  Charlie Brown  |  22


-- =============================================================
-- EXAMPLE 4: WHERE - Comparison Operators
-- =============================================================

-- Students older than 22
SELECT name, age FROM students WHERE age > 22;

-- Output:
--  name          | age
-- ----------------+-----
--  Bob Johnson   |  23
--  Eve Wilson    |  25
--  Frank Miller  |  23

-- Students 21 or older
SELECT name, age FROM students WHERE age >= 21;

-- Students younger than 22
SELECT name, age FROM students WHERE age < 22;

-- Students NOT 22
SELECT name, age FROM students WHERE age != 22;
-- Alternative: WHERE age <> 22;


-- =============================================================
-- EXAMPLE 5: WHERE - Logical AND
-- =============================================================

-- Students 21 AND GPA > 3.7
SELECT name, age, gpa FROM students
WHERE age = 21 AND gpa > 3.7;

-- Output:
--  name     | age | gpa
-- ----------+-----+-----
--  Jane Doe |  21 | 3.90

-- Multiple conditions (all must be true)
SELECT name, age, gpa FROM students
WHERE age > 21 AND gpa > 3.5 AND enrollment_date > '2022-01-01';


-- =============================================================
-- EXAMPLE 6: WHERE - Logical OR
-- =============================================================

-- Students who are 22 OR have GPA > 3.8
SELECT name, age, gpa FROM students
WHERE age = 22 OR gpa > 3.8;

-- Output:
--  name           | age | gpa
-- ----------------+-----+-----
--  John Smith     |  22 | 3.80
--  Jane Doe       |  21 | 3.90
--  Charlie Brown  |  22 | 3.60
--  Eve Wilson     |  25 | 3.90


-- =============================================================
-- EXAMPLE 7: WHERE - Complex Conditions (AND + OR)
-- =============================================================

-- (Age 22 AND GPA > 3.5) OR (Age > 23)
SELECT name, age, gpa FROM students
WHERE (age = 22 AND gpa > 3.5) OR (age > 23);

-- Note: Parentheses determine the order of operations


-- =============================================================
-- EXAMPLE 8: WHERE - IN Operator
-- =============================================================

-- Students with specific ages
SELECT name, age FROM students
WHERE age IN (21, 22, 23);

-- Output:
--  name           | age
-- ----------------+-----
--  John Smith     |  22
--  Jane Doe       |  21
--  Bob Johnson    |  23
--  ... etc

-- Instead of: WHERE age = 21 OR age = 22 OR age = 23;

-- Find specific students by name
SELECT name, email FROM students
WHERE name IN ('John Smith', 'Jane Doe', 'Alice Williams');


-- =============================================================
-- EXAMPLE 9: WHERE - BETWEEN Operator
-- =============================================================

-- Ages between 20 and 22 (inclusive)
SELECT name, age FROM students
WHERE age BETWEEN 20 AND 22;

-- Output:
--  name           | age
-- ----------------+-----
--  John Smith     |  22
--  Jane Doe       |  21
--  Alice Williams |  20
--  Charlie Brown  |  22
--  Diana Davis    |  21


-- =============================================================
-- EXAMPLE 10: WHERE - LIKE Pattern Matching
-- =============================================================

-- Names starting with 'J'
SELECT name FROM students WHERE name LIKE 'J%';

-- Output:
--  name
-- -----------
--  John Smith
--  Jane Doe

-- Names ending with 'son'
SELECT name FROM students WHERE name LIKE '%son';

-- Output:
--  name
-- -----------
--  Bob Johnson

-- Names containing 'lia'
SELECT name FROM students WHERE name LIKE '%lia%';

-- Output:
--  name
-- -----------
--  Alice Williams

-- Email addresses from example.com domain
SELECT name, email FROM students
WHERE email LIKE '%@example.com';

-- 3 character first names
SELECT name FROM students WHERE name LIKE '_____ %';


-- =============================================================
-- EXAMPLE 11: WHERE - IS NULL
-- =============================================================

-- Students without emails (email is NULL)
SELECT name, email FROM students WHERE email IS NULL;

-- Output:
--  name       | email
-- -----------+-------
--  Eve Wilson | NULL

-- Students WITH email addresses
SELECT name, email FROM students WHERE email IS NOT NULL;

-- IMPORTANT: This is WRONG (returns nothing):
-- SELECT name FROM students WHERE email = NULL;


-- =============================================================
-- EXAMPLE 12: ORDER BY - Ascending (Default)
-- =============================================================

-- Sort by age (youngest to oldest)
SELECT name, age FROM students ORDER BY age;

-- Output:
--  name           | age
-- ----------------+-----
--  Alice Williams |  20
--  Jane Doe       |  21
--  Diana Davis    |  21
--  John Smith     |  22
--  Charlie Brown  |  22
--  Bob Johnson    |  23
--  Frank Miller   |  23
--  Eve Wilson     |  25


-- =============================================================
-- EXAMPLE 13: ORDER BY - Descending
-- =============================================================

-- Sort by age (oldest to youngest)
SELECT name, age FROM students ORDER BY age DESC;

-- Sort by GPA (highest first)
SELECT name, gpa FROM students ORDER BY gpa DESC;

-- Output:
--  name       | gpa
-- -----------+-----
--  Jane Doe   | 3.90
--  Eve Wilson | 3.90
--  John Smith | 3.80
--  Diana Davis| 3.70
--  Charlie... | 3.60
--  Bob Johnson| 3.50
--  Alice...   | 3.20


-- =============================================================
-- EXAMPLE 14: ORDER BY - Multiple Columns
-- =============================================================

-- Sort by age (DESC), then by name (ASC)
SELECT name, age FROM students
ORDER BY age DESC, name ASC;

-- Output: Oldest to youngest, within each age, alphabetical
--  name           | age
-- ----------------+-----
--  Eve Wilson     |  25
--  Bob Johnson    |  23
--  Frank Miller   |  23
--  Charlie Brown  |  22
--  John Smith     |  22
--  Diana Davis    |  21
--  Jane Doe       |  21
--  Alice Williams |  20


-- =============================================================
-- EXAMPLE 15: ORDER BY with WHERE
-- =============================================================

-- Students with GPA > 3.5, sorted by GPA DESC
SELECT name, gpa FROM students
WHERE gpa > 3.5
ORDER BY gpa DESC;

-- Filtering happens FIRST, then sorting

-- Students named John or Jane, sorted by age
SELECT name, age FROM students
WHERE name LIKE 'J%'
ORDER BY age;


-- =============================================================
-- EXAMPLE 16: LIMIT - Get Top N
-- =============================================================

-- Top 3 students by GPA
SELECT name, gpa FROM students
ORDER BY gpa DESC
LIMIT 3;

-- Output:
--  name       | gpa
-- -----------+-----
--  Jane Doe   | 3.90
--  Eve Wilson | 3.90
--  John Smith | 3.80

-- First 5 students (no specific order)
SELECT name FROM students LIMIT 5;


-- =============================================================
-- EXAMPLE 17: LIMIT + OFFSET - Pagination
-- =============================================================

-- Get rows 1-3
SELECT name, age FROM students
ORDER BY name
LIMIT 3 OFFSET 0;

-- Get rows 4-6 (skip first 3)
SELECT name, age FROM students
ORDER BY name
LIMIT 3 OFFSET 3;

-- Get rows 7-9 (skip first 6)
SELECT name, age FROM students
ORDER BY name
LIMIT 3 OFFSET 6;

-- Pagination formula: OFFSET = (page_number - 1) * page_size
-- Page 1 with size 3: LIMIT 3 OFFSET 0
-- Page 2 with size 3: LIMIT 3 OFFSET 3
-- Page 3 with size 3: LIMIT 3 OFFSET 6


-- =============================================================
-- EXAMPLE 18: DISTINCT - Unique Values
-- =============================================================

-- How many different ages?
SELECT DISTINCT age FROM students
ORDER BY age;

-- Output:
--  age
-- -----
--   20
--   21
--   22
--   23
--   25

-- Unique (age, gpa) combinations
SELECT DISTINCT age, gpa FROM students
ORDER BY age;


-- =============================================================
-- EXAMPLE 19: COUNT DISTINCT
-- =============================================================

-- How many unique ages?
SELECT COUNT(DISTINCT age) FROM students;

-- Output:
--  count
-- -------
--      5

-- How many students per unique age?
-- (This uses GROUP BY - covered in Module 04)
SELECT age, COUNT(*) FROM students GROUP BY age;


-- =============================================================
-- EXAMPLE 20: Column Aliases (AS)
-- =============================================================

-- Rename columns in output
SELECT
    name AS student_name,
    age AS student_age,
    gpa AS grade_point_average
FROM students;

-- With expressions
SELECT
    name,
    age,
    age + 4 AS age_at_graduation
FROM students;

-- Concatenate columns
SELECT
    name,
    email,
    CONCAT(name, ' <', email, '>') AS contact_info
FROM students
WHERE email IS NOT NULL;


-- =============================================================
-- EXAMPLE 21: Table Aliases
-- =============================================================

-- Shorter name in queries
SELECT s.name, s.age, s.gpa FROM students s;

-- Same as: SELECT name, age, gpa FROM students AS s;

-- Useful when joining tables (shown later):
-- SELECT s.name, c.title FROM students s
-- JOIN courses c ON s.id = c.student_id;


-- =============================================================
-- EXAMPLE 22: Complex Query - Combining Everything
-- =============================================================

-- Get top 3 students by GPA who enrolled in 2022
SELECT
    name AS student_name,
    gpa AS grade_point_average,
    enrollment_date
FROM students
WHERE enrollment_date >= '2022-01-01' AND enrollment_date < '2023-01-01'
ORDER BY gpa DESC
LIMIT 3;

-- Output:
--  student_name | grade_point_average | enrollment_date
-- ---------------+--------------------+-----------------
--  Jane Doe     |               3.90 | 2022-09-20
--  John Smith   |               3.80 | 2022-09-15
--  Diana Davis  |               3.70 | 2022-10-05


-- =============================================================
-- EXAMPLE 23: Practical Use Cases
-- =============================================================

-- Use Case 1: Find all honors students (GPA > 3.7)
SELECT name, gpa FROM students
WHERE gpa > 3.7
ORDER BY gpa DESC;

-- Use Case 2: Search by partial email
SELECT name, email FROM students
WHERE email LIKE '%example.com';

-- Use Case 3: Students who need to provide an email
SELECT name FROM students
WHERE email IS NULL;

-- Use Case 4: Youngest students
SELECT name, age FROM students
ORDER BY age ASC
LIMIT 5;

-- Use Case 5: Pagination - Page 2 (10 per page)
SELECT name, age FROM students
ORDER BY name
LIMIT 10 OFFSET 10;


-- =============================================================
-- EXERCISES: Try these queries yourself
-- =============================================================

-- Exercise 1: Get all students 21 or older
-- Expected: 7 rows

-- Exercise 2: Find students with GPA between 3.5 and 3.8
-- Expected: 3 rows

-- Exercise 3: Get names of students enrolled in 2021
-- Expected: 2 rows

-- Exercise 4: Top 5 students by enrollment date (newest first)
-- Expected: 5 rows

-- Exercise 5: Students whose names contain 'li'
-- Expected: 1 row (Alice Williams)

-- See practice.sql for more exercises!
