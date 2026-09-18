export class CalculationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'CalculationError';
    this.code = code;
  }
}

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) {
    throw new CalculationError('不能除以 0', 'DIVIDE_BY_ZERO');
  }

  return a / b;
}

const operations = Object.freeze({
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
});

export function performOperation(operator, a, b) {
  const operation = operations[operator];

  if (!operation) {
    throw new CalculationError('不支持的运算', 'UNKNOWN_OPERATOR');
  }

  const result = operation(a, b);
  if (!Number.isFinite(result)) {
    throw new CalculationError('结果超出范围', 'NON_FINITE_RESULT');
  }

  return result;
}
