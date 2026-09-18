import { CalculatorController } from './controllers/calculatorController.js';
import { Calculator } from './core/calculator.js';
import { CalculatorView } from './ui/calculatorView.js';

const calculator = new Calculator();
const view = new CalculatorView();
const controller = new CalculatorController(calculator, view);

controller.start();
