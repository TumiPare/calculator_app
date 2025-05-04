export function add(a, b) {
    validateInputs(a,b);
    return a + b;
}

export function subtract(a, b) {
    validateInputs(a,b);
    if(a < b) throw new Error("Negative results not supported");
    return a - b;
}

export function multiply(a, b) {
    validateInputs(a,b);
    return a * b;
}

export function divide(a, b) {
    validateInputs(a,b);
    if(b === 0) throw new Error("division by zero");
    return Math.floor(a / b);
}

export function validateInputs(a, b){
    validateHex(a);
    validateHex(b);
}

export function validateHex(hex) {
    //to accept any value that is 0xFF or less
    if(hex > 0xFF) throw new Error("input must be less than 2 digits");
}

export function evaluateExpression() {
    const expr = document.getElementById('expression').value.trim();
    const resultDiv = document.getElementById('result');
    try {
        const result = calculateFromExpression(expr);
        resultDiv.textContent = "Result: " + result.toString(16).toUpperCase();
    } catch (e) {
        resultDiv.textContent = e.message;
    }
}

function calculateFromExpression(expr) {
    const operators = ['+', '-', '*', '/'];
    let currentOp = null;
    let tokens = expr.split(/([+\-*/])/);
    if (tokens.length < 3) throw new Error("Invalid expression");

    let result = parseInt(tokens[0], 16);
    if (isNaN(result)) throw new Error("Invalid hex number: " + tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        const op = tokens[i];
        const nextValue = parseInt(tokens[i + 1], 16);

        if (isNaN(nextValue)) throw new Error("Invalid hex number: " + tokens[i + 1]);

        switch (op) {
            case '+':
                result = add(result, nextValue);
                break;
            case '-':
                result = subtract(result, nextValue);
                break;
            case '*':
                result = multiply(result, nextValue);
                break;
            case '/':
                result = divide(result, nextValue);
                break;
            default:
                throw new Error("Unsupported operator: " + op);
        }
    }

    if (result < 0) throw new Error("Negative results not allowed");
    if (result > 0xFFFF) throw new Error("Result exceeds 4 hex digits (FFFF)");

    return result;
}
