// @flow
import * as R from 'ramda';
import * as path from 'path';
import * as dotenv from 'dotenv';
import YAML from 'yamljs';

const loadOperations = (fileName = 'operations.yml') => {
  const yamlPath = path.join(__dirname, `/../../${fileName}`);
  return YAML.load(yamlPath)
}

/**
 * Queries operations yaml
 * type = finds all operations with a type
 * @param type
 */
const queryOperations = ({ type }) => {
  const ops = loadOperations().operations
  return R.filter(
    R.compose(
      R.equals(type),
      R.prop('type')
    )
  )(ops)
}

const setup = () => {
  dotenv.config({
    path: path.join(__dirname, '/../../.env'),
  });
};

export default {
  setup,
  queryOperations,
};
