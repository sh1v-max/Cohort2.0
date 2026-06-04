-- Top 50 SQL Interview Patterns
-- These are the most commonly asked interview questions for backend developers
-- Each pattern shows: Problem → Query → Explanation

-- Setup: Use the datasets from datasets/ folder
-- Run: students-courses.sql, ecommerce.sql, employees-departments.sql

-- =============================================================================
-- PATTERN 1-5: Basic Filtering & Selection
-- =============================================================================

-- PATTERN 1: Find all records with specific criteria
-- Q: Find all products with price greater than 100
SELECT * FROM products_ec WHERE price > 100;

-- PATTERN 2: Find records with multiple conditions
-- Q: Find all employees in engineering department earning more than 90000
SELECT * FROM employees_ed
WHERE department_id = 2 AND salary > 90000;

-- PATTERN 3: Find records using LIKE
-- Q: Find all employees whose name starts with 'A'
SELECT * FROM employees_ed WHERE employee_name LIKE 'A%';

-- PATTERN 4: Find records with values in a list
-- Q: Find all customers from USA or Canada
SELECT * FROM customers_ec
WHERE country IN ('USA', 'Canada');

-- PATTERN 5: Find records within a range
-- Q: Find all orders between Jan 1 and Feb 15, 2024
SELECT * FROM orders_ec
WHERE order_date BETWEEN '2024-01-01' AND '2024-02-15';

-- =============================================================================
-- PATTERN 6-10: Aggregation & Grouping
-- =============================================================================

-- PATTERN 6: Count records
-- Q: How many students enrolled in each course?
SELECT c.course_name, COUNT(e.student_id) as student_count
FROM courses_ds c
LEFT JOIN enrollments_ds e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name
ORDER BY student_count DESC;

-- PATTERN 7: Sum with grouping
-- Q: What's the total amount spent by each customer?
SELECT c.customer_name, SUM(o.total_amount) as total_spent
FROM customers_ec c
LEFT JOIN orders_ec o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spent DESC;

-- PATTERN 8: Average calculation
-- Q: What's the average salary by department?
SELECT d.department_name, AVG(e.salary) as avg_salary
FROM departments_ed d
LEFT JOIN employees_ed e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name;

-- PATTERN 9: Having clause for filtered groups
-- Q: Which courses have more than 2 students?
SELECT c.course_name, COUNT(e.student_id) as student_count
FROM courses_ds c
JOIN enrollments_ds e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name
HAVING COUNT(e.student_id) > 2;

-- PATTERN 10: Multiple aggregates
-- Q: For each department, show count, min, max, and avg salary
SELECT d.department_name,
       COUNT(e.employee_id) as emp_count,
       MIN(e.salary) as min_salary,
       MAX(e.salary) as max_salary,
       AVG(e.salary) as avg_salary
FROM departments_ed d
LEFT JOIN employees_ed e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name;

-- =============================================================================
-- PATTERN 11-15: Joins
-- =============================================================================

-- PATTERN 11: Inner join (only matching records)
-- Q: Get all orders with customer details
SELECT c.customer_name, o.order_id, o.order_date, o.total_amount
FROM customers_ec c
INNER JOIN orders_ec o ON c.customer_id = o.customer_id;

-- PATTERN 12: Left join (all from left table)
-- Q: Get all customers and their orders (including those without orders)
SELECT c.customer_name, COUNT(o.order_id) as order_count
FROM customers_ec c
LEFT JOIN orders_ec o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name;

-- PATTERN 13: Multiple joins
-- Q: Get order details with customer and product info
SELECT c.customer_name, p.product_name, oi.quantity, oi.unit_price
FROM customers_ec c
JOIN orders_ec o ON c.customer_id = o.customer_id
JOIN order_items_ec oi ON o.order_id = oi.order_id
JOIN products_ec p ON oi.product_id = p.product_id;

-- PATTERN 14: Self join
-- Q: Find all employees and their managers
SELECT e.employee_name, m.employee_name as manager_name
FROM employees_ed e
LEFT JOIN employees_ed m ON e.manager_id = m.employee_id;

-- PATTERN 15: Full outer join
-- Q: Show all departments and employees (including depts with no employees)
SELECT d.department_name, e.employee_name
FROM departments_ed d
FULL OUTER JOIN employees_ed e ON d.department_id = e.department_id
ORDER BY d.department_name;

-- =============================================================================
-- PATTERN 16-20: Subqueries
-- =============================================================================

-- PATTERN 16: Subquery in WHERE
-- Q: Find products more expensive than average
SELECT product_name, price
FROM products_ec
WHERE price > (SELECT AVG(price) FROM products_ec)
ORDER BY price DESC;

-- PATTERN 17: Subquery with IN
-- Q: Find customers who placed orders
SELECT customer_name
FROM customers_ec
WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders_ec);

-- PATTERN 18: Subquery with EXISTS
-- Q: Find students who are enrolled in at least one course
SELECT student_name
FROM students_ds s
WHERE EXISTS (
    SELECT 1 FROM enrollments_ds e WHERE e.student_id = s.student_id
);

-- PATTERN 19: Subquery in FROM (derived table)
-- Q: Get customer spending statistics
SELECT
    customer_spending.customer_name,
    customer_spending.order_count,
    customer_spending.total_spent
FROM (
    SELECT c.customer_name, COUNT(o.order_id) as order_count, SUM(o.total_amount) as total_spent
    FROM customers_ec c
    LEFT JOIN orders_ec o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.customer_name
) customer_spending
WHERE customer_spending.total_spent > 500
ORDER BY customer_spending.total_spent DESC;

-- PATTERN 20: Correlated subquery
-- Q: Find employees earning more than their department average
SELECT e1.employee_name, e1.salary
FROM employees_ed e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees_ed e2
    WHERE e1.department_id = e2.department_id
);

-- =============================================================================
-- PATTERN 21-25: Advanced Patterns
-- =============================================================================

-- PATTERN 21: DISTINCT for unique values
-- Q: How many different countries do we have customers from?
SELECT DISTINCT country FROM customers_ec;

-- PATTERN 22: ORDER BY multiple columns
-- Q: List all employees ordered by department then salary
SELECT * FROM employees_ed
ORDER BY department_id ASC, salary DESC;

-- PATTERN 23: LIMIT and OFFSET for pagination
-- Q: Get top 3 highest paid employees
SELECT * FROM employees_ed
ORDER BY salary DESC
LIMIT 3;

-- PATTERN 24: CASE for conditional logic
-- Q: Categorize employees by salary
SELECT employee_name, salary,
    CASE
        WHEN salary < 60000 THEN 'Junior'
        WHEN salary < 100000 THEN 'Mid'
        ELSE 'Senior'
    END as salary_category
FROM employees_ed;

-- PATTERN 25: UNION to combine results
-- Q: Get all names (customers, employees, students)
SELECT customer_name as name, 'Customer' as type FROM customers_ec
UNION
SELECT employee_name, 'Employee' FROM employees_ed
UNION
SELECT student_name, 'Student' FROM students_ds;

-- =============================================================================
-- PATTERN 26-30: Data Finding Patterns
-- =============================================================================

-- PATTERN 26: Find second highest salary
-- Q: Who earns the second highest salary?
SELECT employee_name, salary
FROM employees_ed
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- PATTERN 27: Find duplicate records
-- Q: Which products appear in multiple orders?
SELECT p.product_name, COUNT(DISTINCT oi.order_id) as order_count
FROM products_ec p
JOIN order_items_ec oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
HAVING COUNT(DISTINCT oi.order_id) > 1;

-- PATTERN 28: Find missing data
-- Q: Which customers have never placed an order?
SELECT c.customer_name
FROM customers_ec c
LEFT JOIN orders_ec o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- PATTERN 29: Find records with maximum value per group
-- Q: Find the highest paid employee in each department
SELECT d.department_name, e.employee_name, e.salary
FROM employees_ed e
JOIN departments_ed d ON e.department_id = d.department_id
WHERE (e.department_id, e.salary) IN (
    SELECT department_id, MAX(salary)
    FROM employees_ed
    GROUP BY department_id
);

-- PATTERN 30: Find records with minimum value per group
-- Q: Find the lowest priced product in each category
SELECT category, product_name, price
FROM products_ec p1
WHERE price = (
    SELECT MIN(price)
    FROM products_ec p2
    WHERE p1.category = p2.category
);

-- =============================================================================
-- PATTERN 31-35: Complex Aggregations
-- =============================================================================

-- PATTERN 31: Count distinct
-- Q: How many different products has each customer ordered?
SELECT c.customer_name, COUNT(DISTINCT oi.product_id) as product_variety
FROM customers_ec c
JOIN orders_ec o ON c.customer_id = o.customer_id
JOIN order_items_ec oi ON o.order_id = oi.order_id
GROUP BY c.customer_id, c.customer_name;

-- PATTERN 32: Sum with conditions
-- Q: Total amount spent on electronics vs furniture
SELECT
    CASE
        WHEN p.category = 'Electronics' THEN 'Electronics'
        ELSE 'Furniture'
    END as category,
    SUM(oi.quantity * oi.unit_price) as total_sales
FROM products_ec p
JOIN order_items_ec oi ON p.product_id = oi.product_id
GROUP BY category;

-- PATTERN 33: Running total (cumulative)
-- Q: Running total of orders per customer
SELECT c.customer_name, o.order_id, o.total_amount,
    SUM(o.total_amount) OVER (PARTITION BY c.customer_id ORDER BY o.order_date) as running_total
FROM customers_ec c
JOIN orders_ec o ON c.customer_id = o.customer_id
ORDER BY c.customer_name, o.order_date;

-- PATTERN 34: Rank records
-- Q: Rank employees by salary within each department
SELECT e.department_id, e.employee_name, e.salary,
    RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) as salary_rank
FROM employees_ed e;

-- PATTERN 35: Percentage of total
-- Q: Show each product's percentage of total sales
SELECT p.product_name,
    SUM(oi.quantity * oi.unit_price) as product_sales,
    ROUND(100.0 * SUM(oi.quantity * oi.unit_price) /
        (SELECT SUM(quantity * unit_price) FROM order_items_ec), 2) as percentage
FROM products_ec p
JOIN order_items_ec oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name;

-- =============================================================================
-- PATTERN 36-40: Real-world Scenarios
-- =============================================================================

-- PATTERN 36: Monthly sales trend
-- Q: Show total sales by month
SELECT DATE_TRUNC('month', o.order_date) as month, SUM(o.total_amount) as monthly_sales
FROM orders_ec o
GROUP BY DATE_TRUNC('month', o.order_date)
ORDER BY month;

-- PATTERN 37: Customer RFM (Recency, Frequency, Monetary)
-- Q: Customer engagement metrics
SELECT c.customer_name,
    MAX(o.order_date) as last_order_date,
    COUNT(o.order_id) as purchase_frequency,
    SUM(o.total_amount) as total_value
FROM customers_ec c
LEFT JOIN orders_ec o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_value DESC;

-- PATTERN 38: Product performance
-- Q: Top 3 products by revenue
SELECT p.product_name,
    SUM(oi.quantity) as units_sold,
    SUM(oi.quantity * oi.unit_price) as total_revenue
FROM products_ec p
JOIN order_items_ec oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
ORDER BY total_revenue DESC
LIMIT 3;

-- PATTERN 39: Department performance
-- Q: Department metrics
SELECT d.department_name,
    COUNT(e.employee_id) as emp_count,
    AVG(e.salary) as avg_salary,
    SUM(e.salary) as total_payroll
FROM departments_ed d
LEFT JOIN employees_ed e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name;

-- PATTERN 40: Cross-tab (pivot-like)
-- Q: Student grades per course
SELECT s.student_name,
    MAX(CASE WHEN c.course_id = 101 THEN e.grade END) as math_grade,
    MAX(CASE WHEN c.course_id = 102 THEN e.grade END) as web_grade,
    MAX(CASE WHEN c.course_id = 103 THEN e.grade END) as data_structures_grade
FROM students_ds s
LEFT JOIN enrollments_ds e ON s.student_id = e.student_id
LEFT JOIN courses_ds c ON e.course_id = c.course_id
GROUP BY s.student_id, s.student_name;

-- =============================================================================
-- PATTERN 41-45: Interview Trick Questions
-- =============================================================================

-- PATTERN 41: NULL handling
-- Q: Count how many orders each customer has (handling NULLs)
SELECT c.customer_name, COALESCE(COUNT(o.order_id), 0) as order_count
FROM customers_ec c
LEFT JOIN orders_ec o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name;

-- PATTERN 42: Duplicates with row number
-- Q: Remove duplicate orders by same customer on same date
WITH ranked_orders AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id, order_date ORDER BY order_id) as rn
    FROM orders_ec
)
SELECT * FROM ranked_orders WHERE rn = 1;

-- PATTERN 43: String operations
-- Q: Find customers with email domains
SELECT customer_name, email, SPLIT_PART(email, '@', 2) as email_domain
FROM customers_ec
WHERE email IS NOT NULL;

-- PATTERN 44: Date operations
-- Q: How many days since last order?
SELECT c.customer_name,
    MAX(o.order_date) as last_order_date,
    CURRENT_DATE - MAX(o.order_date) as days_since_order
FROM customers_ec c
LEFT JOIN orders_ec o ON c.customer_id = o.customer_id
WHERE o.order_id IS NOT NULL
GROUP BY c.customer_id, c.customer_name;

-- PATTERN 45: Complex filtering
-- Q: High-value customers (>1000 spending) in USA
SELECT c.customer_name, SUM(o.total_amount) as total_spending
FROM customers_ec c
JOIN orders_ec o ON c.customer_id = o.customer_id
WHERE c.country = 'USA'
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.total_amount) > 1000;

-- =============================================================================
-- PATTERN 46-50: Advanced Scenarios
-- =============================================================================

-- PATTERN 46: Recursive query / Hierarchical data
-- Q: Show employee hierarchy
WITH RECURSIVE emp_hierarchy AS (
    SELECT employee_id, employee_name, manager_id, 0 as level
    FROM employees_ed
    WHERE manager_id IS NULL

    UNION ALL

    SELECT e.employee_id, e.employee_name, e.manager_id, eh.level + 1
    FROM employees_ed e
    JOIN emp_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * FROM emp_hierarchy ORDER BY level, employee_id;

-- PATTERN 47: Time-based analysis
-- Q: Employees hired in each year
SELECT EXTRACT(YEAR FROM hire_date) as hire_year, COUNT(*) as hire_count
FROM employees_ed
GROUP BY EXTRACT(YEAR FROM hire_date)
ORDER BY hire_year;

-- PATTERN 48: Market basket analysis
-- Q: Products often bought together
SELECT oi1.product_id as product1, oi2.product_id as product2, COUNT(*) as frequency
FROM order_items_ec oi1
JOIN order_items_ec oi2 ON oi1.order_id = oi2.order_id AND oi1.product_id < oi2.product_id
GROUP BY oi1.product_id, oi2.product_id
HAVING COUNT(*) > 1;

-- PATTERN 49: Cohort analysis
-- Q: Group customers by order year
SELECT EXTRACT(YEAR FROM o.order_date) as order_year,
    COUNT(DISTINCT o.customer_id) as customers,
    COUNT(o.order_id) as orders,
    SUM(o.total_amount) as revenue
FROM orders_ec o
GROUP BY EXTRACT(YEAR FROM o.order_date);

-- PATTERN 50: Data quality checks
-- Q: Find potential data issues (orders with no items)
SELECT o.order_id, o.customer_id, COUNT(oi.order_item_id) as item_count
FROM orders_ec o
LEFT JOIN order_items_ec oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.customer_id
HAVING COUNT(oi.order_item_id) = 0;

-- =============================================================================
-- PRACTICE THESE PATTERNS UNTIL YOU CAN WRITE THEM WITHOUT LOOKING!
-- =============================================================================
