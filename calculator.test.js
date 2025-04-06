const {add, subtract, multiply, divide} = require("./calculator");

test("addition of 1 and 2 should be 3", () => {
    expect(add(0x01,0x02)).toBe(0x03);
})

test("should not allow the addition of 0x01 and 0x1234", () =>{
    expect(() => add(0x01,0x1234)).toThrow(/input must be less than 2 digits/);
})

test("subtraction of 3 and 2 should be 1", () => {
    expect(subtract(0x03,0x02)).toBe(0x01);
})

test("multiplication of 2 and 2 should be 4", () => {
    expect(multiply(0x02,0x02)).toBe(0x04);
})

test("division of 4 and 2 should be 2", () => {
    expect(divide(0x04,0x02)).toBe(0x02);
})

test("subtraction should not give us a negative result", () =>{
    expect(() => subtract(0x03,0x05)).toThrow(/negative results not supported/);
})

test ("should display error message on division by zero", () => {
    expect(() => divide(0x02, 0x0)).toThrow(/division by zero/);
})

test("division should only give you integer values", () => {
    expect(divide(0x08,0x03 )  ).toBe(0x02);
})

//0xFF + 0xFF < 0xFF * 0xFF

test("should only return 4 digits of output", () => {
    expect(multiply(0xFF, 0xFF)).toBe(0xFE01);
    expect(() => add(0x01,0x1234)).toThrow(/input must be less than 2 digits/);
})
