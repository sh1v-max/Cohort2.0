-- Task Management App - Database Schema
-- A real-world mini-project to practice database design

-- =============================================================================
-- PROJECT OVERVIEW
-- =============================================================================

/*
Task Management System for Teams

Features:
├── Multiple users
├── Users can create tasks
├── Tasks have projects
├── Tasks have assignees
├── Tasks have comments
├── Tasks have labels/tags
├── Tasks can have subtasks
├── Track task history (status changes)
├── Priority and deadline management
*/

-- =============================================================================
-- 1. USERS TABLE
-- =============================================================================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    profile_picture_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- =============================================================================
-- 2. PROJECTS TABLE
-- =============================================================================

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(200) NOT NULL,
    description TEXT,
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_archived BOOLEAN DEFAULT false,
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
);

-- =============================================================================
-- 3. PROJECT MEMBERS (Many-to-Many: Projects ↔ Users)
-- =============================================================================

CREATE TABLE project_members (
    project_member_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    role VARCHAR(50) DEFAULT 'member',  -- 'owner', 'admin', 'member'
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE (project_id, user_id)
);

-- =============================================================================
-- 4. TASKS TABLE
-- =============================================================================

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    creator_id INT NOT NULL,
    assigned_to_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) DEFAULT 'medium',  -- 'low', 'medium', 'high', 'urgent'
    status VARCHAR(20) DEFAULT 'todo',  -- 'todo', 'in_progress', 'in_review', 'done'
    due_date DATE,
    start_date DATE,
    estimated_hours DECIMAL(5, 2),
    actual_hours DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES users(user_id),
    FOREIGN KEY (assigned_to_id) REFERENCES users(user_id)
);

-- =============================================================================
-- 5. TASK LABELS / TAGS (Many-to-Many)
-- =============================================================================

CREATE TABLE labels (
    label_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    label_name VARCHAR(50) NOT NULL,
    color_code VARCHAR(7),  -- Hex color
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    UNIQUE (project_id, label_name)
);

CREATE TABLE task_labels (
    task_label_id SERIAL PRIMARY KEY,
    task_id INT NOT NULL,
    label_id INT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
    FOREIGN KEY (label_id) REFERENCES labels(label_id) ON DELETE CASCADE,
    UNIQUE (task_id, label_id)
);

-- =============================================================================
-- 6. SUBTASKS
-- =============================================================================

CREATE TABLE subtasks (
    subtask_id SERIAL PRIMARY KEY,
    task_id INT NOT NULL,
    subtask_title VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE
);

-- =============================================================================
-- 7. COMMENTS
-- =============================================================================

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- =============================================================================
-- 8. ATTACHMENTS
-- =============================================================================

CREATE TABLE attachments (
    attachment_id SERIAL PRIMARY KEY,
    task_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size INT,  -- in bytes
    uploaded_by INT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id)
);

-- =============================================================================
-- 9. TASK HISTORY / AUDIT LOG
-- =============================================================================

CREATE TABLE task_history (
    history_id SERIAL PRIMARY KEY,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    action VARCHAR(50) NOT NULL,  -- 'created', 'updated', 'status_changed', 'assigned', 'commented'
    field_changed VARCHAR(100),  -- which field changed
    old_value VARCHAR(500),
    new_value VARCHAR(500),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- =============================================================================
-- 10. TASK RELATIONSHIPS (Dependencies)
-- =============================================================================

CREATE TABLE task_dependencies (
    dependency_id SERIAL PRIMARY KEY,
    task_id INT NOT NULL,
    depends_on_task_id INT NOT NULL,
    dependency_type VARCHAR(50),  -- 'blocks', 'blocked_by', 'relates_to'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
    FOREIGN KEY (depends_on_task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
    CHECK (task_id != depends_on_task_id)
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_comments_task ON comments(task_id);
CREATE INDEX idx_project_members_user ON project_members(user_id);
CREATE INDEX idx_task_labels_task ON task_labels(task_id);
CREATE INDEX idx_task_history_task ON task_history(task_id);

-- =============================================================================
-- SAMPLE DATA
-- =============================================================================

-- Create users
INSERT INTO users (username, email, first_name, last_name, password_hash) VALUES
('john_doe', 'john@example.com', 'John', 'Doe', 'hash_john'),
('jane_smith', 'jane@example.com', 'Jane', 'Smith', 'hash_jane'),
('bob_wilson', 'bob@example.com', 'Bob', 'Wilson', 'hash_bob'),
('alice_jones', 'alice@example.com', 'Alice', 'Jones', 'hash_alice');

-- Create projects
INSERT INTO projects (project_name, description, owner_id) VALUES
(1, 'Website Redesign', 'Redesign company website', 1),
(2, 'Mobile App', 'Build iOS and Android app', 2);

-- Add project members
INSERT INTO project_members (project_id, user_id, role) VALUES
(1, 1, 'owner'),
(1, 2, 'member'),
(1, 3, 'member'),
(2, 2, 'owner'),
(2, 4, 'member');

-- Create labels
INSERT INTO labels (project_id, label_name, color_code) VALUES
(1, 'Frontend', '#FF5733'),
(1, 'Backend', '#33FF57'),
(1, 'Design', '#3357FF'),
(1, 'Bug', '#FF33F1');

-- Create tasks
INSERT INTO tasks (project_id, creator_id, assigned_to_id, title, description, priority, status, due_date) VALUES
(1, 1, 2, 'Design Homepage', 'Create mockups for new homepage', 'high', 'in_progress', '2024-03-15'),
(1, 1, 3, 'Setup Database', 'Configure PostgreSQL for new features', 'high', 'todo', '2024-03-10'),
(1, 2, 1, 'Review Designs', 'Review and approve homepage designs', 'high', 'todo', '2024-03-20'),
(2, 2, 4, 'API Endpoints', 'Create REST API endpoints', 'medium', 'todo', '2024-04-01'),
(2, 2, 4, 'Authentication', 'Implement OAuth2 authentication', 'high', 'todo', '2024-03-25');

-- Add subtasks
INSERT INTO subtasks (task_id, subtask_title) VALUES
(1, 'Desktop mockup'),
(1, 'Mobile mockup'),
(1, 'Review with stakeholders');

-- Add comments
INSERT INTO comments (task_id, user_id, content) VALUES
(1, 2, 'Started working on desktop mockup'),
(1, 1, 'Looks great! Can you add the feature section?'),
(2, 3, 'Which database should we use?');

-- Add labels to tasks
INSERT INTO task_labels (task_id, label_id) VALUES
(1, 3),  -- Design label
(2, 2),  -- Backend label
(4, 2),  -- Backend label
(5, 2);  -- Backend label

-- =============================================================================
-- USEFUL QUERIES FOR PRACTICE
-- =============================================================================

-- Q1: Get all tasks for a specific project with assignee names
SELECT t.task_id, t.title, t.status, t.priority,
    u.first_name || ' ' || u.last_name as assigned_to,
    t.due_date
FROM tasks t
LEFT JOIN users u ON t.assigned_to_id = u.user_id
WHERE t.project_id = 1
ORDER BY t.due_date;

-- Q2: Get task count by status for a project
SELECT status, COUNT(*) as task_count
FROM tasks
WHERE project_id = 1
GROUP BY status;

-- Q3: Get all users working on a project
SELECT DISTINCT u.user_id, u.first_name, u.last_name, pm.role
FROM users u
JOIN project_members pm ON u.user_id = pm.user_id
WHERE pm.project_id = 1;

-- Q4: Get all tasks with their labels
SELECT t.task_id, t.title, STRING_AGG(l.label_name, ', ') as labels
FROM tasks t
LEFT JOIN task_labels tl ON t.task_id = tl.task_id
LEFT JOIN labels l ON tl.label_id = l.label_id
WHERE t.project_id = 1
GROUP BY t.task_id, t.title;

-- Q5: Get tasks by assignee
SELECT u.first_name, u.last_name, COUNT(t.task_id) as task_count,
    COUNT(CASE WHEN t.status = 'done' THEN 1 END) as completed_tasks
FROM users u
LEFT JOIN tasks t ON u.user_id = t.assigned_to_id
WHERE t.project_id = 1
GROUP BY u.user_id, u.first_name, u.last_name;

-- Q6: Get overdue tasks
SELECT task_id, title, assigned_to_id, due_date
FROM tasks
WHERE status != 'done' AND due_date < CURRENT_DATE;

-- Q7: Get task comments with user info
SELECT t.title, u.first_name || ' ' || u.last_name as commenter, c.content, c.created_at
FROM comments c
JOIN tasks t ON c.task_id = t.task_id
JOIN users u ON c.user_id = u.user_id
WHERE t.task_id = 1
ORDER BY c.created_at DESC;

-- Q8: Get recently updated tasks
SELECT task_id, title, status, updated_at
FROM tasks
ORDER BY updated_at DESC
LIMIT 10;

-- =============================================================================
-- SCHEMA DESIGN NOTES
-- =============================================================================

/*
RELATIONSHIPS:
1. Users ↔ Projects: 1:N (User creates many projects)
2. Users ↔ Projects: N:N through project_members (Many users in many projects)
3. Projects ↔ Tasks: 1:N
4. Users ↔ Tasks: 1:N (assigned_to and creator)
5. Tasks ↔ Comments: 1:N
6. Tasks ↔ Subtasks: 1:N
7. Tasks ↔ Labels: N:N through task_labels
8. Tasks ↔ Attachments: 1:N
9. Tasks ↔ Dependencies: N:N

KEY FEATURES:
- Soft deletes for comments (is_deleted)
- Audit trail with task_history
- Due date management
- Priority levels
- Status tracking
- Multiple user roles in projects
- Dependency management between tasks
- Time tracking (estimated_hours, actual_hours)

INTERVIEW DISCUSSION POINTS:
1. Why use task_history table instead of triggers?
   → Simpler to query, easier to understand, explicit control

2. Why soft delete for comments?
   → Maintain referential integrity, audit trail, recovery option

3. How would you implement real-time updates?
   → WebSockets, polling, or message queue (not SQL)

4. How to handle cascading deletes?
   → ON DELETE CASCADE for appropriate relationships

5. How to optimize for high traffic?
   → Indexes on frequently queried columns
   → Denormalize if needed
   → Cache project members
   → Archive old history
*/
