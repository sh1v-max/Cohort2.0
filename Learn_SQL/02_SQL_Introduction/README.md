# Phase 3: Querying - Master Data Retrieval

## What You'll Learn

Querying is the art of **getting exactly the data you need** from tables using filters, sorting, and limiting results.

## Topics Covered

1. **WHERE Clause**
   - Basic comparison operators (=, !=, <, >, <=, >=)
   - Logical operators (AND, OR, NOT)
   - Combining multiple conditions

2. **Filtering Operators**
   - LIKE - Pattern matching
   - BETWEEN - Range filtering
   - IN - Multiple values
   - IS NULL - Check for NULL values

3. **ORDER BY**
   - Ascending (ASC) and Descending (DESC)
   - Multiple columns
   - Using column position

4. **LIMIT and OFFSET**
   - Limiting row count
   - Pagination with OFFSET
   - TOP N queries

5. **DISTINCT**
   - Remove duplicates
   - Distinct with WHERE
   - Distinct with multiple columns

6. **Aliases**
   - Column aliases (AS)
   - Table aliases
   - Making results readable

## Why This Matters for Interviews

**Interview Question Example:**
> "Write a query to find all customers from 'USA' who have made orders, sorted by order count descending, showing top 10."

### Common Interview Questions

1. "Write a query with multiple WHERE conditions"
2. "How do you find records that DON'T match a pattern?"
3. "What's the difference between WHERE and HAVING?"
4. "How do you implement pagination?"
5. "How do you find duplicate values?"
6. "What's the most efficient way to get top N records?"
7. "When would you use LIKE vs = operator?"
8. "How do you handle case-sensitive searches?"

## Common Mistakes to Avoid

❌ **Mistake 1:** Using = instead of LIKE for pattern matching
```sql
-- WRONG - No results:
SELECT * FROM customers WHERE email = '%gmail%';

-- RIGHT:
SELECT * FROM customers WHERE email LIKE '%gmail%';
```

❌ **Mistake 2:** Forgetting to escape special characters in LIKE
```sql
-- WRONG - % is wildcard:
SELECT * FROM products WHERE name LIKE 'TV 50%"';

-- RIGHT - Escape with backslash:
SELECT * FROM products WHERE name LIKE 'TV 50\%' ESCAPE '\';
```

❌ **Mistake 3:** ORDER BY with ambiguous column names
```sql
-- WRONG - Multiple tables have 'status':
SELECT c.name, o.status FROM customers c JOIN orders o
ORDER BY status;  -- Which table's status?

-- RIGHT - Be specific:
ORDER BY o.status;
```

❌ **Mistake 4:** OFFSET without ORDER BY (unpredictable order)
```sql
-- WRONG - Order not guaranteed:
SELECT * FROM users LIMIT 10 OFFSET 20;

-- RIGHT - Always order first:
SELECT * FROM users ORDER BY user_id LIMIT 10 OFFSET 20;
```

❌ **Mistake 5:** NULL comparisons with =
```sql
-- WRONG - Never matches:
SELECT * FROM employees WHERE manager_id = NULL;

-- RIGHT:
SELECT * FROM employees WHERE manager_id IS NULL;
```

❌ **Mistake 6:** LIKE without wildcards (defeats purpose)
```sql
-- INEFFICIENT - Using LIKE for exact match:
SELECT * FROM users WHERE name LIKE 'John';

-- BETTER - Use = for exact match:
SELECT * FROM users WHERE name = 'John';
```

## Visual Guide

```
SELECT * FROM table
WHERE [conditions]      ← Filter rows
ORDER BY [column]       ← Sort
LIMIT n OFFSET m        ← Paginate
```

## Operator Reference

| Operator | Usage | Example |
|----------|-------|---------|
| = | Equal | `age = 25` |
| != or <> | Not equal | `status != 'inactive'` |
| < | Less than | `salary < 50000` |
| > | Greater than | `salary > 50000` |
| <= | Less or equal | `age <= 30` |
| >= | Greater or equal | `age >= 18` |
| LIKE | Pattern match | `email LIKE '%@gmail.com'` |
| BETWEEN | Range | `date BETWEEN '2024-01-01' AND '2024-12-31'` |
| IN | Multiple values | `status IN ('active', 'pending')` |
| IS NULL | Check NULL | `phone IS NULL` |
| IS NOT NULL | Not NULL | `phone IS NOT NULL` |
| AND | Both true | `age > 18 AND country = 'USA'` |
| OR | Either true | `status = 'active' OR status = 'pending'` |
| NOT | Negate | `NOT status = 'deleted'` |

## LIKE Pattern Guide

```
'John%'      → Starts with John (John, Johnny, Johnathan)
'%John'      → Ends with John (Alex John, John)
'%John%'     → Contains John (St. John, John Smith)
'J_hn'       → Single char wildcard (John, Jean)
'[A-Z]%'     → Starts with A-Z (in some databases)
```

## Learning Outcomes

After this phase, you should be able to:

✅ Write WHERE clauses with multiple conditions  
✅ Use all comparison and logical operators  
✅ Use LIKE for pattern matching  
✅ Use BETWEEN for range queries  
✅ Use IN for multiple values  
✅ Handle NULL values correctly  
✅ Sort by single and multiple columns  
✅ Implement pagination with LIMIT/OFFSET  
✅ Use DISTINCT to find unique values  
✅ Use aliases for readability  
✅ Combine all operators in complex queries  
✅ Optimize queries for performance  
✅ Answer any querying interview question  

## Real-World Scenarios

### Scenario 1: Find Active Users in a City
```sql
SELECT user_id, name, email
FROM users
WHERE status = 'active' AND city = 'New York'
ORDER BY name ASC;
```

### Scenario 2: Email Search with Pagination
```sql
SELECT user_id, name, email
FROM users
WHERE email LIKE '%@company.com'
ORDER BY user_id
LIMIT 10 OFFSET 20;  -- Page 3 (assuming 10 per page)
```

### Scenario 3: Find Orders in Date Range
```sql
SELECT order_id, customer_id, amount
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31'
  AND amount > 100
ORDER BY amount DESC;
```

### Scenario 4: Find Incomplete Tasks
```sql
SELECT task_id, title, due_date
FROM tasks
WHERE status IN ('todo', 'in_progress')
  AND due_date < CURRENT_DATE
ORDER BY due_date ASC;
```

### Scenario 5: Find Null Values
```sql
SELECT employee_id, name
FROM employees
WHERE manager_id IS NULL
  AND department_id IS NOT NULL;
```

## Interview Tips

### For WHERE Clause Questions
- Use AND for multiple conditions (not commas)
- Use OR carefully (often need parentheses)
- Test with NULL values
- Remember = doesn't work with NULL

### For LIKE Questions
- Mention case sensitivity (depends on database)
- Talk about performance (LIKE slower than =)
- Explain wildcards (%, _)
- Consider using full-text search for large text

### For ORDER BY Questions
- Specify ASC or DESC explicitly
- Use column name, not position (more readable)
- Can order by multiple columns
- Can order by columns not in SELECT

### For LIMIT/OFFSET Questions
- Use for pagination
- Always ORDER BY first
- OFFSET can be slow with large numbers
- Mention "seek method" for better pagination

### For DISTINCT Questions
- Removes duplicates from result
- Works with multiple columns
- Not same as GROUP BY (though similar)
- Can be slow on large result sets

## Success Criteria

You're ready to move on when:

- [ ] You can write WHERE with 3+ conditions
- [ ] You use LIKE and BETWEEN confidently
- [ ] You understand NULL handling (IS NULL)
- [ ] You can write ORDER BY with multiple columns
- [ ] You can implement pagination
- [ ] You scored 90%+ on challenge.sql
- [ ] You can explain each operator's use

## Common Questions Explained

### Q: What's faster - WHERE or LIKE?
**A:** WHERE with = is faster. LIKE requires pattern matching which is slower.

### Q: Can I ORDER BY a column not in SELECT?
**A:** Yes! The column doesn't need to be in the result.

### Q: What's the difference between != and <>?
**A:** Same thing - both mean "not equal". Use !=, it's more standard.

### Q: How do I paginate efficiently?
**A:** Use LIMIT/OFFSET, but for very large datasets, use "seek method" (filter by ID).

### Q: Can I use LIMIT without ORDER BY?
**A:** Yes, but order is unpredictable. Always ORDER BY for consistent results.

### Q: Is DISTINCT same as GROUP BY?
**A:** Similar but different. GROUP BY for aggregations, DISTINCT for unique rows.

## Phase Structure

1. **README.md** - This file
2. **notes.md** - Detailed explanations
3. **examples.sql** - 20+ examples
4. **practice.sql** - 20 exercises
5. **challenge.sql** - 15 problems

## Recommended Schedule

- **Morning:** Read README + notes (1 hour)
- **Afternoon:** Run examples + practice (2 hours)
- **Evening:** Solve challenges + review (2 hours)

## Next Steps

1. Read `notes.md` thoroughly
2. Run `examples.sql` and modify queries
3. Complete `practice.sql` exercises
4. Solve `challenge.sql` problems
5. Move to Phase 4: Aggregations

---

**Remember:** Mastering WHERE, ORDER BY, and LIMIT will make you efficient at data retrieval! 🚀
