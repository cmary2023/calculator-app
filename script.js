// ===== Math operation functions =====
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return NaN; // keep it numeric
    return a / b;
}

// ===== Main operation handler =====
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

    if (isNaN(result)) return "Cannot divide by zero!";
    return roundResult(result);
}

// ===== Function to round results =====
function roundResult(result) {
    if (typeof result !== 'number') return result;
    if (Number.isInteger(result)) return result; // no rounding for integers
    return parseFloat(result.toFixed(4));
}

// ===== Calculator state =====
let displayValue = '0';
let firstOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;
let expression = '';

const mainDisplay = document.querySelector('.display'); // main number display
const expressionDisplay = document.querySelector('.expression-display'); // expression display

// ===== Display update =====
function updateDisplays() {
    mainDisplay.value = displayValue;
    expressionDisplay.textContent = expression;
}

// ===== Digit input handling =====
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        if (digit === '.' && displayValue.includes('.')) return;
        // Limit to 6 decimals
        if (displayValue.includes('.') && displayValue.split('.')[1].length >= 4 && digit !== '.') return;
        displayValue = (displayValue === '0' && digit !== '.') ? digit : displayValue + digit;
    }
    expression += digit;
    updateDisplays();
}

// ===== Decimal input handling =====
function inputDecimal() {
    if (waitingForSecondOperand) {
        displayValue = "0.";
        waitingForSecondOperand = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    expression += '.';
    updateDisplays();
}

// ===== Operator handling =====
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (currentOperator && !waitingForSecondOperand) {
        const result = operate(currentOperator, firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = (typeof result === 'number') ? result : null;
        updateDisplays();
    } else {
        firstOperand = inputValue;
    }

    currentOperator = nextOperator;
    expression += nextOperator;
    waitingForSecondOperand = true;
    updateDisplays();
}

// ===== Equals handling =====
function handleEquals() {
    if (currentOperator === null || firstOperand === null || waitingForSecondOperand) {
        return;
    }

    const secondOperand = parseFloat(displayValue);
    const result = operate(currentOperator, firstOperand, secondOperand);

    expression += '=' + result;
    updateDisplays();

    displayValue = String(result);
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    expression = '';
}

// ===== Backspace handling =====
function backspace() {
    if (!waitingForSecondOperand && displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    if (expression.length > 0) {
        expression = expression.slice(0, -1);
    }
    updateDisplays();
}

// ===== Clear calculator =====
function clearCalculator() {
    displayValue = '0';
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    expression = '';
    updateDisplays();
}

// ===== Event listeners =====
document.querySelectorAll('.btn.digit').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === '.') {
            inputDecimal();
        } else {
            inputDigit(value);
        }
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

// ===== Keyboard support =====
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) && key !== ' ') {
        inputDigit(key);
    }
    if (key === '.') {
        inputDecimal();
    }
    if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
    }
    if (key === '=' || key === 'Enter') {
        event.preventDefault();
        handleEquals();
    }
    if (key === 'Backspace') {
        backspace();
    }
    if (key === 'Escape' || key === 'Delete') {
        clearCalculator();
    }
});

// ===== Initial display =====
updateDisplays();
