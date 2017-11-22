function spyConsoleError() {
  let spy;
  beforeAll(() => {
    spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    spy.mockRestore();
  });
}

spyConsoleError();
