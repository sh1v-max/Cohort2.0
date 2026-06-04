# Module 00: MySQL Setup & Installation

## 📋 Overview

Get MySQL ready for your SQL learning journey. This takes about 1 hour.

## 🎯 What You'll Do

- Install MySQL Server
- Verify it works
- Connect from command line
- Create your first database

## ⏱️ Time Estimate: 45-60 minutes

---

## Step 1: Download MySQL Server

### For Windows:

1. Go to: https://dev.mysql.com/downloads/mysql/
2. Select **Windows (x86, 64-bit)** - MSI Installer
3. Click **Download**
4. File size: ~200MB
5. Save it to your computer

### Alternative (Easier):
Use MySQL installer:
- Go to: https://dev.mysql.com/downloads/installer/
- Download: `mysql-installer-community-8.x.x.msi`

---

## Step 2: Install MySQL Server

1. Run the installer file (`.msi`)
2. Choose **Setup Type**: Select **Developer Default**
3. Follow the installation wizard (click Next)
4. When asked about **MySQL Server Instance Configuration**:
   - **Port**: Keep default `3306`
   - **MySQL Server type**: Choose `Development Machine`
5. When asked for **MySQL Root Password**:
   - Set a simple password (e.g., `root` or `password123`)
   - **Write this down!** You'll need it
6. Complete the installation
7. MySQL should start automatically

---

## Step 3: Verify MySQL is Running

Open **Command Prompt** and run:

```bash
mysql --version
```

You should see something like:
```
mysql  Ver 8.0.33 for Windows on x86_64
```

If you get "command not found", MySQL is not in your PATH. See troubleshooting below.

---

## Step 4: Test Connection

Open **Command Prompt** and run:

```bash
mysql -u root -p
```

It will ask for password. Enter the password you set in Step 2.

You should see:
```
mysql>
```

This means you're connected! Type `exit` to quit.

---

## Step 5: Install MySQL Workbench (Recommended)

MySQL Workbench is a GUI tool that makes MySQL easier to use.

1. Go to: https://dev.mysql.com/downloads/workbench/
2. Download **MySQL Workbench** (it's free)
3. Run the installer
4. Open MySQL Workbench

### Create a Connection in Workbench:

1. Click the **+** icon next to "MySQL Connections"
2. Fill in:
   - **Connection Name**: `practice`
   - **Hostname**: `localhost`
   - **Port**: `3306`
   - **Username**: `root`
3. Click **Store in Vault** and enter your password
4. Click **Test Connection**
5. If successful, click **OK**

---

## Step 6: Create Your Practice Database

In MySQL Workbench:

1. Double-click your `practice` connection
2. Copy-paste this code:

```sql
CREATE DATABASE practice;
USE practice;
```

3. Click the **lightning bolt** icon (Execute)
4. You should see: `Query OK`

---

## Step 7: Setup VS Code (Optional)

If you want to use VS Code instead of Workbench:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search: `SQLTools`
4. Install **SQLTools** (by Matheus Teixeira)
5. Install **SQLTools MySQL/MariaDB/TiDB** (driver)
6. Reload VS Code
7. Click SQLTools icon in left sidebar
8. Click **Add New Connection**
9. Choose **MySQL/MariaDB**
10. Fill in:
    - **Connection name**: `practice`
    - **Server Address**: `localhost`
    - **Port**: `3306`
    - **Database**: `practice`
    - **Username**: `root`
    - **Password**: Your MySQL password

---

## ✅ Verification Checklist

Check off when done:

- [ ] MySQL Server installed
- [ ] `mysql --version` works in Command Prompt
- [ ] Can connect with `mysql -u root -p`
- [ ] MySQL Workbench installed and connected
- [ ] Created `practice` database
- [ ] Saw "Query OK" message

---

## 🎯 You're All Set!

Once all checks pass, you're ready to start learning SQL.

## Next Steps

1. Go to: `01_Introduction_to_Databases/README.md`
2. Learn what databases are
3. Write your first SQL query

---

## 🆘 Troubleshooting

### "mysql: command not found"
**Problem**: MySQL not in system PATH

**Solution**:
1. Find MySQL bin folder: Usually `C:\Program Files\MySQL\MySQL Server 8.0\bin`
2. Copy the full path
3. Press **Win+X** → **System**
4. Click **Advanced system settings**
5. Click **Environment Variables**
6. Under "System variables", find **Path**
7. Click **Edit** → **New**
8. Paste the MySQL bin path
9. Click **OK** three times
10. Restart Command Prompt and try again

### "Access denied for user 'root'"
**Problem**: Wrong password

**Solution**:
1. Reinstall MySQL (choose custom install)
2. Set password again (something simple)
3. Write it down this time!

### "Can't connect in Workbench"
**Problem**: MySQL Server not running

**Solution**:
1. Press **Win+R**
2. Type: `services.msc`
3. Find **MySQL80** (or similar)
4. Right-click → **Start**
5. Try connecting again

### "Port 3306 already in use"
**Problem**: Another application using port 3306

**Solution**:
1. Reinstall MySQL
2. Choose port **3307** instead of **3306**
3. Update all connections to use port 3307

---

## 📚 What's Next?

Once setup is complete:
1. Read: `01_Introduction_to_Databases/README.md`
2. Then: `02_SQL_Introduction/README.md`
3. Then: Start learning actual SQL!

**You're one step away from learning SQL!** 🚀

