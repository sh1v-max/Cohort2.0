# All Phases Overview - Quick Navigation

## Phase 1: Database Basics ✅
**Status:** Complete  
**Duration:** 1 day

### What You'll Learn
- What is a database
- What is SQL
- What is PostgreSQL
- Tables, rows, columns
- Primary Keys, Foreign Keys
- Unique and NOT NULL constraints
- Relationships (1:1, 1:N, N:N)

### Files
- ✅ README.md - Phase overview
- ✅ notes.md - Detailed concepts with examples
- ✅ examples.sql - 8 complete examples
- ✅ practice.sql - 9 practice exercises with solutions
- ✅ challenge.sql - 6 challenge problems

### Interview Questions Covered
- "What's a Primary Key?"
- "Explain Foreign Keys"
- "What are database constraints?"
- "Explain One-to-Many relationship"
- "What's the difference between UNIQUE and PRIMARY KEY?"

---

## Phase 2: CRUD Operations
**Status:** Recommended to create  
**Duration:** 1 day

### What You'll Learn
- CREATE TABLE syntax
- INSERT (single and multiple)
- SELECT basics
- UPDATE queries
- DELETE queries
- Data types (INT, VARCHAR, DATE, DECIMAL, BOOLEAN)

### Key Topics
- Inserting data
- Basic SELECT
- Updating records
- Deleting records
- Transactions (COMMIT, ROLLBACK)

---

## Phase 3: Querying
**Status:** Recommended to create  
**Duration:** 1 day

### What You'll Learn
- WHERE clause (all operators)
- ORDER BY (ASC, DESC)
- LIMIT and OFFSET
- DISTINCT
- LIKE operator
- BETWEEN
- IN operator
- Aliases (AS)

### Interview Questions
- "How do you filter data?"
- "What's ORDER BY?"
- "Explain LIMIT and OFFSET"
- "When would you use DISTINCT?"

---

## Phase 4: Aggregations
**Status:** Recommended to create  
**Duration:** 1 day

### What You'll Learn
- COUNT() function
- SUM() function
- AVG() function
- MIN() and MAX()
- GROUP BY clause
- HAVING clause
- Aggregate functions with JOINs

### Key Differences
- WHERE vs HAVING
- COUNT(*) vs COUNT(column)

---

## Phase 5: Joins ⭐ CRITICAL!
**Status:** Complete (README)  
**Duration:** 2 days (most important!)

### What You'll Learn
- INNER JOIN
- LEFT JOIN
- RIGHT JOIN
- FULL OUTER JOIN
- SELF JOIN
- CROSS JOIN
- Multiple JOINs (3+ tables)
- JOINs with WHERE, GROUP BY, aggregation

### Why Critical?
**40% of SQL interviews involve JOINs!**

### Files
- ✅ README.md - Complete phase guide
- ⏳ notes.md - Venn diagrams, detailed explanations
- ⏳ examples.sql - 30+ JOIN examples
- ⏳ practice.sql - 20+ JOIN exercises
- ⏳ challenge.sql - 15 complex problems

### Key Interview Questions
- "Difference between INNER and LEFT JOIN?"
- "What does this LEFT JOIN return?"
- "Write a query joining 3 tables"
- "Find records with NULL in JOINs"
- "Optimize this JOIN query"

---

## Phase 6: Subqueries
**Status:** Recommended to create  
**Duration:** 1 day

### What You'll Learn
- Simple subqueries
- Subqueries in WHERE
- Subqueries in FROM (derived tables)
- Correlated subqueries
- EXISTS vs IN
- Scalar vs row subqueries
- Subquery performance

---

## Phase 7: Database Design
**Status:** Recommended to create  
**Duration:** 1 day

### What You'll Learn
- ER (Entity-Relationship) diagrams
- Normalization (1NF, 2NF, 3NF)
- Designing schemas from requirements
- Data modeling best practices
- Denormalization trade-offs

### Interview Questions
- "Design database for [scenario]"
- "What's 3NF?"
- "Draw ER diagram for [system]"
- "Normalize this data"

---

## Phase 8: Interview Patterns
**Status:** Partially Complete  
**Duration:** 1 day

### What You'll Learn
- 50+ common interview patterns
- Finding duplicates
- Finding missing data
- Second highest salary
- Running totals
- Ranking
- Window functions
- Date operations

### Files Provided
- ✅ top-50-interview-patterns.sql - All 50 patterns with explanations

### Patterns Covered
1-5: Basic filtering
6-10: Aggregation & grouping
11-15: Joins
16-20: Subqueries
21-25: Advanced patterns
26-30: Data finding
31-35: Complex aggregations
36-40: Real-world scenarios
41-45: Interview tricks
46-50: Advanced scenarios

---

## Phase 9: Indexes & Transactions
**Status:** Recommended to create  
**Duration:** 1 day

### What You'll Learn
- What are indexes?
- Types: simple, composite, unique
- When to index
- When NOT to index
- ACID properties
- Transactions (BEGIN, COMMIT, ROLLBACK)
- Locks and concurrency

### Interview Questions
- "What's an index?"
- "Why use indexes?"
- "Explain ACID"
- "What's a transaction?"
- "How to handle concurrent updates?"

---

## Phase 10: Mock Interviews
**Status:** Recommended to create  
**Duration:** 1 day

### What's Included
- Beginner SQL mock interview (45 min)
- Intermediate SQL mock interview (60 min)
- Backend-focused SQL mock interview (90 min)

### Structure
- Question set
- Expected answers
- Follow-up questions
- Grading rubric

---

## Interview Questions Database
**Status:** ✅ COMPLETE

### Files Provided
- ✅ top-100-sql-questions.md - 100 questions with answers
  - Basics (15 Q)
  - DML (25 Q)
  - Advanced (20 Q)
  - PostgreSQL specific (20 Q)
  - Trick questions (20 Q)

### Bonus Materials
- ✅ top-50-interview-patterns.sql - 50 real patterns
- ✅ Database design Q&A
- ✅ Performance optimization Q&A

---

## Datasets
**Status:** ✅ COMPLETE

### Available Datasets

#### 1. Students & Courses
```
├── students_ds (5 students)
├── courses_ds (5 courses)
└── enrollments_ds (10 enrollments)
```
**Use for:** JOINs, aggregations, many-to-many

#### 2. E-Commerce
```
├── customers_ec (5 customers)
├── products_ec (5 products)
├── orders_ec (6 orders)
└── order_items_ec (10 items)
```
**Use for:** Multi-table queries, real-world scenarios

#### 3. Employees & Departments
```
├── departments_ed (4 departments)
├── employees_ed (7 employees)
└── salaries_ed (8 salary records)
```
**Use for:** Self-joins, hierarchies, time-series

---

## Mini-Project
**Status:** ✅ COMPLETE

### Task Management App
Complete real-world schema including:
- Users
- Projects (with project members)
- Tasks
- Subtasks
- Comments
- Labels & Tags
- Attachments
- Task History (audit log)
- Dependencies

**File:** `mini-project/task-management-schema.sql`

### Features to Practice
- N:N relationships (projects ↔ users)
- Complex queries
- Audit trails
- Soft deletes
- Interview discussions

---

## Quick Reference by Topic

### For Beginners
1. Phase 1: Database Basics
2. Phase 2: CRUD Operations
3. Phase 3: Querying
4. Phase 4: Aggregations

### For Interview Prep
1. **Phase 5: Joins** (Most important!)
2. **Phase 8: Interview Patterns** (50+ questions)
3. **Interview Questions:** top-100-sql-questions.md
4. **Mock Interviews:** Phase 10

### For Advanced Topics
1. Phase 6: Subqueries
2. Phase 7: Database Design
3. Phase 9: Indexes & Transactions
4. Mini-Project: Real-world schema

### By Interview Type

**Fresher/Junior Backend Role:**
- Phase 1-5 (basics to joins)
- Interview Patterns (Phase 8)
- Top 100 SQL Questions

**Mid-level Backend Role:**
- All phases
- Database Design (Phase 7)
- Mini-project discussion
- Performance questions (Phase 9)

**Senior Backend Role:**
- All phases
- Database Design deep-dive
- Architecture discussions
- Performance optimization
- Transaction handling

---

## Study Timeline

### Week 1 (Intensive - 10-14 hrs/day)
- Day 1: Phase 1 + Phase 2
- Day 2: Phase 3 + Phase 4
- Day 3: Phase 5 (JOINs!)
- Day 4: Phase 6 + Phase 7
- Day 5: Phase 8 (Patterns)
- Day 6: Phase 9 (Indexes/Transactions)
- Day 7: Mock Interviews

### Week 2-4 (Casual - 1-2 hrs/day)
- Week 2: Phase 1-2
- Week 3: Phase 3-4
- Week 4: Phase 5
- Week 5: Phase 6-7
- Week 6: Phase 8-9
- Week 7: Mini-project + Mocks

---

## Files to Create/Complete

### Must Create (Core Learning)
- [ ] Phase 2: README, notes, examples, practice, challenge
- [ ] Phase 3: README, notes, examples, practice, challenge
- [ ] Phase 4: README, notes, examples, practice, challenge
- [ ] Phase 5: notes, examples, practice, challenge (README done)
- [ ] Phase 6: README, notes, examples, practice, challenge
- [ ] Phase 7: README, notes, examples, practice, challenge
- [ ] Phase 8: README, notes, examples, practice, challenge
- [ ] Phase 9: README, notes, examples, practice, challenge
- [ ] Phase 10: Mock interview questions & answers

### Already Complete ✅
- [x] Phase 1: Complete
- [x] Phase 5: README
- [x] All datasets
- [x] Top 100 SQL questions
- [x] Top 50 interview patterns
- [x] Mini-project schema
- [x] README.md (main)
- [x] ROADMAP.md
- [x] progress-tracker.md

---

## Success Checklist

### Knowledge
- [ ] Understand all 10 phases
- [ ] Know which phase to focus on (Phase 5!)
- [ ] Know interview question distribution

### Practice
- [ ] Complete Phase 1 exercises
- [ ] Master Phase 5 (JOINs)
- [ ] Practice Phase 8 patterns
- [ ] Solve Top 100 questions

### Readiness
- [ ] Score 90%+ on mock interviews
- [ ] Can answer all top 100 questions
- [ ] Can design database schemas
- [ ] Understand performance concepts

---

## Phase Difficulty Ratings

```
Phase 1  ■□□□□  (Beginner)
Phase 2  ■■□□□  (Easy)
Phase 3  ■■□□□  (Easy)
Phase 4  ■■■□□  (Medium)
Phase 5  ■■■■□  (Hard) ⭐ CRITICAL
Phase 6  ■■■■□  (Hard)
Phase 7  ■■■■■  (Very Hard) - Schema design
Phase 8  ■■■□□  (Medium) - Pattern practice
Phase 9  ■■■■□  (Hard) - Conceptual
Phase 10 ■■■■□  (Medium) - Practice
```

---

## Recommended Reading Order

**For someone with 7 days:**
1. Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8 → Phase 9 → Phase 10 + Mocks

**For someone with 3 days:**
1. Phase 1 (fundamentals)
2. Phase 5 (JOINs - most important!)
3. Phase 8 (patterns) + Top 100 questions + Mocks

**For someone with 1 day:**
1. Phase 5 (JOINs)
2. Top 50 patterns
3. Mock interview

---

## Need Help?

- **Stuck on JOINs?** → Study Phase 5 deeply
- **Don't understand normalization?** → Phase 7
- **Want real questions?** → Phase 8 + Top 100
- **Need design practice?** → Mini-project
- **Ready for interviews?** → Phase 10 mocks

---

**Start with Phase 1, Master Phase 5, Practice Phase 8, and you're interview-ready!** 🚀
