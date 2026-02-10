// given an array, give me back a new array in which every value is multiplied by 2

const arr = [1, 2, 3, 4, 5]

// using for loop
const newArrLoop = []
for (let i = 0; i < arr.length; i++) {
  newArrLoop.push(arr[i] * 2)
}
console.log('Using Loop ' + newArrLoop)

// this is exactly what map let us do
// using an intermediate function
function transform(i) {
  return i * 2
}
const ans = arr.map(transform)
console.log(ans)

// using map
const newArr = arr.map((value) => {
  return value * 2
})

console.log('Using Map ' + newArr)

// list the fullname of all the users
const users = [
  { firstName: 'John', lastName: 'Smith', age: 22 },
  { firstName: 'Emily', lastName: 'Johnson', age: 22 },
  { firstName: 'William', lastName: 'Williams', age: 33 },
  { firstName: 'Oliver', lastName: 'Brown', age: 43 },
  { firstName: 'Ethan', lastName: 'Davis', age: 50 },
  { firstName: 'Lily', lastName: 'Miller', age: 25 },
]

const fullname = users.map((user) => {
  return user.firstName + ' ' + user.lastName
})
console.log(fullname)
