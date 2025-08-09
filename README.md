# 🧮 Digitron Calculator

A simple, stylish calculator built with **HTML**, **CSS**, and **JavaScript**.  
Supports basic arithmetic operations, decimal input, keyboard control, and more.

---

## ✨ Features

- **Basic Math Operations**: Addition, subtraction, multiplication, division.
- **Chained Calculations**: Perform continuous operations without pressing `=`.
- **Decimal Support**: Add decimal numbers with the `.` button (only one decimal per number).
- **Backspace Button**: Remove the last digit if you make a mistake.
- **Clear Button (AC)**: Reset the calculator completely.
- **Keyboard Support**: Use your keyboard for digits, operators, and Enter/Backspace.
- **Division by Zero Protection**: Displays a snarky error message instead of crashing.
- **Rounded Results**: Long decimals are rounded to avoid overflow.

---

## 🖼 Preview

![Calculator Preview](screenshot.png)

---

## ⚙️ How It Works

1. **HTML** defines the calculator layout and buttons.
2. **CSS Grid** arranges buttons into a clean, responsive layout.
3. **JavaScript**:
   - Stores the first number, operator, and second number.
   - Calculates result when an operator or `=` is pressed.
   - Updates display after each action.
   - Prevents multiple decimals in one number.
   - Handles keyboard events for faster input.

---

## ⌨️ Keyboard Shortcuts

| Key       | Action                 |
|-----------|------------------------|
| 0–9       | Enter digits           |
| + - * /   | Operators              |
| .         | Decimal point          |
| Enter / = | Equals                 |
| Backspace | Delete last digit      |
| Escape    | Clear (AC)             |

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/digitron-calculator.git
