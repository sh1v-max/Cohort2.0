# Phase 4: Aggregations - Summarize Data Like a Pro

## What You'll Learn

Aggregations allow you to **summarize and analyze data** across multiple rows to answer business questions like "How much did we sell?" and "What's our average order value?"

## Topics Covered

1. **Aggregate Functions**
   - COUNT() - Count rows/non-NULL values
   - SUM() - Total values
   - AVG() - Average value
   - MIN() - Minimum value
   - MAX() - Maximum value

2. **GROUP BY Clause**
   - Grouping by single column
   - Grouping by multiple columns
   - Aggregations within groups

3. **HAVING Clause**
   - Filtering groups (not rows)
   - Using HAVING vs WHERE
   - Combining with GROUP BY

4. **Aggregate Functions with JOINs**
   - Aggregations across tables
   - Counting related records
   - SUM with JOINs

5. **DISTINCT with Aggregates**
   - COUNT(DISTINCT column)
   - Counting unique values

## Why This Matters for Interviews

**Interview Question Example:**
> "Find the total sales by product category, but only show categories with more than $10,000 in sales."

### Common Interview Questions

1. "What's the difference between WHERE and HAVING?"
2. "How do you count unique values?"
3. "Write a query to find the average by category"
4. "How do you find departments with more than 5 employees?"
5. "What's the SUM of all orders over $100?"
6. "How do you handle NULLs in aggregate functions?"
7. "Can you aggregate across JOINs?"
8. "What happens if you GROUP BY a column not in aggregation?"

## Common Mistakes to Avoid

❌ **Mistake 1:** Forgetting to GROUP BY all non-aggregated columns
```sql
-- WRONG - Non-aggregated column:
SELECT category, product_name, SUM(sales)
FROM products
GROUP BY category;  -- ERROR - product_name not in GROUP BY

-- RIGHT:
SELECT category, product_name, SUM(sales)
FROM products
GROUP BY category, product_name;
```

❌ **Mistake 2:** Using WHERE instead of HAVING for groups
```sql
-- WRONG - WHERE can't use aggregate function:
SELECT category, SUM(sales) as total
FROM products
WHERE SUM(sales) > 10000  -- ERROR!
GROUP BY category;

-- RIGHT - Use HAVING:
SELECT category, SUM(sales) as total
FROM products
GROUP BY category
HAVING SUM(sales) > 10000;
```

❌ **Mistake 3:** Counting wrong with NULL values
```sql
-- WRONG - Counts NULLs:
SELECT COUNT(*) FROM orders;  -- Includes all rows

-- RIGHT - COUNT(column) ignores NULLs:
SELECT COUNT(customer_id) FROM orders;  -- Counts non-NULL only
```

❌ **Mistake 4:** Using GROUP BY with columns that aren't grouped
```sql
-- WRONG - Unpredictable results:
SELECT category, price, AVG(price)
FROM products
GROUP BY category;  -- price is not grouped!

-- RIGHT:
SELECT category, AVG(price)
FROM products
GROUP BY category;
```

❌ **Mistake 5:** Forgetting DISTINCT in COUNT
```sql
-- WRONG - Counts all rows:
SELECT COUNT(customer_id) FROM orders;  -- 100 orders

-- RIGHT - Count unique customers:
SELECT COUNT(DISTINCT customer_id) FROM orders;  -- 45 unique customers
```

❌ **Mistake 6:** Summing with JOINs causing duplicates
```sql
-- WRONG - If customer has 3 orders, SUM multiplies:
SELECT c.name, SUM(o.amount)
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id;  -- May count wrong!

-- RIGHT - Verify data first or use subquery
```

## Aggregate Functions Reference

| Function | Purpose | Example |
|----------|---------|---------|
| COUNT(*) | Count all rows | `COUNT(*)` |
| COUNT(col) | Count non-NULL | `COUNT(email)` |
| COUNT(DISTINCT col) | Count unique | `COUNT(DISTINCT category)` |
| SUM(col) | Total values | `SUM(amount)` |
| AVG(col) | Average value | `AVG(salary)` |
| MIN(col) | Minimum value | `MIN(price)` |
| MAX(col) | Maximum value | `MAX(salary)` |

## Visual Summary

```
Raw Data:
Category    Sales
Electronics 500
Electronics 300
Furniture   200
Furniture   400

GROUP BY Category:
Category    SUM(Sales)
Electronics 800
Furniture   600
```

## Learning Outcomes

After this phase, you should be able to:

✅ Use COUNT() for different purposes  
✅ Calculate SUM, AVG, MIN, MAX correctly  
✅ GROUP BY single and multiple columns  
✅ Understand GROUP BY requirements (all non-agg columns)  
✅ Use HAVING to filter groups  
✅ Know the difference between WHERE and HAVING  
✅ Count unique values with COUNT(DISTINCT)  
✅ Aggregate across JOINs correctly  
✅ Handle NULL values in aggregations  
✅ Combine aggregations with ORDER BY  
✅ Write reporting-style queries  
✅ Answer all aggregation interview questions  

## Real-World Scenarios

### Scenario 1: Sales by Category
```sql
SELECT category, COUNT(*) as num_products, AVG(price) as avg_price, SUM(sales) as total_sales
FROM products
GROUP BY category
ORDER BY total_sales DESC;
```

### Scenario 2: Top Customers
```sql
SELECT customer_name, COUNT(order_id) as order_count, SUM(amount) as total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(amount) > 1000
ORDER BY total_spent DESC;
```

### Scenario 3: Department Salary Analysis
```sql
SELECT 
    department,
    COUNT(*) as emp_count,
    AVG(salary) as avg_salary,
    MIN(salary) as min_salary,
    MAX(salary) as max_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;
```

### Scenario 4: Products with Few Sales
```sql
SELECT product_name, COUNT(order_id) as sales_count
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
HAVING COUNT(order_id) < 5;
```

### Scenario 5: Multi-level Grouping
```sql
SELECT year, month, SUM(revenue) as monthly_revenue
FROM sales
GROUP BY year, month
ORDER BY year, month;
```

## Interview Tips

### For COUNT Questions
- Remember COUNT(col) ignores NULLs
- Use COUNT(*) to count all rows
- Use COUNT(DISTINCT) for unique values

### For SUM/AVG Questions
- NULL values are ignored in aggregation
- SUM of 0 rows returns NULL (not 0)
- Think about what "average" means (null handling)

### For GROUP BY Questions
- All non-aggregated columns MUST be in GROUP BY
- Order of columns in GROUP BY doesn't matter
- Can GROUP BY column not in SELECT

### For HAVING Questions
- HAVING filters AFTER grouping
- WHERE filters BEFORE grouping
- Both can be used together
- HAVING can use aggregate functions

### For JOINs with Aggregates
- Be careful with duplicates from JOINs
- Test your queries with small datasets
- Verify the numbers make sense

## Success Criteria

You're ready to move on when:

- [ ] You understand COUNT(*) vs COUNT(col)
- [ ] You can GROUP BY multiple columns
- [ ] You know the difference between WHERE and HAVING
- [ ] You can write complex aggregation queries
- [ ] You scored 90%+ on challenge.sql
- [ ] You can explain aggregations with JOINs
- [ ] You use COUNT(DISTINCT) correctly

## Common Questions Explained

### Q: What's the difference between COUNT(*) and COUNT(column)?
**A:** COUNT(*) counts all rows including NULLs. COUNT(column) counts only non-NULL values.

### Q: Can I use aggregate function in WHERE?
**A:** No! Use HAVING instead.

### Q: What does GROUP BY return if no rows match?
**A:** Empty result set (no rows).

### Q: Can I GROUP BY a column not in SELECT?
**A:** Yes! And it's useful sometimes (though less readable).

### Q: Why does my JOIN double the aggregation results?
**A:** Likely because of duplicate rows from the JOIN. Use subqueries or verify your data.

### Q: What happens with NULL in aggregates?
**A:** NULL values are ignored in aggregations. NULL in SUM is treated as 0.

## Phase Structure

1. **README.md** - This file
2. **notes.md** - Detailed explanations
3. **examples.sql** - 20+ examples
4. **practice.sql** - 20 exercises
5. **challenge.sql** - 15 problems

## Recommended Schedule

- **Morning:** Read README + notes (1 hour)
- **Afternoon:** Run examples + practice (2 hours)
- **Evening:** Solve challenges (2 hours)

## Next Steps

1. Read `notes.md` thoroughly
2. Run `examples.sql` in PostgreSQL
3. Complete `practice.sql` exercises
4. Solve `challenge.sql` problems
5. Move to Phase 5: **JOINS** (Most important!)

---

**Remember:** Aggregations answer "what's the big picture?" questions. Master them to become a data analyst! 📊
