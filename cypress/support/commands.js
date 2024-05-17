// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/index.js

import pageObject from './pageObject';
import { faker } from '@faker-js/faker';

const page = new pageObject;

Cypress.Commands.add('getByDataCy', (selector) => {
    cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('exploreForm', () => {
    cy.visit('/')

    cy.getByDataCy('formName').should('exist');

    cy.getByDataCy('usernameField').should('exist');
    cy.getByDataCy('passwordField').should('exist');

    cy.getByDataCy('gender').should('exist');
    cy.getByDataCy('Male').should('exist');
    cy.getByDataCy('Female').should('exist');

    cy.getByDataCy('hobbies').should('exist');
    cy.getByDataCy('reading').should('exist');
    cy.getByDataCy('readingCheckbox').should('exist');
    cy.getByDataCy('sports').should('exist');
    cy.getByDataCy('sportsCheckbox').should('exist');
    cy.getByDataCy('music').should('exist');
    cy.getByDataCy('musicCheckbox').should('exist');

    cy.getByDataCy('timeDropdown').should('exist');
});

Cypress.Commands.add('sendAverageForm', (username = faker.internet.userName(), password = faker.internet.password()) => {
    page.typeUsername(username);
    page.typePassword(password);

    page.selectRandomGender();
    page.selectRandomCheckboxes();
    page.selectRandomTime();

    page.clickSubmitButton();
    cy.getByDataCy('loading').should('exist');
});

Cypress.Commands.add('requiredFieldsOnly', (username = faker.internet.userName(), password = faker.internet.password()) => {
    page.typeUsername(username);
    page.typePassword(password);

    page.selectRandomGender();
    page.selectRandomTime();

    page.clickSubmitButton();
});


Cypress.Commands.add('emptyForm', () => {
    page.clickSubmitButton();
});

Cypress.Commands.add('emptyUsername', (password = faker.internet.password()) => {
    page.typePassword(password);

    page.selectRandomGender();
    page.selectRandomCheckboxes();
    page.selectRandomTime();

    page.clickSubmitButton();
});

Cypress.Commands.add('emptyPassword', (username = faker.internet.userName()) => {
    page.typeUsername(username);

    page.selectRandomGender();
    page.selectRandomCheckboxes();
    page.selectRandomTime();

    page.clickSubmitButton();
});

Cypress.Commands.add('withoutGender', (username = faker.internet.userName(), password = faker.internet.password()) => {
    page.typeUsername(username);
    page.typePassword(password);

    page.selectRandomCheckboxes();
    page.selectRandomTime();

    page.clickSubmitButton();
});

Cypress.Commands.add('withoutTime', (username = faker.internet.userName(), password = faker.internet.password()) => {
    page.typeUsername(username);
    page.typePassword(password);

    page.selectRandomGender();
    page.selectRandomCheckboxes();

    page.clickSubmitButton();
});