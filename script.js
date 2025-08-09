// Math operation functions
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
    if (b === 0) {
        return "Nice try, Einstein… you can’t divide by zero!";
    }
    return a / b;
}

// Main operation handler
function operate(operator, a, b) {
    a = parseFloat(a);// Ensure a is a number
    b = parseFloat(b);

    let result;

    switch (operator) {
        case '+': result = add(a, b); break;
        case '-': result = subtract(a, b); break;
        case '*': result = multiply(a, b); break;
        case '/': result = divide(a, b); break;
        default: return b;
    }

    return roundResult(result);// Ensure result is rounded
}

// Function to round results
function roundResult(result) {
    if (typeof result !== 'number') return result;

    // If it's an integer, return it as-is
    if (Number.isInteger(result)) return result;

    // Otherwise, round to 6 decimal places
    return parseFloat(result.toFixed(6));
}

// Calculator state
let displayValue = '0';
let firstOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;//
let expression = ''; //  to track the full operation

const display = document.querySelector('.display');// Display element

// Function to update the display
function updateDisplay() {
    display.value = displayValue;
}

// Function to handle digit input
function inputDigit(digit) {
    // If waiting for second operand, replace display value
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        // If the digit is a decimal point and displayValue already has one, return
        if (digit === '.' && displayValue.includes('.')) return;
        displayValue = (displayValue === '0' && digit !== '.') ? digit : displayValue + digit;// If display is '0', replace it with the digit
    }
    expression += digit; // to track the expression(6+2=8)
    updateDisplay();
}

//decimal input handling
function inputDecimal() {
    if (waitingForSecondOperand) {
        displayValue = "0.";
        waitingForSecondOperand = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
    updateDecimalButton();
}

//decimal button handling
function updateDecimalButton() {
    const decimalBtn = document.querySelector('.btn.digit[data-decimal]');
    if (displayValue.includes('.')) {
        decimalBtn.disabled = true;// Disable if there's already a decimal
    } else {
        decimalBtn.disabled = false;
    }
}

// Function to handle operator input
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (currentOperator && !waitingForSecondOperand) {
        // Evaluate the last operation before storing the new operator
        const result = operate(currentOperator, firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = result;
        updateDisplay();
    } else {
        firstOperand = inputValue;
    }

    expression += nextOperator; // to track the expression
    display.value = expression; // Show the full operation
    currentOperator = nextOperator;
    waitingForSecondOperand = true;
}

// Function to handle equals button
function handleEquals() {
    // If there's no operator, no first operand, or we're still waiting for a second operand, do nothing
    if (currentOperator === null || firstOperand === null || waitingForSecondOperand) {
        return;
    }

    const secondOperand = parseFloat(displayValue);
    const result = operate(currentOperator, firstOperand, secondOperand);

    // Show the full expression
    expression += '=' + result;
    display.value = expression;

    // Prepare for next calculation
    displayValue = String(result);
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    expression = '';

    updateDecimalButton();
}

// Function to reset the calculator
function clearCalculator() {
    displayValue = '0';
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    expression = '';
    updateDisplay();
}

