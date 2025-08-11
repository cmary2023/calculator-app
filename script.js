let expression = '';
let displayValue = '0';
let firstOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;

const mainDisplay = document.querySelector('.display');

function updateDisplay() {
    mainDisplay.value = expression || displayValue;
}

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        if (digit === '.' && displayValue.includes('.')) return;
        if (displayValue.includes('.') && displayValue.split('.')[1].length >= 4 && digit !== '.') return;
        displayValue = (displayValue === '0' && digit !== '.') ? digit : displayValue + digit;
    }
    expression += digit;
    updateDisplay();
}

function inputDecimal() {
    if (waitingForSecondOperand) {
        displayValue = "0.";
        waitingForSecondOperand = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    expression += '.';
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (currentOperator && !waitingForSecondOperand) {
        const result = operate(currentOperator, firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = (typeof result === 'number') ? result : null;
    } else {
        firstOperand = inputValue;
    }

    currentOperator = nextOperator;
    expression += nextOperator;
    waitingForSecondOperand = true;
    updateDisplay();
}

function handleEquals() {
    if (currentOperator === null || firstOperand === null || waitingForSecondOperand) return;
    const secondOperand = parseFloat(displayValue);
    const result = operate(currentOperator, firstOperand, secondOperand);
    expression += '=' + result;
    updateDisplay();
    displayValue = String(result);
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    expression = '';
}

function backspace() {
    if (!waitingForSecondOperand && displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    if (expression.length > 0) {
        expression = expression.slice(0, -1);
    }
    updateDisplay();
}

function clearCalculator() {
    displayValue = '0';
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    expression = '';
    updateDisplay();
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? NaN : a / b; }
function roundResult(result) {
    if (typeof result !== 'number') return result;
    return Number.isInteger(result) ? result : parseFloat(result.toFixed(4));
}
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    let result;
    switch (operator) {
        case '+': result = add(a, b); break;
        case '-': result = subtract(a, b); break;
        case '*': result = multiply(a, b); break;
        case '/': result = divide(a, b); break;
        default: return b;
    }
    return isNaN(result) ? "Cannot divide by zero!" : roundResult(result);
}

document.querySelectorAll('.btn.digit').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === '.') inputDecimal();
        else inputDigit(value);
    });
});
document.querySelectorAll('.btn.operator').forEach(button => {
    button.addEventListener('click', () => {
        const symbol = button.textContent;
        const normalized = (symbol === 'x' || symbol === 'X') ? '*' : symbol;
        handleOperator(normalized);
    });
});
document.querySelector('.btn.equal').addEventListener('click', handleEquals);
document.querySelector('.btn.action').addEventListener('click', clearCalculator);

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) && key !== ' ') inputDigit(key);
    if (key === '.') inputDecimal();
    if (['+', '-', '*', '/'].includes(key)) handleOperator(key);
    if (key === '=' || key === 'Enter') { event.preventDefault(); handleEquals(); }
    if (key === 'Backspace') backspace();
    if (key === 'Escape' || key === 'Delete') clearCalculator();
});

updateDisplay();
