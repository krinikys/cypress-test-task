// put your tests here
it('It should load the homepage', () => {
  cy.visit('/').title().should('eq', 'Your average form');
  cy.get('h1').should('contain', 'Your average form');
});