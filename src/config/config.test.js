import * as R from 'ramda'
import config from './index'

test('should operations exist', () => {
  const ops = config.loadOperations()
  expect(R.type(ops.operations)).toBe('Array')
});