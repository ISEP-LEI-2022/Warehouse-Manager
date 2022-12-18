// https://docs.cypress.io/api/introduction/api.html

describe('Test Home Page', () => {
  it('visits the app root url', () => {

    cy.intercept('GET', '/trucks', { fixture: 'trucks.json' }).as('getTrucks')
    cy.visit('/logistics')
    cy.wait(['@getTrucks'])
    cy.contains('.layout-menuitem-text', 'Dashboard')
    cy.contains('.p-datatable-tbody > tr','AA-02-AM')
    cy.contains('.p-datatable-tbody > tr','IT-47-TH')
    cy.contains('.p-datatable-tbody > tr','GF-11-AM')
  })
})
