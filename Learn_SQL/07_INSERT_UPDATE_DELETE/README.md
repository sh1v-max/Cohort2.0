# Module 07: INSERT, UPDATE, DELETE

## 📋 What You'll Learn

Master **CRUD operations** - how to modify data in tables.

## 🎯 Learning Goals

- ✅ INSERT new data
- ✅ UPDATE existing data
- ✅ DELETE data safely
- ✅ Use WHERE clause with modifications
- ✅ Prevent accidental changes

## 📚 Topics

1. **INSERT Statement**
   - Insert single row
   - Insert multiple rows
   - Insert with specific columns

2. **UPDATE Statement**
   - Update specific rows
   - Update multiple columns
   - Use WHERE to be specific

3. **DELETE Statement**
   - Delete rows safely
   - Use WHERE clause
   - Prevent data loss

4. **Best Practices**
   - Always use WHERE
   - Backup before bulk changes
   - Test before executing

## ⏱️ Time Estimate: 2-3 hours

## 🎓 Examples

```sql
-- INSERT
INSERT INTO users (name, email, age) 
VALUES ('John', 'john@example.com', 25);

-- UPDATE
UPDATE users SET age = 26 WHERE name = 'John';

-- DELETE
DELETE FROM users WHERE age < 18;
```

## 🚀 Next Module

→ `08_Aggregation_Functions/README.md`

Learn to **calculate statistics** with aggregate functions!

---

**Start with `notes.md`!** 📚
