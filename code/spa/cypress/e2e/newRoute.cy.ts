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

  
  const randomRoute:string = randomRouteName();

  it("Create new Route", () => {
    cy.wait(1000);

    cy.get('a#pv_id_2_1_header_action').contains('Routes').click();
    cy.wait(1000);
    cy.get(
      'div[role="tabpanel"]:nth-child(2) button[class="p-button p-component"]'
    ).contains('Add').click();
    cy.wait(1000);

    cy.contains("Add new Route");
    cy.get("input#Route").type(
      "{selectall}{backspace}Route " + randomRoute
    );
    cy.get("input#Start").type("random start");
    cy.get("input#End").type("random end");
    cy.get("input#Distance").type("{selectall}{backspace}2");
    cy.get("input#TimeRequired").type("{selectall}{backspace}2");
    cy.get("input#EnergyConsumed").type("{selectall}{backspace}2");
    cy.get("input#ExtraChargingTime").type("{selectall}{backspace}2");
    cy.get("div.p-dialog-footer button").click();
    cy.get('[aria-label="Close"]').click();
  });

  it("validate new route", () => {
    //search next page on datatable
    cy.wait(1000);
    cy.scrollTo("bottom");
    cy.get('span[class="p-paginator-icon pi pi-angle-double-right"]').click({
      multiple: true,
      force: true,
    });
    cy.contains("Route " + randomRoute);
  });
});


//create random route name
function randomRouteName() : string{
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let routeName = "";
    for (let i = 0; i < 5; i++) {
      routeName += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return routeName;
  }