# Module 03: CRUD Operations

## 📋 Overview

Master the fundamental data manipulation operations: Create, Read, Update, Delete.

## 🎯 Learning Objectives

- INSERT statements (single and bulk)
- UPDATE operations (conditional)
- DELETE operations (safe deletion)
- RETURNING clause for verification
- Understanding data integrity during modifications
- Transaction basics (preview)

## 📚 Topics Covered

1. **INSERT**
   - INSERT single rows
   - INSERT multiple rows
   - INSERT with DEFAULT values
   - INSERT with RETURNING

2. **UPDATE**
   - UPDATE with WHERE clause
   - UPDATE multiple columns
   - UPDATE with calculations
   - UPDATE with RETURNING

3. **DELETE**
   - DELETE with WHERE clause
   - DELETE all rows (dangerous!)
   - Safe deletion practices
   - DELETE with RETURNING

4. **Data Integrity**
   - Preventing accidental deletes
   - Transaction rollback (preview)
   - RETURNING for verification

## 📁 Files in This Module

- **notes.md** - Detailed explanations
- **examples.sql** - Working code examples
- **practice.sql** - Guided exercises
- **challenge.sql** - Complex scenarios

## ⏱️ Time Estimate: 2-3 hours

---

## Key Concepts

### INSERT
```sql
-- Single row
INSERT INTO users (name, email, age)
VALUES ('John', 'john@example.com', 25);

-- Multiple rows
INSERT INTO users (name, email, age)
VALUES 
    ('John', 'john@example.com', 25),
    ('Jane', 'jane@example.com', 30);

-- Return inserted data
INSERT INTO users (name, email, age)
VALUES ('Bob', 'bob@example.com', 35)
RETURNING id, name, email;
```

### UPDATE
```sql
-- Update with conditions
UPDATE users
SET age = 26
WHERE name = 'John';

-- Return updated rows
UPDATE users
SET age = age + 1
WHERE age > 30
RETURNING id, name, age;
```

### DELETE
```sql
-- Delete with condition
DELETE FROM users
WHERE age < 18;

-- Return deleted rows
DELETE FROM users
WHERE created_at < '2020-01-01'
RETURNING id, name;
```

---

## ✅ Mastery Checklist

- [ ] Write INSERT statements
- [ ] Handle multiple row inserts
- [ ] Use RETURNING clause
- [ ] Write UPDATE with WHERE
- [ ] Calculate in UPDATE
- [ ] Write DELETE safely
- [ ] Use RETURNING for verification
- [ ] Understand foreign key constraints
- [ ] Handle constraint violations
- [ ] Practice data integrity

---

## Next Steps

→ Complete all exercises before moving to Module 04

