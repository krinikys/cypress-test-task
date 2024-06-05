// put your tests here
describe('TestsDevBak', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  const UserEmail = 'DevbakTestVR@gmail.com'
  const UserPassword = '123Dev'

  it('Test fields Positive', () => {
    cy.visit('http://localhost:3000/')
// Check fill fields
    cy.get('#username').type(UserEmail)
    cy.get('#password').type(UserPassword)
//Raio box check
    cy.get('#genderMale').check().should('be.checked');
    cy.get('#genderFemale').should('not.be.checked');

    cy.get('#genderFemale').check().should('be.checked');
    cy.get('#genderMale').should('not.be.checked');
// Checkbox check
    cy.get(':nth-child(1) > :nth-child(2) > .form-check-input').check().should('be.checked');
    cy.get(':nth-child(1) > :nth-child(2) > .form-check-input').uncheck().should('not.be.checked');

    cy.get(':nth-child(2) > :nth-child(2) > .form-check-input').check().should('be.checked');
    cy.get(':nth-child(2) > :nth-child(2) > .form-check-input').uncheck().should('not.be.checked');

    cy.get(':nth-child(3) > :nth-child(2) > .form-check-input').check().should('be.checked');
    cy.get(':nth-child(3) > :nth-child(2) > .form-check-input').uncheck().should('not.be.checked');
// I will leave a few checkboxes
    cy.get(':nth-child(1) > :nth-child(2) > .form-check-input').check()
    cy.get(':nth-child(3) > :nth-child(2) > .form-check-input').check()

// Dropdown memu check
    cy.get('#time').select('Morning')
    cy.get('#time').select('Noon')
    cy.get('#time').select('Evening')
// Test accept button
    cy.get('.btn').click()
  });

  it('Test fields Negative', () => {
// Checking non-valid password field
    cy.get('#username').type ("Devdev")
    cy.get('.btn').click()
    cy.get('input:invalid').should('have.attr', 'id', 'password');
// Checking non-valid login field
    cy.get('#username').clear()
    cy.get('#password').type ("Devdev")
    cy.get('.btn').click()
    cy.get('input:invalid').should('have.attr', 'id', 'username');

// Checking non-valid radio
    cy.get('#username').type ("Devdev")
    cy.get('.btn').click()
    cy.get('input[type="radio"]:invalid').should('exist');

// Checking non-valid dropdown menu
    cy.get('#genderMale').check().should('be.checked');
    cy.get('#time').select('');
    cy.get('.btn').click()
    cy.get('select:invalid').should('have.attr', 'id', 'time');

// required fields ends
  });

  it('Test for text in blocks', () => {
    cy.get('h1.text-center').should ('contain.text', "Your average form")
    cy.get(':nth-child(1) > label').should ('contain.text', "Username")
    cy.get(':nth-child(2) > label').should ('contain.text', "Password")
    cy.get('#average-form > :nth-child(3)').should ('contain.text', "Gender")
    cy.get(':nth-child(3) > .form-check-label').should ('contain.text', "Male")
    cy.get(':nth-child(4) > .form-check-label').should ('contain.text', "Female")
    cy.get('#average-form > :nth-child(4)').should ('contain.text', "Hobbies")
    cy.get('thead > tr > :nth-child(1)').should ('contain.text', "Hobby")
    cy.get('thead > tr > :nth-child(2)').should ('contain.text', "Select")
    cy.get('tbody > :nth-child(1) > :nth-child(1)').should ('contain.text', "Reading")
    cy.get('tbody > :nth-child(2) > :nth-child(1)').should ('contain.text', "Sports")
    cy.get('tbody > :nth-child(3) > :nth-child(1)').should ('contain.text', "Music")
    cy.get('#average-form > :nth-child(5)').should ('contain.text', "Time")
    cy.get('#time').should ('contain.text', "Select a time")
    cy.get('.btn').should ('contain.text', "Submit")
  });

  it('Test login and password fields accept wildcards and numbers', () => {
    cy.get('#username').type("!;%:?*_+1234567890-=")
    cy.get('#password').type("!;%:?*_+1234567890-=")
    cy.get('#genderMale').check().should('be.checked');
    cy.get('#genderFemale').should('not.be.checked');

    cy.get('#genderFemale').check().should('be.checked');
    cy.get('#genderMale').should('not.be.checked');

    cy.get(':nth-child(1) > :nth-child(2) > .form-check-input').check().should('be.checked');
    cy.get(':nth-child(1) > :nth-child(2) > .form-check-input').uncheck().should('not.be.checked');

    cy.get(':nth-child(2) > :nth-child(2) > .form-check-input').check().should('be.checked');
    cy.get(':nth-child(2) > :nth-child(2) > .form-check-input').uncheck().should('not.be.checked');

    cy.get(':nth-child(3) > :nth-child(2) > .form-check-input').check().should('be.checked');
    cy.get(':nth-child(3) > :nth-child(2) > .form-check-input').uncheck().should('not.be.checked');

    cy.get(':nth-child(1) > :nth-child(2) > .form-check-input').check()
    cy.get(':nth-child(3) > :nth-child(2) > .form-check-input').check()

    cy.get('#time').select('Morning')
    cy.get('#time').select('Noon')
    cy.get('#time').select('Evening')

    cy.get('.btn').click()
  });

  it('Test form for repeated entry of identical data', () => {
    cy.get('#username').type("Одинаковые")
    cy.get('#password').type("Данные")
    cy.get('#genderFemale').check().should('be.checked');
    cy.get('#genderMale').should('not.be.checked');
    cy.get('#time').select('Noon')
    cy.get('.btn').click()
    cy.visit('http://localhost:3000/results')
    cy.visit('http://localhost:3000/')
    cy.get('#username').type("Одинаковые")
    cy.get('#password').type("Данные")
    cy.get('#genderFemale').check().should('be.checked');
    cy.get('#genderMale').should('not.be.checked');
    cy.get('#time').select('Noon')
    cy.get('.btn').click()
  });

  it('You cant select two radios', () => {

    cy.get('#genderMale').check()
    cy.get('#genderFemale').check()
    cy.get('#genderMale').should('not.be.checked');

  });
});
