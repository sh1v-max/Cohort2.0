# Why `req.body` is `undefined`

> **`req.body` is `undefined` because Express does NOT parse request bodies by default.**

You did **NOT** “define the body”.
You only **tried to read it**.

Now let’s break it down properly.

---

## What you *think* is happening vs what’s actually happening

### You think:

> “I sent data in POST, so Express should give it in `req.body`”

### Reality:

> Express receives raw data, but **does nothing with it unless you tell it how to parse it**.

Express is intentionally minimal.

---

## The missing line (this is the core issue)

You **must add middleware** to parse JSON:

```js
app.use(express.json())
```

Without this:

* Express receives the body
* **Does NOT convert it**
* `req.body === undefined`

---

## Corrected working version (minimum fix)

```js
const express = require('express')
const app = express()
const port = 3000

// 👇 THIS IS THE FIX
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/conversations', (req, res) => {
  console.log(req.body)
  res.send({
    msg: 'POST request to /conversations received',
    body: req.body,
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
```

Now `req.body` will work.

---

## Why Express behaves like this (important concept)

Express.js follows a **middleware-based architecture**.

Express says:

> “I won’t assume your data format. You tell me.”

So:

* JSON → `express.json()`
* Form data → `express.urlencoded()`
* Files → multer
* Cookies → cookie-parser

---

## What is `app.use(express.json())` actually doing?

Internally:

1. Intercepts the incoming request
2. Reads raw body stream
3. Parses JSON
4. Attaches parsed object to `req.body`
5. Passes control to your route

This happens **before** your route handler runs.

---

## Order matters (this WILL bite you later)

❌ This won’t work:

```js
app.post('/conversations', ...)
app.use(express.json())
```

✅ This works:

```js
app.use(express.json())
app.post('/conversations', ...)
```

Middleware must come **before routes** that depend on it.

---

## Another mistake you made (important)

You defined the same route **twice**:

```js
app.post('/conversations', ...)
...
app.post('/conversations', ...)
```

Only **the first one runs**.

This won’t crash, but it’s bad practice and confusing.

Delete the duplicate.

---

## How to test properly (don’t use browser)

### Use:

* Postman
* Thunder Client
* curl

Example request body:

```json
{
  "text": "hello backend"
}
```

Header **must be**:

```
Content-Type: application/json
```

If this header is missing → `req.body` may still be empty.

---

## Mental model (lock this in)

> Routes do NOT read bodies
> **Middleware prepares data**
> Routes consume prepared data

---

## Next things you should learn (in order)

1. `express.urlencoded()`
2. Middleware chaining
3. Status codes (`res.status(201)`)
4. Validation
5. Simple in-memory todo app
