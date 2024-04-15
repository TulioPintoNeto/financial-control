export class MockServer implements Server {
  post = jasmine.createSpy('server.post');
  get = jasmine.createSpy('server.get');
}
