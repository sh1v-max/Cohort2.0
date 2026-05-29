# Top 100 SQL Interview Questions for Backend Developers

## Section 1: Basics (Questions 1-15)

### Q1: What is SQL? What are its main purposes?
**Answer:**
SQL stands for Structured Query Language. It's used to:
- Create databases and tables (DDL)
- Insert, update, delete data (DML)
- Query and retrieve data efficiently
- Enforce data integrity constraints
- Control access to data

### Q2: What's the difference between SQL and databases?
**Answer:**
- SQL is a language (tool)
- Database is a storage system that uses SQL
- Analogy: SQL is English, Database is the library

### Q3: What are Primary Keys?
**Answer:**
A Primary Key uniquely identifies each row in a table:
- Must be unique (no duplicates)
- Cannot contain NULL values
- Only one per table
- Automatically indexed for fast search
- Used by Foreign Keys for relationships

### Q4: What are Foreign Keys?
**Answer:**
A Foreign Key links a column to the Primary Key of another table:
- Maintains referential integrity
- Prevents orphaned records
- Enforces relationships between tables
- Allows cascading operations (DELETE CASCADE)

Example:
```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### Q5: What's the difference between Primary Key and Unique Key?
**Answer:**
| Aspect | Primary Key | Unique Key |
|--------|------------|-----------|
| NULL allowed | No | Yes |
| Uniqueness | Yes | Yes |
| Count per table | 1 | Multiple |
| Purpose | Identifier | Prevent duplicates |

### Q6: What are constraints?
**Answer:**
Rules that ensure data integrity:
- PRIMARY KEY
- FOREIGN KEY
- UNIQUE
- NOT NULL
- DEFAULT
- CHECK (custom conditions)

### Q7: What is referential integrity?
**Answer:**
A system that ensures Foreign Key relationships are valid:
- Every FK value must exist in referenced table
- Prevents invalid relationships
- Example: Can't create order for non-existent customer

### Q8: What's the difference between UNIQUE and NOT NULL constraints?
**Answer:**
- NOT NULL: Must have a value, but can repeat
- UNIQUE: Must be different, but can be NULL (multiple NULLs allowed)

### Q9: What are the types of relationships?
**Answer:**
- 1:1 (One-to-One) - Use UNIQUE FK
- 1:N (One-to-Many) - Standard FK
- N:N (Many-to-Many) - Junction table with 2 FKs

### Q10: What is a junction table?
**Answer:**
A table that connects two tables in a many-to-many relationship:
```sql
CREATE TABLE student_courses (
    student_id INT FK,
    course_id INT FK,
    PRIMARY KEY (student_id, course_id)
);
```

### Q11: What is normalization?
**Answer:**
Process of organizing data to reduce redundancy:
- 1NF: Atomic values, no repeating groups
- 2NF: 1NF + all non-key attributes depend on entire PK
- 3NF: 2NF + no transitive dependencies

### Q12: What's the benefit of normalization?
**Answer:**
- Reduces data duplication
- Improves data consistency
- Easier to update data
- Saves storage space
- Prevents anomalies

### Q13: What's denormalization and when would you use it?
**Answer:**
Intentionally repeating data for performance:
- Use when: Complex queries are slow
- Trade: Storage space for query speed
- Example: Store customer city in orders table

### Q14: What's an ER Diagram?
**Answer:**
Entity-Relationship Diagram - visual representation of database:
- Rectangles = entities/tables
- Lines = relationships
- Shows cardinality (1:1, 1:N, N:N)

### Q15: What's the purpose of transactions?
**Answer:**
ACID compliance:
- Atomicity: All or nothing
- Consistency: Valid state to valid state
- Isolation: No interference
- Durability: Persists after commit

---

## Section 2: DML - Data Manipulation (Questions 16-40)

### Q16: What's the difference between INSERT, UPDATE, and DELETE?
**Answer:**
- INSERT: Add new rows
- UPDATE: Modify existing rows
- DELETE: Remove rows

### Q17: What's an INNER JOIN?
**Answer:**
Returns only rows with matches in both tables:
```sql
SELECT * FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;
```
Shows only customers who have orders.

### Q18: What's a LEFT JOIN?
**Answer:**
Returns all rows from left table + matching rows from right:
```sql
SELECT * FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;
```
Shows all customers, even those without orders.

### Q19: What's a RIGHT JOIN?
**Answer:**
Returns matching rows from left + all rows from right:
```sql
SELECT * FROM customers c
RIGHT JOIN orders o ON c.customer_id = o.customer_id;
```

### Q20: What's a FULL OUTER JOIN?
**Answer:**
Returns all rows from both tables:
```sql
SELECT * FROM customers c
FULL OUTER JOIN orders o ON c.customer_id = o.customer_id;
```

### Q21: What's a SELF JOIN?
**Answer:**
Join a table with itself (usually for hierarchical data):
```sql
SELECT e.name, m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;
```

### Q22: What's the difference between JOIN and INNER JOIN?
**Answer:**
They're the same. JOIN is shorthand for INNER JOIN.

### Q23: What's a CROSS JOIN?
**Answer:**
Produces Cartesian product (all combinations):
```sql
SELECT * FROM customers CROSS JOIN products;
```
If 5 customers and 10 products → 50 rows.

### Q24: What's a subquery?
**Answer:**
A query within another query:
```sql
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

### Q25: What's a correlated subquery?
**Answer:**
Subquery that references outer query:
```sql
SELECT name FROM employees e1
WHERE salary > (
    SELECT AVG(salary) FROM employees e2
    WHERE e1.department = e2.department
);
```

### Q26: What's the difference between IN and EXISTS?
**Answer:**
Both check for existence, but:
- IN: Evaluates all values (slower)
- EXISTS: Stops at first match (faster)

Prefer EXISTS for large datasets.

### Q27: What's a UNION?
**Answer:**
Combines results from multiple queries (removes duplicates):
```sql
SELECT name FROM customers
UNION
SELECT name FROM employees;
```

### Q28: What's the difference between UNION and UNION ALL?
**Answer:**
- UNION: Removes duplicates (slower)
- UNION ALL: Keeps duplicates (faster)

### Q29: What does GROUP BY do?
**Answer:**
Groups rows by specified column(s) for aggregation:
```sql
SELECT department, AVG(salary)
FROM employees
GROUP BY department;
```

### Q30: What's the difference between WHERE and HAVING?
**Answer:**
- WHERE: Filters rows BEFORE grouping
- HAVING: Filters groups AFTER grouping

```sql
SELECT department, AVG(salary)
FROM employees
WHERE hire_year = 2023
GROUP BY department
HAVING AVG(salary) > 60000;
```

### Q31: What are aggregate functions?
**Answer:**
- COUNT(*) - number of rows
- SUM() - total
- AVG() - average
- MIN() - minimum
- MAX() - maximum

### Q32: Can you use aggregate functions in WHERE clause?
**Answer:**
No! Use HAVING clause instead:
```sql
-- WRONG:
SELECT name FROM employees WHERE COUNT(*) > 5;

-- RIGHT:
SELECT department, COUNT(*) as count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```

### Q33: What does DISTINCT do?
**Answer:**
Removes duplicate rows:
```sql
SELECT DISTINCT country FROM customers;
```
Shows each country once.

### Q34: What does ORDER BY do?
**Answer:**
Sorts results (ascending by default):
```sql
SELECT * FROM employees
ORDER BY salary DESC;  -- Descending
```

### Q35: What does LIMIT do?
**Answer:**
Restricts number of rows returned:
```sql
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 10;  -- Top 10
```

### Q36: What does OFFSET do?
**Answer:**
Skips specified number of rows (pagination):
```sql
SELECT * FROM employees
LIMIT 10 OFFSET 20;  -- Skip 20, get next 10
```

### Q37: What's the difference between NULL and empty string?
**Answer:**
- NULL: No value assigned
- Empty string '': String with length 0

```sql
SELECT * FROM customers WHERE email IS NULL;  -- Correct
SELECT * FROM customers WHERE email = NULL;   -- Wrong (always false)
```

### Q38: What's the difference between COUNT(*) and COUNT(column_name)?
**Answer:**
- COUNT(*): Counts all rows (including NULLs)
- COUNT(column): Counts non-NULL values

### Q39: How do you handle NULLs in queries?
**Answer:**
Use IS NULL or IS NOT NULL:
```sql
SELECT * FROM employees WHERE manager_id IS NULL;
SELECT * FROM employees WHERE manager_id IS NOT NULL;
```

### Q40: What's COALESCE function?
**Answer:**
Returns first non-NULL value:
```sql
SELECT COALESCE(phone, email, 'No contact') as contact
FROM customers;
```

---

## Section 3: Advanced Queries (Questions 41-60)

### Q41: What's a window function?
**Answer:**
Functions that perform calculations over a set of rows:
```sql
SELECT name, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as rank
FROM employees;
```

### Q42: What's the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?
**Answer:**
```
salary  ROW_NUMBER  RANK  DENSE_RANK
100000      1        1       1
95000       2        2       2
95000       3        2       2
90000       4        4       3
```

### Q43: What's a CTE (Common Table Expression)?
**Answer:**
Temporary named result set using WITH:
```sql
WITH high_earners AS (
    SELECT name FROM employees WHERE salary > 80000
)
SELECT * FROM high_earners;
```

### Q44: What's the difference between INNER JOIN and CROSS JOIN?
**Answer:**
- INNER JOIN: Matching rows only
- CROSS JOIN: All combinations

### Q45: How do you find duplicate records?
**Answer:**
```sql
SELECT column_name, COUNT(*)
FROM table_name
GROUP BY column_name
HAVING COUNT(*) > 1;
```

### Q46: How do you delete duplicates?
**Answer:**
```sql
WITH cte AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY column ORDER BY id) as rn
    FROM table_name
)
DELETE FROM cte WHERE rn > 1;
```

### Q47: How do you find missing values?
**Answer:**
```sql
SELECT c.customer_name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
```

### Q48: What's the second highest salary?
**Answer:**
```sql
SELECT salary FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

### Q49: What's the difference between scalar subquery and row subquery?
**Answer:**
- Scalar: Returns one value
- Row: Returns multiple columns

```sql
-- Scalar:
WHERE salary > (SELECT AVG(salary) FROM employees)

-- Row:
WHERE (id, salary) IN (SELECT id, salary FROM employees WHERE dept=1)
```

### Q50: What's a derived table?
**Answer:**
Subquery in FROM clause:
```sql
SELECT * FROM (
    SELECT name, salary FROM employees WHERE salary > 50000
) high_earners;
```

---

## Section 4: PostgreSQL Specific (Questions 51-70)

### Q51: What are PostgreSQL's advantages?
**Answer:**
- Strong ACID compliance
- Advanced data types (JSONB, Arrays)
- Full-text search
- Window functions
- CTEs
- Open source and free

### Q52: What's JSONB in PostgreSQL?
**Answer:**
Binary JSON data type:
```sql
CREATE TABLE users (
    user_id INT,
    data JSONB
);
INSERT INTO users VALUES (1, '{"name": "John", "age": 30}');
SELECT data->>'name' FROM users;
```

### Q53: What are PostgreSQL arrays?
**Answer:**
Store multiple values in one column:
```sql
CREATE TABLE users (
    user_id INT,
    skills TEXT[]
);
INSERT INTO users VALUES (1, ARRAY['SQL', 'Python', 'JavaScript']);
```

### Q54: What's the SERIAL data type?
**Answer:**
Auto-incrementing integer:
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
```
First insert gets ID 1, second gets 2, etc.

### Q55: What are PostgreSQL ranges?
**Answer:**
Data type for ranges of values:
```sql
CREATE TABLE availability (
    availability_id INT,
    available_range INT4RANGE
);
INSERT INTO availability VALUES (1, '[10,20)');
```

### Q56: What's PostgreSQL full-text search?
**Answer:**
Advanced text searching:
```sql
SELECT * FROM articles
WHERE to_tsvector(content) @@ to_tsquery('database & sql');
```

### Q57: What's RETURNING clause?
**Answer:**
Returns affected rows in DML:
```sql
INSERT INTO employees (name, salary) VALUES ('John', 60000)
RETURNING employee_id, name;
```

### Q58: What's LATERAL in PostgreSQL?
**Answer:**
Allows subqueries to reference columns from earlier parts:
```sql
SELECT c.name, o.amount
FROM customers c,
LATERAL (SELECT * FROM orders WHERE customer_id = c.customer_id LIMIT 1) o;
```

### Q59: What's ARRAY_AGG function?
**Answer:**
Aggregates values into array:
```sql
SELECT student_name, ARRAY_AGG(grade) as grades
FROM enrollments
GROUP BY student_name;
```

### Q60: What's JSON_AGG function?
**Answer:**
Aggregates values into JSON array:
```sql
SELECT student_name, JSON_AGG(grade) as grades
FROM enrollments
GROUP BY student_name;
```

---

## Section 5: Interview Trick Questions (Questions 61-80)

### Q61: What does this return?
```sql
SELECT NULL = NULL;
```
**Answer:** NULL (unknown), not true!

### Q62: What's wrong with this?
```sql
SELECT name FROM employees WHERE salary > AVG(salary);
```
**Answer:** Can't use aggregate in WHERE. Use HAVING or subquery.

### Q63: What does CROSS JOIN return?
```sql
SELECT * FROM (SELECT 1) CROSS JOIN (SELECT 2);
```
**Answer:** 1 row with 2 columns.

### Q64: What's the result of LEFT JOIN with WHERE?
```sql
SELECT * FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NOT NULL;
```
**Answer:** Same as INNER JOIN!

### Q65: What happens with duplicate values in aggregate?
```sql
SELECT SUM(amount) FROM orders;
```
**Answer:** Sums all values including duplicates.

### Q66: What's the difference between DELETE and TRUNCATE?
**Answer:**
- DELETE: Row by row, triggers fire, can rollback
- TRUNCATE: Whole table, faster, can rollback in transaction

### Q67: Can you index NULL values?
**Answer:** Yes, but searches must use IS NULL (can't use =).

### Q68: What's the performance impact of SELECT *?
**Answer:**
- Slower (transfers unnecessary columns)
- Fails if columns added/removed
- Better: Specify needed columns

### Q69: What happens with OUTER JOIN and WHERE?
```sql
SELECT * FROM a
FULL OUTER JOIN b ON a.id = b.id
WHERE a.id IS NOT NULL;
```
**Answer:** Becomes inner join (filters the rows).

### Q70: What's the maximum number of JOINs?
**Answer:** Theoretically unlimited, but practically:
- 3-5 JOINs: Usually fine
- 10+ JOINs: Red flag, consider redesign

---

## Section 6: Performance & Optimization (Questions 71-85)

### Q71: What are indexes?
**Answer:**
Separate data structure for fast lookups:
```sql
CREATE INDEX idx_email ON users(email);
```
Speeds up queries but slows inserts.

### Q72: What are composite indexes?
**Answer:**
Index on multiple columns:
```sql
CREATE INDEX idx_dept_salary ON employees(department_id, salary);
```

### Q73: When should you create an index?
**Answer:**
- Columns frequently used in WHERE
- Columns in JOINs
- Columns used in ORDER BY
- Large tables with selective queries

### Q74: When NOT to index?
**Answer:**
- Low selectivity (many duplicates)
- Small tables
- Columns with many NULLs (usually)
- Frequently updated columns

### Q75: What's query optimization?
**Answer:**
Making queries run faster by:
- Using indexes
- Avoiding N+1 queries
- Filtering early (WHERE before JOIN)
- Using appropriate JOINs

### Q76: What's the N+1 query problem?
**Answer:**
Fetching main data then looping for related data:
```
Bad:
SELECT * FROM customers;  -- 100 queries
for each customer:
    SELECT * FROM orders WHERE customer_id = X;  -- +100 queries

Good:
SELECT * FROM customers
JOIN orders ON customers.id = orders.customer_id;  -- 1 query
```

### Q77: What's EXPLAIN in SQL?
**Answer:**
Shows query execution plan:
```sql
EXPLAIN SELECT * FROM employees WHERE salary > 60000;
```
Helps identify performance issues.

### Q78: What's a query execution plan?
**Answer:**
How database executes the query:
- Table scan vs index scan
- Join order
- Memory usage
- Cost estimation

### Q79: How do you improve slow queries?
**Answer:**
1. Check EXPLAIN plan
2. Add indexes
3. Reduce JOINs
4. Use subqueries wisely
5. Denormalize if needed
6. Partition large tables

### Q80: What's pagination and why use it?
**Answer:**
Returning results in chunks:
```sql
LIMIT 10 OFFSET (page-1)*10;
```
Reduces memory, improves UX.

---

## Section 7: Real-world Scenarios (Questions 81-100)

### Q81: How do you track data changes?
**Answer:**
Audit tables or triggers:
```sql
CREATE TABLE employee_audit (
    change_id INT,
    employee_id INT,
    old_salary DECIMAL,
    new_salary DECIMAL,
    changed_at TIMESTAMP
);
```

### Q82: How do you handle soft deletes?
**Answer:**
Use deleted flag instead of DELETE:
```sql
ALTER TABLE employees ADD deleted_at TIMESTAMP;
SELECT * FROM employees WHERE deleted_at IS NULL;
```

### Q83: How do you version data?
**Answer:**
Store version with data:
```sql
CREATE TABLE employee_versions (
    employee_id INT,
    version INT,
    name VARCHAR(100),
    salary DECIMAL,
    PRIMARY KEY (employee_id, version)
);
```

### Q84: How do you handle concurrent updates?
**Answer:**
Use transactions and locking:
```sql
BEGIN;
SELECT * FROM account WHERE id = 1 FOR UPDATE;
-- Update code here
UPDATE account SET balance = balance - 100 WHERE id = 1;
COMMIT;
```

### Q85: How do you archive old data?
**Answer:**
Move to archive table:
```sql
INSERT INTO orders_archive SELECT * FROM orders
WHERE order_date < '2020-01-01';
DELETE FROM orders WHERE order_date < '2020-01-01';
```

### Q86: How do you implement pagination efficiently?
**Answer:**
```sql
SELECT * FROM orders
WHERE order_id > 1000  -- Last ID from previous page
ORDER BY order_id
LIMIT 10;
```
Better than OFFSET for large offsets.

### Q87: How do you handle hierarchical data?
**Answer:**
Self-referencing FK:
```sql
CREATE TABLE categories (
    category_id INT,
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);
```

### Q88: How do you implement full-text search?
**Answer:**
PostgreSQL:
```sql
SELECT * FROM articles
WHERE to_tsvector(content) @@ to_tsquery('sql & database');
```

### Q89: How do you handle timezones?
**Answer:**
Store as UTC, convert on display:
```sql
TIMESTAMP WITH TIME ZONE column
SELECT created_at AT TIME ZONE 'US/Eastern' FROM posts;
```

### Q90: How do you implement multi-tenancy?
**Answer:**
Add tenant_id column:
```sql
CREATE TABLE customers (
    customer_id INT,
    tenant_id INT,
    name VARCHAR(100)
);
```
Filter by tenant in all queries.

### Q91: How do you calculate running totals?
**Answer:**
Use window functions:
```sql
SELECT order_date, amount,
    SUM(amount) OVER (ORDER BY order_date) as running_total
FROM orders;
```

### Q92: How do you rank records?
**Answer:**
```sql
SELECT name, salary,
    RANK() OVER (ORDER BY salary DESC) as rank
FROM employees;
```

### Q93: How do you find top N per group?
**Answer:**
```sql
WITH ranked AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) as rn
    FROM employees
)
SELECT * FROM ranked WHERE rn <= 3;
```

### Q94: How do you calculate cohorts?
**Answer:**
Group by signup month:
```sql
SELECT DATE_TRUNC('month', signup_date) as cohort,
    COUNT(*) as users
FROM customers
GROUP BY DATE_TRUNC('month', signup_date);
```

### Q95: How do you handle seasonal data?
**Answer:**
Year-over-year comparison:
```sql
SELECT EXTRACT(MONTH FROM date) as month,
    EXTRACT(YEAR FROM date) as year,
    SUM(sales) as sales
FROM sales
GROUP BY EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date);
```

### Q96: How do you validate data quality?
**Answer:**
Integrity checks:
```sql
SELECT COUNT(*) FROM orders WHERE customer_id NOT IN (SELECT customer_id FROM customers);
SELECT COUNT(*) FROM orders WHERE total_amount < 0;
```

### Q97: How do you implement audit logging?
**Answer:**
Triggers:
```sql
CREATE TRIGGER audit_employee_changes
AFTER UPDATE ON employees
FOR EACH ROW
INSERT INTO audit_log VALUES (NEW.id, OLD.salary, NEW.salary, NOW());
```

### Q98: How do you handle test data?
**Answer:**
Separate test database or markers:
```sql
ALTER TABLE users ADD is_test BOOLEAN DEFAULT false;
-- In production queries:
WHERE is_test = false
```

### Q99: How do you backup and restore?
**Answer:**
PostgreSQL:
```bash
pg_dump database > backup.sql
psql database < backup.sql
```

### Q100: What's the difference between OLTP and OLAP?
**Answer:**
- OLTP (Online Transaction Processing): Fast writes, many small queries (production databases)
- OLAP (Online Analytical Processing): Complex queries, data warehouse, read-heavy

---

## Final Tips

✅ Practice writing queries by hand  
✅ Understand the "why" not just the "what"  
✅ Test edge cases (NULLs, empty results)  
✅ Think about performance  
✅ Be ready to explain trade-offs  

**Good luck with your interviews!** 🚀
