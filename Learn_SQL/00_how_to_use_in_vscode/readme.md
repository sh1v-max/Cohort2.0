# MySQL in VS Code - Quick Start Guide

## Overview

This guide documents my setup for learning and practicing MySQL inside VS Code using SQLTools.

---

# Prerequisites

Before using VS Code, make sure:

* MySQL Server is installed
* MySQL Server is running
* I know my MySQL username and password
* MySQL Workbench can successfully connect

Typical local configuration:

```text
Host: localhost
Port: 3306
Username: root
Password: <my_password>
```

---

# Required VS Code Extensions

## 1. SQLTools

Extension Name:

```text
SQLTools
```

Purpose:

* Database explorer
* Run SQL queries
* Manage database connections
* View query results

---

## 2. SQLTools MySQL/MariaDB/TiDB Driver

Extension Name:

```text
SQLTools MySQL/MariaDB/TiDB
```

Purpose:

* Allows SQLTools to connect to MySQL databases

Without this driver, SQLTools cannot connect to MySQL.

---

# Creating a Connection

Open SQLTools panel in VS Code.

Click:

```text
Add New Connection
```

Choose:

```text
MySQL/MariaDB
```

Use these settings:

```text
Connection Name: practice

Server Address: localhost

Port: 3306

Database: practice

Username: root

Password Mode:
SQLTools Driver Credentials
```

Save connection.

Enter MySQL password when prompted.

Expected result:

```text
practice
root@localhost:3306/practice
```

appears in SQLTools sidebar.

---

# Creating a SQL File

Create a file:

```text
first_code.sql
```

Extension must be:

```text
.sql
```

Example:

```sql
USE practice;
```

---

# Running Queries

## Method Used

1. Select query text

Example:

```sql
USE practice;
```

2. Right-click

3. Click:

```text
Run Selected Query
```

4. SQLTools executes the query.

---

# Example Workflow

Select:

```sql
USE practice;
```

Run Selected Query.

Then:

```sql
SELECT DATABASE();
```

Run Selected Query.

Expected output:

```text
practice
```

---

# Useful Commands

## Show Databases

```sql
SHOW DATABASES;
```

Shows all available databases.

---

## Select Database

```sql
USE practice;
```

Sets current database.

---

## Check Current Database

```sql
SELECT DATABASE();
```

Shows active database.

---

## Show Tables

```sql
SHOW TABLES;
```

Lists tables inside selected database.

---

# Create Table Example

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Insert Data Example

```sql
INSERT INTO users (name, email, age)
VALUES ('Wazir', 'wazir@example.com', 24);
```

---

# View Data

```sql
SELECT * FROM users;
```

---

# Mental Model

```text
MySQL Server
      ↑
      │
 ┌────┴────┐
 │         │
Workbench  VS Code SQLTools
```

Both Workbench and VS Code connect to the same MySQL Server.

Changes made in Workbench are visible in VS Code.

Changes made in VS Code are visible in Workbench.

---

# Common Problems

## Query Does Not Run

Check:

* File extension is `.sql`
* SQLTools connection is active
* Query text is selected
* Right-click → Run Selected Query

---

## Database Not Found

Run:

```sql
SHOW DATABASES;
```

Verify database exists.

Then:

```sql
USE database_name;
```

---

## Connection Fails

Verify:

* MySQL Server is running
* Correct username
* Correct password
* Correct port (3306)

---

# Current Database Structure

Database:

```text
practice
```

Tables:

```text
users
posts
comments
```

Relationships:

```text
Users
  ↓
Posts
  ↓
Comments
```
