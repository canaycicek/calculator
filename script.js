const themeBtn = document.querySelector(".operatorTheme")
const bodyCalculator = document.querySelector(".calculator")
const display = document.querySelector(".calculator-input")
const keys = document.querySelector(".calculator-keys")
const light = document.querySelector(".light")
const dark = document.querySelector(".dark")
const clearAll = document.querySelector(".clearAll")
const squared = document.querySelector(".operatorSquared")
const decimal = document.querySelector(".decimal")
const plus = document.querySelector("#plus")
const minus = document.querySelector("#minus")
const multiplication = document.querySelector("#multiplication")
const divide = document.querySelector("#divide")
const equal = document.querySelector(".equal-sign")
light.classList.remove("disableLightMode")
let displayValue = "0"
let firstValue = null
let operator = null
let waitingForSecondValue = false 
updateDisplay()
function updateDisplay() {
    display.value = displayValue;
}

themeBtn.addEventListener("click", function(){
    if(light.classList.contains("disableLightMode")){
        light.classList.remove("disableLightMode")
        dark.classList.add("disableDarkMode")
        bodyCalculator.style = "background-color: #2e2e2e;"
    }else{
        dark.classList.remove("disableDarkMode")
        light.classList.add("disableLightMode")
        bodyCalculator.style = "background-color: #fff;"
    }
})

keys.addEventListener("click", function(e){
    const element = e.target
    if(!element.matches("button")) return 

    if(element.classList.contains("operator")){
        // console.log("operator", element.value);
        handleOperator(element.value)
        updateDisplay()
        return
    }

    if(element.classList.contains("decimal")){
        // console.log("decimal", element.value);
        inputDecimal()
        updateDisplay()
        return
    }

    if(element.classList.contains("clearAll")){
        // console.log("clearAll", element.value);
        allClear()
        updateDisplay()
        return
    }

    if(element.classList.contains("delete")){
        // console.log("delete", element.value);
        deleteLast()
        updateDisplay()
        return
    }

    if(element.classList.contains("operatorSquared")){
        // console.log("operatorSquared", element.value);
        squaredResult()
        updateDisplay()
        return
    }

    if(element.classList.contains("operatorTheme")){
        console.log("operatorTheme", element.value);
        
        return
    }
    // console.log("number", element.value);
    inputNumber(element.value)
    updateDisplay()
})

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue)

    if(operator && waitingForSecondValue){
        operator = nextOperator
        return
    }

    if(firstValue === null){
        firstValue = value
    }else if(operator){
        const result = calculate(firstValue, value, operator)

        displayValue = `${parseFloat(result.toFixed(10))}`
        firstValue = result
    }

    waitingForSecondValue = true
    operator = nextOperator

    console.log(displayValue, firstValue,  operator, waitingForSecondValue);
}

function inputNumber(num) {
    if(waitingForSecondValue){
        displayValue = num
        waitingForSecondValue = false
    }else{
        displayValue = displayValue === "0" ? num : displayValue + num
    }

    console.log(displayValue, firstValue,  operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
    if(operator === "+"){
        return first + second
    }else if(operator === "-"){
        return first - second
    }else if(operator === "*"){
        return first * second
    }else if(operator === "/"){
        return first / second
    }

    return second
}

function inputDecimal() {
    if(!displayValue.includes(".")){
        displayValue += "."
    }
}

function allClear() {
    displayValue = "0"
}

// function deleteLast() {
//     console.log(displayValue.slice(-1)); 
// }

function squaredResult() {
    displayValue = displayValue * displayValue
}

// decimal.addEventListener("click", function(){
//     if(!displayValue.includes(".")){
//         displayValue = displayValue + "."
//     }
// })

// plus.addEventListener("click", function(){
//     displayValue = displayValue + "+"
//     equal-sign.addEventListener("click", function(){
        
//     })
// })

// clearAll.addEventListener("click", function(){
//     displayValue = 0
// })

// squared.addEventListener("click", function(){
//     displayValue = displayValue*displayValue
//     updateDisplay()
// })