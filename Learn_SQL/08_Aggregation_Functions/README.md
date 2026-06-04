# Module 08: Aggregation Functions

## 📋 What You'll Learn

Master **aggregate functions** - COUNT, SUM, AVG, MIN, MAX.

## 🎯 Learning Goals

- ✅ COUNT rows and values
- ✅ SUM numbers
- ✅ Calculate AVG, MIN, MAX
- ✅ Use aggregates in queries
- ✅ Filter aggregate results

## 📚 Topics

1. **COUNT Function**
   - COUNT(*) total rows
   - COUNT(column) non-null values
   - COUNT(DISTINCT) unique values

2. **Math Functions**
   - SUM total
   - AVG average
   - MIN minimum
   - MAX maximum

3. **Using Aggregates**
   - In SELECT clause
   - With WHERE
   - Multiple aggregates

4. **Real-World Examples**
   - Total sales
   - Average price
   - Min/max values

## ⏱️ Time Estimate: 2-3 hours

## 🎓 Examples

```sql
SELECT COUNT(*) FROM users;
SELECT SUM(salary) FROM employees;
SELECT AVG(price) FROM products;
SELECT MIN(age), MAX(age) FROM users;
```

## 🚀 Next Module

→ `09_GROUP_BY_and_HAVING/README.md`

Learn to **group and aggregate** data!

---

**Open `notes.md`!** 📚
