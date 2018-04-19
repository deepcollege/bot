import * as R from 'ramda';
import YAML from 'yamljs';
import config from './index';

jest.mock('yamljs');

describe('Should config load operations.yaml', () => {
  const fakeOperations = {
    version: 1,
    operations: [
      {
        name: 'help_webhook_trigger',
        function: 'help.handler',
        type: 'websocket',
        conditions: [{ contentEquals: '!help' }],
        inputs: ['message'],
      },
      {
        name: 'get_year_progress_on_trigger',
        function: 'progress.handler',
        type: 'zz',
        conditions: [{ contentEquals: '!progress' }],
        inputs: ['message'],
      },
    ],
  };

  beforeEach(() => {
    // Mocking loading operations.yaml
    YAML.load = jest.fn(() => fakeOperations);
  });

  it('should load valid operations', () => {
    const ops = config.loadOperations();
    expect(R.prop('version', ops)).toBe(1);
    expect(R.type(ops.operations)).toBe('Array');
    expect(R.length(ops.operations)).toBe(2);
  });

  it('should query websocket type operations', () => {
    const ops = config.queryOperations({ type: 'websocket' });
    expect(R.length(ops)).toBe(1);
    expect(R.head(ops).name).toBe('help_webhook_trigger');
    expect(R.head(ops).type).toBe('websocket');
  });
});
