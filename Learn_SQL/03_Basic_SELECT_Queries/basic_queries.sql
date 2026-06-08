SELECT *
FROM users;
SELECT *
FROM posts;
SELECT *
FROM comments;
show databases;
SELECT DATABASE();

SELECT users.name, posts.title
FROM posts
INNER JOIN users ON posts.user_id = users.id;