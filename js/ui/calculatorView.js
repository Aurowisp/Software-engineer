export class CalculatorView {
  constructor(root = document) {
    this.keypad = root.querySelector('#keypad');
    this.display = root.querySelector('#display');
    this.expression = root.querySelector('#expression');

    if (!this.keypad || !this.display || !this.expression) {
      throw new Error('Calculator UI elements are missing.');
    }
  }

  bindInput(handler) {
    this.keypad.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button || !this.keypad.contains(button)) return;

      if (button.dataset.digit !== undefined) {
        handler({ type: 'digit', value: button.dataset.digit });
      } else if (button.dataset.operator) {
        handler({ type: 'operator', value: button.dataset.operator });
      } else if (button.dataset.action) {
        handler({ type: button.dataset.action });
      }
    });
  }

  bindKeyboard(handler) {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const input = this.#keyboardInput(event.key);
      if (!input) return;

      event.preventDefault();
      handler(input);
      this.#showKeyFeedback(event.key);
    });
  }

  render(state) {
    this.display.textContent = state.displayValue;
    this.display.dataset.error = String(state.isError);
    this.expression.textContent = state.expression || (state.isError ? '请重新输入' : '准备计算');

    this.keypad.querySelectorAll('[data-operator]').forEach((button) => {
      button.classList.toggle('is-selected', button.dataset.operator === state.operator);
      button.setAttribute('aria-pressed', String(button.dataset.operator === state.operator));
    });
  }

  #keyboardInput(key) {
    if (/^\d$/.test(key)) return { type: 'digit', value: key };
    if (['+', '-', '*', '/'].includes(key)) return { type: 'operator', value: key };
    if (key === '.' || key === ',') return { type: 'decimal' };
    if (key === 'Enter' || key === '=') return { type: 'calculate' };
    if (key === 'Backspace') return { type: 'backspace' };
    if (key === 'Escape') return { type: 'clear' };
    return null;
  }

  #showKeyFeedback(key) {
    const escapedKey = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(key) : key;
    const selectors = {
      Enter: '[data-action="calculate"]',
      '=': '[data-action="calculate"]',
      Backspace: '[data-action="backspace"]',
      Escape: '[data-action="clear"]',
      '.': '[data-action="decimal"]',
      ',': '[data-action="decimal"]',
    };
    const selector = selectors[key]
      ?? (/^\d$/.test(key) ? `[data-digit="${escapedKey}"]` : `[data-operator="${escapedKey}"]`);
    const button = this.keypad.querySelector(selector);
    if (!button) return;

    button.classList.add('is-active');
    window.setTimeout(() => button.classList.remove('is-active'), 100);
  }
}
