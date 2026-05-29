# Module 01: SQL Foundations

## 📋 Overview

Understand what databases are, how RDBMS works, and master the fundamentals of SQL query syntax.

## 🎯 Learning Objectives

After this module, you will understand:
- What a database is and why it's different from files
- RDBMS vs. NOSQL databases
- The structure of a SQL SELECT statement
- How to filter data with WHERE
- How to sort data with ORDER BY
- Using LIMIT and OFFSET for pagination
- DISTINCT for unique values
- Table and column aliases

## 📚 Topics Covered

1. **Databases & RDBMS Concepts**
   - What is a database?
   - Why databases are better than files
   - ACID properties (overview)
   - Tables, rows, columns

2. **SQL SELECT Statement**
   - Basic syntax
   - Selecting all columns vs. specific columns
   - Column order

3. **WHERE Clause**
   - Comparison operators (=, !=, <, >, <=, >=)
   - Logical operators (AND, OR, NOT)
   - IN and BETWEEN
   - LIKE pattern matching
   - IS NULL

4. **ORDER BY**
   - Ascending vs. Descending
   - Multiple column sorting
   - Performance implications

5. **LIMIT and OFFSET**
   - Pagination
   - Getting top N results
   - Skipping results

6. **DISTINCT**
   - Removing duplicates
   - Counting unique values

7. **Aliases**
   - Column aliases
   - Table aliases (introduced)

## 📁 Files in This Module

- **notes.md** - Theory and detailed explanations
- **examples.sql** - Practical examples with output
- **practice.sql** - Guided exercises (with solutions commented)
- **challenge.sql** - Harder problems to solve

## ⏱️ Time Estimate: 4-5 hours

---

## Key Concepts to Remember

### Why Databases?
- **Structured:** Data is organized in tables
- **Query:** Ask complex questions about data
- **ACID:** Guarantees reliability (Atomicity, Consistency, Isolation, Durability)
- **Scalable:** Handle millions of rows efficiently
- **Concurrent:** Multiple users simultaneously
- **Secure:** User permissions and access control

### Basic SQL Query Structure
```sql
SELECT columns
FROM table
WHERE conditions
ORDER BY columns
LIMIT n OFFSET m;
```

This is the structure you'll use in ~80% of your SQL work.

---

## 🎓 Learning Path

1. Read `notes.md` - Understand concepts
2. Review `examples.sql` - See how it works
3. Complete `practice.sql` - Guided learning
4. Solve `challenge.sql` - Test your knowledge

---

## 💡 Important Tips

- **Start simple:** Master basic SELECT before adding complexity
- **Use aliases:** `SELECT name AS student_name` makes output clearer
- **Order matters:** WHERE filters before ORDER BY sorts
- **LIMIT is cheap:** Always use LIMIT while exploring data
- **Test incrementally:** Build queries step by step

---

## 📊 Expected Dataset

You'll work with a sample `students` table:
```
id (INTEGER)
name (VARCHAR)
email (VARCHAR)
age (INTEGER)
enrollment_date (DATE)
gpa (DECIMAL)
```

---

## ✅ Mastery Checklist

After this module, you should be able to:

- [ ] Explain what a database is
- [ ] Write a basic SELECT query
- [ ] Filter with WHERE (single and multiple conditions)
- [ ] Sort results with ORDER BY
- [ ] Use LIMIT for pagination
- [ ] Get unique values with DISTINCT
- [ ] Use wildcards with LIKE
- [ ] Handle NULL values correctly
- [ ] Use table and column aliases
- [ ] Combine multiple conditions with AND/OR

---

## 🚀 Next Steps

- Complete all exercises in this module
- Experiment with the sample data
- Create your own questions and answer them
- Move to Module 02 when confident

---

## 📚 Additional Resources

- PostgreSQL SELECT: https://www.postgresql.org/docs/current/sql-select.html
- WHERE Clause: https://www.postgresql.org/docs/current/sql-syntax-lexical.html

