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

    if (finalResult) {
        numberToParse = []

        parseFinalResultAndNum = `${finalResult}${num}`
        finalResult = +parseFinalResultAndNum
        numberToParse.push(+parseFinalResultAndNum)

        view()
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

    if (actionToCalculate.length !== 0 && actionToCalculate.some(el => ['+', '-', '/', '*', '%'].includes(el))) {
        actionToCalculate = []
    }

    convertNumberStringInToSingleNum()

    actionToCalculate = actionToCalculate.slice(0, 1)
    document.querySelector('.calc-operation').innerHTML = `${actionToCalculate.join(' ')}`
    document.querySelector('.calc-typed').innerHTML = `${operator}<span class="blink-me">_</span>`

    finalResult = null
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

    if (finalResult) {
        const test = String(finalResult).slice(0, -1)
        if (test === '') {
            finalResult = 0
            nextCalculate = false
            document.querySelector('.calc-typed').innerHTML = `<span class="blink-me">_</span>`
            return 
        }
        finalResult = +test
        document.querySelector('.calc-typed').innerHTML = `${test}<span class="blink-me">_</span>`
        return
    }

    numberToParse.splice(+numberToParse.length - 1, 1)
    view()
}
