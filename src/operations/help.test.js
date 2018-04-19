import help from './help';

describe('help', () => {
  it('should return fuck you', done => {
    // WARNING: Race condition!!
    const message = {
      channel: {
        send(msg) {
          expect(msg).toBe('fuck you');
        },
      },
    };
    help.handler({ message }).then(() => done());
  });
});
