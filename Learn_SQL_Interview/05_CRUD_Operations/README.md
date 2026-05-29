# Phase 6: Subqueries - Write Queries Within Queries

## What You'll Learn

Subqueries (nested queries) allow you to **write queries inside other queries**, enabling complex data retrieval and comparisons.

## Topics Covered

1. **Simple Subqueries**
   - Subquery in WHERE clause
   - Scalar subquery (returns one value)
   - Subquery returning multiple rows

2. **IN and EXISTS**
   - Using IN with subquery results
   - Using EXISTS for existence checking
   - Performance considerations (IN vs EXISTS)

3. **Correlated Subqueries**
   - References outer query
   - Evaluated once per outer row
   - Performance implications

4. **Subqueries in FROM**
   - Derived tables
   - Temporary result sets
   - Aliasing derived tables

5. **Subqueries in SELECT**
   - Scalar subqueries in SELECT list
   - Computing per-row values

## Why This Matters for Interviews

**Interview Question Example:**
> "Find all products more expensive than the average price in their category."

### Common Interview Questions

1. "Difference between IN and EXISTS?"
2. "What's a correlated subquery?"
3. "Can subqueries improve performance?"
4. "How do you use subquery in FROM clause?"
5. "What's a scalar subquery?"
6. "When would you use subquery vs JOIN?"
7. "Explain derived tables"
8. "Can subqueries reference outer query?"

## Common Mistakes to Avoid

❌ **Mistake 1:** Subquery returning multiple rows for scalar context
```sql
-- WRONG - Subquery returns multiple rows:
SELECT * FROM employees
WHERE salary > (SELECT salary FROM employees WHERE dept_id = 5);  -- ERROR!

-- RIGHT - Use IN or aggregate:
SELECT * FROM employees
WHERE salary IN (SELECT salary FROM employees WHERE dept_id = 5);
```

❌ **Mistake 2:** Using IN instead of EXISTS (performance)
```sql
-- SLOWER - IN evaluates all subquery rows:
SELECT * FROM customers c
WHERE customer_id IN (SELECT customer_id FROM orders);

-- FASTER - EXISTS stops at first match:
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);
```

❌ **Mistake 3:** Not aliasing derived tables
```sql
-- WRONG - Subquery needs alias:
SELECT * FROM (SELECT * FROM employees WHERE salary > 50000);  -- ERROR!

-- RIGHT:
SELECT * FROM (SELECT * FROM employees WHERE salary > 50000) AS high_earners;
```

❌ **Mistake 4:** Forgetting correlation in correlated subquery
```sql
-- WRONG - Not correlated properly:
SELECT e1.name FROM employees e1
WHERE e1.salary > (SELECT AVG(salary) FROM employees);
-- This just compares to overall average, not department average

-- RIGHT - Correlated:
SELECT e1.name FROM employees e1
WHERE e1.salary > (SELECT AVG(salary) FROM employees e2 WHERE e1.dept_id = e2.dept_id);
```

❌ **Mistake 5:** Subquery in SELECT returning multiple rows
```sql
-- WRONG - Returns multiple rows:
SELECT product_name, (SELECT order_id FROM orders WHERE product_id = p.id) as order
FROM products p;  -- ERROR!

-- RIGHT - Aggregate or JOIN:
SELECT p.product_name, COUNT(o.order_id) as order_count
FROM products p
LEFT JOIN orders o ON p.product_id = o.product_id
GROUP BY p.product_id;
```

❌ **Mistake 6:** Inefficient subquery where JOIN would be better
```sql
-- INEFFICIENT - Subquery slower:
SELECT * FROM orders o
WHERE customer_id IN (SELECT customer_id FROM customers WHERE country = 'USA');

-- EFFICIENT - Use JOIN:
SELECT DISTINCT o.* FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE c.country = 'USA';
```

## Subquery Types Reference

| Type | Location | Returns | Use Case |
|------|----------|---------|----------|
| **Scalar** | WHERE, SELECT | 1 value | Compare to single value |
| **Row** | WHERE, SELECT | 1 row | Compare to row values |
| **List** | WHERE with IN | Multiple rows | Check membership |
| **Exists** | WHERE with EXISTS | Boolean | Check existence |
| **Derived table** | FROM | Result set | Intermediate calculations |

## Learning Outcomes

After this phase, you should be able to:

✅ Write subqueries in WHERE clause  
✅ Use IN for list subqueries  
✅ Use EXISTS for existence checking  
✅ Understand when IN is better than EXISTS  
✅ Write correlated subqueries  
✅ Use subqueries in FROM clause (derived tables)  
✅ Use scalar subqueries in SELECT  
✅ Know when to use subquery vs JOIN  
✅ Optimize subqueries for performance  
✅ Understand subquery limitations  
✅ Answer all subquery interview questions  

## Real-World Scenarios

### Scenario 1: Find Above-Average Prices
```sql
SELECT product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
```

### Scenario 2: Find Customers with Orders
```sql
SELECT * FROM customers
WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders);
```

### Scenario 3: Find Customers Without Orders (EXISTS)
```sql
SELECT * FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);
```

### Scenario 4: Price Comparison by Category
```sql
SELECT product_name, price
FROM products p
WHERE price > (
    SELECT AVG(price) 
    FROM products p2 
    WHERE p2.category_id = p.category_id
);
```

### Scenario 5: Using Derived Tables
```sql
SELECT category, avg_price, product_count
FROM (
    SELECT category, AVG(price) as avg_price, COUNT(*) as product_count
    FROM products
    GROUP BY category
) category_stats
WHERE product_count > 5;
```

## Interview Tips

### For Simple Subquery Questions
- Ensure subquery returns exactly one value for scalar context
- Test subquery independently first
- Comment the subquery purpose

### For IN vs EXISTS Questions
- IN: Good for small result sets
- EXISTS: Better for performance (stops at first match)
- EXISTS is generally faster for large datasets

### For Correlated Subquery Questions
- References to outer query must be clear
- Can be slower (evaluated per outer row)
- Use only when JOIN isn't suitable

### For Derived Table Questions
- Always alias the derived table
- Can make complex queries more readable
- Useful for intermediate steps

### For Performance Questions
- Subqueries can be slower than JOINs
- EXISTS usually faster than IN
- Some databases optimize subqueries to JOINs automatically

## Success Criteria

You're ready to move on when:

- [ ] You can write simple subqueries
- [ ] You understand IN vs EXISTS
- [ ] You can write correlated subqueries
- [ ] You can use derived tables (subquery in FROM)
- [ ] You scored 90%+ on challenge.sql
- [ ] You know when to use subquery vs JOIN
- [ ] You can explain subquery performance

## Common Questions Explained

### Q: What's the difference between IN and EXISTS?
**A:** IN checks if value exists in subquery result. EXISTS just checks if any row exists. EXISTS is typically faster.

### Q: What's a correlated subquery?
**A:** A subquery that references columns from the outer query. Evaluated once per outer row.

### Q: Can subqueries improve performance?
**A:** Sometimes. But JOINs are usually better. Use subqueries for readability when JOINs are complex.

### Q: What's a derived table?
**A:** A subquery in the FROM clause that acts like a temporary table.

### Q: Can I use multiple subqueries?
**A:** Yes! But deeply nested queries become hard to read. Consider CTEs instead.

### Q: How do I reference a derived table?
**A:** Use the alias you gave it: `SELECT * FROM (SELECT ...) AS alias_name`

## Phase Structure

1. **README.md** - This file
2. **notes.md** - Detailed explanations
3. **examples.sql** - 25+ examples
4. **practice.sql** - 18 exercises
5. **challenge.sql** - 12 problems

## Recommended Schedule

- **Morning:** Read README + notes (1.5 hours)
- **Afternoon:** Run examples + practice (2 hours)
- **Evening:** Solve challenges (2 hours)

## Next Steps

1. Read `notes.md` thoroughly
2. Run `examples.sql` and test variations
3. Complete `practice.sql` exercises
4. Solve `challenge.sql` problems
5. Move to Phase 7: Database Design

---

**Remember:** Subqueries are powerful, but JOINs are often better. Learn both, and choose wisely! 🚀
