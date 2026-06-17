SELECT *
FROM users;
SELECT *
FROM posts;
SELECT *
FROM comments;
show databases;
SELECT DATABASE();

SELECT name, age
FROM users;

SELECT *
FROM users
WHERE age > 24;

SELECT *
FROM users
WHERE age >= 24;

SELECT *
FROM users
WHERE age != 24;

SELECT *
FROM users
ORDER BY age;

SELECT *
FROM users
ORDER BY age DESC;

SELECT *
FROM users
LIMIT 3;

SELECT *
FROM users
WHERE name = 'Adam';

SELECT users.name,
  posts.title
FROM posts
  INNER JOIN users ON posts.user_id = users.id;