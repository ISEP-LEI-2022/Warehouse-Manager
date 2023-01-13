describe('New Storage', () => {
  it('Validate text button', () => {
      cy.visit('http://localhost:8081/#/storage')
      cy.wait(1000);
      cy.contains('Storage')
    })
    it('Validate view elements', () => {
      //cy.viewport(1500, 800)
      cy.contains('Storages')
      cy.contains('Deliveries')
    })

    // it('Enviar mensagem para desafio', () => {
    //   // cy.get('mat-expansion-panel-header > span > mat-panel-description > mat-icon').click()
    //   cy.wait(3000)
    //   //cy.get('div[class="row p-2"] > mat-radio-button >label > span > input[id="mat-radio-2-input"]').check()
    //   // cy.get('label').should('have.class', 'mat-radio-label').first().click({force : true})
    //   cy.get('div[aria-labelledby*="0_header"]  button[class="p-button p-component"]').click()
    //   //ver se o container apareceu
    //   cy.contains('Add new Storage')
    //   cy.wait(3000)
    //   cy.get('input#Designation').type('Designacao teste')
    //   cy.get('input#Latitude').type('2')
    //   cy.get('input#Longitude').type('2')
    //   cy.get('input#Altitude').type('2')
    //   cy.get('input#Street').type('Street 2')
    //   cy.get('input#Door').type('2')
    //   cy.get('input#Floor').type('2')
    //   cy.get('input#PostalCode').type('2')
    //   cy.get('input#Name').type('Name teste')

    //   cy.get('div.p-dialog-footer button').click()
    //   // cy.wait(3000)
    //   // cy.get('mat-dialog-container button > span').contains('Submeter').click()
      
    // })


})