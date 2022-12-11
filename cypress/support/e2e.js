import { mount } from "cypress/vue";

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("login", (role) => {
  cy.visit("http://localhost:5173/login");
  cy.intercept("POST", "**/users/login/", {
    fixture: "login-response.json",
    statusCode: 200,
  });
  cy.intercept("GET", "**/users/me/", {
    fixture:
      role === "admin"
        ? "me-admin-response.json"
        : "me-response-after-register.json",
    statusCode: 200,
  });
  cy.get("input[type='email']").type("user@example.com");
  cy.get("input[type='password']").type("string");
  cy.get(".p-button").click();
  cy.get(".p-toast-message-success");
  cy.url().should("be.equals", "http://localhost:5173/");
});


Cypress.Commands.add("registerUser", (statusCode) => {
  cy.intercept("POST", "**/users/register/", { statusCode });
  cy.get("#firstname").type("Влад");
  cy.get("#lastname").type("Шокоров");
  cy.get("input[type='email']").clear().type("user@example.com");
  cy.get("#password").clear().type("string");
  cy.get("#registerKey").clear().type("string");
  cy.get(".p-button").click();
});