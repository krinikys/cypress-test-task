export class FormPage {
  constructor() {
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.genderMale = '#genderMale';
    this.genderFemale = '#genderFemale';
    this.hobbies = 'input[name="hobby"]';
    this.timeSelect = '#time';
    this.submitButton = 'button[type="submit"]';
    this.loadingOverlay = '#loading';
  }

  visit() {
    cy.visit('http://localhost:3000');
  }

  typeUsername(name) {
    cy.get(this.usernameInput).type(name);
  }

  typePassword(password) {
    cy.get(this.passwordInput).type(password);
  }

  selectGender(gender) {
    if (gender === 'Male') cy.get(this.genderMale).check();
    else cy.get(this.genderFemale).check();
  }

  selectHobby(hobby) {
    cy.get(this.hobbies).check(hobby);
  }

  selectTime(time) {
    cy.get(this.timeSelect).select(time);
  }

  submit() {
    cy.get(this.submitButton).click();
  }

  checkRequired(selector) {
    cy.get(selector).should('have.attr', 'required');
  }

submitForm(formData = {}) {
  formData.username && this.typeUsername(formData.username);
  formData.password && this.typePassword(formData.password);
  formData.gender && this.selectGender(formData.gender);
  formData.hobbies?.forEach(hobby => this.selectHobby(hobby));
  formData.time && this.selectTime(formData.time);
  this.submit();
}
}
