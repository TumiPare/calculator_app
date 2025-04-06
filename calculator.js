function add(a, b) {
    validateInputs(a,b);
    return a + b;
}

function subtract(a, b) {
    validateInputs(a,b);
    if(a < b) throw new Error("negative results not supported");
    return a - b;
}

function multiply(a, b) {
    validateInputs(a,b);
    return a * b;
}

function divide(a, b) {
    validateInputs(a,b);
    if(b === 0) throw new Error("division by zero");
    return Math.floor(a / b);
}

function validateInputs(a, b){
    validateHex(a);
    validateHex(b);
}

function validateHex(hex) {
    //to accept any value that is 0xFF or less
    if(hex > 0xFF) throw new Error("input must be less than 2 digits");
}

module.exports = {
    add,
    subtract,
    multiply,
    divide
}
