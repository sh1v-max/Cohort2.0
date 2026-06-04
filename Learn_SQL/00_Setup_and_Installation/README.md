# Module 00: Setup & Environment Configuration

## 📋 Overview

Get your PostgreSQL environment ready for a complete SQL learning journey.

## 🎯 Learning Objectives

- Install PostgreSQL on Windows
- Set up pgAdmin (web-based client)
- Create your first database
- Verify your installation
- Understand basic connection concepts

## 📚 Topics Covered

1. PostgreSQL installation
2. User and role creation
3. Database creation
4. Connection strings
5. pgAdmin setup and navigation
6. Command-line tools (psql)

## ⏱️ Time Estimate: 45-60 minutes

---

## Step 1: Download & Install PostgreSQL

### Windows Installation:

1. Visit: https://www.postgresql.org/download/windows/
2. Download the latest version (PostgreSQL 15+ recommended)
3. Run the installer
4. **Important:** Remember the password you set for the `postgres` user
5. Default port is 5432
6. Accept all defaults except:
   - Installation directory: Keep default (`C:\Program Files\PostgreSQL\15`)
   - Port: Keep 5432
   - Password: Set something you remember

### Verify Installation:

Open Command Prompt or PowerShell and run:
```powershell
psql --version
```

You should see: `psql (PostgreSQL) 15.x`

---

## Step 2: Start PostgreSQL Service

PostgreSQL should start automatically. Verify it's running:

```powershell
# Check if service is running (Windows)
Get-Service postgresql*
```

Or start manually:
```powershell
# Start PostgreSQL service
Start-Service postgresql-x64-15
```

---

## Step 3: Set Up pgAdmin

1. Open pgAdmin (installed with PostgreSQL)
2. Access at: http://localhost/pgadmin4 or search for pgAdmin in Start Menu
3. Set up a master password (remember this!)
4. In the sidebar, right-click "Servers" → Create → Server
5. Configure:
   - **Name:** `Local PostgreSQL`
   - **Host name/address:** `localhost`
   - **Port:** `5432`
   - **Username:** `postgres`
   - **Password:** (what you set during install)

---

## Step 4: Create Your Learning Database

In pgAdmin:

1. Right-click "Databases" → Create → Database
2. **Name:** `learning_db`
3. **Owner:** `postgres`
4. Click Save

---

## Step 5: Create Your First User (Optional but Recommended)

For security in production, create a dedicated user:

In pgAdmin Query Tool, run:
```sql
CREATE ROLE learning_user WITH LOGIN PASSWORD 'learning123';

GRANT CONNECT ON DATABASE learning_db TO learning_user;

GRANT USAGE ON SCHEMA public TO learning_user;

GRANT CREATE ON SCHEMA public TO learning_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO learning_user;
```

---

## Step 6: Connect Using psql (Command Line)

Test command-line connection:

```powershell
# Connect as postgres user
psql -U postgres -d learning_db

# Or with the new user
psql -U learning_user -d learning_db
```

You should see the `learning_db=#` prompt.

---

## Step 7: Set Up a Query Tool in VS Code (Optional)

Install the "PostgreSQL" extension by Chris Kolkman in VS Code:

1. Extensions → Search "PostgreSQL"
2. Install the extension
3. Create connection:
   - User: `postgres`
   - Password: (your password)
   - Server: `localhost`
   - Port: `5432`
   - Database: `learning_db`

---

## 📝 First Test: Run Your First Query

In pgAdmin (or psql), run:

```sql
SELECT version();
```

You should see the PostgreSQL version information.

---

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] psql command works in terminal
- [ ] Can connect to `learning_db` via psql
- [ ] pgAdmin shows your database
- [ ] `SELECT version();` returns PostgreSQL version
- [ ] Created a user (optional but recommended)

---

## 🎯 You're Ready!

Once you've completed all steps, you're ready to start Module 01.

## Next Step

→ Move to `01_foundations/` to learn SQL fundamentals

---

## 📚 Useful Resources

- PostgreSQL Official Docs: https://www.postgresql.org/docs/current/
- pgAdmin Docs: https://www.pgadmin.org/docs/
- psql Commands: https://www.postgresql.org/docs/current/app-psql.html

## 🆘 Troubleshooting

**Can't connect to PostgreSQL:**
- Check if service is running: `Get-Service postgresql*`
- Verify port 5432 is not blocked
- Check your password is correct

**pgAdmin won't start:**
- Clear browser cache
- Try incognito/private window
- Restart the pgAdmin service

**psql command not found:**
- Add PostgreSQL bin to PATH: `C:\Program Files\PostgreSQL\15\bin`
- Restart terminal

