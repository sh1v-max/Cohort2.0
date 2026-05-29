# Module 01: SQL Foundations - Theory & Concepts

## Part 1: What is a Database?

### File vs. Database

**Traditional Files (Bad for data):**
```
students.txt:
John,john@example.com,22,3.8
Jane,jane@example.com,21,3.9
Bob,bob@example.com,23,3.5
```

Problems:
- How do you find all students over 22?
- How do you find by email?
- What if someone has a comma in their name?
- Multiple programs reading/writing causes conflicts
- No transactions (atomicity)
- Scaling is difficult

**Database (Good for data):**
```sql
SELECT * FROM students WHERE age > 22;
-- Returns properly structured data
-- Handles complex queries
-- Enforces data types
-- Manages concurrent access
-- Provides security
```

### What is a Relational Database?

A database that organizes data into **related tables**.

**Example Structure:**
```
students table:
┌────┬──────┬─────────────────┬─────┐
│ id │ name │ email           │ age │
├────┼──────┼─────────────────┼─────┤
│ 1  │ John │ john@example.com│ 22  │
│ 2  │ Jane │ jane@example.com│ 21  │
└────┴──────┴─────────────────┴─────┘

courses table:
┌────┬──────────────────┬───────┐
│ id │ title            │ code  │
├────┼──────────────────┼───────┤
│ 1  │ Databases 101    │ CS101 │
│ 2  │ Web Development  │ CS102 │
└────┴──────────────────┴───────┘

enrollments table (links students to courses):
┌────┬────────────┬───────────┐
│ id │ student_id │ course_id │
├────┼────────────┼───────────┤
│ 1  │ 1          │ 1         │
│ 2  │ 2          │ 1         │
│ 3  │ 1          │ 2         │
└────┴────────────┴───────────┘
```

---

## Part 2: ACID Properties (Overview)

**A - Atomicity:** Transaction is all or nothing
```sql
-- Both succeed or both fail (never partial)
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
-- If server crashes, both rollback
```

**C - Consistency:** Data remains valid
```sql
-- Foreign keys prevent orphaned records
-- NOT NULL constraints are enforced
-- Check constraints validate data
```

**I - Isolation:** Transactions don't interfere
```sql
-- User A updating doesn't affect User B's read
-- Each transaction sees a consistent snapshot
```

**D - Durability:** Committed data survives crashes
```sql
-- COMMIT writes to disk
-- Data persists even if power fails
```

---

## Part 3: SQL Query Structure

### The Basic SELECT Statement

```sql
SELECT columns
FROM table
WHERE conditions
ORDER BY columns
LIMIT n OFFSET m;
```

**Order of Execution (important!):**
1. FROM - Which table
2. WHERE - Filter rows
3. SELECT - Choose columns
4. ORDER BY - Sort results
5. LIMIT/OFFSET - Paginate results

**Example:**
```sql
SELECT name, age
FROM students
WHERE age > 20
ORDER BY age DESC
LIMIT 10;
```

Order of execution:
1. FROM students - Get all student rows
2. WHERE age > 20 - Keep only those over 20
3. SELECT name, age - Pick these columns
4. ORDER BY age DESC - Sort oldest to youngest
5. LIMIT 10 - Give me first 10

---

## Part 4: SELECT Column Specifications

### Select All Columns
```sql
SELECT * FROM students;
```
Returns all columns (avoid in production, specify needed columns)

### Select Specific Columns
```sql
SELECT name, email, age FROM students;
```
Only returns these three columns

### Calculate Expressions
```sql
SELECT name, age, age + 5 AS age_in_5_years FROM students;
```
Expressions are evaluated but don't modify original data

### Concatenate Strings
```sql
SELECT name, email, 
       CONCAT(name, ' (', email, ')') AS contact
FROM students;
```

---

## Part 5: WHERE Clause - Filtering

### Comparison Operators

```sql
-- Equal
SELECT * FROM students WHERE age = 21;

-- Not equal
SELECT * FROM students WHERE age != 21;
-- OR: SELECT * FROM students WHERE age <> 21;

-- Greater than
SELECT * FROM students WHERE age > 21;

-- Less than
SELECT * FROM students WHERE age < 21;

-- Greater than or equal
SELECT * FROM students WHERE age >= 21;

-- Less than or equal
SELECT * FROM students WHERE age <= 21;
```

### Logical Operators

```sql
-- AND - Both conditions true
SELECT * FROM students 
WHERE age > 20 AND gpa > 3.5;

-- OR - At least one condition true
SELECT * FROM students 
WHERE age > 20 OR gpa > 3.8;

-- NOT - Reverse condition
SELECT * FROM students 
WHERE NOT (age > 20);
-- Same as: WHERE age <= 20;

-- Combining multiple conditions
SELECT * FROM students 
WHERE (age > 20 AND gpa > 3.5) 
   OR (age > 25 AND gpa > 3.0);
```

### IN Operator

```sql
-- Instead of: WHERE age = 21 OR age = 22 OR age = 23
SELECT * FROM students WHERE age IN (21, 22, 23);

-- Find specific students
SELECT * FROM students WHERE name IN ('John', 'Jane', 'Bob');
```

### BETWEEN Operator

```sql
-- Inclusive range
SELECT * FROM students WHERE age BETWEEN 20 AND 25;
-- Same as: WHERE age >= 20 AND age <= 25;
```

### LIKE Pattern Matching

```sql
-- Starts with 'J'
SELECT * FROM students WHERE name LIKE 'J%';
-- % means "any characters"

-- Ends with 'n'
SELECT * FROM students WHERE name LIKE '%n';

-- Contains 'oh'
SELECT * FROM students WHERE name LIKE '%oh%';

-- Specific pattern (3 characters, starts with J)
SELECT * FROM students WHERE name LIKE 'J__';
-- _ means "exactly one character"

-- Email contains domain
SELECT * FROM students WHERE email LIKE '%@example.com';
```

### NULL Handling

```sql
-- Is NULL (missing data)
SELECT * FROM students WHERE phone IS NULL;

-- Is NOT NULL
SELECT * FROM students WHERE phone IS NOT NULL;

-- IMPORTANT: NULL != NULL (NULL is unknown, not a value)
SELECT * FROM students WHERE age = NULL; -- Returns nothing!
SELECT * FROM students WHERE age IS NULL; -- Correct!
```

---

## Part 6: ORDER BY - Sorting

### Basic Sorting

```sql
-- Ascending (default)
SELECT name, age FROM students ORDER BY age;
-- Sorts 18, 19, 20, 21...

-- Descending
SELECT name, age FROM students ORDER BY age DESC;
-- Sorts 25, 24, 23, 22...

-- Ascending explicitly
SELECT name, age FROM students ORDER BY age ASC;
```

### Multiple Column Sorting

```sql
-- Sort by age descending, then by name ascending
SELECT name, age FROM students 
ORDER BY age DESC, name ASC;

-- Results for ages 22, 21, 20:
-- All 22-year-olds listed alphabetically
-- Then all 21-year-olds alphabetically
-- Then all 20-year-olds alphabetically
```

### Sorting by Calculated Columns

```sql
-- Sort by expression
SELECT name, age, age * 2 AS double_age
FROM students
ORDER BY age * 2 DESC;

-- Sort by column position (avoid, use column name)
SELECT name, age FROM students ORDER BY 2 DESC;
-- 2 means "second column" (age)
```

---

## Part 7: LIMIT and OFFSET

### LIMIT - Top N Results

```sql
-- Get first 5 students
SELECT name, age FROM students LIMIT 5;

-- Useful for "top 10" queries
SELECT name, gpa FROM students 
ORDER BY gpa DESC 
LIMIT 10;
```

### OFFSET - Skip N Results

```sql
-- Skip first 10, get next 5 (pagination)
SELECT name, age FROM students 
LIMIT 5 OFFSET 10;

-- Results: rows 11-15
-- Useful for: Page 3 of results (if page size is 5)
```

### Pagination Pattern

```sql
-- Page 1 (rows 1-10)
SELECT * FROM students LIMIT 10 OFFSET 0;

-- Page 2 (rows 11-20)
SELECT * FROM students LIMIT 10 OFFSET 10;

-- Page N
-- OFFSET = (N - 1) * page_size
-- OFFSET = (page_number - 1) * 10;
SELECT * FROM students LIMIT 10 OFFSET ?;
```

---

## Part 8: DISTINCT - Unique Values

### Get Unique Values

```sql
-- How many different ages?
SELECT DISTINCT age FROM students;
-- Returns each age once, even if multiple students have it

-- Unique email domains
SELECT DISTINCT SUBSTRING(email FROM '@' FOR 100) 
FROM students;
```

### Count Distinct

```sql
-- How many unique ages?
SELECT COUNT(DISTINCT age) FROM students;
-- Different from: SELECT COUNT(*) FROM (SELECT DISTINCT age...)
```

### DISTINCT with Multiple Columns

```sql
-- Unique combinations
SELECT DISTINCT age, gpa FROM students;
-- Returns each (age, gpa) combination once
```

---

## Part 9: Aliases

### Column Aliases

```sql
-- Rename column in output
SELECT name AS student_name, age AS student_age FROM students;

-- Without AS (implicit)
SELECT name student_name, age student_age FROM students;

-- For calculated columns
SELECT name, age * 2 AS double_age FROM students;

-- Useful in output/reports
SELECT 
    name AS "Student Name",
    email AS "Email Address",
    gpa AS "GPA"
FROM students;
```

### Table Aliases

```sql
-- Shorten table name (useful for joins)
SELECT s.name, s.age FROM students AS s;

-- Without AS
SELECT s.name, s.age FROM students s;

-- For clarity in joins (covered later)
SELECT s.name, c.title 
FROM students s
JOIN courses c ON s.id = c.student_id;
```

---

## Part 10: Common Mistakes

### ❌ Wrong Order
```sql
-- WRONG: WHERE can't see ORDER BY aliases
SELECT name AS student_name 
FROM students 
WHERE student_name = 'John';
-- Error: column student_name doesn't exist

-- RIGHT:
SELECT name AS student_name 
FROM students 
WHERE name = 'John';
```

### ❌ NULL Comparison
```sql
-- WRONG:
SELECT * FROM students WHERE age = NULL;
-- Returns nothing (NULL != NULL)

-- RIGHT:
SELECT * FROM students WHERE age IS NULL;
```

### ❌ Using * with Joins
```sql
-- WRONG in production (gets duplicate columns):
SELECT * FROM students 
JOIN courses ON students.id = courses.student_id;

-- RIGHT: Specify needed columns:
SELECT s.name, c.title FROM students s
JOIN courses c ON s.id = c.student_id;
```

---

## Summary

The SELECT statement is the foundation of SQL. Master it before moving to more complex queries.

**Key Takeaways:**
1. FROM → WHERE → SELECT → ORDER BY → LIMIT
2. WHERE filters rows, SELECT chooses columns
3. Use IS NULL, not = NULL
4. LIMIT 10 OFFSET 20 for pagination
5. DISTINCT removes duplicates
6. Aliases make queries readable

