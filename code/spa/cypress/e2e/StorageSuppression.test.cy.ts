describe("Test Storage suppression", () => {
    it("Validate Landing page for storages", () => {
      cy.visit("http://localhost:8081/#/storage");
      cy.wait(1000);
      cy.contains("Storages");
    });
  
    it("Validate Table elements", () => {
        cy.get("table.p-datatable-table tr").should('have.length.gt', 1);
    });

    it("Validate collumn text is available for storage", () => {
        cy.get("table tr:nth-child(1) td:nth-child(5) span").should('contain', 'Available');
    });

    it("Click on  button", () => {
        cy.get("table tr:nth-child(1) button.p-button.p-component").click;
    });

    it("Validate collumn text is Not Available for storage", () => {
        cy.get("table tr:nth-child(1) td:nth-child(5) span").should('contain', 'Not Available');
    });
  
});