# Phase 8: Interview Patterns - 50+ Real Questions Solved

## What You'll Learn

This phase focuses on **50+ common SQL patterns** that appear repeatedly in real interviews. Master these and you'll recognize 70% of interview questions!

## Topics Covered

### Pattern Categories

1. **Basic Patterns (5)**
   - Simple filtering
   - Multiple conditions
   - LIKE searches
   - IN operator
   - BETWEEN ranges

2. **Aggregation Patterns (5)**
   - Counting records
   - Summing values
   - Averaging with conditions
   - Group filtering (HAVING)
   - Multiple aggregates

3. **JOIN Patterns (5)**
   - Inner joins
   - Left joins
   - Multiple table joins
   - Self joins
   - Complex join conditions

4. **Subquery Patterns (5)**
   - Subqueries in WHERE
   - IN vs EXISTS
   - Correlated subqueries
   - Derived tables
   - Scalar subqueries

5. **Advanced Patterns (15)**
   - Finding second highest/lowest
   - Finding duplicates
   - Finding missing data
   - Ranking queries
   - Running totals
   - Data grouping strategies
   - Complex filtering
   - Time-based analysis
   - Market basket analysis
   - Cohort analysis
   - Percentage calculations
   - CTEs
   - Window functions intro
   - Data quality checks
   - Performance optimization

6. **Real-World Patterns (10+)**
   - Customer analysis
   - Product performance
   - Department metrics
   - RFM analysis
   - Trend analysis
   - Comparison queries
   - Hierarchical data
   - JSON operations
   - Full-text search
   - Multi-criteria filtering

## Why This Matters for Interviews

**These 50 patterns cover 70% of all SQL interview questions!**

### Common Interview Questions

1. "Find the second highest salary"
2. "Find duplicate records"
3. "Find customers who never ordered"
4. "Calculate running totals"
5. "Rank products by sales"
6. "Find the top 3 products per category"
7. "Calculate year-over-year growth"
8. "Find customers in specific cohorts"
9. "Identify data quality issues"
10. "Write a complex multi-table query"

## Common Mistakes to Avoid

❌ **Mistake 1:** Wrong approach for "Second Highest"
```sql
-- WRONG - Doesn't handle ties:
SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- RIGHT - Using DISTINCT and LIMIT:
SELECT DISTINCT salary FROM employees 
ORDER BY salary DESC LIMIT 1 OFFSET 1;
```

❌ **Mistake 2:** Finding duplicates incorrectly
```sql
-- WRONG - Doesn't show duplicates:
SELECT column FROM table WHERE COUNT(*) > 1;  -- ERROR!

-- RIGHT - Using GROUP BY:
SELECT column, COUNT(*)
FROM table
GROUP BY column
HAVING COUNT(*) > 1;
```

❌ **Mistake 3:** Finding missing data with INNER JOIN
```sql
-- WRONG - INNER JOIN excludes missing:
SELECT c.* FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
WHERE o.order_id IS NULL;  -- Never true in INNER JOIN!

-- RIGHT - Use LEFT JOIN:
SELECT c.* FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.order_id IS NULL;
```

❌ **Mistake 4:** Ranking without proper ORDER BY
```sql
-- WRONG - Unpredictable ranks:
SELECT *, RANK() OVER (ORDER BY salary) as rank FROM employees;

-- RIGHT - Order and partition correctly:
SELECT *, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) as rank
FROM employees;
```

❌ **Mistake 5:** Running total without proper window function
```sql
-- WRONG - Inefficient correlated subquery:
SELECT order_date, amount,
    (SELECT SUM(amount) FROM orders o2 
     WHERE o2.order_date <= o1.order_date) as running_total
FROM orders o1;

-- RIGHT - Use window function:
SELECT order_date, amount,
    SUM(amount) OVER (ORDER BY order_date) as running_total
FROM orders;
```

## Pattern Library

### Pattern 1: Second Highest/Lowest
```sql
SELECT salary FROM employees 
ORDER BY salary DESC LIMIT 1 OFFSET 1;
```

### Pattern 2: Find Duplicates
```sql
SELECT column, COUNT(*) FROM table 
GROUP BY column HAVING COUNT(*) > 1;
```

### Pattern 3: Find Missing Data
```sql
SELECT a.* FROM table_a a
LEFT JOIN table_b b ON a.id = b.id
WHERE b.id IS NULL;
```

### Pattern 4: Ranking
```sql
SELECT *, RANK() OVER (ORDER BY value DESC) as rank
FROM table;
```

### Pattern 5: Running Total
```sql
SELECT date, amount,
    SUM(amount) OVER (ORDER BY date) as running_total
FROM orders;
```

### Pattern 6: Top N Per Group
```sql
WITH ranked AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) as rn
    FROM products
)
SELECT * FROM ranked WHERE rn <= 3;
```

### Pattern 7: Customer Segmentation
```sql
SELECT customer_id,
    COUNT(order_id) as frequency,
    SUM(amount) as monetary_value,
    MAX(order_date) as recency
FROM orders GROUP BY customer_id;
```

### Pattern 8: Percentage of Total
```sql
SELECT category, 
    SUM(amount) as sales,
    ROUND(100.0 * SUM(amount) / (SELECT SUM(amount) FROM orders), 2) as percentage
FROM orders GROUP BY category;
```

### Pattern 9: Consecutive Days
```sql
SELECT date FROM orders
WHERE date >= CURRENT_DATE - 7  -- Last 7 days
ORDER BY date;
```

### Pattern 10: Cohort Analysis
```sql
SELECT EXTRACT(MONTH FROM created_at) as cohort_month,
    COUNT(*) as new_users
FROM users
GROUP BY EXTRACT(MONTH FROM created_at);
```

## Learning Outcomes

After this phase, you should be able to:

✅ Recognize common SQL patterns  
✅ Know the best approach for each pattern  
✅ Write efficient pattern implementations  
✅ Explain trade-offs in approaches  
✅ Adapt patterns to new scenarios  
✅ Combine multiple patterns  
✅ Optimize pattern queries  
✅ Answer 50+ real interview questions  

## Real-World Scenarios

### Scenario 1: Product Analytics
Find top 5 products by revenue with month-over-month growth.

### Scenario 2: Customer Churn
Find customers who haven't ordered in 6 months.

### Scenario 3: Department Performance
Compare department metrics (size, avg salary, total cost).

### Scenario 4: Data Quality
Find missing, duplicate, or invalid records.

### Scenario 5: Market Trends
Analyze customer cohorts by signup date.

## Interview Tips

### Before Solving
- Identify which pattern(s) apply
- Sketch the approach mentally
- Consider edge cases (NULLs, empty results)
- Think about performance

### While Solving
- Write incrementally (test subqueries)
- Use comments to explain logic
- Test on small datasets
- Verify results make sense

### After Solving
- Check for edge cases
- Explain your approach
- Mention alternatives
- Discuss optimization

## Success Criteria

You're ready to move on when:

- [ ] You recognize 50+ patterns
- [ ] You can code each pattern quickly
- [ ] You understand trade-offs
- [ ] You scored 90%+ on all problems
- [ ] You can teach these patterns
- [ ] You can adapt patterns to new problems

## Common Questions Explained

### Q: How do I find the second highest salary?
**A:** Use DISTINCT and LIMIT with OFFSET or use window functions.

### Q: What's the best way to find duplicates?
**A:** GROUP BY with HAVING COUNT(*) > 1

### Q: How do I find customers without orders?
**A:** LEFT JOIN and check for NULL in right table.

### Q: What's the difference between RANK and ROW_NUMBER?
**A:** RANK handles ties; ROW_NUMBER doesn't. Use based on your needs.

### Q: How do I calculate running totals efficiently?
**A:** Use window functions with SUM() OVER.

## Phase Structure

1. **README.md** - This file
2. **notes.md** - Pattern explanations
3. **examples.sql** - 50+ pattern examples (ALREADY PROVIDED!)
4. **practice.sql** - 30 practice problems
5. **challenge.sql** - 20 interview-style questions

## Recommended Schedule

- **Day 1 Morning:** Read README + understand patterns
- **Day 1 Afternoon:** Study examples.sql thoroughly
- **Day 2 Morning:** Attempt practice problems
- **Day 2 Afternoon:** Solve challenges

## Using top-50-interview-patterns.sql

The file `interview-questions/top-50-interview-patterns.sql` contains all 50 patterns ready to use!

1. Run the entire file to see all patterns
2. Modify queries to understand variations
3. Test on different datasets
4. Practice explaining each pattern

## Next Steps

1. Read `notes.md` for pattern categories
2. Study `interview-questions/top-50-interview-patterns.sql`
3. Complete `practice.sql` exercises
4. Solve `challenge.sql` problems
5. Move to Phase 9: Indexes & Transactions

---

**Remember:** These 50 patterns will make you interview-ready! Master them! 🎯
