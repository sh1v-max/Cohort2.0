# Phase 10: Entity-Relationship Diagrams (ER Diagrams)

## What You'll Learn

ER Diagrams are the **blueprint for database design**. Master them and you can design any database from scratch!

## Topics Covered

1. **What are ER Diagrams**
   - Visual representation of data
   - Showing entities and relationships
   - Standard notation

2. **Entities and Attributes**
   - Identifying entities
   - Defining attributes
   - Primary keys in diagrams

3. **Relationships**
   - One-to-One (1:1)
   - One-to-Many (1:N)
   - Many-to-Many (N:N)
   - Cardinality notation
   - Modality (mandatory vs optional)

4. **ER Diagram Symbols & Notation**
   - Entity rectangles
   - Attribute ovals
   - Relationship diamonds
   - Crow's foot notation
   - Chen notation

5. **Advanced Concepts**
   - Weak entities
   - Derived attributes
   - Multi-valued attributes
   - Recursive relationships
   - Aggregation

## Why This Matters for Interviews

**Interview Question Example:**
> "Draw an ER diagram for a hospital management system."

### Common Interview Questions

1. "Draw an ER diagram for [system]"
2. "What are the relationships here?"
3. "How would you represent this in a database?"
4. "Explain the cardinality"
5. "Is this one-to-many or many-to-many?"
6. "How do you handle circular dependencies?"
7. "What's a weak entity?"
8. "Draw the ER diagram, then write the SQL"

## Learning Outcomes

After this phase, you should be able to:

✅ Identify entities from requirements  
✅ Define attributes correctly  
✅ Determine relationship types  
✅ Draw proper ER diagrams  
✅ Use correct cardinality notation  
✅ Handle complex relationships  
✅ Convert ER diagram to SQL schema  
✅ Discuss design trade-offs  
✅ Answer all ER diagram interview questions  

---

## 📊 ER DIAGRAM FUNDAMENTALS

### Basic Components

```
┌─────────────────────────┐
│   ENTITY (Table)        │
├─────────────────────────┤
│ EntityName              │
├─────────────────────────┤
│ PK: primary_key         │
│ • attribute1            │
│ • attribute2            │
│ • attribute3            │
└─────────────────────────┘

     │
     │ (Relationship)
     │
┌─────────────────────────┐
│   ANOTHER_ENTITY        │
├─────────────────────────┤
│ AnotherEntity           │
├─────────────────────────┤
│ PK: another_key         │
│ • attribute1            │
│ • attribute2            │
└─────────────────────────┘
```

---

## 📐 CARDINALITY NOTATION (Crow's Foot)

### One-to-One (1:1)

```
┌──────────────┐         ┌──────────────┐
│   PERSON     │    |-------|            │
│              │    1      1             │
│ • person_id  │              PASSPORT   │
│ • name       │              │          │
│ • email      │              │          │
└──────────────┘              └──────────┘

One person has exactly one passport.
One passport belongs to exactly one person.
```

### One-to-Many (1:N)

```
┌──────────────┐         ┌──────────────┐
│  CUSTOMER    │    |-------|            │
│              │    1      ∞             │
│ • cust_id    │         ORDERS          │
│ • name       │         │              │
│ • email      │         │              │
└──────────────┘         └──────────────┘

One customer has MANY orders.
Each order belongs to ONE customer.
```

### Many-to-Many (N:N)

```
┌──────────────┐         ┌──────────────┐
│  STUDENT     │    |-------|            │
│              │    ∞      ∞             │
│ • student_id │       ENROLLMENT        │
│ • name       │       │                │
└──────────────┘       └──────────────┘
                            
        ∞               
        |
        |
┌──────────────┐
│   COURSE     │
│              │
│ • course_id  │
│ • name       │
└──────────────┘

Many students enroll in many courses.
Uses a junction table (ENROLLMENT).
```

### Mandatory vs Optional

```
Mandatory (one or more):
┌─────────┐  |────────────  ┌─────────┐
│  TABLE1 │     1..∞        │  TABLE2 │
└─────────┘                 └─────────┘

Optional (zero or more):
┌─────────┐  O────────────  ┌─────────┐
│  TABLE1 │     0..∞        │  TABLE2 │
└─────────┘                 └─────────┘

Mandatory (exactly one):
┌─────────┐  |────────────  ┌─────────┐
│  TABLE1 │      1..1       │  TABLE2 │
└─────────┘                 └─────────┘

Optional (zero or one):
┌─────────┐  O────────────  ┌─────────┐
│  TABLE1 │      0..1       │  TABLE2 │
└─────────┘                 └─────────┘
```

---

## 🏢 REAL-WORLD EXAMPLES

### Example 1: E-Commerce Database

```
┌─────────────────────────────────────────────────────────────┐
│                    E-COMMERCE SYSTEM                        │
└─────────────────────────────────────────────────────────────┘

                         ┌──────────────────┐
                         │    CUSTOMERS     │
                         ├──────────────────┤
                         │ PK: customer_id  │
                         │ • name           │
                         │ • email          │
                         │ • address        │
                         └──────────────────┘
                                  │
                                  │ 1:N
                                  │
                    ┌─────────────────────────┐
                    │       ORDERS            │
                    ├─────────────────────────┤
                    │ PK: order_id            │
                    │ FK: customer_id         │
                    │ • order_date            │
                    │ • total_amount          │
                    └─────────────────────────┘
                                  │
                                  │ 1:N
                                  │
                ┌──────────────────────────────────┐
                │      ORDER_ITEMS                 │
                ├──────────────────────────────────┤
                │ PK: order_item_id                │
                │ FK: order_id                     │
                │ FK: product_id                   │
                │ • quantity                       │
                │ • unit_price                     │
                └──────────────────────────────────┘
                                  │
                                  │ N:1
                                  │
                         ┌──────────────────┐
                         │    PRODUCTS      │
                         ├──────────────────┤
                         │ PK: product_id   │
                         │ • name           │
                         │ • price          │
                         │ • stock          │
                         └──────────────────┘
                                  │
                                  │ N:N
                                  │
         ┌───────────────────────────────────────────┐
         │      PRODUCT_CATEGORIES                   │
         ├───────────────────────────────────────────┤
         │ FK: product_id (part of PK)               │
         │ FK: category_id (part of PK)              │
         └───────────────────────────────────────────┘
                                  │
                                  │
                         ┌──────────────────┐
                         │   CATEGORIES     │
                         ├──────────────────┤
                         │ PK: category_id  │
                         │ • category_name  │
                         └──────────────────┘

Relationships:
├── Customers 1:N Orders (One customer has many orders)
├── Orders 1:N OrderItems (One order has many items)
├── Products 1:N OrderItems (One product in many orders)
├── Products N:N Categories (Many products in many categories)
└── Through junction table ProductCategories
```

### Example 2: Hospital Management System

```
┌─────────────────────────────────────────────────────────────┐
│              HOSPITAL MANAGEMENT SYSTEM                     │
└─────────────────────────────────────────────────────────────┘

         ┌──────────────────┐
         │   DEPARTMENTS    │
         ├──────────────────┤
         │ PK: dept_id      │
         │ • dept_name      │
         │ • floor          │
         └──────────────────┘
                  │
                  │ 1:N
                  │
         ┌──────────────────┐
         │     DOCTORS      │
         ├──────────────────┤
         │ PK: doctor_id    │
         │ FK: dept_id      │
         │ • name           │
         │ • specialty      │
         └──────────────────┘
                  │
                  │ 1:N
                  │
    ┌──────────────────────────┐
    │    APPOINTMENTS          │
    ├──────────────────────────┤
    │ PK: appointment_id       │
    │ FK: doctor_id            │
    │ FK: patient_id           │
    │ • appointment_date       │
    │ • reason                 │
    └──────────────────────────┘
                  │
                  │ N:1
                  │
         ┌──────────────────┐
         │    PATIENTS      │
         ├──────────────────┤
         │ PK: patient_id   │
         │ • name           │
         │ • dob            │
         │ • address        │
         └──────────────────┘
                  │
                  │ 1:N
                  │
    ┌──────────────────────────┐
    │   MEDICAL_RECORDS        │
    ├──────────────────────────┤
    │ PK: record_id            │
    │ FK: patient_id           │
    │ FK: doctor_id            │
    │ • diagnosis              │
    │ • treatment              │
    │ • visit_date             │
    └──────────────────────────┘
                  │
                  │ 1:N
                  │
    ┌──────────────────────────┐
    │   PRESCRIPTIONS          │
    ├──────────────────────────┤
    │ PK: prescription_id      │
    │ FK: doctor_id            │
    │ FK: patient_id           │
    │ FK: medication_id        │
    │ • dosage                 │
    │ • duration               │
    └──────────────────────────┘
                  │
                  │ N:1
                  │
         ┌──────────────────┐
         │   MEDICATIONS    │
         ├──────────────────┤
         │ PK: medication_id│
         │ • medication_name│
         │ • price          │
         └──────────────────┘

Relationships:
├── Departments 1:N Doctors (One dept has many doctors)
├── Doctors 1:N Appointments (One doctor has many appointments)
├── Patients 1:N Appointments (One patient has many appointments)
├── Patients 1:N MedicalRecords (One patient has many records)
├── Doctors 1:N MedicalRecords (One doctor treats many patients)
├── Doctors 1:N Prescriptions (One doctor writes many prescriptions)
└── Medications 1:N Prescriptions (One medication in many prescriptions)
```

### Example 3: School Management System

```
┌─────────────────────────────────────────────────────────────┐
│            SCHOOL MANAGEMENT SYSTEM                         │
└─────────────────────────────────────────────────────────────┘

         ┌──────────────────┐
         │    TEACHERS      │
         ├──────────────────┤
         │ PK: teacher_id   │
         │ • name           │
         │ • specialization │
         └──────────────────┘
                  │
                  │ 1:N
                  │
         ┌──────────────────┐
         │     COURSES      │
         ├──────────────────┤
         │ PK: course_id    │
         │ FK: teacher_id   │
         │ • course_name    │
         │ • credits        │
         └──────────────────┘
                  │
                  │ N:N
                  │
    ┌──────────────────────────┐
    │   ENROLLMENTS            │
    ├──────────────────────────┤
    │ FK: student_id (PK)      │
    │ FK: course_id (PK)       │
    │ • enrollment_date        │
    │ • final_grade            │
    └──────────────────────────┘
                  │
                  │ N:1
                  │
         ┌──────────────────┐
         │    STUDENTS      │
         ├──────────────────┤
         │ PK: student_id   │
         │ • name           │
         │ • email          │
         │ • gpa            │
         └──────────────────┘

Relationships:
├── Teachers 1:N Courses (One teacher teaches many courses)
├── Courses N:N Students through Enrollments
└── Demonstrates many-to-many with junction table
```

### Example 4: Social Network

```
┌─────────────────────────────────────────────────────────────┐
│                  SOCIAL NETWORK                             │
└─────────────────────────────────────────────────────────────┘

         ┌──────────────────┐
         │      USERS       │
         ├──────────────────┤
         │ PK: user_id      │
         │ • username       │
         │ • email          │
         │ • created_at     │
         └──────────────────┘
                  │
                 ╱ ╲
                ╱   ╲  (Self-referencing: 1:N)
               ╱     ╲
         ┌──────────────────┐
         │   FOLLOWERS      │
         ├──────────────────┤
         │ user_id (PK, FK) │
         │ follower_id (PK) │
         │ • follow_date    │
         └──────────────────┘
                  │
                  │ 1:N
                  │
         ┌──────────────────┐
         │      POSTS       │
         ├──────────────────┤
         │ PK: post_id      │
         │ FK: user_id      │
         │ • content        │
         │ • created_at     │
         └──────────────────┘
                  │
                  │ 1:N
                  │
    ┌──────────────────────────┐
    │      COMMENTS            │
    ├──────────────────────────┤
    │ PK: comment_id           │
    │ FK: post_id              │
    │ FK: user_id              │
    │ • content                │
    │ • created_at             │
    └──────────────────────────┘

Relationships:
├── Users 1:N Posts (One user writes many posts)
├── Users 1:N Comments (One user writes many comments)
├── Posts 1:N Comments (One post has many comments)
├── Users N:N Users (Self-referencing followers relationship)
└── Complex: Users can follow many users, can be followed by many
```

---

## 🔑 KEY CONCEPTS VISUAL GUIDE

### Primary Key Notation

```
Table with Primary Key:

┌─────────────────────┐
│      EMPLOYEES      │
├─────────────────────┤
│ [PK] employee_id    │ ← Underlined = Primary Key
│ name                │
│ email               │
│ department_id       │
└─────────────────────┘
```

### Foreign Key Notation

```
Showing Foreign Key Relationship:

┌──────────────┐        ┌──────────────┐
│  DEPARTMENT  │        │  EMPLOYEES   │
├──────────────┤        ├──────────────┤
│[PK] dept_id  │───────→│[PK] emp_id   │
│ • name       │  1:N   │[FK] dept_id  │
│ • location   │        │ • name       │
└──────────────┘        └──────────────┘

dept_id in EMPLOYEES references dept_id in DEPARTMENT
```

### Composite Primary Key

```
Junction Table with Composite PK:

┌─────────────────────────┐
│   STUDENT_COURSES       │
├─────────────────────────┤
│[PK] student_id          │
│[PK] course_id           │
│ • enrollment_date       │
│ • grade                 │
└─────────────────────────┘

Both columns together form unique primary key
```

---

## 📋 ATTRIBUTE TYPES VISUAL

```
Different Attribute Notations:

Regular Attribute:          Derived Attribute:        Multi-valued Attribute:
┌──────────────┐           ┌──────────────┐          ┌──────────────┐
│ ( name )     │           │(age_calculated)│        │ {‖ phone_numbers ‖}
└──────────────┘           └──────────────┘          └──────────────┘

Key Attribute:              Partial Key:
┌──────────────┐           ┌──────────────┐
│ name         │           │ room_number  │
│(underlined)  │           │(dashed line) │
└──────────────┘           └──────────────┘
```

---

## 🔗 RELATIONSHIP TYPES & EXAMPLES

### 1:1 Relationship Examples

```
A. Person ↔ Passport
   ┌────────┐ 1:1 ┌─────────┐
   │ PERSON │────→│PASSPORT │
   └────────┘     └─────────┘

B. Employee ↔ Office
   ┌──────────┐ 1:1 ┌────────┐
   │EMPLOYEE  │────→│ OFFICE │
   └──────────┘     └────────┘
   
Use: When entity A has exactly one related entity B
```

### 1:N Relationship Examples

```
A. Department → Employees
   ┌────────────┐ 1:N ┌─────────┐
   │DEPARTMENT  │────→│EMPLOYEES│
   └────────────┘     └─────────┘

B. Teacher → Students
   ┌────────┐ 1:N ┌──────────┐
   │TEACHER │────→│STUDENTS  │
   └────────┘     └──────────┘
   
Use: When entity A has many related entity B,
     but each B belongs to only one A
```

### N:N Relationship Examples

```
A. Students ↔ Courses
   ┌──────────┐      ┌──────────┐
   │STUDENTS  │      │ COURSES  │
   └──────────┘      └──────────┘
        │                 │
        └─────┬───────────┘
              │
         ┌────────────┐
         │ENROLLMENTS │
         └────────────┘

B. Doctors ↔ Patients
   ┌───────────┐     ┌──────────┐
   │  DOCTORS  │     │PATIENTS  │
   └───────────┘     └──────────┘
        │                 │
        └─────┬───────────┘
              │
      ┌──────────────────┐
      │ DOCTOR_PATIENTS  │
      └──────────────────┘
      
Use: When many A relate to many B
     Requires junction/bridge table
```

---

## 🔄 RECURSIVE (SELF-REFERENCING) RELATIONSHIPS

```
Example: Employee Manager Relationship

┌──────────────┐
│  EMPLOYEES   │
├──────────────┤
│[PK] emp_id   │
│ • name       │
│[FK] mgr_id   │──┐
│ • salary     │  │
└──────────────┘  │
      ▲           │
      │           │
      └───────────┘
      
One employee manages many employees
But each employee has one manager

Visualization:
     John (CEO, no manager)
        ├── Alice (reports to John)
        │   ├── Bob (reports to Alice)
        │   └── Carol (reports to Alice)
        └── David (reports to John)
```

---

## 🏗️ DESIGNING FROM REQUIREMENTS

### Step-by-Step Process

```
REQUIREMENTS TEXT:
"A library has books and members. Members can borrow multiple books.
Each book can be borrowed by multiple members over time. We track
who borrowed what and when."

STEP 1: Identify Entities
└─ LIBRARY
└─ BOOKS
└─ MEMBERS
└─ BORROWING (junction table)

STEP 2: Define Attributes
├─ BOOKS: book_id, title, author, isbn, publisher
├─ MEMBERS: member_id, name, email, join_date
└─ BORROWING: borrowing_id, book_id, member_id, borrow_date, return_date

STEP 3: Identify Relationships
├─ LIBRARY 1:N BOOKS (one library has many books)
├─ LIBRARY 1:N MEMBERS (one library has many members)
└─ BOOKS N:N MEMBERS (through BORROWING)

STEP 4: Add Keys
├─ Primary Keys: book_id, member_id, borrowing_id
└─ Foreign Keys: book_id in BORROWING, member_id in BORROWING

RESULT ER DIAGRAM:
         ┌────────────┐
         │  LIBRARY   │
         ├────────────┤
         │ lib_id (PK)│
         │ • name     │
         │ • address  │
         └────────────┘
              │
         ┌────┴────┐
         │         │
      1:N         1:N
         │         │
    ┌────────┐ ┌────────┐
    │ BOOKS  │ │MEMBERS │
    ├────────┤ ├────────┤
    │bid(PK) │ │mid(PK) │
    │lib_id  │ │lib_id  │
    │title   │ │name    │
    │author  │ │email   │
    └────────┘ └────────┘
         │         │
         └────┬────┘
             N:N
              │
        ┌──────────────┐
        │  BORROWING   │
        ├──────────────┤
        │  borrow_id   │
        │  book_id(FK) │
        │  member_id   │
        │  borrow_date │
        │  return_date │
        └──────────────┘
```

---

## ✅ INTERVIEW TIPS

### Drawing ER Diagrams Under Time Pressure

1. **Read carefully** - Understand all requirements
2. **List entities** - What are the main "things"?
3. **Define attributes** - What data does each need?
4. **Identify relationships** - How do they relate?
5. **Determine cardinality** - How many to how many?
6. **Draw clearly** - Use consistent notation
7. **Add keys** - Mark PK and FK

### Common Mistakes to Avoid

❌ Missing entities  
❌ Wrong relationship type  
❌ No Primary/Foreign Keys  
❌ Unclear notation  
❌ Forgot junction tables for N:N  
❌ Attributes in wrong entity  

✅ Do this instead:
- List all entities first
- Map all relationships
- Use standard notation
- Double-check cardinality
- Verify junction tables

---

## Phase Structure

1. **README.md** - This file (comprehensive!)
2. **notes.md** - Detailed ER concepts
3. **examples.sql** - Convert diagrams to SQL
4. **practice.sql** - 20 ER design exercises
5. **challenge.sql** - 10 complex diagram designs

## Recommended Schedule

- **Morning:** Read README + notes (2 hours)
- **Afternoon:** Study examples + practice (2 hours)
- **Evening:** Design your own diagrams (2 hours)

## Next Steps

1. Master this phase
2. Move to Phase 11: Normalization
3. Then Phase 12: Interview Patterns
4. Finally mock interviews

---

**Remember:** ER Diagrams are the FOUNDATION of database design. Master them, and you'll ace schema design questions! 🎯

**Pro Tip:** Always draw on paper first before coding SQL. Good design prevents bad code! 📋
