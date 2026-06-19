-- single row
INSERT INTO employees (name, email, salary, joining_date)
VALUES (
    'Wazir',
    'wazir@example.com',
    50000,
    '2026-06-19'
  );
-- multiple row
INSERT INTO employees (name, email, salary, joining_date)
VALUES ('Adam', 'adam@example.com', 40000, '2026-01-10'),
  ('Eva', 'eva@example.com', 45000, '2026-02-15'),
  ('Mike', 'mike@example.com', 55000, '2026-03-20');