import { FormPage } from '../pageObject/formPage.js';
import { Hobbies, Gender, Time } from '../constants/formValues';

const form = new FormPage();

const defaultFormData = {
  username: 'Test Name',
  password: 'asdasd123xx',
  gender: Gender.Male,
  hobbies: [Hobbies.Reading, Hobbies.Music],
  time: Time.Morning,
};

describe('Form Tests', () => {

    beforeEach(() => {
    form.visit();
  });
  
    Cypress.on('uncaught:exception', () => {
    return false;
  });

  it('Submited data should be displayed on the /results page', () => {
    cy.intercept('GET', '/results').as('formResults');

    form.submitForm(defaultFormData);

    cy.get('#loading').should('be.visible');
    cy.wait('@formResults').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/results');
    cy.contains(`Greetings, ${defaultFormData.username}`).should('be.visible');

    cy.get('table').within(() => {
      cy.contains('Gender').next('td').should('contain.text', defaultFormData.gender);
      cy.contains('Hobbies').next('td').should('contain.text', defaultFormData.hobbies);
      cy.contains('Time').next('td').should('contain.text', defaultFormData.time);
    });
  });

  it('User should be able to submit a form', () => {
    cy.intercept('POST', '/submit').as('formSubmit');
    cy.intercept('GET', '/results').as('formResults');

    form.submitForm(defaultFormData);

    cy.get('#loading').should('be.visible');
    cy.wait('@formSubmit').its('response.statusCode').should('eq', 201); // Test should fail here
    cy.wait('@formResults').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/results');
    cy.get('#loading').should('not.exist');
  });

  it('User should be redirected to /results page after submitting a form', () => {
    cy.intercept('GET', '/results').as('formResults');

    form.submitForm(defaultFormData);

    cy.wait('@formResults').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/results');
  });

  it('Username field should be required', () => {
  form.checkRequired(form.usernameInput);
});

  it('Password field should be required', () => {
  form.checkRequired(form.passwordInput);
});

  it('Gender radio buttons should be required', () => {
  form.checkRequired(`#gender${Gender.Male}`);
  form.checkRequired(`#gender${Gender.Female}`);
});

  it('Time dropdown should be required', () => {
  form.checkRequired(form.timeSelect);
});

  it('User should not be able to submit a form with Username field empty', () => {
    const { username, ...formDataWithoutUsername } = defaultFormData;
    form.submitForm(formDataWithoutUsername);

    cy.get('#loading').should('be.not.visible');
    cy.url().should('not.include', '/results');
    cy.get('h1.text-center').should('have.text', 'Your average form');
});

  it('User should not be able to submit a form with Password field empty', () => {
    const { password, ...formDataWithoutPassword } = defaultFormData;
    form.submitForm(formDataWithoutPassword);

    cy.get('#loading').should('be.not.visible');
    cy.url().should('not.include', '/results');
    cy.get('h1.text-center').should('have.text', 'Your average form');
});

  it('User should not be able to submit a form with Time field empty', () => {
    const { time, ...formDataWithoutTime } = defaultFormData;
    form.submitForm(formDataWithoutTime);

    cy.get('#loading').should('be.not.visible');
    cy.url().should('not.include', '/results');
    cy.get('h1.text-center').should('have.text', 'Your average form');
});

  it('User should  be able to submit a form without any Hobbies selected', () => {
    cy.intercept('GET', '/results').as('formResults');

    const { hobbies, ...formDataWithoutHobbies } = defaultFormData;
    form.submitForm(formDataWithoutHobbies);
    
    cy.get('#loading').should('be.visible');
    cy.wait('@formResults').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/results');
    cy.get('#loading').should('not.exist');
});

  it('Loading should be visible after user summits the form', () => {
    form.submitForm(defaultFormData);
    cy.get('#loading').should('be.visible');
});

});
