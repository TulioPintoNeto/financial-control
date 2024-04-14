import { AUTH_TOKEN } from '../../../src/shared/constants';

context('GET /activities', () => {
  it('gets a list of users', () => {
    cy.loginApi().then((token) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('FUNCTIONS_API_HOST')}/activities?date=2024-03-01`,
        headers: {
          [AUTH_TOKEN]: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(159);

        const firstElement = response.body[0];

        expect(firstElement).to.have.property('type').that.is.a('string');
        expect(firstElement).to.have.property('title').that.is.a('string');
        expect(firstElement)
          .to.have.property('primaryAmount')
          .that.is.a('string');
      });
    });
  });

  it('unauthorized access', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('FUNCTIONS_API_HOST')}/activities?date=2024-03-01`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Missing auth token');
    });
  });

  it('missing query param', () => {
    cy.loginApi().then((token) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('FUNCTIONS_API_HOST')}/activities`,
        headers: {
          [AUTH_TOKEN]: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        console.log(response);
        expect(response.body).to.have.property(
          'message',
          'Missing the following query param: date'
        );
      });
    });
  });

  it('wrong set query param', () => {
    cy.loginApi().then((token) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('FUNCTIONS_API_HOST')}/activities?date=wrongDate`,
        headers: {
          [AUTH_TOKEN]: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        console.log(response);
        expect(response.body).to.have.property(
          'message',
          'Invalid format for the query param: date'
        );
      });
    });
  });
});
