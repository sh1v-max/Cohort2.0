# Phase 7: Database Design - Design Databases Like a Pro

## What You'll Learn

Database design is about **creating optimal schemas** that organize data efficiently, maintain integrity, and support business needs.

## Topics Covered

1. **Entity-Relationship (ER) Diagrams**
   - Identifying entities
   - Defining attributes
   - Drawing ER diagrams
   - Cardinality notation

2. **Relationships Between Entities**
   - One-to-One (1:1)
   - One-to-Many (1:N)
   - Many-to-Many (N:N)
   - Self-referencing relationships

3. **Normalization**
   - First Normal Form (1NF)
   - Second Normal Form (2NF)
   - Third Normal Form (3NF)
   - Boyce-Codd Normal Form (BCNF)

4. **Database Design Principles**
   - Data integrity
   - Avoiding redundancy
   - Efficient queries
   - Scalability

5. **Practical Schema Design**
   - Designing from requirements
   - Choosing appropriate data types
   - Setting constraints
   - Indexing strategy

## Why This Matters for Interviews

**Interview Question Example:**
> "Design a database for a ride-sharing app. Show the schema with relationships."

### Common Interview Questions

1. "Design a [system] database"
2. "What's the difference between 1NF and 3NF?"
3. "Explain normalization and its benefits"
4. "When would you denormalize?"
5. "How would you design a one-to-many relationship?"
6. "Draw an ER diagram for [scenario]"
7. "What are the pitfalls of poor database design?"
8. "How do you handle circular dependencies?"

## Common Mistakes to Avoid

❌ **Mistake 1:** Not identifying all entities
```
Bad: Just 2 tables (Orders, OrderItems)
Good: Customers, Products, Orders, OrderItems, OrderStatus
```

❌ **Mistake 2:** Wrong relationship type
```sql
-- WRONG - Treating N:N as 1:N:
CREATE TABLE student_courses (
    student_id INT PRIMARY KEY,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
-- Can't have multiple courses per student!

-- RIGHT - Use junction table:
CREATE TABLE student_courses (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

❌ **Mistake 3:** Storing derived data (violates 3NF)
```sql
-- WRONG - Storing total (derived data):
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL,  -- Derived from order_items!
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- RIGHT - Calculate when needed:
SELECT o.order_id, SUM(oi.quantity * oi.price)
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id;
```

❌ **Mistake 4:** Not using surrogate keys
```sql
-- WRONG - Using natural keys for everything:
CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100)
);
-- What if user changes email?

-- RIGHT - Use surrogate key:
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100)
);
```

❌ **Mistake 5:** Missing constraints
```sql
-- WRONG - No constraints:
CREATE TABLE products (
    product_id INT,
    name VARCHAR(100),
    price DECIMAL
);

-- RIGHT - Add constraints:
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0)
);
```

## Normalization Forms Explained

### 1NF (First Normal Form)
- All values are atomic (indivisible)
- No repeating groups
- Each column contains single values

**Bad:**
```
StudentCourses: "Math, Physics, Chemistry"
```

**Good:**
```
StudentID | Course
1         | Math
1         | Physics
1         | Chemistry
```

### 2NF (Second Normal Form)
- 1NF compliance
- All non-key attributes depend on the entire primary key
- No partial dependencies

**Bad:**
```
StudentCourses: StudentID, CourseID, ProfessorName
(ProfessorName depends on CourseID, not StudentID)
```

**Good:**
```
StudentCourses: StudentID, CourseID
Courses: CourseID, ProfessorName
```

### 3NF (Third Normal Form)
- 2NF compliance
- No transitive dependencies
- Non-key attributes depend only on primary key

**Bad:**
```
Orders: OrderID, CustomerID, CustomerCity
(CustomerCity depends on CustomerID, not OrderID)
```

**Good:**
```
Orders: OrderID, CustomerID
Customers: CustomerID, City
```

## Design Principles

| Principle | Description | Benefit |
|-----------|-------------|---------|
| **DRY** | Don't Repeat Data | Easier updates, less redundancy |
| **Integrity** | Enforce constraints | Valid data automatically |
| **Efficiency** | Good indexing | Fast queries |
| **Scalability** | Flexible design | Room to grow |
| **Clarity** | Clear structure | Easy to maintain |

## Learning Outcomes

After this phase, you should be able to:

✅ Identify entities and attributes from requirements  
✅ Draw ER diagrams correctly  
✅ Identify and create appropriate relationships  
✅ Understand normalization (1NF, 2NF, 3NF)  
✅ Know when to denormalize  
✅ Choose appropriate data types  
✅ Add meaningful constraints  
✅ Design for scalability  
✅ Avoid common design pitfalls  
✅ Discuss trade-offs in design  
✅ Answer schema design interview questions  

## Real-World Scenarios

### Scenario 1: E-Commerce Database
```
Entities: Customers, Products, Orders, OrderItems, Categories, Reviews
Relationships:
├── Customers 1:N Orders
├── Orders 1:N OrderItems
├── Products 1:N OrderItems
├── Products N:N Categories
└── Customers 1:N Reviews
```

### Scenario 2: Social Network
```
Entities: Users, Posts, Comments, Likes, Followers
Relationships:
├── Users 1:N Posts
├── Users 1:N Comments
├── Posts 1:N Comments
├── Posts N:N Likes (junction table)
└── Users N:N Followers (self-referencing)
```

### Scenario 3: Project Management
```
Entities: Users, Projects, Tasks, Comments, Attachments
Relationships:
├── Users N:N Projects (through ProjectMembers)
├── Projects 1:N Tasks
├── Tasks 1:N Comments
└── Tasks 1:N Attachments
```

## Interview Tips

### For "Design a Database" Questions
1. Ask clarifying questions
2. Identify all entities
3. Determine relationships
4. Sketch ER diagram
5. Discuss normalization
6. Consider constraints
7. Mention indexes
8. Discuss trade-offs

### For ER Diagram Questions
- Use rectangles for entities
- Identify cardinality (1:1, 1:N, N:N)
- Show all relationships clearly
- Label attributes

### For Normalization Questions
- Explain what each form requires
- Give real examples
- Know the trade-offs
- Mention denormalization scenarios

### For Constraint Questions
- Use PRIMARY KEY for unique identification
- Use FOREIGN KEY for relationships
- Use UNIQUE for non-PK unique values
- Use CHECK for validation
- Use NOT NULL for required fields

## Success Criteria

You're ready to move on when:

- [ ] You can identify entities from a description
- [ ] You can draw an ER diagram
- [ ] You understand all relationship types
- [ ] You know what 1NF, 2NF, 3NF mean
- [ ] You can explain normalization benefits
- [ ] You scored 90%+ on design challenges
- [ ] You can discuss trade-offs confidently

## Common Questions Explained

### Q: What's the difference between 1NF and 2NF?
**A:** 1NF: Atomic values only. 2NF: 1NF + no partial dependencies on composite keys.

### Q: When would you denormalize?
**A:** For performance - when normalized queries are too slow. Trade data redundancy for speed.

### Q: What's a surrogate key?
**A:** An artificial key (like auto-incrementing ID) vs natural key (like email).

### Q: Why use FOREIGN KEYs?
**A:** Maintain referential integrity - prevent orphaned records.

### Q: How do you handle Many-to-Many relationships?
**A:** Use a junction table with two FOREIGN KEYs.

### Q: What's the most important design principle?
**A:** Data integrity - ensure data is always valid and consistent.

## Phase Structure

1. **README.md** - This file
2. **notes.md** - Detailed explanations
3. **examples.sql** - 10+ real schemas
4. **practice.sql** - 8 design exercises
5. **challenge.sql** - 6 complex designs

## Recommended Schedule

- **Morning:** Read README + notes (2 hours)
- **Afternoon:** Study examples + practice (2 hours)
- **Evening:** Design challenges (3 hours)

## Next Steps

1. Read `notes.md` thoroughly
2. Study `examples.sql` for real-world schemas
3. Complete `practice.sql` design exercises
4. Solve `challenge.sql` design problems
5. Move to Phase 8: Interview Patterns

---

**Remember:** Good database design is the foundation of efficient applications! 🏗️
