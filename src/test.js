const { createAction } = require('redux-actions');

const SAMPLE_ACTION = 'SAMPLE_ACTION';

const sampleAction = createAction(SAMPLE_ACTION, (state) => state);

console.log(sampleAction());
