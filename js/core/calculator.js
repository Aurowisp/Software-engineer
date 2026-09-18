import { CalculationError, performOperation } from './operations.js';

const OPERATOR_SYMBOLS = Object.freeze({
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
});

const MAX_INPUT_LENGTH = 15;
const RESULT_PRECISION = 12;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    throw new CalculationError('结果超出范围', 'NON_FINITE_RESULT');
  }

  if (Object.is(value, -0)) {
    return '0';
  }

  return String(Number.parseFloat(value.toPrecision(RESULT_PRECISION)));
}

function parseDisplay(displayValue) {
  const value = Number(displayValue);
  if (!Number.isFinite(value)) {
    throw new CalculationError('无效的数字', 'INVALID_NUMBER');
  }
  return value;
}

export class Calculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.status = 'INITIAL';
    this.expression = '';
    this.lastOperator = null;
    this.lastOperand = null;
  }

  inputDigit(digit) {
    if (!/^\d$/.test(String(digit))) return;
    this.#recoverForInput();

    if (this.waitingForOperand || this.status === 'RESULT') {
      this.displayValue = String(digit);
      this.waitingForOperand = false;
    } else if (this.displayValue === '0') {
      this.displayValue = String(digit);
    } else if (this.displayValue.replace('-', '').replace('.', '').length < MAX_INPUT_LENGTH) {
      this.displayValue += String(digit);
    }

    this.status = 'INPUTTING';
    this.#updatePendingExpression();
  }

  inputDecimal() {
    this.#recoverForInput();

    if (this.waitingForOperand || this.status === 'RESULT') {
      this.displayValue = '0.';
      this.waitingForOperand = false;
      this.status = 'INPUTTING';
      this.#updatePendingExpression();
      return;
    }

    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
    this.status = 'INPUTTING';
    this.#updatePendingExpression();
  }

  chooseOperator(nextOperator) {
    if (!Object.hasOwn(OPERATOR_SYMBOLS, nextOperator)) return;

    if (this.status === 'ERROR') {
      this.clear();
    }

    const inputValue = parseDisplay(this.displayValue);

    if (this.operator && !this.waitingForOperand) {
      const leftOperand = this.firstOperand;
      try {
        const result = performOperation(this.operator, leftOperand, inputValue);
        this.displayValue = formatNumber(result);
        this.firstOperand = result;
      } catch (error) {
        this.#setError(error);
        return;
      }
    } else if (this.firstOperand === null || this.status === 'RESULT') {
      this.firstOperand = inputValue;
    }

    this.operator = nextOperator;
    this.waitingForOperand = true;
    this.status = 'OPERATOR_SELECTED';
    this.lastOperator = null;
    this.lastOperand = null;
    this.expression = `${this.displayValue} ${OPERATOR_SYMBOLS[nextOperator]}`;
  }

  calculate() {
    if (this.status === 'ERROR') return;

    let operator = this.operator;
    let leftOperand = this.firstOperand;
    let rightOperand;

    if (operator && !this.waitingForOperand) {
      rightOperand = parseDisplay(this.displayValue);
    } else if (this.status === 'RESULT' && this.lastOperator && this.lastOperand !== null) {
      operator = this.lastOperator;
      leftOperand = parseDisplay(this.displayValue);
      rightOperand = this.lastOperand;
    } else {
      return;
    }

    try {
      const result = performOperation(operator, leftOperand, rightOperand);
      this.expression = `${formatNumber(leftOperand)} ${OPERATOR_SYMBOLS[operator]} ${formatNumber(rightOperand)} =`;
      this.displayValue = formatNumber(result);
      this.lastOperator = operator;
      this.lastOperand = rightOperand;
      this.firstOperand = result;
      this.operator = null;
      this.waitingForOperand = false;
      this.status = 'RESULT';
    } catch (error) {
      this.#setError(error);
    }
  }

  backspace() {
    if (this.status === 'ERROR' || this.status === 'RESULT') {
      this.clear();
      return;
    }

    if (this.waitingForOperand) return;

    this.displayValue = this.displayValue.length > 1
      ? this.displayValue.slice(0, -1)
      : '0';

    if (this.displayValue === '-' || this.displayValue === '') {
      this.displayValue = '0';
    }

    this.status = this.displayValue === '0' && this.firstOperand === null ? 'INITIAL' : 'INPUTTING';
    this.#updatePendingExpression();
  }

  getState() {
    return Object.freeze({
      displayValue: this.displayValue,
      expression: this.expression,
      operator: this.operator,
      status: this.status,
      isError: this.status === 'ERROR',
    });
  }

  #recoverForInput() {
    if (this.status === 'ERROR') {
      this.clear();
    }

    if (this.status === 'RESULT') {
      this.firstOperand = null;
      this.operator = null;
      this.expression = '';
      this.lastOperator = null;
      this.lastOperand = null;
    }
  }

  #updatePendingExpression() {
    if (this.operator && this.firstOperand !== null) {
      this.expression = `${formatNumber(this.firstOperand)} ${OPERATOR_SYMBOLS[this.operator]} ${this.displayValue}`;
    } else {
      this.expression = '';
    }
  }

  #setError(error) {
    this.displayValue = error instanceof CalculationError ? error.message : '计算错误';
    this.expression = '';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.status = 'ERROR';
    this.lastOperator = null;
    this.lastOperand = null;
  }
}

export { formatNumber };
