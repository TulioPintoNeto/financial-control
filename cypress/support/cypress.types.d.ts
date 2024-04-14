/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginApi(): Chainable<any>;
  }
}
