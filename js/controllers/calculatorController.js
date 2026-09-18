export class CalculatorController {
  constructor(calculator, view) {
    this.calculator = calculator;
    this.view = view;
  }

  start() {
    const handleInput = (input) => this.#handleInput(input);
    this.view.bindInput(handleInput);
    this.view.bindKeyboard(handleInput);
    this.#render();
  }

  #handleInput({ type, value }) {
    const commands = {
      digit: () => this.calculator.inputDigit(value),
      decimal: () => this.calculator.inputDecimal(),
      operator: () => this.calculator.chooseOperator(value),
      calculate: () => this.calculator.calculate(),
      clear: () => this.calculator.clear(),
      backspace: () => this.calculator.backspace(),
    };

    commands[type]?.();
    this.#render();
  }

  #render() {
    this.view.render(this.calculator.getState());
  }
}
