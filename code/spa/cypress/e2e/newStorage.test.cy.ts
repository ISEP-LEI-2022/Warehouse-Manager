describe('New Storage', () => {
  it('Validate text button', () => {
      cy.visit('http://localhost:8081/#/uikit/storage')
      //cy.viewport(1500, 800)
      cy.wait(1000);
      cy.contains('Storage')
    })
    it('Validate view elements', () => {
      //cy.viewport(1500, 800)
      cy.contains('Storages')
      cy.contains('Deliveries')
    })

    it('Enviar mensagem para desafio', () => {
      // cy.get('mat-expansion-panel-header > span > mat-panel-description > mat-icon').click()
      cy.wait(3000)
      //cy.get('div[class="row p-2"] > mat-radio-button >label > span > input[id="mat-radio-2-input"]').check()
      // cy.get('label').should('have.class', 'mat-radio-label').first().click({force : true})
      cy.get('div[aria-labelledby*="0_header"]  button[class="p-button p-component"]').click()
      //ver se o container apareceu
      cy.contains('Add new Storage')
      cy.wait(3000)
      cy.get('input#Designation').type('Designacao teste')
      cy.get('input#Latitude').type('Latitude teste')
      cy.get('input#Longitude').type('Longitude teste')
      cy.get('input#Altitude').type('Altitude teste')
      cy.get('input#Street').type('Street teste')
      cy.get('input#Door').type('Door teste')
      cy.get('input#Floor').type('Floor teste')
      cy.get('input#PostalCode').type('Postal Code teste')
      cy.get('input#Name').type('Name teste')

      cy.get('div.p-dialog-footer button').click()
      // cy.wait(3000)
      // cy.get('mat-dialog-container button > span').contains('Submeter').click()
      
    })


})