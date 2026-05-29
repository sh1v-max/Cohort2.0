# Module 02: Data Types & Table Creation

## 📋 Overview

Learn how to design and create tables with proper data types and constraints.

## 🎯 Learning Objectives

- CREATE TABLE syntax
- Data types (INT, VARCHAR, DATE, DECIMAL, BOOLEAN, SERIAL, UUID, JSON)
- Constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT)
- ALTER TABLE operations
- DROP TABLE
- Table design best practices

## 📚 Topics Covered

1. **Data Types**
   - Numeric (INTEGER, SMALLINT, BIGINT, DECIMAL, NUMERIC, FLOAT, REAL)
   - Character (VARCHAR, CHAR, TEXT)
   - Temporal (DATE, TIME, TIMESTAMP, INTERVAL)
   - Boolean (BOOLEAN)
   - Special (UUID, JSON, JSONB, ARRAY)

2. **Constraints**
   - PRIMARY KEY (unique identifier)
   - FOREIGN KEY (referential integrity)
   - UNIQUE (prevent duplicates)
   - NOT NULL (required field)
   - CHECK (validate data)
   - DEFAULT (default values)

3. **Table Operations**
   - CREATE TABLE
   - ALTER TABLE ADD/DROP/MODIFY
   - DROP TABLE
   - Table relationships

4. **Design Patterns**
   - Surrogate vs Natural keys
   - Table naming conventions
   - Column naming conventions
   - Composite keys

## 📁 Files in This Module

- **notes.md** - Data types and constraints explained
- **examples.sql** - Creating tables with various configurations
- **practice.sql** - Exercises in table design
- **challenge.sql** - Complex table design scenarios

## ⏱️ Time Estimate: 5-6 hours

---

## Key Concepts

### Primary Key
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100)
);
```
- Uniquely identifies each row
- Cannot be NULL
- Usually auto-incrementing

### Foreign Key
```sql
CREATE TABLE posts (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```
- Links to another table
- Enforces referential integrity

### Constraints
```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    age INTEGER CHECK (age >= 18),
    gpa DECIMAL(3, 2) DEFAULT 0.0
);
```

---

## ✅ Mastery Checklist

- [ ] Understand all data types
- [ ] Create tables with PRIMARY KEY
- [ ] Create FOREIGN KEY relationships
- [ ] Use NOT NULL constraint
- [ ] Use UNIQUE constraint
- [ ] Use CHECK constraint
- [ ] Use DEFAULT values
- [ ] ALTER TABLE to modify structure
- [ ] Write proper table design
- [ ] Drop tables when needed

---

## Next Steps

→ Complete all exercises before moving to Module 03

