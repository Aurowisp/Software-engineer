import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CalculationError,
  add,
  divide,
  multiply,
  performOperation,
  subtract,
} from '../js/core/operations.js';

test('TC-01: adds 2 and 3', () => {
  assert.equal(add(2, 3), 5);
});

test('TC-02: subtracts 8 from 5', () => {
  assert.equal(subtract(5, 8), -3);
});

test('TC-03: multiplies 6 and 7', () => {
  assert.equal(multiply(6, 7), 42);
});

test('TC-04: divides 8 by 2', () => {
  assert.equal(divide(8, 2), 4);
});

test('TC-05: adds zero and 5', () => {
  assert.equal(add(0, 5), 5);
});

test('TC-06: adds decimal values', () => {
  assert.equal(add(1.5, 2.5), 4);
});

test('TC-08: division by zero raises a controlled error', () => {
  assert.throws(
    () => divide(5, 0),
    (error) => error instanceof CalculationError && error.code === 'DIVIDE_BY_ZERO',
  );
});

test('unknown operators are rejected', () => {
  assert.throws(() => performOperation('%', 5, 2), { code: 'UNKNOWN_OPERATOR' });
});
