# Global catch

A **global catch** is when you use a **single error-handling middleware** in Express to catch **all errors** from anywhere in your app—instead of writing `try/catch` again and again.

### Why it exists

Without it:

* Your app crashes
* You repeat error logic everywhere
* Errors leak ugly messages to users

With a global catch:

* One place handles everything
* Clean responses
* Centralized logging

---

### What it looks like in Express

```js
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong"
  });
});
```

☝️ This **must be at the very end** of your app.

---

### How errors reach the global catch

Anywhere in routes/middleware:

```js
app.get("/user", (req, res) => {
  throw new Error("DB failed");
});
```

or

```js
next(new Error("Unauthorized"));
```

Express automatically sends it to the **global catch**.

---

### Real-world example

```js
app.get("/login", (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new Error("No token"));
  }
  res.send("Logged in");
});
```

⬇️
Global catch handles it → user gets a clean response.

---

### Why backend devs love it

* 🔥 Cleaner code
* 🔥 One error format
* 🔥 Easier debugging
* 🔥 Production-ready pattern

---

### One important truth (people miss this)

**Async errors don’t auto-catch** unless you:

* use `try/catch`
* or pass error to `next(err)`
* or use an async wrapper

Example fix:

```js
app.get("/data", async (req, res, next) => {
  try {
    const data = await getData();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

---

### In one line

> **Global catch = one final safety net for your entire Express app.**
