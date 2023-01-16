describe("Test Route pagination", () => {
    it("Validate Landing page for logistics", () => {
      cy.visit("http://localhost:8081/#/logistics");
      cy.wait(1000);
      cy.contains("Routes");
    });

    it("Click on Routes tab", () => {
        cy.get('a#pv_id_2_1_header_action').contains('Routes').click();
        cy.wait(1000);
    });
  
    it("Validate Table elements", () => {
        cy.get("table.p-datatable-table tr").should('have.length.gt', 1);
    });

    it("Validate Pagination component", () => {
        cy.get("div.p-component");
        cy.get("div.p-paginator > button.p-paginator-next");
        cy.get("div.p-paginator > span.p-paginator-pages > button").should('have.length.at.least', 1);
    });
    
    it("Click on next page button", () => {
        cy.get("div.p-paginator > button.p-paginator-next:not(.p-disabled)").click();
        cy.get("table.p-datatable-table tr").should('have.length.gt', 1);
        cy.wait(1000);
    });

    it("Validate that the the current page is 2", () => {
        cy.get('div[pv_id_26] button.p-paginator-page.p-highlight').should('have.attr', 'aria-label', '2')
    });
  
});