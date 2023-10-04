const themeBtn = document.querySelector(".operatorTheme");
const bodyCalculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");
const light = document.querySelector(".light");
const dark = document.querySelector(".dark");
const clearAll = document.querySelector(".clearAll");
const squared = document.querySelector(".operatorSquared");
const decimal = document.querySelector(".decimal");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const multiplication = document.querySelector("#multiplication");
const divide = document.querySelector("#divide");
const equal = document.querySelector(".equal-sign");
light.classList.remove("disableLightMode");
let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
updateDisplay();
function updateDisplay() {
  display.value = displayValue;
}

themeBtn.addEventListener("click", function () {
  if (light.classList.contains("disableLightMode")) {
    light.classList.remove("disableLightMode");
    dark.classList.add("disableDarkMode");
    bodyCalculator.style = "background-color: #2e2e2e;";
  } else {
    dark.classList.remove("disableDarkMode");
    light.classList.add("disableLightMode");
    bodyCalculator.style = "background-color: #fff;";
  }
});

keys.addEventListener("click", function (e) {
  const element = e.target;
  const value = element.value;
  if (!element.matches("button")) return;
  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal();
      break;
    case "clearAll":
      allClear();
      break;
    case "operatorSquared":
      squaredResult();
      updateDisplay();
      break;
    case "operatorTheme":
      break;
    default:
      inputNumber(element.value);
  }
  updateDisplay();

  if (element.classList.contains("delete")) {
    deleteLast();
    updateDisplay();
    return;
  }
});

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    displayValue = `${parseFloat(result.toFixed(10))}`;
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
}

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }

  return second;
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function allClear() {
  displayValue = "0";
}

function deleteLast() {
    if(displayValue.length === 1 || displayValue === 0){
        displayValue = 0
    }else{
        displayValue = displayValue.slice(0, displayValue.length - 1);
    }
}

function squaredResult() {
  displayValue = displayValue * displayValue;
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
