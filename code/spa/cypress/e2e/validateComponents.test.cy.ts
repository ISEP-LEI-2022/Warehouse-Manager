describe('Validate dashboard components', () => {
    it('Dashboard exists', () => {
      cy.visit("http://localhost:8081/")
      cy.wait(1000);
      cy.contains('Dashboard')
    })
    it('Dashboard components exist', () => {
      cy.contains('Trucks')
      cy.contains('Routes')
      cy.contains('Deliveries')
      cy.contains('Storages')
    })
    it('Logistics exists', () => {
      cy.visit("http://localhost:8081/#/uikit/logistics")
      cy.wait(1000);
      cy.contains('Logistics')
    })
    it('Logistics components exist', () => {
      cy.contains('Trucks')
      cy.contains('Routes')
    })
    it('Storage exists', () => {
      cy.visit("http://localhost:8081/#/uikit/storage")
      cy.wait(1000);
      cy.contains('Logistics')
    })
    it('Storage components exist', () => {
      cy.contains('Deliveries')
      cy.contains('Storages')
    })
  })
