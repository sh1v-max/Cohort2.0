create database practice;
use practice;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO users (name, email, age)
VALUES ('Adam', 'adam@example.com', 24),
  ('Eva', 'eva@example.com', 24),
  ('Mike', 'mike@example.com', 23),
  ('John', 'john@example.com', 26),
  ('Deo', 'deo@example.com', 28);
INSERT INTO posts (user_id, title, content)
VALUES (
    1,
    'My React Journey',
    'Started learning React 2 years ago...'
  ),
  (
    1,
    'DSA in JavaScript',
    '100 days of solving problems daily...'
  ),
  (
    2,
    'Life in Bengaluru',
    'Moving to the city changed everything...'
  ),
  (
    3,
    'Asia vs Africa',
    'Two cultures, one world...'
  ),
  (
    4,
    'Career Switch Tips',
    'How I moved from college to industry...'
  );
INSERT INTO comments (post_id, user_id, body)
VALUES (1, 2, 'Great post Wazir, very relatable!'),
  (
    1,
    3,
    'I had the same experience with React hooks.'
  ),
  (2, 4, 'DSA grind is real, respect!'),
  (
    3,
    1,
    'Bengaluru is amazing, missing it already.'
  ),
  (4, 5, 'This really resonated with me.');

-- DROP TABLE comments;
-- DROP TABLE posts;
-- DROP TABLE users;

SELECT u.*, COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
GROUP BY u.id;

SELECT users.*, COUNT(posts.id) AS post_count
FROM users
LEFT JOIN posts ON posts.user_id = users.id
GROUP BY users.id;

SELECT users.*,
  (SELECT COUNT(*) FROM posts WHERE posts.user_id = users.id) AS post_count
FROM users;
