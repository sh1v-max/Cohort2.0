# Module 12: Complex Queries

## 📋 What You'll Learn

Combine **everything** - write complex, real-world queries.

## 🎯 Learning Goals

- ✅ Combine SELECT, WHERE, JOIN, GROUP BY, HAVING, ORDER BY, LIMIT
- ✅ Solve multi-step problems
- ✅ Write production-quality queries
- ✅ Optimize complex queries

## 📚 Topics

1. **Query Building**
   - Step-by-step approach
   - Testing incrementally
   - Performance considerations

2. **Real-World Scenarios**
   - Reports
   - Analytics
   - Business problems

3. **Best Practices**
   - Readable code
   - Performance
   - Maintainability

## ⏱️ Time Estimate: 2-3 hours

## 🎓 Example

```sql
SELECT 
  p.category,
  COUNT(o.id) as order_count,
  SUM(o.amount) as total_revenue,
  AVG(o.amount) as avg_order
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
WHERE o.order_date > '2024-01-01'
GROUP BY p.category
HAVING COUNT(o.id) > 5
ORDER BY total_revenue DESC
LIMIT 10;
```

## 🚀 Next Module

→ `13_Database_Design/README.md`

Learn database **design principles**!

---

**Let's tackle complex problems!** 📚
