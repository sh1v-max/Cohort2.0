# HTTP server in Node.js

``` js
const express = require('express')
// call the express fun, it will give you an app object
// app is our server instance
const app = express()
const port = 3000

// this is a route handle for GET request on root route
app.get('/', (req, res) => {
  // req is the request object
  // res is the response object
  res.send(`hello world`)
})

app.listen(port)
```

## 1️⃣ `const express = require('express')`

![Image](https://media.geeksforgeeks.org/wp-content/uploads/20250705152348042640/Request-and-Response-Cycle.webp)

![Image](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes/mvc_express.png)

![Image](https://miro.medium.com/1%2AkMNzu4zx40QvwQUWa9dCOw.png)

* `express` is a **function exported by the Express package**
* `require()` loads code from `node_modules`
* Nothing magical here — just importing a function

Think of it as:

> “Give me the tool that helps create a server easily”

---

## 2️⃣ `const app = express()`

This line is **huge**, even though it looks small.

* You **call** the express function
* It returns an **app object**
* `app` = your **server instance**

Mentally:

```js
app === myBackendServer
```

Everything you do next (`get`, `post`, `listen`) happens on this `app`.

---

## 3️⃣ `const port = 3000`

* Port = **door number** on your machine
* Multiple servers can run, each on different ports

Common ports:

* 3000 → development
* 5173 → Vite
* 8080 → generic servers
* 80 / 443 → production (HTTP / HTTPS)

---

## 4️⃣ `app.get('/', (req, res) => { ... })`

This is the **core concept** of Express.

Break it down:

### `app.get`

* Handles **GET HTTP requests**

Other methods exist:

* `app.post`
* `app.put`
* `app.delete`

---

### `'/'`

* Route path
* This means:
  **[http://localhost:3000/](http://localhost:3000/)**

---

### `(req, res) => {}`

This function runs **only when someone hits this route**

#### `req` (request)

Contains:

* URL
* query params
* headers
* body
* cookies

Example:

```js
req.url
req.method
req.headers
```

#### `res` (response)

Used to **send something back**

You can:

```js
res.send()
res.json()
res.status()
res.sendFile()
```

---

### `res.send('hello world')`

* Sends response to client
* Automatically sets headers
* Ends the request-response cycle

⚠️ **Important truth**:
Once you call `res.send()`, **the request is finished**.

Calling `res.send()` twice will crash or warn.

---

## 5️⃣ `app.listen(port)`

This line actually **starts the server**

Before this:

* You only *defined* routes

After this:

* Node starts listening for incoming requests
* Server stays alive until you stop it (`Ctrl + C`)

Internally:

* Uses Node’s `http` module
* Express just wraps it nicely

---

## What happens when you open `http://localhost:3000/`

Here’s the real flow:

1. Browser sends HTTP GET request
2. Express receives it
3. Express checks:

   * Method → GET?
   * Path → `/`?
4. Match found → callback runs
5. `res.send()` sends response
6. Browser displays “hello world”

---

## Common beginner mistakes (listen carefully)

### ❌ Thinking Express is a server

No.
**Node creates the server**. Express just makes it easier.

---

### ❌ Forgetting `app.listen`

Then nothing runs.
Your code looks correct but server is dead.

---

### ❌ Confusing route with URL

Route = pattern
URL = actual address

---

## Tiny improvement you SHOULD make now

Always log when server starts:

```js
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

This saves debugging time later.

---

## Mental model you must lock in
```
> Express = traffic police
> Routes = rules
> req = incoming data
> res = outgoing data
```