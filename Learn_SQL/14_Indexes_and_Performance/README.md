# Module 14: Indexes & Performance

## 📋 What You'll Learn

Master **indexing and optimization** - make queries fast!

## 🎯 Learning Goals

- ✅ Create indexes
- ✅ Understand index types
- ✅ Use EXPLAIN to analyze queries
- ✅ Optimize slow queries
- ✅ Performance best practices

## 📚 Topics

1. **Indexes**
   - Single column indexes
   - Composite indexes
   - Index strategy

2. **Query Analysis**
   - EXPLAIN statement
   - Understanding query plans
   - Identifying bottlenecks

3. **Optimization Techniques**
   - Adding indexes
   - Rewriting queries
   - Hardware considerations

4. **Performance Monitoring**
   - Slow query log
   - Query metrics
   - When to optimize

## ⏱️ Time Estimate: 2-3 hours

## 🎓 Example

```sql
-- Create index
CREATE INDEX idx_user_email ON users(email);

-- Analyze query
EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';
```

## 🚀 Next Module

→ `15_Transactions_and_ACID/README.md`

Learn **data safety**!

---

**Optimize your queries!** 📚
