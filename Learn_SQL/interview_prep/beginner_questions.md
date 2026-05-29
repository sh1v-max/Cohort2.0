# SQL Interview Prep: Beginner Questions

These are questions you might face in SQL interviews at junior/entry-level positions.

---

## Question 1: SELECT with WHERE
**Asked at:** Amazon, Google, Microsoft  
**Difficulty:** Easy

**Question:**
```
Given a users table with columns: id, name, email, age, created_at

Write a query to find all users who are older than 25 years old.
```

**Solution:**
```sql
SELECT id, name, email, age
FROM users
WHERE age > 25;
```

**Follow-up:** What if you also want to sort by age (oldest first)?
```sql
SELECT id, name, email, age
FROM users
WHERE age > 25
ORDER BY age DESC;
```

**Key Concepts:**
- WHERE filters rows before SELECT
- Comparison operators (>, <, >=, <=, =, !=)
- ORDER BY sorts results

---

## Question 2: Aggregate Functions
**Asked at:** Google, Microsoft, Facebook  
**Difficulty:** Easy

**Question:**
```
Given an orders table with columns: id, customer_id, total, order_date

Write a query to find the total revenue from all orders.
```

**Solution:**
```sql
SELECT SUM(total) AS total_revenue
FROM orders;
```

**Follow-up:** What if you want the count of orders, average order value, minimum, and maximum?
```sql
SELECT
    COUNT(*) AS order_count,
    SUM(total) AS total_revenue,
    AVG(total) AS avg_order_value,
    MIN(total) AS min_order,
    MAX(total) AS max_order
FROM orders;
```

**Key Concepts:**
- SUM() for totals
- COUNT() for counts
- AVG() for averages
- MIN()/MAX() for ranges

---

## Question 3: GROUP BY
**Asked at:** Amazon, Google, Meta  
**Difficulty:** Easy-Medium

**Question:**
```
Given orders table: id, customer_id, total, order_date

Write a query to find total revenue per customer.
```

**Solution:**
```sql
SELECT
    customer_id,
    SUM(total) AS customer_revenue
FROM orders
GROUP BY customer_id
ORDER BY customer_revenue DESC;
```

**Follow-up:** What if you only want customers who spent more than $1000?
```sql
SELECT
    customer_id,
    SUM(total) AS customer_revenue
FROM orders
GROUP BY customer_id
HAVING SUM(total) > 1000
ORDER BY customer_revenue DESC;
```

**Key Concepts:**
- GROUP BY groups rows by values
- HAVING filters groups (WHERE filters rows)
- Order: FROM → WHERE → GROUP BY → HAVING → ORDER BY

---

## Question 4: DISTINCT
**Asked at:** Google, Microsoft  
**Difficulty:** Easy

**Question:**
```
Given a users table: id, name, email, city

Write a query to find how many different cities users are from.
```

**Solution:**
```sql
SELECT COUNT(DISTINCT city) AS city_count
FROM users;
```

**Follow-up:** What if you want a list of all cities?
```sql
SELECT DISTINCT city
FROM users
ORDER BY city;
```

**Key Concepts:**
- DISTINCT removes duplicates
- COUNT(DISTINCT column) counts unique values

---

## Question 5: INNER JOIN
**Asked at:** Amazon, Google, Meta, Microsoft  
**Difficulty:** Medium

**Question:**
```
Given:
- users table: id, name, email
- orders table: id, user_id, total

Write a query to find customer names and their order totals.
```

**Solution:**
```sql
SELECT
    u.name,
    o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

**Follow-up:** Sort by customer name and show how many orders each customer has?
```sql
SELECT
    u.name,
    COUNT(o.id) AS order_count,
    SUM(o.total) AS total_spent
FROM users u
INNER JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY u.name;
```

**Key Concepts:**
- INNER JOIN returns only matching rows
- ON clause specifies join condition
- Use table aliases to make queries readable

---

## Question 6: LEFT JOIN
**Asked at:** Amazon, Google  
**Difficulty:** Medium

**Question:**
```
Given:
- users table: id, name
- orders table: id, user_id, total

Write a query to show all users and their orders (if any).
Some users may not have placed orders.
```

**Solution:**
```sql
SELECT
    u.name,
    o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

**Follow-up:** Find users who have NOT made any orders:
```sql
SELECT
    u.name
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;
```

**Key Concepts:**
- LEFT JOIN keeps all rows from left table
- Returns NULL for non-matching right table columns
- Use IS NULL to find non-matching rows

---

## Question 7: ORDER BY with LIMIT
**Asked at:** Google, Amazon  
**Difficulty:** Easy

**Question:**
```
Given products table: id, name, price, rating

Write a query to find the top 5 best-rated products.
```

**Solution:**
```sql
SELECT
    name,
    rating,
    price
FROM products
ORDER BY rating DESC
LIMIT 5;
```

**Follow-up:** What if you want the top 5 most expensive products?
```sql
SELECT
    name,
    price,
    rating
FROM products
ORDER BY price DESC
LIMIT 5;
```

**Key Concepts:**
- ORDER BY sorts before LIMIT
- LIMIT 5 returns first 5 rows
- DESC for descending, ASC for ascending

---

## Question 8: LIKE Pattern Matching
**Asked at:** Google, Microsoft  
**Difficulty:** Easy

**Question:**
```
Given a users table: id, name, email

Write a query to find all users whose email is from "example.com".
```

**Solution:**
```sql
SELECT name, email
FROM users
WHERE email LIKE '%@example.com';
```

**Other examples:**
```sql
-- Names starting with 'J'
WHERE name LIKE 'J%';

-- Names containing 'son'
WHERE name LIKE '%son%';

-- Emails with 3-char domain
WHERE email LIKE '%@%.___';
```

**Key Concepts:**
- % matches any number of characters
- _ matches exactly one character
- LIKE is case-insensitive in some databases

---

## Question 9: NULL Handling
**Asked at:** Amazon, Google  
**Difficulty:** Easy-Medium

**Question:**
```
Given a users table: id, name, phone

Write a query to find users who haven't provided a phone number.
```

**Solution:**
```sql
SELECT name
FROM users
WHERE phone IS NULL;
```

**Follow-up:** Find users WHO HAVE a phone number:
```sql
SELECT name, phone
FROM users
WHERE phone IS NOT NULL;
```

**Important:** This is WRONG:
```sql
-- WRONG - returns nothing!
WHERE phone = NULL;
```

**Key Concepts:**
- Use IS NULL (not = NULL)
- NULL is unknown, not a value
- IS NOT NULL finds non-NULL values

---

## Question 10: BETWEEN
**Asked at:** Google  
**Difficulty:** Easy

**Question:**
```
Given a products table: id, name, price

Find all products with price between $50 and $100.
```

**Solution:**
```sql
SELECT name, price
FROM products
WHERE price BETWEEN 50 AND 100
ORDER BY price;
```

**Equivalent (but BETWEEN is cleaner):**
```sql
WHERE price >= 50 AND price <= 100;
```

**Key Concepts:**
- BETWEEN is inclusive on both ends
- Works with numbers, dates, strings
- More readable than >= AND <=

---

## Question 11: IN Operator
**Asked at:** Amazon  
**Difficulty:** Easy

**Question:**
```
Given a products table with a category column:

Find all products in categories: 'Electronics', 'Books', 'Clothing'
```

**Solution:**
```sql
SELECT name, category, price
FROM products
WHERE category IN ('Electronics', 'Books', 'Clothing');
```

**Equivalent (but IN is cleaner):**
```sql
WHERE category = 'Electronics'
   OR category = 'Books'
   OR category = 'Clothing';
```

**Key Concepts:**
- IN is cleaner for multiple OR conditions
- Works with any data type
- Can also use NOT IN

---

## Question 12: DATE Filtering
**Asked at:** Google, Amazon  
**Difficulty:** Easy

**Question:**
```
Given an orders table: id, customer_id, total, order_date

Find all orders placed in 2023.
```

**Solution:**
```sql
SELECT id, customer_id, total, order_date
FROM orders
WHERE order_date >= '2023-01-01'
  AND order_date < '2024-01-01';
```

**Or using BETWEEN:**
```sql
WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';
```

**Using date functions:**
```sql
WHERE EXTRACT(YEAR FROM order_date) = 2023;
```

**Key Concepts:**
- Date format: 'YYYY-MM-DD'
- Use >= and < for ranges
- EXTRACT for specific date parts

---

## Question 13: AND/OR Logic
**Asked at:** Google  
**Difficulty:** Easy-Medium

**Question:**
```
Find all customers who:
- Are older than 25 AND have made purchases
OR
- Are VIP members (regardless of age)
```

**Solution:**
```sql
SELECT name, age, is_vip
FROM customers
WHERE (age > 25 AND customer_id IN (
    SELECT DISTINCT customer_id FROM orders
))
OR is_vip = true;
```

**Key Concepts:**
- AND requires both conditions true
- OR requires at least one true
- Use parentheses for clarity

---

## Question 14: Case Expression
**Asked at:** Google, Meta  
**Difficulty:** Medium

**Question:**
```
Given a customers table with age column:

Categorize customers as: 'Young' (< 25), 'Middle' (25-50), 'Senior' (> 50)
```

**Solution:**
```sql
SELECT
    name,
    age,
    CASE
        WHEN age < 25 THEN 'Young'
        WHEN age BETWEEN 25 AND 50 THEN 'Middle'
        ELSE 'Senior'
    END AS age_category
FROM customers;
```

**Key Concepts:**
- CASE is like IF/ELSE in SQL
- Each WHEN evaluates to THEN
- ELSE is the default
- Used for conditional logic in SELECT

---

## Question 15: Subquery in WHERE
**Asked at:** Amazon, Google  
**Difficulty:** Medium

**Question:**
```
Find all products that cost more than the average product price.
```

**Solution:**
```sql
SELECT name, price
FROM products
WHERE price > (
    SELECT AVG(price) FROM products
);
```

**Key Concepts:**
- Subquery in parentheses
- Inner query runs first
- Outer query uses the result

---

## Interview Tips

1. **Clarify the requirements** - Ask questions about data before writing
2. **Start simple** - Write a basic query first, then add complexity
3. **Test your logic** - Think through what the query should return
4. **Use aliases** - Make queries readable with AS
5. **Comment your code** - Explain your thinking
6. **Consider NULL** - Ask: "Are there NULL values?"
7. **Think about performance** - Don't load unnecessary columns
8. **Practice edge cases** - Empty tables, NULL values, duplicates
9. **Explain your solution** - Interviewers want to understand your thinking
10. **Ask follow-ups** - "What if we need to handle X?"

---

## Practice Exercises

Try solving these without looking at solutions:

1. Find users who made purchases in 2023
2. Get top 10 bestselling products
3. Calculate average order value per customer
4. Find customers with multiple orders
5. List products that have never been ordered
6. Find the most reviewed product
7. Get customers from specific cities
8. Find orders over $100
9. Get newest customers (last 30 days)
10. Calculate total inventory value

---

## Common Mistakes

❌ **Using = instead of IS for NULL:**
```sql
WHERE email = NULL  -- WRONG!
```

✅ **Correct:**
```sql
WHERE email IS NULL
```

---

❌ **Using WHERE with GROUP BY aggregates:**
```sql
SELECT customer_id, SUM(total) FROM orders
WHERE SUM(total) > 1000  -- WRONG!
GROUP BY customer_id;
```

✅ **Use HAVING instead:**
```sql
SELECT customer_id, SUM(total) FROM orders
GROUP BY customer_id
HAVING SUM(total) > 1000;
```

---

❌ **Forgetting to JOIN tables:**
```sql
SELECT users.name, orders.total
FROM users, orders
-- Missing: ON users.id = orders.user_id
```

✅ **Use explicit JOIN:**
```sql
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

---

## Next Steps

1. Master these 15 questions thoroughly
2. Practice writing queries daily
3. Try medium difficulty questions
4. Then advance to hard questions

