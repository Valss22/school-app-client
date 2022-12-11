/// <reference types="cypress" />

describe("Register", () => {
  before(() => {
    cy.visit("http://localhost:5173/register");
  });

  it("register button should be disabled", () => {
    cy.get(".p-button").should("be.disabled");
  });

  it("Unsuccessfully register", () => {
    cy.registerUser(400);
    cy.get(".p-toast-message-error");
  });

  it("Successfully register", () => {
    cy.intercept("POST", "**/users/login/", { statusCode: 200 });
    cy.registerUser(200);
    cy.get(".p-toast-message-success");

    // // с каждым тестом cookies & localStorage очищается
    // cy.window()
    //   .its("localStorage")
    //   .invoke("getItem", "accessToken")
    //   .should("exist");
  });
});
