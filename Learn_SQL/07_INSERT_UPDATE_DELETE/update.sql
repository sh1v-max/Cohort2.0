-- one row
UPDATE employees
SET salary = 60000
WHERE id = 1;
-- multiple row
UPDATE employees
SET name = 'Wazir Khan',
  salary = 70000
WHERE id = 1;