// https://docs.cypress.io/api/introduction/api.html

describe('Test Logistics Page', () => {
  it('visits logistics trucks tab', () => {
    cy.intercept('GET', '/trucks', { fixture: 'trucks.json' }).as('getTrucks')
    cy.intercept('GET', '/routes', { fixture: 'routes.json' }).as('getRoutes')
    cy.visit('http://localhost:8081/#/logistics')
    cy.wait(1000)
    cy.contains('Logistics')
    cy.wait(['@getTrucks', '@getRoutes'], { timeout: 10000 })
    cy.contains('.p-datatable-tbody > tr','AA-02-AM')
    cy.contains('.p-datatable-tbody > tr','IT-47-TH')
    cy.contains('.p-datatable-tbody > tr','GF-11-AM')
  })
})