describe("Test Storage pagination", () => {
    it("Validate Landing page for storages", () => {
      cy.visit("http://localhost:8081/#/storage");
      cy.wait(1000);
      cy.contains("Storages");
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
        cy.get("div.p-paginator > button.p-paginator-next").click();
        cy.get("table.p-datatable-table tr").should('have.length.gt', 1);
    });

    it("Validate that the the current page is 2", () => {
        cy.get('button.p-paginator-page.p-highlight').should('have.attr', 'aria-label', '2')
    });
  
});