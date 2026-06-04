# Module 02: Your First SQL Code

## 🎯 What You'll Do

In the next 30 minutes, you'll:
1. Create your first database
2. Create tables for users, posts, comments
3. Insert sample data
4. Query the data
5. See it work!

## 📁 Files Here

- **first_code.sql** - Your first complete SQL program
- **README.md** - This guide

## 🚀 How to Run first_code.sql

### Option 1: MySQL Workbench (Recommended)

1. Open **MySQL Workbench**
2. Click your `practice` connection
3. Open a new query tab (File → New Query Tab)
4. Copy the entire code from **first_code.sql**
5. Paste it into the query tab
6. Click the **lightning bolt icon** (Execute)
7. Watch the results!

### Option 2: VS Code with SQLTools

1. Open **VS Code**
2. Create a new file: `first_code.sql`
3. Copy-paste code from **first_code.sql**
4. Select all text (Ctrl+A)
5. Right-click → **Run Selected Query**
6. See results in Output panel

### Option 3: Command Line

1. Open **Command Prompt**
2. Navigate to your Learn_SQL folder:
   ```bash
   cd "path/to/Learn_SQL/02_SQL_Introduction"
   ```
3. Run the file:
   ```bash
   mysql -u root -p < first_code.sql
   ```
4. Enter your MySQL password

## 📝 What first_code.sql Does

### Step 1: Create Database
```sql
CREATE DATABASE practice;
USE practice;
```
- Creates a new database called `practice`
- Selects it for use

### Step 2: Create Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**What this means:**
- `id` - Unique identifier (automatically increases)
- `name` - Text (required)
- `email` - Text (must be unique, required)
- `age` - Number (optional)
- `created_at` - Auto-set to current date/time

### Step 3: Create Posts Table
```sql
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**What this means:**
- `user_id` connects to users table
- `FOREIGN KEY` ensures every post has a real user
- `TEXT` for longer content

### Step 4: Create Comments Table
```sql
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**What this means:**
- Comments connect to both posts and users
- Multiple foreign keys link data together

### Step 5: Insert Data

```sql
INSERT INTO users (name, email, age)
VALUES 
  ('Wazir', 'wazir@example.com', 24),
  ('Ritik', 'ritik@example.com', 24),
  ('Crescha', 'crescha@example.com', 23),
  ('Priya', 'priya@example.com', 26),
  ('Arjun', 'arjun@example.com', 28);
```

Adds 5 users to the table.

### Step 6: Query Data

```sql
SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM comments;
```

Gets all data from each table.

## 📊 What the Data Looks Like

After running first_code.sql:

### Users Table
```
id | name    | email                | age | created_at
---|---------|----------------------|-----|-------------------
1  | Wazir   | wazir@example.com   | 24  | 2024-05-29 12:34:56
2  | Ritik   | ritik@example.com   | 24  | 2024-05-29 12:34:56
3  | Crescha | crescha@example.com | 23  | 2024-05-29 12:34:56
4  | Priya   | priya@example.com   | 26  | 2024-05-29 12:34:56
5  | Arjun   | arjun@example.com   | 28  | 2024-05-29 12:34:56
```

### Posts Table
```
id | user_id | title              | content                    | created_at
---|---------|--------------------|-----------------------------|-------------------
1  | 1       | My React Journey   | Started learning React...  | 2024-05-29 12:34:56
2  | 1       | DSA in JavaScript  | 100 days of solving...     | 2024-05-29 12:34:56
3  | 2       | Life in Bengaluru  | Moving to the city...      | 2024-05-29 12:34:56
... (5 total posts)
```

### Comments Table
```
id | post_id | user_id | body                                | created_at
---|---------|---------|-------------------------------------|-------------------
1  | 1       | 2       | Great post Wazir, very relatable! | 2024-05-29 12:34:56
2  | 1       | 3       | I had the same experience...      | 2024-05-29 12:34:56
... (5 total comments)
```

## 🎯 Exercises After Running

Once you've run first_code.sql, try these queries:

### 1. Find a specific user
```sql
SELECT * FROM users WHERE name = 'Wazir';
```

### 2. Get all posts from user_id = 1
```sql
SELECT * FROM posts WHERE user_id = 1;
```

### 3. Count total users
```sql
SELECT COUNT(*) FROM users;
```

### 4. Get all comments
```sql
SELECT * FROM comments;
```

### 5. Find user's email
```sql
SELECT email FROM users WHERE name = 'Priya';
```

## ✅ Checklist

After running first_code.sql:

- [ ] Saw "Query OK" messages
- [ ] Database `practice` exists
- [ ] Tables created: users, posts, comments
- [ ] Data inserted successfully
- [ ] Could run queries and see results

## 🎓 What You Learned

You just:
1. ✅ Created a database
2. ✅ Designed 3 tables with relationships
3. ✅ Inserted sample data
4. ✅ Queried the data
5. ✅ Understood database structure

**That's a complete database system!**

## 🚀 What's Next?

Now that you understand database structure, let's learn:

Go to: `03_Basic_SELECT_Queries/README.md`

You'll:
- Master the SELECT statement
- Learn to choose specific columns
- Filter and sort data
- Write professional queries

---

## 💭 Common Questions

### "What's AUTO_INCREMENT?"
Automatically assigns a number: user 1, user 2, user 3, etc.

### "What's PRIMARY KEY?"
A unique identifier for each row. No duplicates allowed.

### "What's FOREIGN KEY?"
A link to another table. Ensures data consistency.

### "What's NOT NULL?"
Field must have a value. Can't be empty.

### "What's UNIQUE?"
Each value can appear only once. No duplicate emails!

---

**Understanding databases? Great! Now master SELECT queries →**
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
