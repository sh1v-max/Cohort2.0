SELECT age, COUNT(*) AS total_users
FROM users
GROUP BY age
HAVING COUNT(*) > 1;

SELECT user_id, COUNT(*) AS total_posts
FROM posts
GROUP BY user_id
HAVING COUNT(*) >= 2;

SELECT user_id, COUNT(*) AS total_posts
FROM posts
GROUP BY user_id
HAVING COUNT(*) >= 2
ORDER BY total_posts DESC;

SELECT user_id, COUNT(*) AS total_comments_written
FROM comments
GROUP BY user_id
HAVING COUNT(*) > 0;

-- WHERE filters rows before grouping, HAVING filters groups after aggregation
SELECT age, COUNT(*) AS total_users
FROM users
WHERE age > 23
GROUP BY age
HAVING COUNT(*) >= 1;

SELECT user_id, AVG(LENGTH(content)) AS average_content_length
FROM posts
GROUP BY user_id
HAVING AVG(LENGTH(content)) > 30;
