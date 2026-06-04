# Phase 2: CRUD Operations

## What You'll Learn

CRUD = Create, Read, Update, Delete. These are the **four fundamental operations** for working with data in any database.

## Topics Covered

1. **CREATE TABLE**
   - Table creation syntax
   - Column definitions
   - Data types
   - Constraints

2. **INSERT**
   - Single row insertion
   - Multiple row insertion
   - Inserting with DEFAULT values
   - Returning inserted data

3. **SELECT (Basic)**
   - SELECT all columns (*)
   - SELECT specific columns
   - Column aliases
   - Basic result formatting

4. **UPDATE**
   - Update single row
   - Update multiple rows
   - Update with conditions
   - Update multiple columns

5. **DELETE**
   - Delete single row
   - Delete multiple rows
   - Delete with conditions
   - DELETE vs TRUNCATE

## Why This Matters for Interviews

**Interview Question Example:**
> "Write an INSERT statement to add a new customer. Then write an UPDATE to modify their email."

### Common Interview Questions

1. "How do you insert multiple rows at once?"
2. "What's the difference between DELETE and TRUNCATE?"
3. "How do you return inserted data in PostgreSQL?"
4. "Can you update without WHERE clause?"
5. "What happens if you DELETE without WHERE?"
6. "How do you insert data with DEFAULT values?"
7. "Explain the difference between NULL and empty string on UPDATE"
8. "How do you safely test an UPDATE query?"

## Common Mistakes to Avoid

❌ **Mistake 1:** Forgetting WHERE clause on UPDATE/DELETE
```sql
-- WRONG - Updates ALL rows:
UPDATE employees SET salary = 60000;

-- RIGHT:
UPDATE employees SET salary = 60000 WHERE employee_id = 5;
```

❌ **Mistake 2:** Not specifying columns in INSERT
```sql
-- WRONG - Order matters:
INSERT INTO employees VALUES (1, 'John', 50000);

-- RIGHT - Explicit:
INSERT INTO employees (emp_id, name, salary) 
VALUES (1, 'John', 50000);
```

❌ **Mistake 3:** Using = instead of IN for multiple deletes
```sql
-- WRONG:
DELETE FROM orders WHERE customer_id = 1 AND customer_id = 2;

-- RIGHT:
DELETE FROM orders WHERE customer_id IN (1, 2);
```

❌ **Mistake 4:** Not using transactions for risky operations
```sql
-- WRONG - No rollback option:
DELETE FROM orders WHERE total_amount < 10;

-- RIGHT:
BEGIN;
DELETE FROM orders WHERE total_amount < 10;
COMMIT;  -- or ROLLBACK if something looks wrong
```

❌ **Mistake 5:** Not checking how many rows affected
```sql
-- Always verify:
UPDATE employees SET status = 'inactive' WHERE hire_date < '2020-01-01';
-- Check: How many rows were updated? Is that expected?
```

❌ **Mistake 6:** Inserting duplicate data without checking
```sql
-- WRONG - Might violate UNIQUE constraint:
INSERT INTO users (email) VALUES ('john@example.com');
INSERT INTO users (email) VALUES ('john@example.com');  -- ERROR!

-- RIGHT - Check first:
SELECT * FROM users WHERE email = 'john@example.com';
-- Then insert only if not exists
```

## Visual Summary

```
INSERT → Add new rows
    ↓
SELECT → Read existing rows
    ↓
UPDATE → Modify existing rows
    ↓
DELETE → Remove existing rows
```

## Key Concepts

| Operation | Purpose | Safety | Common Use |
|-----------|---------|--------|------------|
| **INSERT** | Add data | Safe (creates new) | Adding new records |
| **SELECT** | Read data | Safe (read-only) | Viewing data |
| **UPDATE** | Modify data | Risky (changes existing) | Corrections, status changes |
| **DELETE** | Remove data | Risky (removes forever) | Removing unwanted records |

## Interview Tips

### When Asked to INSERT
- Specify column names explicitly
- Handle DEFAULT and NULL values
- Check for UNIQUE/PRIMARY KEY constraints
- Mention using RETURNING clause

### When Asked to UPDATE
- Always include WHERE clause (unless intentional)
- Consider using transactions
- Test on small dataset first
- Think about cascading effects

### When Asked to DELETE
- Never delete without WHERE (unless you want to)
- Consider soft deletes (is_deleted flag) instead
- Be aware of Foreign Key constraints
- Ask: "Will this trigger CASCADE deletes?"

### Data Types to Know
```
INTEGER - Whole numbers
VARCHAR(n) - Text up to n characters
TEXT - Unlimited text
DATE - Calendar date
TIMESTAMP - Date and time
DECIMAL(p,s) - Precise decimals
BOOLEAN - True/False
```

## Real-World Scenarios

### Scenario 1: New User Registration
```sql
INSERT INTO users (username, email, created_at)
VALUES ('john_doe', 'john@example.com', CURRENT_TIMESTAMP);
```

### Scenario 2: Bulk User Import
```sql
INSERT INTO users (username, email) VALUES
('user1', 'user1@example.com'),
('user2', 'user2@example.com'),
('user3', 'user3@example.com');
```

### Scenario 3: Price Update
```sql
UPDATE products 
SET price = price * 1.1  -- 10% increase
WHERE category = 'Electronics';
```

### Scenario 4: Soft Delete (Recommended!)
```sql
UPDATE users 
SET deleted_at = CURRENT_TIMESTAMP
WHERE user_id = 5;

-- Then in queries:
SELECT * FROM users WHERE deleted_at IS NULL;
```

## Learning Outcomes

After this phase, you should be able to:

✅ Create tables with appropriate data types  
✅ Insert single and multiple rows  
✅ Insert with DEFAULT and NULL values  
✅ Select specific columns and rows  
✅ Update rows safely with WHERE clause  
✅ Delete rows safely with WHERE clause  
✅ Understand TRUNCATE vs DELETE  
✅ Use transactions (BEGIN/COMMIT/ROLLBACK)  
✅ Handle Foreign Key constraints  
✅ Use RETURNING clause in PostgreSQL  
✅ Understand cascading updates/deletes  
✅ Know when to use soft deletes  
✅ Answer all CRUD interview questions  

## Success Criteria

You're ready to move on when:

- [ ] You can write INSERT with 5+ columns
- [ ] You can write UPDATE with WHERE clause safely
- [ ] You understand the difference between DELETE and TRUNCATE
- [ ] You scored 90%+ on challenge.sql
- [ ] You can explain RETURNING clause usage
- [ ] You understand Foreign Key implications on DELETE
- [ ] You know when to use transactions

## Common Questions Explained

### Q: What's the difference between DELETE and TRUNCATE?
**A:**
- DELETE: Removes rows one by one, slower, triggers fire, can rollback in transaction
- TRUNCATE: Removes all rows at once, faster, doesn't trigger, can rollback in transaction

### Q: Can I INSERT without specifying columns?
**A:** Yes, but not recommended. You must provide values in order. Better to specify columns explicitly.

### Q: What's RETURNING clause?
**A:** PostgreSQL feature to get inserted/updated/deleted rows back:
```sql
INSERT INTO users (name) VALUES ('John')
RETURNING user_id, name;
```

### Q: Can I UPDATE without WHERE?
**A:** Yes, but it updates ALL rows! Only do this intentionally.

### Q: What if UPDATE/DELETE affects 0 rows?
**A:** No error. Check affected row count in your application code.

### Q: Should I use DELETE or set deleted_at = NULL?
**A:** For production, use soft delete (deleted_at). Better for audit trails and recovery.

## Phase Structure

1. **README.md** - This file (phase overview)
2. **notes.md** - Detailed explanations with examples
3. **examples.sql** - 15+ runnable examples
4. **practice.sql** - 15 exercises with solutions
5. **challenge.sql** - 10 harder problems

## How to Use This Phase

1. **Read** this README (15 min)
2. **Study** notes.md (30 min)
3. **Run** every example.sql query (30 min)
4. **Complete** practice.sql exercises (45 min)
5. **Solve** challenge.sql problems (60 min)
6. **Review** your solutions vs provided solutions

## Next Steps

1. Read `notes.md` for detailed concepts
2. Run `examples.sql` in PostgreSQL
3. Complete `practice.sql` exercises
4. Solve `challenge.sql` challenges
5. Move to Phase 3: Querying

---

**Remember:** CRUD operations are the foundation of database work. Master these, and you'll be confident with any data manipulation task! 🎯
