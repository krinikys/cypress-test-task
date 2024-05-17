import { faker } from '@faker-js/faker';

const username = faker.internet.userName;
const password = faker.internet.password;

class pageObject {

    get formName() {
        return cy.getByDataCy('formName');
    }

    get username() {
        return cy.getByDataCy('userName');
    }

    get usernameField() {
        return cy.getByDataCy('usernameField');
    }

    get password() {
        return cy.getByDataCy('passWord');
    }

    get passwordField() {
        return cy.getByDataCy('passwordField');
    }

    get gender() {
        return cy.getByDataCy('gender');
    }

    get maleRadioButton() {
        return cy.getByDataCy('genderMale');
    }

    get maleOption() {
        return cy.getByDataCy('Male');
    }

    get femaleRadioButton() {
        return cy.getByDataCy('genderFemale');
    }

    get femaleOption() {
        return cy.getByDataCy('Female');
    }

    get hobbiesBlock() {
        return cy.getByDataCy('hobbies');
    }

    get hobbyColumn() {
        return cy.getByDataCy('hobby');
    }

    get selectColumn() {
        return cy.getByDataCy('select');
    }

    get reading() {
        return cy.getByDataCy('reading');
    }

    get readingCheckbox() {
        return cy.getByDataCy('readingCheckbox');
    }

    get sports() {
        return cy.getByDataCy('sports');
    }

    get sportsCheckbox() {
        return cy.getByDataCy('sportsCheckbox');
    }

    get music() {
        return cy.getByDataCy('music');
    }

    get musicCheckbox() {
        return cy.getByDataCy('musicCheckbox');
    }

    get time() {
        return cy.getByDataCy('time');
    }

    get timeDropdown() {
        return cy.getByDataCy('timeDropdown');
    }

    get selectTimeOption() {
        return cy.getByDataCy('selectTime');
    }

    get morningOption() {
        return cy.getByDataCy('morning');
    }

    get noonOption() {
        return cy.getByDataCy('noon');
    }

    get eveningOption() {
        return cy.getByDataCy('evening');
    }

    get submitButton() {
        return cy.getByDataCy('submitButton');
    }

    get loadingScreen() {
        return cy.getByDataCy('loading');
    }

    get greetings() {
        return cy.getByDataCy('greetings');
    }

    get selectedGender() {
        return cy.getByDataCy('selectedGender');
    }

    get selectedHobbies() {
        return cy.getByDataCy('selectedHobbies');
    }

    get selectedTime() {
        return cy.getByDataCy('selectedTime');
    }

    typeUsername(username) {
        this.usernameField
          .type(username);
    }

    typePassword(password) {
        this.passwordField
          .type(password);
    }

    clickMale() {
        this.maleRadioButton
          .click();
    }

    clickFemale() {
        this.femaleRadioButton
          .click();
    }

    checkReading() {
        this.readingCheckbox
          .click();
    }

    checkSports() {
        this.sportsCheckbox
          .click();
    }

    checkMusic() {
        this.musicCheckbox
         .click();
    }

    selectTime() {
        this.timeDropdown
          .select('Select a time');
    }

    selectMorning() {
        this.timeDropdown
          .select('Morning');
    }

    selectNoon() {
        this.timeDropdown
          .select('Noon');
    }

    selectEvening() {
        this.timeDropdown
          .select('Evening');
    }

    clickSubmitButton() {
        this.submitButton
          .click();
    }

    constructor() {
        this.someHobbies = '';
    }

    selectRandomGender() {
        const randomGender = faker.helpers.arrayElement(['Male', 'Female']);
        cy.getByDataCy(randomGender).click();
        return randomGender;
    }
    
    selectRandomCheckboxes() {
        const someHobbies = [];
        cy.get('[type="checkbox"]').then($checkboxes => {
            $checkboxes.each((index, randomHobbies) => {
                const randomState = Math.round(Math.random());
                if (randomState === 1) {
                    cy.wrap(randomHobbies).check();
                    someHobbies.push(randomHobbies);
                } else {
                    cy.wrap(randomHobbies).uncheck();
                }
            });
        });
        return someHobbies.join(', ');
    }
    
    selectRandomTime() {
        const randomTime = faker.helpers.arrayElement(['Morning', 'Noon', 'Evening']);
        cy.getByDataCy('timeDropdown').select(randomTime);
        return randomTime; 
    }

    assertGreetings(username) {
        this.greetings
          .should('contain', username);
    }

    assertGender(randomGender) {
        this.selectedGender
          .should('contain', randomGender);
    }

    assertHobbies(someHobbies) {
        this.selectedHobbies
          .should('contain', someHobbies);
    }

    assertTime(randomTime) {
        this.selectedTime
          .should('contain', randomTime);
    }

    assertNegativeOption() {
        this.formName
          .should('contain', `Your average form`);
    }
}

export default pageObject;