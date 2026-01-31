// given an array, return even vals only

// using for loop

const arr = [1, 2, 3, 4, 5]
const newArrLoop = []
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    newArrLoop.push(arr[i])
  }
}
console.log('Using Loop Even: ' + newArrLoop)

// using filter
const ans = arr.filter((value) => {
  return value % 2 === 0
})
console.log('Using Filter Even: ' + ans)

// List the fullname and Age of the user with age greater than 30
const users = [
  { firstName: 'John', lastName: 'Smith', age: 22 },
  { firstName: 'Emily', lastName: 'Johnson', age: 22 },
  { firstName: 'William', lastName: 'Williams', age: 33 },
  { firstName: 'Oliver', lastName: 'Brown', age: 43 },
  { firstName: 'Ethan', lastName: 'Davis', age: 50 },
  { firstName: 'Lily', lastName: 'Miller', age: 25 },
]

const fullname = users.filter((user) => {
  return user.age > 30
})
console.log(fullname)
