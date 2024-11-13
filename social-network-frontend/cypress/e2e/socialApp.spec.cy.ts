describe('Social Network Influence data', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('should load the page and display form elements', () => {
    cy.contains('Check social influence data').should('be.visible');
    cy.get('input[placeholder="Enter person name"]').should('be.visible');
    cy.get('input[placeholder="Enter networks name"]').should('be.visible');
    cy.contains('Check unconnected people').should('be.visible');
    cy.contains('Check social influence').should('be.visible');
  });

  it('should submit the form and display unconnected people count', () => {
    cy.get('input[placeholder="Enter person name"]').type('John');
    cy.get('input[placeholder="Enter networks name"]').type('facebook');
    cy.contains('Check unconnected people').click();
    cy.contains('Unconnected people').should('be.visible');
    cy.get('p').contains('Count of Unconnected people').should('exist');
  });

});
