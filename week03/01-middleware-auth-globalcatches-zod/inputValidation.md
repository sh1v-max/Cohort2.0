## 1️⃣ What is input validation

**Input validation = never trusting the user. Ever.**

Any data coming from:

* `req.body`
* `req.query`
* `req.params`
* `req.headers`

👉 **can be missing, malformed, or malicious**.

Validation answers:

* Is it present?
* Is it the right type?
* Is it in the allowed range/format?

If not → **reject early**.

---

## 2️⃣ Why input validation is non-negotiable

Without validation:

* App crashes (`undefined.length`)
* Security bugs (SQL/NoSQL injection)
* Weird production bugs
* Garbage data in DB

Rule:

> **Bad input should never reach business logic.**

---

## 3️⃣ Where validation happens (important)

👉 **Before your core logic**
👉 **Before DB calls**
👉 **Before calculations**

Correct order:

```
Request → Validation → Business Logic → Response
```

---

## 4️⃣ Libraries used for input validation (Express world)

### 🔥 Most common & respected

1. **zod** ✅ (modern, clean, TypeScript-friendly)
2. **joi** (older, still used)
3. **express-validator** (Express-specific, verbose)

👉 **If you’re learning now: use `zod`.**
It’s becoming the industry standard.

---

## 5️⃣ Using `zod` (step by step)

### Install

```bash
npm install zod
```

---

### Define a schema (this is the brain)

```js
const { z } = require('zod')

const healthSchema = z.object({
  kidneys: z.array(z.number()).min(1),
})
```

Meaning:

* `kidneys` must exist
* must be an array
* array items must be numbers
* at least one kidney

---

### Validate inside route

```js
app.post('/health-checkup', (req, res, next) => {
  const result = healthSchema.safeParse(req.body)

  if (!result.success) {
    return next(new Error('Invalid input'))
  }

  const kidneys = result.data.kidneys
  res.send('You have ' + kidneys.length + ' kidneys')
})
```

---

## 6️⃣ Cleanest pattern (middleware-based validation)

This is **how pros do it**.

### Validation middleware

```js
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    return next(new Error('Invalid input'))
  }
  req.body = result.data // sanitized data
  next()
}
```

---

### Use it in route

```js
app.post(
  '/health-checkup',
  validate(healthSchema),
  (req, res) => {
    res.send('You have ' + req.body.kidneys.length + ' kidneys')
  }
)
```

Now:

* routes stay clean
* validation is reusable
* business logic is pure

---

## 7️⃣ Input validation vs sanitization (don’t mix)

* **Validation** → is input acceptable?
* **Sanitization** → clean input (trim, lowercase, remove junk)

Zod does both.

Example:

```js
z.string().trim().toLowerCase()
```

---

## 8️⃣ What NOT to do (common rookie mistakes)

❌ Manual `if` checks everywhere
❌ Validating after DB call
❌ Letting app crash and “global catch will handle it”
❌ Returning different error formats everywhere

---

## 9️⃣ How validation + global catch work together

Flow:

```
Bad input
 → Validation fails
 → next(err)
 → Global error handler
 → Clean error response
```

This is **exactly** what you want.

---

## 1️⃣0️⃣ Real-world status codes (important)

Don’t always send 500.

* **400** → Invalid input
* **401** → Unauthorized
* **403** → Forbidden
* **404** → Not found
* **500** → Server bug

Validation errors = **400**, not 500.

---

## One-line summary (memorize this)

> **Validation protects your app; global catch protects your server.
> Both are required.**
