# Complete Phase Index - New Structure

## 🎯 All 15 Phases with Meaningful Names

### Preparation Phase

**Phase 00: Setup and Installation**
- Path: `00_Setup_and_Installation/`
- What: Installing PostgreSQL, setting up environment
- Why: You need a database to practice on
- Time: 30 minutes
- Status: 📘 README to be created

---

### Foundational Knowledge (Phases 1-3)

**Phase 01: Database Fundamentals**
- Path: `01_Database_Fundamentals/`
- What: What is a database, why use databases, how they work
- Why: Understanding foundations helps you ask the right questions
- Time: 1 hour
- Status: 📘 README to be created
- Topics:
  - What is a database?
  - Why use databases?
  - Database vs files
  - ACID properties (intro)

**Phase 02: SQL Introduction**
- Path: `02_SQL_Introduction/`
- What: What is SQL, how SQL works, basic concepts
- Why: SQL is your tool, understand it thoroughly
- Time: 1 hour
- Status: 📘 README to be created
- Topics:
  - SQL definition and purpose
  - SQL vs databases
  - SQL statements (DDL, DML, DCL)
  - PostgreSQL advantages

**Phase 03: Data Types and Tables**
- Path: `03_Data_Types_and_Tables/`
- What: Creating tables, understanding data types, table structure
- Why: You need to know how to create proper tables
- Time: 2 hours
- Status: 📘 README to be created
- Topics:
  - Data types (INT, VARCHAR, DATE, DECIMAL, BOOLEAN, etc.)
  - CREATE TABLE syntax
  - Table structure
  - Column definitions

---

### Relational Database Design (Phases 4-5)

**Phase 04: Keys, Constraints, and Relationships** ⭐ IMPORTANT
- Path: `04_Keys_Constraints_and_Relationships/`
- What: Primary keys, foreign keys, constraints, relationships
- Why: This is what makes relational databases work!
- Time: 2 hours
- Status: ✅ COMPLETE (from Phase 1)
- Topics:
  - Primary Keys (PK)
  - Foreign Keys (FK)
  - Unique constraints
  - NOT NULL constraints
  - CHECK constraints
  - DEFAULT values
  - 1:1, 1:N, N:N relationships
  - Referential integrity

**Phase 05: CRUD Operations**
- Path: `05_CRUD_Operations/`
- What: INSERT, SELECT, UPDATE, DELETE operations
- Why: You need to manipulate data!
- Time: 2 hours
- Status: 📘 README to be created
- Topics:
  - INSERT (single and bulk)
  - SELECT basics
  - UPDATE with WHERE
  - DELETE with WHERE
  - Transactions
  - RETURNING clause

---

### Data Retrieval and Analysis (Phases 6-9)

**Phase 06: Filtering, Sorting, and Limiting**
- Path: `06_Filtering_Sorting_and_Limiting/`
- What: WHERE clause, ORDER BY, LIMIT, DISTINCT, operators
- Why: Getting exactly the data you need!
- Time: 2 hours
- Status: 📘 README to be created
- Topics:
  - WHERE clause with all operators
  - Logical operators (AND, OR, NOT)
  - LIKE pattern matching
  - BETWEEN, IN operators
  - IS NULL checks
  - ORDER BY (ASC, DESC)
  - LIMIT and OFFSET
  - DISTINCT

**Phase 07: Aggregations and Grouping**
- Path: `07_Aggregations_and_Grouping/`
- What: COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING
- Why: Summarizing and analyzing data!
- Time: 2 hours
- Status: 📘 README to be created
- Topics:
  - COUNT() function
  - SUM(), AVG(), MIN(), MAX()
  - GROUP BY clause
  - HAVING clause
  - Aggregations with NULL
  - COUNT(DISTINCT)

**Phase 08: Joining Multiple Tables** ⭐ MOST CRITICAL (40% of interviews!)
- Path: `08_Joining_Multiple_Tables/`
- What: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN, SELF JOIN
- Why: **This is 40% of all SQL interview questions!**
- Time: 4 hours (spend extra time here!)
- Status: ✅ README created
- Topics:
  - INNER JOIN (only matches)
  - LEFT JOIN (all left + matching right)
  - RIGHT JOIN (matching left + all right)
  - FULL OUTER JOIN (everything)
  - SELF JOIN (table with itself)
  - CROSS JOIN (cartesian product)
  - Multiple table JOINs
  - JOINs with aggregations

**Phase 09: Subqueries and Advanced Queries**
- Path: `09_Subqueries_and_Advanced_Queries/`
- What: Nested queries, subqueries, EXISTS, IN, CTEs
- Why: Complex data retrieval!
- Time: 2 hours
- Status: 📘 README to be created
- Topics:
  - Simple subqueries
  - IN vs EXISTS
  - Correlated subqueries
  - Subqueries in FROM
  - Scalar subqueries
  - CTEs (Common Table Expressions)
  - Recursive queries (intro)

---

### Advanced Topics (Phases 10-11)

**Phase 10: Entity-Relationship Diagrams** ⭐ NEW PHASE
- Path: `10_Entity_Relationship_Diagrams/`
- What: Drawing ER diagrams, understanding relationships visually
- Why: **Essential for schema design interviews!**
- Time: 3 hours
- Status: ✅ COMPLETE with extensive diagrams!
- Topics:
  - ER diagram components
  - Cardinality notation (1:1, 1:N, N:N)
  - Crow's foot notation
  - Drawing from requirements
  - Real-world examples (E-commerce, Hospital, School, Social Network)
  - Converting diagrams to SQL
  - **50+ visual diagrams included!**

**Phase 11: Normalization and Schema Design**
- Path: `11_Normalization_and_Schema_Design/`
- What: 1NF, 2NF, 3NF, denormalization, designing from requirements
- Why: Design matters more than queries!
- Time: 3 hours
- Status: 📘 README to be created
- Topics:
  - Normalization (1NF, 2NF, 3NF, BCNF)
  - Normalization examples
  - When to denormalize
  - Designing from requirements
  - Schema optimization
  - Real-world design patterns

---

### Interview Preparation (Phases 12-14)

**Phase 12: Interview Patterns** ⭐ 50+ PATTERNS
- Path: `12_Interview_Patterns/`
- What: 50+ common SQL interview patterns and solutions
- Why: **These patterns cover 70% of actual interviews!**
- Time: 3 hours
- Status: ✅ top-50-interview-patterns.sql ready to use!
- Patterns covered:
  - Basic patterns (5)
  - Aggregation patterns (5)
  - JOIN patterns (5)
  - Subquery patterns (5)
  - Advanced patterns (15)
  - Real-world patterns (10+)
  - Interview tricks (5)
  - Advanced scenarios (5+)

**Phase 13: Indexes, Performance, and Transactions**
- Path: `13_Indexes_Performance_and_Transactions/`
- What: Indexes, ACID, transactions, locks, performance optimization
- Why: Production databases need performance and safety!
- Time: 2 hours
- Status: 📘 README to be created
- Topics:
  - What are indexes
  - When to index
  - Composite indexes
  - Index trade-offs
  - ACID properties
  - Transactions (BEGIN, COMMIT, ROLLBACK)
  - Isolation levels
  - Deadlocks and locks

**Phase 14: Mock Interviews and Final Practice**
- Path: `14_Mock_Interviews_and_Final_Practice/`
- What: Complete interview simulations at different difficulty levels
- Why: Practice under realistic conditions!
- Time: 4-6 hours (spread across multiple days)
- Status: 📘 README to be created
- Mock interviews:
  - Beginner level (45 minutes, 5 questions)
  - Intermediate level (60 minutes, 6-7 questions)
  - Advanced level (90 minutes, 8-10 questions)

---

## 📊 Phase Overview Table

| Phase | Name | Duration | Difficulty | Critical? | Status |
|-------|------|----------|-----------|-----------|--------|
| 00 | Setup & Installation | 30 min | ⭐ | - | 📘 |
| 01 | Database Fundamentals | 1 hr | ⭐ | Yes | 📘 |
| 02 | SQL Introduction | 1 hr | ⭐ | Yes | 📘 |
| 03 | Data Types & Tables | 2 hrs | ⭐⭐ | Yes | 📘 |
| 04 | Keys & Relationships | 2 hrs | ⭐⭐ | **CRITICAL** | ✅ |
| 05 | CRUD Operations | 2 hrs | ⭐⭐ | Yes | 📘 |
| 06 | Filtering & Sorting | 2 hrs | ⭐⭐ | Yes | 📘 |
| 07 | Aggregations | 2 hrs | ⭐⭐⭐ | Yes | 📘 |
| 08 | Joining Tables | 4 hrs | ⭐⭐⭐⭐ | **MOST CRITICAL** | ✅ |
| 09 | Subqueries | 2 hrs | ⭐⭐⭐ | Yes | 📘 |
| 10 | ER Diagrams | 3 hrs | ⭐⭐⭐ | **NEW & CRITICAL** | ✅ |
| 11 | Normalization | 3 hrs | ⭐⭐⭐ | **CRITICAL** | 📘 |
| 12 | Interview Patterns | 3 hrs | ⭐⭐ | **70% OF INTERVIEWS** | ✅ |
| 13 | Indexes & Transactions | 2 hrs | ⭐⭐⭐⭐ | Yes | 📘 |
| 14 | Mock Interviews | 4-6 hrs | ⭐⭐⭐ | **FINAL PREP** | 📘 |

**Legend:**
- ✅ = Complete and ready
- 📘 = README created (guide for what to create)
- ⭐ = Difficulty stars (1-4)

---

## 🎯 Recommended Study Path

### Option 1: Complete 7-Day Intensive
Follow this order sequentially:
1. Phase 00 (30 min)
2. Phase 01-03 (3 hours - Day 1)
3. Phase 04-05 (4 hours - Day 2)
4. Phase 06-07 (4 hours - Day 3)
5. Phase 08 (4 hours - Day 4)
6. Phase 09-10 (6 hours - Day 5)
7. Phase 11-12 (6 hours - Day 6)
8. Phase 13-14 (6-8 hours - Day 7)

### Option 2: 3-Day Crash Course
Focus on most critical:
1. Phase 00 (setup)
2. Phase 01-02 (fundamentals)
3. Phase 04 (relationships) **CRITICAL**
4. Phase 08 (JOINS) **MOST CRITICAL**
5. Phase 10 (ER Diagrams) **NEW**
6. Phase 12 (interview patterns)
7. Phase 14 (mock interviews)

### Option 3: Self-Paced (4 weeks)
- Week 1: Phases 00-03 (Setup + Fundamentals)
- Week 2: Phases 04-07 (Design + Querying)
- Week 3: Phases 08-10 (JOINs + ER + Subqueries)
- Week 4: Phases 11-14 (Advanced + Interviews)

---

## 📁 File Structure

```
sql-interview-prep/
├── README.md
├── ROADMAP.md
├── GETTING_STARTED.md
├── PHASES_OVERVIEW.md
├── PHASE_INDEX.md (THIS FILE)
├── progress-tracker.md
│
├── 00_Setup_and_Installation/
├── 01_Database_Fundamentals/
├── 02_SQL_Introduction/
├── 03_Data_Types_and_Tables/
├── 04_Keys_Constraints_and_Relationships/
├── 05_CRUD_Operations/
├── 06_Filtering_Sorting_and_Limiting/
├── 07_Aggregations_and_Grouping/
├── 08_Joining_Multiple_Tables/ (README ✅)
├── 09_Subqueries_and_Advanced_Queries/
├── 10_Entity_Relationship_Diagrams/ (README ✅ + DIAGRAMS!)
├── 11_Normalization_and_Schema_Design/
├── 12_Interview_Patterns/
├── 13_Indexes_Performance_and_Transactions/
├── 14_Mock_Interviews_and_Final_Practice/
│
├── datasets/
│   ├── students-courses.sql
│   ├── ecommerce.sql
│   └── employees-departments.sql
│
├── interview-questions/
│   ├── top-100-sql-questions.md
│   └── top-50-interview-patterns.sql ✅
│
├── mini-project/
│   └── task-management-schema.sql
│
└── sql-challenges/
```

---

## 🔗 Quick Navigation

- Want to **start setup?** → Phase 00
- Want **fundamentals?** → Phases 01-03
- Want **database design?** → Phases 04, 10, 11
- Want **query writing?** → Phases 05-09
- Want **interview prep?** → Phases 12-14
- Want **real patterns?** → Phase 12 + top-50-interview-patterns.sql
- Want **mock interviews?** → Phase 14

---

## 📚 Complete Learning Checklist

### Foundation (Phases 0-3)
- [ ] Install PostgreSQL
- [ ] Understand what databases are
- [ ] Understand SQL
- [ ] Know data types
- [ ] Can create tables

### Design (Phases 4, 10, 11)
- [ ] Understand primary/foreign keys
- [ ] Know relationship types (1:1, 1:N, N:N)
- [ ] Can draw ER diagrams
- [ ] Understand normalization
- [ ] Can design from requirements

### Querying (Phases 5-9)
- [ ] Can write INSERT, UPDATE, DELETE
- [ ] Can write WHERE with all operators
- [ ] Can use aggregations
- [ ] **Can write all JOIN types**
- [ ] Can write subqueries

### Advanced (Phases 12-14)
- [ ] Know 50+ interview patterns
- [ ] Understand indexes
- [ ] Understand transactions
- [ ] Can solve complex queries
- [ ] Score 80%+ on mocks

---

## 🎓 Success Indicators

- ✅ Can draw ER diagrams from requirements
- ✅ Understand all relationship types
- ✅ Can write any JOIN query
- ✅ Know all 50+ interview patterns
- ✅ Score 80%+ on mock interviews
- ✅ Feel confident about SQL

---

**Start with Phase 00 and progress systematically!** 🚀

Each phase has clear README files guiding you on what to learn and how to practice.
