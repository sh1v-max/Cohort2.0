// input validation
// we want to make sure that the input we get from the user is valid
// doing all checks manually can be tedious and error-prone
// we can use libraries like Zod of Joi to help us with input validation

// npm install zod
// zod is a TypeScript-first schema declaration and validation library. It is designed to be easy to use with TypeScript, but still allow for easy integration with plain JavaScript.
// we can use zod independently, without express

const zod = require('zod')

function validateInput(arr) {
  const schema = zod.array(zod.number())

  const response = schema.safeParse(arr)
  console.log(response)
}

validateInput([1, 2, 3, 4])
// {
//   success: true,
//   data: [ 1, 2, 3, 4 ]
// }
validateInput([1, 2, '3', 4])
// {
//   success: false,
//   error: {
//     issues: [
//       {
//         code: 'invalid_type',
//         expected: 'number',
//         received: 'string',
//         path: [ 2 ],
//         message: 'Expected number, received string'
//       }
//     ]
//   }
// }

// the use case could be to validate a objects with specific keys and values, then we can use object() method of zod.

function validateObject(obj) {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
  })

  const response = schema.safeParse(obj)
  console.log(response)
}

validateObject({
  // Success
  email: 'abc123@gmail.com',
  password: '123456',
})
// {
//   success: true,
//   data: {
//     email: 'abc123@gmail.com',
//     password: '123456'
//   }
// }
validateObject({
  email: 'abc',
  password: '123', // password should be at least 6 characters
})
// {
//   success: false,
//   error: {
//     issues: [
//       {
//         code: 'invalid_type',
//         expected: 'string',
//         received: 'number',
//         path: [ 'password' ],
//         message: 'Expected string, received number'
//       }
//     ]
//   }
// }

// more use cases

// creating a schema for array of numbers by describing the structure of the input
// here, array of numbers
const schema = zod.array(zod.number())

// let's say user sends you the following object
// {
//     email: String
//     password: number
//     country:'IN' 'US'
// }

// this is the schema for the above object which we want to validate
// top level needs to be an object, and all the properties need to be as defined
const schema2 = zod.object({
  email: zod.string(),
  // email to be string
  password: zod.string(),
  // password to be string
  country: zod.literal('IN').or(zod.literal('US')),
  // country to be 'IN' or 'US'
})

// another example
const schema3 = zod.object({
  name: zod.string().min(3).max(255),
  // name to be a string with minimum length of 3 and maximum length of 255
  age: zod.number().int().positive().gte(18).lte(100),
  // age to be an integer, positive, greater than or equal to 18, and less than or equal to 100
  address: zod.object({
    street: zod.string(),
    city: zod.string(),
    state: zod.string().length(2),
    // state to be a string with length of 2
    zipCode: zod.string().length(6),
    // zipCode to be a string with length of 6
  }),
})
