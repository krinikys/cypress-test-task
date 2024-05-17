// put your tests here
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

import pageObject from "../support/pageObject";
import { faker } from "@faker-js/faker";

const page = new pageObject;

const averageForm = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('Explore', () => {
  it('"Your average form" webpage', () => {
    cy.exploreForm();
  });
});

describe('Positive Average Form', () => {
  let randomGender, someHobbies, randomTime;
  
  beforeEach(() => {
    cy.visit('/');

    randomGender = [];
    someHobbies = [];
    randomTime = [];
  });

  afterEach(() => {
  page.assertGreetings(averageForm.username);
  page.assertGender(randomGender);
  page.assertHobbies(someHobbies);
  page.assertTime(randomTime);
  });

  it('should be sent', () => {
    cy.sendAverageForm(averageForm.username, averageForm.password, randomGender, someHobbies, randomTime);
  });

  it('should be sent with only required fields', () => {
    cy.requiredFieldsOnly(averageForm.username, averageForm.password, randomGender, randomTime);
  });
});

describe('Negative Average Form', () => {
  let randomGender, someHobbies, randomTime;
  
  beforeEach(() => {
    cy.visit('/');

    randomGender = [];
    someHobbies = [];
    randomTime = [];
  });

  afterEach(() => {
    page.assertNegativeOption();
  });

  it('should not be sent with empty fields', () => {
    cy.emptyForm();
  });

  it('should not be sent with empty "Username" field', () => {
    cy.emptyUsername(averageForm.password, randomGender, someHobbies, randomTime);
  });

  it('should not be sent with empty "Password" field', () => {
    cy.emptyPassword(averageForm.username, randomGender, someHobbies, randomTime);
  });

  it('should not be sent without selected gender', () => {
    cy.withoutGender(averageForm.username, averageForm.password, someHobbies, randomTime);
  });

  it('should not be sent sithout selected time', () => {
    cy.withoutTime(averageForm.username, averageForm.password, randomGender, someHobbies);
  });
}); 
