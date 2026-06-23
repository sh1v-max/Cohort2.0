SELECT SUM(age)
FROM users;

SELECT SUM(age) AS total_age
FROM users;

SELECT SUM(age) AS total_age, COUNT(*) AS total_users
FROM users;

SELECT SUM(age) AS total_age, COUNT(*) AS total_users, MAX(age) AS oldest_user, MIN(age) AS youngest_user
FROM users;

SELECT SUM(age) AS total_age, COUNT(*) AS total_users, MAX(age) AS oldest_user, MIN(age) AS youngest_user, AVG(age) AS average_age
FROM users;

SELECT SUM(age) AS total_age, COUNT(*) AS total_users, MAX(age) AS oldest_user, MIN(age) AS youngest_user, AVG(age) AS average_age, ROUND(AVG(age)) AS rounded_average_age
FROM users;