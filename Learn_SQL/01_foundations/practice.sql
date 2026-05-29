-- =============================================================
-- MODULE 01: SQL FOUNDATIONS - PRACTICE EXERCISES
-- =============================================================
-- Instructions:
-- 1. Try to solve each exercise without looking at solutions
-- 2. Test your query on the sample data
-- 3. Once it works, check the solution below
-- 4. Try variations of the query

-- Setup: Create and populate the students table
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INTEGER,
    enrollment_date DATE,
    gpa DECIMAL(3, 2)
);

DELETE FROM students;
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
-- EXERCISE 1: Basic SELECT
-- =============================================================
-- Write a query to get the names of all students

-- Solution:
-- SELECT name FROM students;


-- =============================================================
-- EXERCISE 2: Multiple Columns
-- =============================================================
-- Get the name, age, and GPA of all students

-- Solution:
-- SELECT name, age, gpa FROM students;


-- =============================================================
-- EXERCISE 3: WHERE - Equality
-- =============================================================
-- Find the student named 'John Smith'

-- Solution:
-- SELECT * FROM students WHERE name = 'John Smith';


-- =============================================================
-- EXERCISE 4: WHERE - Comparison
-- =============================================================
-- Find all students who are older than 22

-- Solution:
-- SELECT name, age FROM students WHERE age > 22;


-- =============================================================
-- EXERCISE 5: WHERE - Multiple Conditions
-- =============================================================
-- Find students who are 21 years old AND have a GPA greater than 3.5

-- Solution:
-- SELECT name, age, gpa FROM students
-- WHERE age = 21 AND gpa > 3.5;


-- =============================================================
-- EXERCISE 6: WHERE - OR Operator
-- =============================================================
-- Find students who are either 20 years old OR have a GPA above 3.8

-- Solution:
-- SELECT name, age, gpa FROM students
-- WHERE age = 20 OR gpa > 3.8;


-- =============================================================
-- EXERCISE 7: WHERE - IN Operator
-- =============================================================
-- Find students who are 21, 22, or 23 years old

-- Solution:
-- SELECT name, age FROM students
-- WHERE age IN (21, 22, 23);


-- =============================================================
-- EXERCISE 8: WHERE - BETWEEN
-- =============================================================
-- Find students with a GPA between 3.5 and 3.8 (inclusive)

-- Solution:
-- SELECT name, gpa FROM students
-- WHERE gpa BETWEEN 3.5 AND 3.8;


-- =============================================================
-- EXERCISE 9: WHERE - LIKE Pattern (Starts With)
-- =============================================================
-- Find all students whose names start with 'J'

-- Solution:
-- SELECT name FROM students WHERE name LIKE 'J%';


-- =============================================================
-- EXERCISE 10: WHERE - LIKE Pattern (Contains)
-- =============================================================
-- Find all students whose names contain 'ia'

-- Solution:
-- SELECT name FROM students WHERE name LIKE '%ia%';


-- =============================================================
-- EXERCISE 11: WHERE - NULL Check
-- =============================================================
-- Find students who have NOT provided an email address

-- Solution:
-- SELECT name FROM students WHERE email IS NULL;


-- =============================================================
-- EXERCISE 12: ORDER BY - Ascending
-- =============================================================
-- Get all students sorted by age (youngest first)

-- Solution:
-- SELECT name, age FROM students ORDER BY age;


-- =============================================================
-- EXERCISE 13: ORDER BY - Descending
-- =============================================================
-- Get all students sorted by GPA (highest first)

-- Solution:
-- SELECT name, gpa FROM students ORDER BY gpa DESC;


-- =============================================================
-- EXERCISE 14: ORDER BY - Multiple Columns
-- =============================================================
-- Get all students sorted by age (oldest first), then by name (A-Z)

-- Solution:
-- SELECT name, age FROM students
-- ORDER BY age DESC, name ASC;


-- =============================================================
-- EXERCISE 15: LIMIT
-- =============================================================
-- Get the top 3 students by GPA

-- Solution:
-- SELECT name, gpa FROM students
-- ORDER BY gpa DESC
-- LIMIT 3;


-- =============================================================
-- EXERCISE 16: LIMIT with OFFSET (Pagination)
-- =============================================================
-- Get students 4-6 when sorted alphabetically by name (offset 3, limit 3)

-- Solution:
-- SELECT name FROM students
-- ORDER BY name
-- LIMIT 3 OFFSET 3;


-- =============================================================
-- EXERCISE 17: DISTINCT
-- =============================================================
-- Get a list of all unique ages in the students table

-- Solution:
-- SELECT DISTINCT age FROM students ORDER BY age;


-- =============================================================
-- EXERCISE 18: Column Aliases
-- =============================================================
-- Get student names and ages, but display them as 'Full Name' and 'Years Old'

-- Solution:
-- SELECT name AS "Full Name", age AS "Years Old" FROM students;


-- =============================================================
-- EXERCISE 19: Calculated Column
-- =============================================================
-- Get student names and their expected graduation year (current year + 4)
-- Assume current year is 2024

-- Solution:
-- SELECT name, 2024 + 4 AS graduation_year FROM students;

-- Better (using actual date function):
-- SELECT name, EXTRACT(YEAR FROM CURRENT_DATE) + 4 AS graduation_year FROM students;


-- =============================================================
-- EXERCISE 20: Complex WHERE + ORDER + LIMIT
-- =============================================================
-- Get the youngest student with a GPA above 3.5
-- Expected: Alice Williams (age 20, GPA 3.2) NO - she has 3.2
--          OR get the one with highest GPA who is youngest

-- Actually, find students with GPA > 3.5, ordered by age, limit 1
-- Solution:
-- SELECT name, age, gpa FROM students
-- WHERE gpa > 3.5
-- ORDER BY age ASC
-- LIMIT 1;


-- =============================================================
-- CHALLENGE EXERCISES
-- =============================================================

-- Challenge 1: Find all students with email addresses sorted by email
-- Solution:
-- SELECT name, email FROM students
-- WHERE email IS NOT NULL
-- ORDER BY email;


-- Challenge 2: Get students who enrolled after 2022-01-01, sorted by enrollment date (newest first)
-- Solution:
-- SELECT name, enrollment_date FROM students
-- WHERE enrollment_date >= '2022-01-01'
-- ORDER BY enrollment_date DESC;


-- Challenge 3: Find students with names longer than 12 characters
-- Solution:
-- SELECT name FROM students
-- WHERE LENGTH(name) > 12;


-- Challenge 4: Get students enrolled in 2021 or 2022, sorted by name
-- Solution:
-- SELECT name, enrollment_date FROM students
-- WHERE enrollment_date LIKE '2021%' OR enrollment_date LIKE '2022%'
-- ORDER BY name;

-- Better solution using BETWEEN:
-- SELECT name, enrollment_date FROM students
-- WHERE enrollment_date >= '2021-01-01' AND enrollment_date < '2023-01-01'
-- ORDER BY name;


-- Challenge 5: Find top 5 students by GPA who are 21 or older
-- Solution:
-- SELECT name, age, gpa FROM students
-- WHERE age >= 21
-- ORDER BY gpa DESC
-- LIMIT 5;


-- =============================================================
-- REAL-WORLD SCENARIOS
-- =============================================================

-- Scenario 1: Dean's List Query
-- Get all students with GPA > 3.7, ordered by GPA descending
SELECT name, gpa FROM students
WHERE gpa > 3.7
ORDER BY gpa DESC;


-- Scenario 2: Student Directory (First 10)
-- Get name and email for first 10 students with emails, ordered by name
SELECT name, email FROM students
WHERE email IS NOT NULL
ORDER BY name
LIMIT 10;


-- Scenario 3: Class Year Report
-- Get students by enrollment year (2020, 2021, 2022, 2023)
SELECT
    EXTRACT(YEAR FROM enrollment_date) AS enrollment_year,
    name,
    age
FROM students
ORDER BY enrollment_date DESC;


-- Scenario 4: Contact List (Non-Email Alerts)
-- Find students without email to send postal mail
SELECT name FROM students
WHERE email IS NULL
ORDER BY name;


-- Scenario 5: Recent Additions
-- Get newest 3 students by enrollment date
SELECT name, enrollment_date FROM students
ORDER BY enrollment_date DESC
LIMIT 3;

-- =============================================================
-- TIPS FOR SUCCESS
-- =============================================================

/*
1. Always start simple: SELECT * FROM table LIMIT 1
2. Add WHERE clause to filter: WHERE condition
3. Add ORDER BY to sort: ORDER BY column
4. Add LIMIT to get top N: LIMIT 10
5. Build queries incrementally - don't try to do everything at once

6. Test your WHERE clause logic:
   - AND requires BOTH conditions true
   - OR requires AT LEAST ONE true
   - NOT reverses the condition

7. Remember the execution order:
   FROM → WHERE → SELECT → ORDER BY → LIMIT
   This affects what you can reference where

8. Use LIMIT 1 or LIMIT 10 while exploring data

9. For LIKE patterns:
   - % = any characters
   - _ = exactly one character

10. Use IS NULL / IS NOT NULL for NULL checks (not = NULL)
*/

-- =============================================================
-- MASTERY CHECK
-- =============================================================

-- Can you write a query that:
-- 1. Selects name and gpa
-- 2. Only includes students with GPA > 3.5
-- 3. Sorted by GPA highest first
-- 4. Shows only the top 5
-- 5. Uses column alias "Student Name"

-- Your answer should look like:
/*
SELECT name AS "Student Name", gpa
FROM students
WHERE gpa > 3.5
ORDER BY gpa DESC
LIMIT 5;
*/
