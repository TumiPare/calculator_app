const { addHex } = require('./calculator');

describe('Hexadecimal Calculator (number inputs)', () => {
    test('adds two hex numbers', () => {
        expect(addHex(0xA, 0x5)).toBe(0xF);
        // expect(addHex(0xFF, 0x1)).toBe(0x100);
    });
});
