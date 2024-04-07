let actionToCalculate = []
let numberToParse = []
let finalResult = null
let operatorActive = true
let nextCalculate = false

function view() {
    document.querySelector('.calc-operation').innerHTML = `${actionToCalculate.join(' ')}`
    document.querySelector('.calc-typed').innerHTML = `${numberToParse.join('')}<span class="blink-me">_</span>`
}

function resetCalculator() {
    actionToCalculate = []
    numberToParse = []
    finalResult = 0
    nextCalculate = false
    operatorActive = true
    document.querySelector('.calc-typed').innerHTML = '<span class="blink-me">_</span>'
    document.querySelector('.calc-operation').innerHTML = ''
}

function addNumber(num) {
    operatorActive = false   
    if (num === '.' && numberToParse.includes('.')) {
        return
    } 
    numberToParse.push(num)
    view()
}

function addOperator(operator) {
    if (operatorActive) {
        return
    }
    operatorActive = true

    if (nextCalculate) {
        actionToCalculate = [finalResult]
    }
    convertNumberStringInToSingleNum()
    document.querySelector('.calc-operation').innerHTML = `${actionToCalculate.join(' ')}`
    document.querySelector('.calc-typed').innerHTML = `${operator}<span class="blink-me">_</span>`

    actionToCalculate = [...actionToCalculate, operator]
}

function convertNumberStringInToSingleNum() {
    if (numberToParse.length === 0) {
        return
    }

    const singleNumber = numberToParse.join('')
    actionToCalculate = [...actionToCalculate, +singleNumber]
    numberToParse = []
}

function doCalculations() {
    if (operatorActive) {
        return
    }
    convertNumberStringInToSingleNum()
    const result = calculations()
    finalResult = result

    document.querySelector('.calc-operation').innerHTML = `${actionToCalculate.join(' ')}`
    document.querySelector('.calc-typed').innerHTML = `${result}<span class="blink-me">_</span>`
}

function calculations() {
    let result = Number(actionToCalculate[0])
    nextCalculate = true

    actionToCalculate.slice(1).forEach((el, idx, array) => {
        if (el === '+') {
            result += array[++idx]
        } else if (el === '-') {
            result -= array[++idx]
        } else if (el === '*') {
            result *= array[++idx]
        } else if (el === '/') {
            result /= array[++idx]
        } else if (el === '%') {
            result %= array[++idx]
        }
    })

    return parseFloat(result.toFixed(2).toString())
}

function backspace() {
    if (operatorActive && actionToCalculate.length !== 0) {
        actionToCalculate.splice(+actionToCalculate.length - 1, 1)
        operatorActive = false
    }

    console.log(numberToParse, 'na gurze');
    numberToParse.splice(+numberToParse.length - 1, 1)
    console.log(numberToParse, 'na dole');
    view()
}
