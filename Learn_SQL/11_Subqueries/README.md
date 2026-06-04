# Module 11: Subqueries

## 📋 What You'll Learn

Master **subqueries** - queries within queries.

## 🎯 Learning Goals

- ✅ Write subqueries in WHERE
- ✅ Write subqueries in SELECT
- ✅ Correlated subqueries
- ✅ Use IN, EXISTS, ANY, ALL
- ✅ Solve complex problems

## 📚 Topics

1. **Subqueries in WHERE**
   - Simple subqueries
   - IN operator
   - Comparison operators

2. **Subqueries in SELECT**
   - Single value returns
   - Complex calculations

3. **Advanced**
   - EXISTS
   - Correlated subqueries
   - ANY, ALL operators

## ⏱️ Time Estimate: 2-3 hours

## 🎓 Examples

```sql
-- Subquery in WHERE
SELECT * FROM users 
WHERE user_id IN (
  SELECT user_id FROM orders WHERE amount > 1000
);

-- Subquery in SELECT
SELECT name, (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as order_count
FROM users;
```

## 🚀 Next Module

→ `12_Complex_Queries/README.md`

Combine everything!

---

**Start learning!** 📚
