# Module 09: GROUP BY & HAVING

## 📋 What You'll Learn

Master **GROUP BY** - how to group and analyze data.

## 🎯 Learning Goals

- ✅ Group data with GROUP BY
- ✅ Use aggregates per group
- ✅ Filter groups with HAVING
- ✅ Understand GROUP BY vs WHERE
- ✅ Solve real grouping problems

## 📚 Topics

1. **GROUP BY Clause**
   - Group by single column
   - Group by multiple columns
   - Aggregate per group

2. **HAVING Clause**
   - Filter groups
   - Difference from WHERE
   - Complex conditions

3. **Real-World Queries**
   - Sales per product
   - Count per category
   - Average per department

## ⏱️ Time Estimate: 2-3 hours

## 🎓 Examples

```sql
-- Sales per product
SELECT product_id, SUM(amount) 
FROM orders 
GROUP BY product_id;

-- Average salary per department
SELECT department, AVG(salary) 
FROM employees 
GROUP BY department 
HAVING AVG(salary) > 50000;
```

## 🚀 Next Module

→ `10_JOINs/README.md`

Learn to **combine data** from multiple tables!

---

**Start with `notes.md`!** 📚
