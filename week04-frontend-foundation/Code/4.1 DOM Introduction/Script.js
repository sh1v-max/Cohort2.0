//debouncing and throttling
let timer
function debouncePopulateDiv() {
  // const element = document.getElementById('finalSum')
  // console.log(element)
  clearTimeout(timer)
  timer = setTimeout(function () {
    populateDiv()
  }, 1000)
}

async function populateDiv() {
  // getting values
  const a = document.getElementById('firstNumber').value
  const b = document.getElementById('secondNumber').value
  // const element = document.getElementById('finalSum')
  // element.innerHTML = parseInt(a) + parseInt(b)
  const response = await fetch('http://localhost:3000/sum?a=' + a + '&b=' + b)
  const ans = await response.text()
  document.getElementById('finalSum').innerHTML = ans
  console.log(ans)
}
