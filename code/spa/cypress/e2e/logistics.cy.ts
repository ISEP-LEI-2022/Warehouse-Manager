// https://docs.cypress.io/api/introduction/api.html

describe('Test Logistics Page', () => {
  it('visits logistics trucks tab', () => {
    cy.intercept('GET', '/trucks', { fixture: 'trucks.json' }).as('getTrucks')
    cy.intercept('GET', '/routes', { fixture: 'routes.json' }).as('getRoutes')
    cy.visit('/uikit/logistics')
    cy.contains('.p-datatable-tbody > tr','AA-02-AM')
    cy.contains('.p-datatable-tbody > tr','IT-47-TH')
    cy.contains('.p-datatable-tbody > tr','GF-11-AM')
  })
})
