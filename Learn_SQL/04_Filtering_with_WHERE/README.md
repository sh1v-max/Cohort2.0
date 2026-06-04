# Module 04: Filtering with WHERE

## 📋 What You'll Learn

Master the **WHERE clause** - how to filter data and get only what you need.

## 🎯 Learning Goals

After this module, you will:
- ✅ Filter data with WHERE clause
- ✅ Use comparison operators (=, !=, <, >, <=, >=)
- ✅ Combine conditions with AND/OR
- ✅ Use IN, BETWEEN, LIKE operators
- ✅ Handle NULL values

## 📚 Topics Covered

1. **WHERE Clause Basics**
   - Basic filtering
   - Comparison operators
   - Execution order

2. **Logical Operators**
   - AND (both true)
   - OR (at least one true)
   - NOT (reverse)
   - Complex conditions

3. **Advanced Filtering**
   - IN operator
   - BETWEEN operator
   - LIKE pattern matching
   - NULL handling

4. **Real-World Examples**
   - Find specific records
   - Filter by criteria
   - Combine multiple filters

## 📁 Files in This Module

- **README.md** - This guide
- **notes.md** - Theory and explanations
- **examples.sql** - Working code examples
- **practice.sql** - Exercises to solve
- **challenge.sql** - Harder problems

## 💡 How to Use This Module

1. Read this README (5 min)
2. Study `notes.md` (40-50 min)
3. Review `examples.sql` (30 min)
4. Solve `practice.sql` (1-2 hours)
5. Challenge yourself with `challenge.sql` (1 hour)

## ⏱️ Time Estimate: 2 hours

## ✅ Success Criteria

- [ ] Write WHERE with comparison operators
- [ ] Combine conditions with AND/OR
- [ ] Use IN and BETWEEN
- [ ] Use LIKE for pattern matching
- [ ] Handle NULL values correctly
- [ ] Solve all practice problems
- [ ] Solve all challenge problems

## 🎓 Key Concepts

```sql
-- Basic WHERE
SELECT * FROM users WHERE age > 20;

-- AND operator
SELECT * FROM users WHERE age > 20 AND city = 'Mumbai';

-- OR operator
SELECT * FROM users WHERE age > 20 OR city = 'Delhi';

-- IN operator
SELECT * FROM users WHERE age IN (20, 21, 22);

-- BETWEEN operator
SELECT * FROM users WHERE age BETWEEN 20 AND 25;

-- LIKE operator
SELECT * FROM users WHERE name LIKE 'J%';

-- NULL handling
SELECT * FROM users WHERE email IS NULL;
```

## 🚀 Next Module

→ Move to: `05_Sorting_and_Limiting/README.md`

Next you'll learn to **sort results** and **limit output**!

---

**Ready? Open `notes.md` now!** 📚
