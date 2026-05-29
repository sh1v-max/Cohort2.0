-- =============================================================
-- MODULE 01: SQL FOUNDATIONS - CHALLENGE EXERCISES
-- =============================================================
-- These are harder problems that require combining concepts
-- Think carefully before writing the query

-- Setup
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
-- CHALLENGE 1: Complex Boolean Logic
-- =============================================================
-- Find students who satisfy EITHER condition:
--   Condition A: Enrolled in 2022 AND have GPA > 3.6
--   Condition B: Age >= 23 AND have an email
-- Sort by name

-- Hints:
-- - Use parentheses to group conditions
-- - This requires (cond1 AND cond2) OR (cond3 AND cond4)

SELECT name, age, gpa, enrollment_date, email FROM students
WHERE (EXTRACT(YEAR FROM enrollment_date) = 2022 AND gpa > 3.6)
   OR (age >= 23 AND email IS NOT NULL)
ORDER BY name;


-- =============================================================
-- CHALLENGE 2: Multi-level Filtering
-- =============================================================
-- Get students who:
-- - Are between 20-22 years old (inclusive)
-- - Do NOT have a name starting with 'C' or 'A'
-- - Have an email address
-- Sort by GPA descending, then name ascending

SELECT name, age, gpa FROM students
WHERE age BETWEEN 20 AND 22
  AND name NOT LIKE 'C%' AND name NOT LIKE 'A%'
  AND email IS NOT NULL
ORDER BY gpa DESC, name ASC;


-- =============================================================
-- CHALLENGE 3: Pattern Matching with Multiple Conditions
-- =============================================================
-- Find students whose:
-- - Name contains exactly 2 words (has a space)
-- - Email domain is NOT example.com
-- - GPA is either > 3.8 OR < 3.3
-- Sorted by enrollment date (oldest first)

-- HINT: Use LIKE to find names with spaces

SELECT name, gpa, email FROM students
WHERE name LIKE '% %'  -- Has exactly one space (2 word name)
  AND (email NOT LIKE '%example.com' OR email IS NULL)
  AND (gpa > 3.8 OR gpa < 3.3)
ORDER BY enrollment_date ASC;


-- =============================================================
-- CHALLENGE 4: Sorting by Multiple Criteria
-- =============================================================
-- Get students sorted by:
-- 1. Whether they have an email (email first)
-- 2. By GPA descending
-- 3. By age ascending
-- 4. By name alphabetically

-- HINT: Use CASE to convert NULL to sortable value

SELECT name, age, gpa, email FROM students
ORDER BY
    CASE WHEN email IS NOT NULL THEN 0 ELSE 1 END,
    gpa DESC,
    age ASC,
    name ASC;


-- =============================================================
-- CHALLENGE 5: Pagination with Complex Filtering
-- =============================================================
-- Get page 2 of students (10 per page):
-- - Only include GPA > 3.5
-- - Only include those with email
-- - Sorted alphabetically by name
-- Page 2 means skip first 10, get next 10

SELECT name, gpa, email FROM students
WHERE gpa > 3.5 AND email IS NOT NULL
ORDER BY name
LIMIT 10 OFFSET 10;


-- =============================================================
-- CHALLENGE 6: Exclude Specific Values
-- =============================================================
-- Find all students EXCEPT those:
-- - Named 'John Smith' or 'Jane Doe'
-- - With age 23
-- - Enrolled in 2021
-- Sort by age descending

SELECT name, age, enrollment_date FROM students
WHERE name NOT IN ('John Smith', 'Jane Doe')
  AND age != 23
  AND EXTRACT(YEAR FROM enrollment_date) != 2021
ORDER BY age DESC;


-- =============================================================
-- CHALLENGE 7: Negation of Complex Condition
-- =============================================================
-- Find students who DO NOT match this profile:
-- "Anyone with GPA > 3.7 who enrolled after 2021-12-31"
-- Sort by enrollment date

-- This requires finding the opposite
SELECT name, gpa, enrollment_date FROM students
WHERE NOT (gpa > 3.7 AND enrollment_date > '2021-12-31')
ORDER BY enrollment_date;

-- Alternative using De Morgan's Law:
-- NOT (A AND B) = (NOT A) OR (NOT B)
-- SELECT name, gpa, enrollment_date FROM students
-- WHERE gpa <= 3.7 OR enrollment_date <= '2021-12-31'
-- ORDER BY enrollment_date;


-- =============================================================
-- CHALLENGE 8: Range and Pattern Combination
-- =============================================================
-- Find students where:
-- - Enrolled between 2021-01-01 and 2023-12-31
-- - Name length is between 8 and 15 characters
-- - Email contains either 'example' OR has no email
-- - Age is not 22

SELECT
    name,
    LENGTH(name) AS name_length,
    age,
    email
FROM students
WHERE enrollment_date BETWEEN '2021-01-01' AND '2023-12-31'
  AND LENGTH(name) BETWEEN 8 AND 15
  AND (email LIKE '%example%' OR email IS NULL)
  AND age != 22
ORDER BY enrollment_date DESC;


-- =============================================================
-- CHALLENGE 9: Handling Edge Cases
-- =============================================================
-- The tricky one: Find students where BOTH are true:
-- 1. Name contains a space AND name is longer than 10 chars
-- 2. Either no email OR email ends with '.com'
--
-- What makes this tricky?
-- - First part requires pattern AND length check
-- - Second part is tricky with NULL (NULL OR anything is unknown)

SELECT name, email FROM students
WHERE name LIKE '% %' AND LENGTH(name) > 10
  AND (email IS NULL OR email LIKE '%.com');


-- =============================================================
-- CHALLENGE 10: Pagination with Multiple Sort Criteria
-- =============================================================
-- Scenario: Showing "Featured Students" on a website
-- Get students 4-7 (page 2, size 4) from:
-- - All students with email
-- - Sorted: GPA DESC, then Name ASC
-- Note: Your LIMIT 4 OFFSET 3 applies AFTER the WHERE and ORDER BY

SELECT name, gpa, email FROM students
WHERE email IS NOT NULL
ORDER BY gpa DESC, name ASC
LIMIT 4 OFFSET 3;


-- =============================================================
-- CHALLENGE 11: Real-World Scenario 1 - Data Audit
-- =============================================================
-- Find potential data quality issues:
-- - Students without email who enrolled recently (2023)
-- - Students with unusual ages (< 18 or > 30)
-- Sort by issue severity, then name

SELECT name, age, email, enrollment_date FROM students
WHERE (email IS NULL AND EXTRACT(YEAR FROM enrollment_date) = 2023)
   OR age < 18 OR age > 30
ORDER BY
    CASE
        WHEN email IS NULL THEN 1
        WHEN age < 18 OR age > 30 THEN 2
    END,
    name;


-- =============================================================
-- CHALLENGE 12: Real-World Scenario 2 - Reporting
-- =============================================================
-- Generate a report of high-achieving students:
-- Include: Young (< 22), High GPA (> 3.7), with Email
-- Show top 10 by GPA
-- Format with aliases for readability

SELECT
    name AS "Student Name",
    age AS "Age",
    gpa AS "GPA",
    email AS "Email Address",
    EXTRACT(YEAR FROM enrollment_date) AS "Enrollment Year"
FROM students
WHERE age < 22 AND gpa > 3.7 AND email IS NOT NULL
ORDER BY gpa DESC
LIMIT 10;


-- =============================================================
-- CHALLENGE 13: NOT and Complex Conditions
-- =============================================================
-- Find students that DON'T fit the mold:
-- - NOT (enrolled in 2022 AND gpa > 3.5)
-- - NOT (age between 20 and 22)
-- Order by oldest to youngest

SELECT name, age, gpa, enrollment_date FROM students
WHERE NOT (EXTRACT(YEAR FROM enrollment_date) = 2022 AND gpa > 3.5)
  AND NOT (age BETWEEN 20 AND 22)
ORDER BY age DESC;


-- =============================================================
-- CHALLENGE 14: Building a Complex Query Step by Step
-- =============================================================
-- This is how professionals build queries:
-- Start simple, add one condition at a time

-- Step 1: Get all students
SELECT name, age, gpa, email FROM students;

-- Step 2: Filter by age
SELECT name, age, gpa, email FROM students
WHERE age > 21;

-- Step 3: Add GPA filter
SELECT name, age, gpa, email FROM students
WHERE age > 21 AND gpa > 3.5;

-- Step 4: Add email requirement
SELECT name, age, gpa, email FROM students
WHERE age > 21 AND gpa > 3.5 AND email IS NOT NULL;

-- Step 5: Sort and limit
SELECT name, age, gpa, email FROM students
WHERE age > 21 AND gpa > 3.5 AND email IS NOT NULL
ORDER BY gpa DESC
LIMIT 5;


-- =============================================================
-- CHALLENGE 15: Interview-Style Question
-- =============================================================
-- "Write a query to get students for our scholarship program.
--  We want:
--  - Recent students (last 2 years)
--  - High achievers (GPA > 3.7)
--  - Contact info needed (has email)
--  - Sorted by GPA (best first)
--  - Show top 20"

SELECT
    name AS student_name,
    gpa,
    email,
    enrollment_date
FROM students
WHERE EXTRACT(YEAR FROM enrollment_date) >= EXTRACT(YEAR FROM CURRENT_DATE) - 1
  AND gpa > 3.7
  AND email IS NOT NULL
ORDER BY gpa DESC
LIMIT 20;


-- =============================================================
-- BONUS: Try to Explain These
-- =============================================================

-- What does this return and why?
SELECT name FROM students
WHERE age > 22 AND gpa > 3.8
ORDER BY enrollment_date DESC
LIMIT 3;

-- What's the difference between these?
SELECT * FROM students WHERE age IN (21, 22, 23);
SELECT * FROM students WHERE age BETWEEN 21 AND 23;
-- (They give the same results for integers)

-- Why would this return nothing?
SELECT * FROM students WHERE email = NULL;
-- (NULL is not equal to anything, including NULL)

-- What makes this query problematic?
SELECT * FROM students
WHERE EXTRACT(YEAR FROM enrollment_date) = 2022
ORDER BY name
LIMIT 100 OFFSET 200;
-- (OFFSET 200 skips 200 rows, but only ~2 students in 2022)


-- =============================================================
-- MASTERY LEVEL: Can You Solve These Without Hints?
-- =============================================================

-- 1. Find all students whose full name is 13 characters exactly

-- 2. Get students who enrolled after 2021 but are aged 21-23 or have GPA > 3.8

-- 3. Find students with names that don't contain any vowels in the first word
--    (Hint: tricky - likely no results with current data)

-- 4. Get the 3rd page of students (10 per page) who have emails,
--    sorted by name, ordered descending by enrollment date

-- 5. Find students where the domain of their email is NOT 'example.com'
--    (Tricky with NULL emails)
