# Module 05: Sorting and Limiting

## 📋 What You'll Learn

Master **ORDER BY** and **LIMIT** - how to sort and limit your results.

## 🎯 Learning Goals

- ✅ Sort results with ORDER BY
- ✅ Sort ascending vs descending
- ✅ Sort by multiple columns
- ✅ Use LIMIT to get top N rows
- ✅ Use OFFSET for pagination

## 📚 Topics Covered

1. **ORDER BY Clause**
   - ASC (ascending) and DESC (descending)
   - Single column sorting
   - Multiple column sorting
   - Sorting by expressions

2. **LIMIT Clause**
   - Get top N rows
   - Pagination basics
   - Common use cases

3. **OFFSET**
   - Skip rows
   - Implement pagination
   - Page navigation

4. **Combined Usage**
   - Filter → Sort → Limit
   - Real-world queries

## ⏱️ Time Estimate: 1-2 hours

## ✅ Success Criteria

- [ ] Sort ascending and descending
- [ ] Sort by multiple columns
- [ ] Use LIMIT correctly
- [ ] Implement pagination with OFFSET
- [ ] Combine WHERE, ORDER BY, LIMIT
- [ ] Solve all practice problems

## 🎓 Key Concepts

```sql
-- Ascending (default)
SELECT * FROM users ORDER BY age;

-- Descending
SELECT * FROM users ORDER BY age DESC;

-- Multiple columns
SELECT * FROM users ORDER BY age DESC, name ASC;

-- LIMIT
SELECT * FROM users LIMIT 10;

-- LIMIT with OFFSET (pagination)
SELECT * FROM users LIMIT 10 OFFSET 20;

-- All together
SELECT * FROM users 
WHERE age > 20 
ORDER BY age DESC 
LIMIT 5;
```

## 🚀 Next Module

→ Move to: `06_Data_Types_and_CREATE_TABLE/README.md`

Now learn to **CREATE tables** and understand data types!

---

**Open `notes.md` to start!** 📚
