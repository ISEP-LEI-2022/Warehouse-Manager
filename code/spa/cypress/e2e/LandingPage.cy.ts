// https://docs.cypress.io/api/introduction/api.html

describe('Find Warehouse landing page', () => {
  it('visits the app root url', () => {
    cy.visit("http://localhost:8081/")
    cy.wait(1000);
    cy.contains('Warehouse Manager')
  })
})


