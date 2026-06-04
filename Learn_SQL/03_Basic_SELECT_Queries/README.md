# Module 03: Basic SELECT Queries

## 📋 What You'll Learn

Master the **SELECT statement** - the foundation of all SQL queries.

## 🎯 Learning Goals

After this module, you will:
- ✅ Write basic SELECT queries
- ✅ Select all columns with `SELECT *`
- ✅ Select specific columns
- ✅ Use column aliases
- ✅ Understand query results

## 📚 Topics Covered

1. **SELECT Statement**
   - `SELECT *` - All columns
   - `SELECT column1, column2` - Specific columns
   - Column order matters
   - SQL syntax basics

2. **Column Aliases (AS)**
   - Rename columns in output
   - Make results readable
   - Better documentation

3. **Data Exploration**
   - Looking at table structure
   - Understanding your data
   - First steps with real data

4. **Common Mistakes**
   - Using `*` in production (BAD)
   - Forgetting column names
   - Wrong syntax

## 📁 Files in This Module

- **README.md** - This guide
- **notes.md** - Theory and explanations
- **examples.sql** - Working code examples
- **practice.sql** - Exercises to solve
- **challenge.sql** - Harder problems

## 💡 How to Use This Module

### Day 1: Learn Theory
1. Read this README (5 min)
2. Study `notes.md` (30-40 min)

### Day 2: See Examples
1. Open `examples.sql` in MySQL
2. Run each example
3. Understand the output

### Day 3: Practice
1. Solve all exercises in `practice.sql`
2. Don't copy-paste - TYPE the code!
3. Test your understanding

### Day 4: Challenge
1. Solve `challenge.sql` problems
2. Take your time
3. Understand the why

## ⏱️ Time Estimate: 2 hours

## ✅ Success Criteria

You'll know you've mastered this module when you can:
- [ ] Write `SELECT *` from any table
- [ ] Select specific columns
- [ ] Use aliases to rename columns
- [ ] Solve all practice problems
- [ ] Solve all challenge problems
- [ ] Explain what SELECT does to someone else

## 🎓 Key Concepts to Remember

### Basic SELECT
```sql
SELECT column1, column2, column3
FROM table_name;
```

### With Aliases
```sql
SELECT column1 AS new_name
FROM table_name;
```

### All Columns
```sql
SELECT * FROM table_name;
```

## 🆘 If You Get Stuck

1. Check syntax - spelling matters!
2. Review `examples.sql` again
3. Simplify your query
4. Google the error message
5. Ask ChatGPT to explain

## 📖 Common Questions

**Q: Do I need to use aliases?**
A: No, but it makes output clearer. Best practice to use them.

**Q: Can I select columns in any order?**
A: Yes! The order you SELECT is the order they appear.

**Q: Why not always use SELECT *?**
A: In production, only select what you need (faster, safer, clearer).

## 🚀 Next Module

→ Move to: `04_Filtering_with_WHERE/README.md`

Now you'll learn how to **filter data** and get exactly what you need!

---

**Ready? Open `notes.md` to start learning!** 📚
