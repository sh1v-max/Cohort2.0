SELECT age
FROM users
GROUP BY age;

SELECT age, COUNT(*) AS total_users
FROM users
GROUP BY age;

SELECT age, COUNT(*) AS total_users
FROM users
GROUP BY age
ORDER BY age;

SELECT user_id, COUNT(*) AS total_posts
FROM posts
GROUP BY user_id;

SELECT user_id, COUNT(*) AS total_posts
FROM posts
GROUP BY user_id
ORDER BY total_posts DESC;

SELECT post_id, COUNT(*) AS total_comments
FROM comments
GROUP BY post_id;

SELECT user_id, COUNT(*) AS total_comments_written
FROM comments
GROUP BY user_id
ORDER BY total_comments_written DESC;

SELECT age, GROUP_CONCAT(name) AS users_with_this_age
FROM users
GROUP BY age;
