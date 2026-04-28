const test = require('node:test');
const assert = require('node:assert/strict');

const { power } = require('./index');

test('power raises base to exponent', () => {
  assert.equal(power(2, 3), 8);
});

test('power returns 1 for zero exponent', () => {
  assert.equal(power(5, 0), 1);
});

test('power supports fractional exponents', () => {
  assert.equal(power(9, 0.5), 3);
});
