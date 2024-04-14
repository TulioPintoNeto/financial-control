Cypress.Commands.add('loginApi', () => {
  cy.request('POST', Cypress.env('LOGIN_API_HOST'), {
    email: Cypress.env('LOGIN_EMAIL'),
    password: Cypress.env('LOGIN_PASSWORD'),
  }).then((response) => {
    cy.wrap(response.body.idToken as string);
  });
});
