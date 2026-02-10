// finding Sum

const arr = [1, 2, 3, 4, 5]

// using for loop
function finsSum(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}
console.log('Using Loop Sum: ' + finsSum(arr))

// using reduce
const ans = arr.reduce((acc, value) => {
  return acc + value
}, 0)
// 0 is the initial value of acc(accumulator)
console.log('Using Reduce Sum: ' + ans)

// using reduce Single Line
const ans2 = arr.reduce((acc, value) => acc + value, 0)
console.log('Using Reduce Single Line Sum: ' + ans2)

// find the number of people with unique age
const users = [
  { firstName: 'John', lastName: 'Smith', age: 22 },
  { firstName: 'Emily', lastName: 'Johnson', age: 22 },
  { firstName: 'William', lastName: 'Williams', age: 33 },
  { firstName: 'Oliver', lastName: 'Brown', age: 43 },
  { firstName: 'Ethan', lastName: 'Davis', age: 50 },
  { firstName: 'Lily', lastName: 'Miller', age: 25 },
]
const uniqueAges = users.reduce(function (acc, curr) {
  if (acc[curr.age]) {
    acc[curr.age] += 1
  } else {
    acc[curr.age] = 1
  }
  return acc
}, {})
console.log('printing People with Unique Age: ')
console.log(uniqueAges)
