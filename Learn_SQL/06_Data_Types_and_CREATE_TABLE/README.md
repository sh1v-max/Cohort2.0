# Module 06: Data Types & CREATE TABLE

## 📋 What You'll Learn

Learn to **design and create tables** with proper data types and constraints.

## 🎯 Learning Goals

- ✅ Understand MySQL data types
- ✅ Create tables with CREATE TABLE
- ✅ Use constraints (PRIMARY KEY, UNIQUE, NOT NULL)
- ✅ Set default values
- ✅ Understand table relationships

## 📚 Topics

1. **Data Types**
   - INT, VARCHAR, TEXT, DATE, DECIMAL
   - Choosing right types
   - Size and performance

2. **Constraints**
   - PRIMARY KEY (unique identifier)
   - NOT NULL (required field)
   - UNIQUE (prevent duplicates)
   - DEFAULT (default values)
   - CHECK (validate data)

3. **CREATE TABLE Syntax**
   - Column definitions
   - Constraints
   - Table design

4. **Table Design Basics**
   - Planning structure
   - Best practices
   - Common mistakes

## ⏱️ Time Estimate: 2-3 hours

## 🎓 Example

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INT CHECK (age > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Next Module

→ Move to: `07_INSERT_UPDATE_DELETE/README.md`

Now learn to **INSERT, UPDATE, DELETE** data!

---

**Open `notes.md`!** 📚
