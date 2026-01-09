// Promises are a way to handle asynchronous operations in JavaScript.
// They are easy to manage when dealing with multiple asynchronous operations where callbacks can create callback hell leading to unmanageable code.
// A Promise is in one of these states:
// pending: initial state, neither fulfilled nor rejected.
// fulfilled: meaning that the operation completed successfully.
// rejected: meaning that the operation failed.

const mydata = new Promise((resolve, reject) => {
  fetch('https://randomuser.me/api')
    .then((raw) => raw.json())
    .then((result) => {
      if (result.results[0].gender === 'male') resolve()
      else reject()
    })
})
console.log(mydata) // side stack - Promise { <pending> }

mydata
  .then(() => {
    console.log('for MALE')
  })
  .catch(() => {
    console.log('for FEMALE')
  })

// Open 05promise.html in browser type mydata in the console and see the output
