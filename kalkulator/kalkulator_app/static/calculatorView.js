let action = []
let number = []
let operatorActive = true

function view() {
    document.querySelector('.calc-operation').innerHTML = `${action.join(' ')}`
    document.querySelector('.calc-typed').innerHTML = `${number.join('')}<span class="blink-me">_</span>`
}

function resetCalculator() {
    action = []
    number = []
    operator = []
    document.querySelector('.calc-typed').innerHTML = '<span class="blink-me">_</span>'
    document.querySelector('.calc-operation').innerHTML = ''
}

function addNumber(num) {
    operatorActive = false   
    if (num === '.' && number.includes('.')) {
        return
    } 
    number.push(num)
    view()
}

function addOperator(operator) {
    if (operatorActive) {
        return
    }
    operatorActive = true

    convertNumberStringInToSingleNum()
    document.querySelector('.calc-operation').innerHTML = `${action.join(' ')}`
    document.querySelector('.calc-typed').innerHTML = `${operator}<span class="blink-me">_</span>`
    action = [...action, operator]
}

function convertNumberStringInToSingleNum() {
    const singleNumber = number.join('')
    action = [...action, +singleNumber]
    number = []
}

function doCalculations() {
    if (operatorActive) {
        return
    }
    convertNumberStringInToSingleNum()

    document.querySelector('.calc-operation').innerHTML = `${action.join(' ')}`
    document.querySelector('.calc-typed').innerHTML = `${calculations()}<span class="blink-me">_</span>`

    console.log(action)
}

function calculations() {
    let result = Number(action[0])

    action.slice(1).forEach((el, idx, array) => {
        if (el === '+') {
            result += array[idx + 1]
        } else if (el === '-') {
            result -= array[idx + 1]
        } else if (el === '*') {
            result *= array[idx + 1]
        } else if (el === '/') {
            result /= array[idx + 1]
        }
    })

    return parseFloat(result.toFixed(2).toString())
}