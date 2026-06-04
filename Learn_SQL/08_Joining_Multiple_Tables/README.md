# Phase 9: Indexes & Transactions - Performance & Data Safety

## What You'll Learn

This phase covers **two critical topics** for production databases: making queries fast with indexes and ensuring data consistency with transactions.

## Topics Covered

### INDEXES (Making Queries Fast)

1. **What Are Indexes**
   - B-tree indexes
   - Sequential scan vs index scan
   - Index overhead

2. **Index Types**
   - Single column indexes
   - Composite (multi-column) indexes
   - Unique indexes
   - Partial indexes
   - Full-text indexes

3. **When to Index**
   - Frequently searched columns
   - JOIN columns
   - ORDER BY columns
   - Large tables with selective queries

4. **When NOT to Index**
   - Small tables
   - Low selectivity (many duplicates)
   - Frequently updated columns
   - Columns with many NULLs

### TRANSACTIONS (Data Safety)

1. **ACID Properties**
   - Atomicity - All or nothing
   - Consistency - Valid state to valid state
   - Isolation - No interference
   - Durability - Persists after commit

2. **Transaction Control**
   - BEGIN - Start transaction
   - COMMIT - Save changes
   - ROLLBACK - Undo changes
   - SAVEPOINT - Partial rollback

3. **Isolation Levels**
   - READ UNCOMMITTED
   - READ COMMITTED
   - REPEATABLE READ
   - SERIALIZABLE

4. **Locks**
   - Row-level locks
   - Table-level locks
   - Deadlocks
   - Lock timeouts

## Why This Matters for Interviews

**Interview Question Example:**
> "How would you ensure data consistency when transferring money between accounts?"

### Common Interview Questions

1. "What's an index and why use it?"
2. "When should you NOT index?"
3. "What's the difference between ACID properties?"
4. "How do transactions work?"
5. "What's the difference between COMMIT and ROLLBACK?"
6. "How do you prevent deadlocks?"
7. "Explain isolation levels"
8. "How do you optimize slow queries?"
9. "What's a composite index?"
10. "How do you handle concurrent updates?"

## Common Mistakes to Avoid

❌ **Mistake 1:** Indexing everything
```sql
-- WRONG - Too many indexes:
CREATE INDEX idx_col1 ON table(col1);
CREATE INDEX idx_col2 ON table(col2);
CREATE INDEX idx_col3 ON table(col3);
CREATE INDEX idx_col4 ON table(col4);
-- Slows down INSERTs, uses disk space

-- RIGHT - Index strategically:
CREATE INDEX idx_frequently_searched ON table(col1);
CREATE INDEX idx_join_columns ON table(col2, col3);
```

❌ **Mistake 2:** Creating composite index in wrong order
```sql
-- WRONG - Wrong column order:
CREATE INDEX idx_dept_salary ON employees(salary, department_id);

-- Query needs department first:
SELECT * FROM employees WHERE department_id = 2 AND salary > 50000;

-- RIGHT - Leading column matters:
CREATE INDEX idx_dept_salary ON employees(department_id, salary);
```

❌ **Mistake 3:** Not using transactions for related operations
```sql
-- WRONG - No transaction, data could be inconsistent:
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
-- If crash between, one account loses money!

-- RIGHT - Use transaction:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;  -- All or nothing
```

❌ **Mistake 4:** Long transactions blocking other users
```sql
-- WRONG - Long transaction locks data:
BEGIN;
SELECT * FROM accounts WHERE account_id = 1 FOR UPDATE;
-- Do application logic here (could take minutes)
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
COMMIT;

-- RIGHT - Keep transactions short:
BEGIN;
SELECT balance FROM accounts WHERE account_id = 1 FOR UPDATE;
COMMIT;
-- Do calculation outside transaction
BEGIN;
UPDATE accounts SET balance = ? WHERE account_id = 1;
COMMIT;
```

❌ **Mistake 5:** Ignoring index maintenance
```sql
-- WRONG - Indexes degrade over time:
-- Never run ANALYZE or REINDEX

-- RIGHT - Maintain indexes:
ANALYZE table_name;  -- Update statistics
REINDEX table_name;  -- Rebuild indexes
```

## Indexes vs Performance

| Scenario | Solution |
|----------|----------|
| Slow SELECT | Add index to WHERE/JOIN columns |
| Slow JOIN | Index join columns |
| Slow ORDER BY | Index sort columns |
| Slow aggregation | Materialized view or denormalize |
| Slow INSERT | Reduce indexes or batch inserts |

## Transaction Flow

```
BEGIN
├── Execute SQL statements
├── Check results
├── If OK: COMMIT (save)
└── If NOT OK: ROLLBACK (undo)
```

## Learning Outcomes

After this phase, you should be able to:

✅ Understand when and how indexes work  
✅ Create appropriate indexes  
✅ Avoid indexing pitfalls  
✅ Explain ACID properties  
✅ Use transactions correctly  
✅ Understand isolation levels  
✅ Handle deadlocks  
✅ Optimize slow queries  
✅ Balance performance and consistency  
✅ Answer all performance questions  

## Real-World Scenarios

### Scenario 1: Money Transfer (Critical Transaction)
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;
```

### Scenario 2: Bulk Data Load (Performance)
```sql
-- Add indexes first:
CREATE INDEX idx_email ON users(email);

-- Insert bulk data:
INSERT INTO users (email, name) VALUES 
('user1@example.com', 'User 1'),
('user2@example.com', 'User 2'),
... many rows ...;

-- Re-optimize after:
ANALYZE users;
```

### Scenario 3: Concurrent Order Processing
```sql
-- Use row-level locks to prevent conflicts:
BEGIN;
SELECT * FROM inventory WHERE product_id = 5 FOR UPDATE;
-- Check stock
UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 5;
COMMIT;
```

### Scenario 4: Long-Running Report with Snapshot
```sql
-- Use read-only transaction for consistency:
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
-- Run long report - sees consistent snapshot
SELECT * FROM orders WHERE order_date >= '2024-01-01';
COMMIT;
```

### Scenario 5: Composite Index for Performance
```sql
-- Index join and filter columns:
CREATE INDEX idx_orders ON orders(customer_id, order_date DESC);

-- This query uses the index efficiently:
SELECT * FROM orders 
WHERE customer_id = 5 
ORDER BY order_date DESC;
```

## Interview Tips

### For Index Questions
- Ask about table size (worth indexing?)
- Ask about query patterns
- Mention trade-offs (speed vs maintenance)
- Consider composite indexes for common queries

### For Transaction Questions
- Understand ACID - this is fundamental
- Know when transactions are needed
- Mention isolation levels if appropriate
- Discuss deadlock prevention

### For Performance Questions
- Use EXPLAIN to find bottlenecks
- Index before denormalizing
- Keep transactions short
- Profile before optimizing

### For Concurrency Questions
- Discuss isolation levels
- Mention locks (optimistic vs pessimistic)
- Know about deadlocks
- Suggest solutions (retry logic, queue)

## Success Criteria

You're ready to move on when:

- [ ] You understand ACID properties
- [ ] You know when to use indexes
- [ ] You can create composite indexes
- [ ] You use transactions correctly
- [ ] You scored 90%+ on challenges
- [ ] You can explain isolation levels
- [ ] You can troubleshoot slow queries

## Common Questions Explained

### Q: What are indexes?
**A:** Data structures that make lookups faster. Think of a book's index instead of reading every page.

### Q: When should you NOT index?
**A:** Small tables, low selectivity columns, frequently updated columns, columns with many NULLs.

### Q: What's the difference between index and table scan?
**A:** Index scan: Jump to value → fast. Table scan: Read every row → slow.

### Q: What's ACID?
**A:** Atomicity (all/nothing), Consistency (valid state), Isolation (no interference), Durability (persists).

### Q: Can transactions hurt performance?
**A:** Long transactions lock data for others. Keep them short.

### Q: What's a deadlock?
**A:** Two transactions lock each other's resources and wait forever. Databases detect and rollback one.

### Q: How do you handle deadlocks?
**A:** Retry logic, lock ordering, shorter transactions, appropriate isolation levels.

### Q: What's a composite index?
**A:** Index on multiple columns. Order matters: leftmost column is used first.

## Phase Structure

1. **README.md** - This file
2. **notes.md** - Detailed explanations
3. **examples.sql** - 15+ examples
4. **practice.sql** - 12 exercises
5. **challenge.sql** - 10 problems

## Recommended Schedule

- **Morning:** Read README + notes (1.5 hours)
- **Afternoon:** Run examples + practice (2 hours)
- **Evening:** Solve challenges (2 hours)

## Next Steps

1. Read `notes.md` thoroughly
2. Run `examples.sql` and understand each
3. Complete `practice.sql` exercises
4. Solve `challenge.sql` problems
5. Move to Phase 10: Mock Interviews

---

**Remember:** Indexes make queries fast, transactions keep data safe. Both are critical! 🚀
