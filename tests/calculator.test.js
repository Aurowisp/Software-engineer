import assert from 'node:assert/strict';
import test from 'node:test';

import { Calculator, formatNumber } from '../js/core/calculator.js';

function enterNumber(calculator, value) {
  for (const character of String(value)) {
    if (character === '.') calculator.inputDecimal();
    else calculator.inputDigit(character);
  }
}

function calculate(left, operator, right) {
  const calculator = new Calculator();
  enterNumber(calculator, left);
  calculator.chooseOperator(operator);
  enterNumber(calculator, right);
  calculator.calculate();
  return calculator;
}

test('TC-07: formats 0.1 + 0.2 as 0.3', () => {
  const calculator = calculate('0.1', '+', '0.2');
  assert.equal(calculator.getState().displayValue, '0.3');
  assert.equal(formatNumber(0.1 + 0.2), '0.3');
});

test('TC-08: division by zero enters a recoverable error state', () => {
  const calculator = calculate('5', '/', '0');
  assert.deepEqual(
    { displayValue: calculator.getState().displayValue, status: calculator.getState().status },
    { displayValue: '不能除以 0', status: 'ERROR' },
  );

  calculator.inputDigit('7');
  assert.equal(calculator.getState().displayValue, '7');
  assert.equal(calculator.getState().status, 'INPUTTING');
});

test('TC-09: backspace changes 123 to 12', () => {
  const calculator = new Calculator();
  enterNumber(calculator, '123');
  calculator.backspace();
  assert.equal(calculator.getState().displayValue, '12');
});

test('TC-10: AC restores the initial state', () => {
  const calculator = new Calculator();
  enterNumber(calculator, '123');
  calculator.clear();
  assert.deepEqual(calculator.getState(), {
    displayValue: '0',
    expression: '',
    operator: null,
    status: 'INITIAL',
    isError: false,
  });
});

test('TC-11: a second decimal point is ignored', () => {
  const calculator = new Calculator();
  enterNumber(calculator, '1.2');
  calculator.inputDecimal();
  calculator.inputDigit('3');
  assert.equal(calculator.getState().displayValue, '1.23');
});

test('TC-12: repeated operators replace the pending operator safely', () => {
  const calculator = new Calculator();
  enterNumber(calculator, '8');
  calculator.chooseOperator('+');
  calculator.chooseOperator('*');
  enterNumber(calculator, '2');
  calculator.calculate();
  assert.equal(calculator.getState().displayValue, '16');
});

test('TC-13: calculation can continue from a result', () => {
  const calculator = calculate('2', '+', '3');
  calculator.chooseOperator('+');
  enterNumber(calculator, '4');
  calculator.calculate();
  assert.equal(calculator.getState().displayValue, '9');
});

test('chained operations are evaluated immediately', () => {
  const calculator = new Calculator();
  enterNumber(calculator, '2');
  calculator.chooseOperator('+');
  enterNumber(calculator, '3');
  calculator.chooseOperator('+');
  enterNumber(calculator, '4');
  calculator.calculate();
  assert.equal(calculator.getState().displayValue, '9');
});

test('repeated equals repeats the previous operation', () => {
  const calculator = calculate('2', '+', '3');
  calculator.calculate();
  assert.equal(calculator.getState().displayValue, '8');
});

test('typing after a result starts a new calculation', () => {
  const calculator = calculate('2', '+', '3');
  calculator.inputDigit('7');
  assert.equal(calculator.getState().displayValue, '7');
  assert.equal(calculator.getState().expression, '');
});

test('backspace on a single digit returns to zero', () => {
  const calculator = new Calculator();
  calculator.inputDigit('7');
  calculator.backspace();
  assert.equal(calculator.getState().displayValue, '0');
});
