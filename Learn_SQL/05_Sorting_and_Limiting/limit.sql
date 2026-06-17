SELECT *
FROM users
LIMIT 3;

SELECT *
FROM users
ORDER BY age DESC
LIMIT 2;

SELECT *
FROM users
WHERE age > 24
LIMIT 1;

SELECT *
FROM users
LIMIT 2 OFFSET 2;
-- it will skip the first 2 rows, and show the next 2

SELECT DISTINCT age
FROM users;
-- it will return only unique ages

SELECT DISTINCT age
FROM users
ORDER BY age DESC;
-- it will return only unique ages