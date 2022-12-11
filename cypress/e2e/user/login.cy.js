/// <reference types="cypress" />

describe("Login", () => {
  before(() => {
    cy.visit("http://localhost:5173");
  });

  it("redirects to the Login page", () => {
    cy.url().should("be.equals", "http://localhost:5173/login");
  });

  it("login button should be disabled", () => {
    cy.get(".p-button").should("be.disabled");
  });

  it("shows an error when invalid email or password", () => {
    cy.intercept("POST", "**/users/login/", { statusCode: 400 });
    cy.get("input[type='email']").type("admin@gmail.com");
    cy.get("input[type='password']").type("1337");
    cy.get(".p-button").click();
    cy.get(".p-toast-message-error");
  });

  it("successfully logging in", () => {
    cy.login();
  });
});
