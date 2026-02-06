# Parse and SafeParse
## The core idea (no sugar-coating)

**`parse` and `safeParse` both validate data using a schema.
The only difference is what happens when validation fails.**

That’s it. Everything else is consequence.

---

## `parse()` — strict, throws errors 💥

`parse()` **assumes the data is valid**.
If it’s not, it **throws an exception** and your program crashes unless you catch it.

```js
const schema = zod.array(zod.number())

schema.parse([1, 2, 3])     // ✅ returns [1, 2, 3]
schema.parse([1, 2, "3"])   // ❌ throws ZodError
```

### What “throws” actually means

In Express, this would **kill the request** unless wrapped in `try/catch`.

```js
try {
  schema.parse(req.body.kidneys)
  res.send("ok")
} catch (err) {
  res.status(400).json({ error: err.errors })
}
```

### When `parse()` is okay

* Scripts
* Internal trusted data
* When you **want the app to crash on invalid data**
* TypeScript-heavy codebases with global error handling

---

## `safeParse()` — safe, no crashes 🛡️

`safeParse()` **never throws**.
Instead, it returns an object telling you what happened.

```js
const result = schema.safeParse([1, 2, "3"])

console.log(result)
```

### Output looks like this:

#### On success

```js
{
  success: true,
  data: [1, 2, 3]
}
```

#### On failure

```js
{
  success: false,
  error: ZodError
}
```

That’s why this works cleanly in your code:

```js
if (!response.success) {
  res.status(411).json({ msg: "Please give the valid inputs" })
}
```

No `try/catch`. No crashes. Clean control flow.

---

## Why tutorials ALWAYS use `safeParse` with Express

Because **user input is untrusted**.

If you use `parse()` directly on:

* `req.body`
* `req.query`
* `req.headers`

you’re **one bad request away from a 500 error**.

So the rule is simple:

> **External input → `safeParse()`
> Internal data → `parse()`**

---

## What’s ACTUALLY happening under the hood

This line:

```js
schema.safeParse(kidneys)
```

is doing:

1. Check if `kidneys` matches the schema
2. If yes → return `{ success: true, data }`
3. If no → return `{ success: false, error }`
4. **No exceptions thrown**

While:

```js
schema.parse(kidneys)
```

does:

1. Check schema
2. If invalid → **throw error immediately**
3. Execution stops unless caught

---

## One important improvement to YOUR code (real talk)

Right now you’re doing:

```js
res.send({ response })
```

You should **only send the validated data**, not the whole Zod response.

Better:

```js
if (!response.success) {
  return res.status(411).json({
    msg: "Please give valid inputs",
    errors: response.error.errors,
  })
}

res.json({
  kidneys: response.data,
})
```

Why?

* `response.data` is **guaranteed clean**
* Never trust `req.body` after validation — trust Zod’s output

---

## Mental model (remember this)

* `parse()` → “Trust me or crash”
* `safeParse()` → “Tell me what’s wrong, I’ll handle it”

Once this clicks, Zod becomes boring — and boring is good in backend code.
