# Module 10: JOINs

## 📋 What You'll Learn

Master **JOINs** - how to combine data from multiple tables.

## 🎯 Learning Goals

- ✅ INNER JOIN (matching records)
- ✅ LEFT JOIN (all from left table)
- ✅ RIGHT JOIN (all from right table)
- ✅ FULL OUTER JOIN (all records)
- ✅ SELF JOIN and CROSS JOIN

## 📚 Topics

1. **INNER JOIN**
   - Only matching records
   - Most common join

2. **LEFT/RIGHT JOIN**
   - Keep all records from one table
   - Fill with NULL if no match

3. **FULL OUTER JOIN**
   - All records from both tables

4. **Other Joins**
   - SELF JOIN
   - CROSS JOIN

## ⏱️ Time Estimate: 3-4 hours

## 🎓 Examples

```sql
-- INNER JOIN
SELECT u.name, o.amount 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN
SELECT u.name, COUNT(o.id) 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
GROUP BY u.id;
```

## 🚀 Next Module

→ `11_Subqueries/README.md`

Learn **nested queries**!

---

**Open `notes.md`!** 📚
