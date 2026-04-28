const assert = require('node:assert/strict');
const test = require('node:test');

const { divide, greet } = require('./index');

test('greet returns a greeting', () => {
  assert.equal(greet('World'), 'Hello, World!');
});

test('divide returns the quotient', () => {
  assert.equal(divide(10, 2), 5);
});

test('divide supports non-integer quotients', () => {
  assert.equal(divide(5, 2), 2.5);
});

test('divide throws when dividing by zero', () => {
  assert.throws(() => divide(10, 0), /Division by zero/);
});
