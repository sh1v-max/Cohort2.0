# Complete SQL Learning Roadmap
## From Absolute Beginner to Advanced Database Engineer

A hands-on, project-based SQL curriculum designed for programmers transitioning to backend database development.

---

## 📋 Curriculum Overview

This learning system takes you from **Level 0** (What is SQL?) to **Level 100** (Production Database Engineering) through:

- **12 Progressive Phases** covering all SQL concepts
- **5 Practice Datasets** for real-world scenarios
- **4 Mini-Projects** to build practical skills
- **1 Capstone Project** (Production E-commerce Database)
- **Interview Prep** with 50+ real questions
- **Progress Tracking** to monitor your journey

---

## 🗂️ Folder Structure

```
Learn_SQL/
├── 00_setup/                      # Environment & PostgreSQL setup
├── 01_foundations/                # Databases, RDBMS, SQL basics
├── 02_data_types_and_tables/      # CREATE, ALTER, constraints
├── 03_crud_operations/            # INSERT, UPDATE, DELETE
├── 04_querying_data/              # SELECT, aggregate, GROUP BY
├── 05_joins/                      # All join types
├── 06_subqueries/                 # Nested queries, CTEs
├── 07_advanced_sql/               # Window functions, CTEs
├── 08_database_design/            # ER diagrams, normalization
├── 09_performance_optimization/   # Indexes, EXPLAIN, tuning
├── 10_database_programming/       # Views, functions, triggers
├── 11_transactions_and_locks/     # ACID, isolation levels
├── 12_advanced_engineering/       # Partitioning, replication
├── datasets/                      # Practice data schemas
├── practice_datasets/             # SQL files to load data
├── mini_projects/                 # 4 practice projects
├── final_project/                 # Capstone project
└── interview_prep/                # Interview questions

```

---

## 📚 Learning Phases

### Phase 1: Foundations (Module 01)
- Understanding databases and RDBMS
- PostgreSQL installation and setup
- SQL syntax fundamentals
- SELECT, WHERE, ORDER BY, LIMIT
- Expected time: 3-5 hours

### Phase 2: Data Types & Tables (Module 02)
- CREATE TABLE, ALTER TABLE, DROP TABLE
- Constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, DEFAULT)
- Data types (INT, VARCHAR, DATE, NUMERIC, etc.)
- Expected time: 4-6 hours

### Phase 3: CRUD Operations (Module 03)
- INSERT statements
- UPDATE operations
- DELETE operations
- RETURNING clause
- Expected time: 2-3 hours

### Phase 4: Querying Data (Module 04)
- Aggregate functions (COUNT, SUM, AVG, MIN, MAX)
- GROUP BY and HAVING
- CASE expressions
- NULL handling
- Expected time: 5-7 hours

### Phase 5: Joins (Module 05)
- INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN
- SELF JOIN, CROSS JOIN
- Complex multi-table queries
- Expected time: 6-8 hours

### Phase 6: Subqueries (Module 06)
- Scalar subqueries
- Correlated subqueries
- EXISTS, IN, ANY, ALL operators
- Expected time: 4-5 hours

### Phase 7: Advanced SQL (Module 07)
- Common Table Expressions (CTEs)
- Recursive CTEs
- Window Functions (ROW_NUMBER, RANK, LAG, LEAD)
- Expected time: 8-10 hours

### Phase 8: Database Design (Module 08)
- ER diagrams and relationships
- One-to-One, One-to-Many, Many-to-Many
- Normalization (1NF, 2NF, 3NF, BCNF)
- Expected time: 5-7 hours

### Phase 9: Performance Optimization (Module 09)
- Indexes and composite indexes
- EXPLAIN and EXPLAIN ANALYZE
- Query optimization techniques
- Expected time: 6-8 hours

### Phase 10: Database Programming (Module 10)
- Views and Materialized Views
- Functions and Procedures
- Triggers
- Expected time: 5-6 hours

### Phase 11: Transactions & Locks (Module 11)
- ACID properties
- Isolation levels
- Locks and deadlocks
- Rollback and Commit
- Expected time: 4-5 hours

### Phase 12: Advanced Engineering (Module 12)
- Partitioning strategies
- Sharding concepts
- Replication concepts
- Scaling databases
- Expected time: 4-5 hours

**Total Estimated Time: 60-80 hours of focused learning**

---

## 🎯 How to Use This Curriculum

### For Each Module:
1. **Read** `notes.md` - Understand the concepts
2. **Study** `examples.sql` - See practical implementations
3. **Practice** `practice.sql` - Work through guided exercises
4. **Challenge** `challenge.sql` - Solve intermediate problems
5. **Advanced** `advanced.sql` - Deep dive (if available)

### File Structure Per Module:
```
module_X/
├── notes.md          # Theory and explanations
├── examples.sql      # Practical code examples
├── practice.sql      # Guided exercises (solutions included)
├── challenge.sql     # Harder problems
├── advanced.sql      # Deep concepts (select modules)
└── README.md         # Module-specific guidance
```

---

## 🗄️ Practice Datasets

Five realistic, reusable databases you'll work with throughout:

1. **E-commerce Database** - Products, orders, customers, shipping
2. **Social Media Database** - Users, posts, comments, likes
3. **Hospital Database** - Patients, doctors, appointments, records
4. **Banking Database** - Accounts, transactions, customers, loans
5. **Movie Database** - Movies, directors, actors, reviews

Each dataset includes:
- Schema design
- Sample data (1000+ rows per table)
- Real-world relationships
- Use cases for different query types

---

## 🚀 Mini Projects

### Mini Project 1: Student Management System
**Duration:** 3-4 hours  
**Focus:** Basic CRUD + simple joins  
**Deliverables:** 
- Database schema (students, courses, enrollments)
- 20 SQL queries covering all basic operations
- Basic reporting queries

### Mini Project 2: Library Management System
**Duration:** 4-5 hours  
**Focus:** Complex relationships + aggregations  
**Deliverables:**
- Schema (books, members, borrowings, returns)
- Inventory tracking queries
- Late fee calculations
- Member reports

### Mini Project 3: Hospital Management System
**Duration:** 5-6 hours  
**Focus:** Complex design + business logic  
**Deliverables:**
- Schema (patients, doctors, appointments, diagnoses)
- Doctor schedules and patient records
- Medical history queries
- Billing and insurance queries

### Mini Project 4: E-commerce Inventory System
**Duration:** 6-7 hours  
**Focus:** Real-world complexity + optimization  
**Deliverables:**
- Product catalog with categories
- Stock management
- Order processing
- Supplier relationships

---

## 🏆 Final Project: Production-Grade E-commerce Database

**Duration:** 15-20 hours  
**Difficulty:** Hard  
**Real-world scope:**

### Requirements:
- Users (customers and sellers)
- Products with categories and attributes
- Shopping carts and orders
- Payments and refunds
- Reviews and ratings
- Inventory and warehouse management
- Shipping and delivery tracking
- Coupons and discounts

### Deliverables:
1. Complete schema design
2. 100+ SQL queries organized by business domain
3. Database documentation
4. Performance optimization analysis
5. Indexing strategy
6. View definitions for common reports
7. Stored procedures for complex operations
8. Interview-style problem solutions

---

## 💼 Interview Preparation

### Question Bank:
- 15 Beginner questions
- 20 Intermediate questions
- 15 Advanced questions
- 15 Real company scenarios (Google, Amazon, Meta style)

### Topics Covered:
- Query optimization and EXPLAIN
- Schema design and normalization
- Index strategies
- Transaction handling
- Window functions
- CTEs and recursive queries
- View materialization
- Database scaling

---

## ✅ Progress Tracking

See `progress_tracker.md` for:
- Completion checklist for each module
- Time estimates vs. actual time spent
- Concept mastery tracking
- Mini-project completion status
- Interview prep progress
- Overall completion percentage

---

## 🔧 Prerequisites

- Basic programming knowledge (you have this ✓)
- PostgreSQL installed locally
- A SQL IDE (pgAdmin, DBeaver, or VS Code with PostgreSQL extension)
- Willingness to write 1000+ lines of SQL code

---

## 🎓 Expected Learning Outcomes

By completing this curriculum, you will be able to:

✅ Write efficient SQL queries for any scenario  
✅ Design databases from business requirements  
✅ Optimize query performance  
✅ Understand and apply normalization  
✅ Use advanced features (CTEs, window functions, triggers)  
✅ Handle transactions and concurrency  
✅ Design systems that scale  
✅ Pass SQL/database interviews at major tech companies  
✅ Build production-quality database solutions  

---

## 📊 Estimated Timeline

- **Fast track** (5 hours/week): 12-16 weeks
- **Moderate pace** (3 hours/week): 20-27 weeks
- **Leisurely pace** (2 hours/week): 30-40 weeks

**Recommendation:** Spend at least 4-5 focused hours per week for best retention.

---

## 🤝 How to Get the Most Out of This

1. **Type every SQL statement yourself** - Don't copy/paste
2. **Experiment with variations** - Change the queries and see what happens
3. **Keep a SQL journal** - Note patterns, gotchas, and insights
4. **Build your own examples** - Use datasets you care about
5. **Solve without looking at solutions** - Struggle is learning
6. **Review past modules** - Spaced repetition works
7. **Teach others** - Best way to solidify knowledge

---

## 🎯 Next Steps

1. Start with `00_setup/` - Set up your PostgreSQL environment
2. Move to `01_foundations/` - Understand database fundamentals
3. Progress through modules sequentially
4. Complete mini projects after relevant modules
5. Use practice datasets as you learn each concept
6. Start interview prep after module 07
7. Finish with the final capstone project

---

**Let's build your SQL mastery! 🚀**
