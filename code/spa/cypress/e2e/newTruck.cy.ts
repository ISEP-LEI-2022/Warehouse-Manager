describe("New Route", () => {
  it("Validate text button", () => {
    cy.visit("http://localhost:8081/#/logistics");
    cy.wait(1000);
    cy.contains("Logistics");
  });

  it("Validate view elements", () => {
    cy.contains("Trucks");
    cy.contains("Routes");
    cy.contains("Trips");
  });

  const registration = randomRegistration();
  it("Create new Truck", () => {
    cy.wait(1000);

    cy.get(
      'div[aria-labelledby*="0_header"]  button[class="p-button p-component"]'
    ).click();
    cy.contains("Add new Truck");
    cy.get("input#Registration").clear();
    cy.get("input#Registration").type(registration);
    cy.get("input#Capacity").type("{selectall}{backspace}2");
    cy.get("input#Autonomy").type("{selectall}{backspace}2");
    cy.get("input#Tare").type("{selectall}{backspace}2");

    cy.get("div.p-dialog-footer button").click();
    cy.get('[aria-label="Close"]').click();
  });

  it("validate new truck", () => {
    //search next page on datatable
    cy.wait(1000);
    cy.scrollTo("bottom");
    cy.get('span[class="p-paginator-icon pi pi-angle-double-right"]').click({
      multiple: true,
      force: true,
    });
    cy.contains(registration);
  });
});

//create random registration
function randomRegistration() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let registration = "";
  for (let i = 0; i < 2; i++) {
    registration += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  registration += "-";
  for (let i = 0; i < 2; i++) {
    registration += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  registration += "-";

  for (let i = 0; i < 2; i++) {
    registration += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return registration;
}
