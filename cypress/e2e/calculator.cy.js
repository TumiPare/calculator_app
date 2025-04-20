describe('Hexadecimal Calculator Numpad Input', () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  it('should insert correct values into the input when numpad buttons are clicked', () => {
    cy.get('button').contains('0').click();
    cy.get('button').contains('A').click();
    cy.get('button').contains('+').click();
    cy.get('button').contains('F').click();
    cy.get('button').contains('*').click();
    cy.get('button').contains('2').click();

    cy.get('#expression').should('have.value', '0A+F*2');
  });

  it('should allow multiple consecutive operator and number inputs', () => {
    const buttons = ['1','2','3','4','5','6','7','8','9','B','D','E'];
    buttons.forEach(char => {
      cy.get('button').contains(char).click();
    });

    cy.get('#expression').should('have.value', '123456789BDE');
  });

  it('should insert operators correctly', () => {
    const operators = ['+', '-', '*', '/'];
    operators.forEach(op => {
      cy.get('button').contains(op).click();
    });

    cy.get('#expression').should('have.value', '+-*/');
  });

  it('should clear the expression when Clear button is clicked', () => {
    cy.get('button').contains('A').click();
    cy.get('button').contains('+').click();
    cy.get('button').contains('5').click();

    cy.get('#expression').should('have.value', 'A+5');

    cy.get('button').contains('Clear').click();

    cy.get('#expression').should('have.value', '');

    cy.get('#result').should('have.text', '');
  });

  it('should delete the last character when Backspace (⌫) button is clicked', () => {
    cy.get('button').contains('B').click();
    cy.get('button').contains('*').click();
    cy.get('button').contains('2').click();

    cy.get('#expression').should('have.value', 'B*2');

    cy.get('button').contains('⌫').click();

    cy.get('#expression').should('have.value', 'B*');

    cy.get('button').contains('⌫').click();

    cy.get('#expression').should('have.value', 'B');

    cy.get('button').contains('⌫').click();

    cy.get('#expression').should('have.value', '');
  });

});

describe('Hexadecimal Calculator (Expression)', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  it('evaluates addition expression', () => {
    cy.get('#expression').type('0A+05+01');
    cy.contains('Calculate').click();
    cy.get('#result').should('contain', '10');
  });

  it('evaluates subtraction expression', () => {
    cy.get('#expression').type('0F-0A');
    cy.contains('Calculate').click();
    cy.get('#result').should('contain', '5');
  });

  it('shows error for negative subtraction result', () => {
    cy.get('#expression').type('05-0A');
    cy.contains('Calculate').click();
    cy.get('#result').should('contain', 'Negative results not supported');
  });

  it('evaluates multiplication expression', () => {
    cy.get('#expression').type('02*03*02');
    cy.contains('Calculate').click();
    cy.get('#result').should('contain', 'C');
  });

  it('prevents division by zero', () => {
    cy.get('#expression').type('10/00');
    cy.contains('Calculate').click();
    cy.get('#result').should('contain', 'division by zero');
  });

  it('evaluates division expression (integer division)', () => {
    cy.get('#expression').type('20/02/02');
    cy.contains('Calculate').click();
    cy.get('#result').should('contain', '8');
  });

  it('shows error for invalid hex input', () => {
    cy.get('#expression').type('ZZ+02');
    cy.contains('Calculate').click();
    cy.get('#result').should('contain', 'Invalid hex number');
  });

  it('shows error for invalid expression format', () => {
    cy.get('#expression').type('0A++05');
    cy.contains('Calculate').click();
    cy.get('#result').should('contain', 'Invalid hex number');
  });
});
