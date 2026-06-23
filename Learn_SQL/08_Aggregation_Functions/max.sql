SELECT MAX(age)
FROM users;

SELECT MAX(age) AS oldest_user
FROM users;

SELECT MAX(age) AS oldest_user, MIN(age) AS youngest_user
FROM users;

SELECT MAX(age) AS oldest_user, MIN(age) AS youngest_user, COUNT(*) AS total_users
FROM users;

SELECT MAX(age) AS oldest_user, MIN(age) AS youngest_user, COUNT(*) AS total_users, AVG(age) AS average_age
FROM users;

SELECT MAX(age) AS oldest_user, MIN(age) AS youngest_user, COUNT(*) AS total_users, AVG(age) AS average_age, SUM(age) AS total_age
FROM users;

SELECT MAX(age) AS oldest_user, MIN(age) AS youngest_user, COUNT(*) AS total_users, AVG(age) AS average_age, SUM(age) AS total_age, ROUND(AVG(age)) AS rounded_average_age
FROM users;