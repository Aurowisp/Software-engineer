# Web Calculator

A modular front-end calculator developed as a Software Engineering course project. The repository was originally initialized as **Software-engineer**; version 1.0 turns it into a small, maintainable calculator application.

## Version

v1.0.0

## Features

- Addition, subtraction, multiplication, and division
- Decimal input with user-friendly floating-point formatting
- Clear and backspace controls
- Safe divide-by-zero and overflow handling
- Chained calculations and continued calculation from a result
- Keyboard support for numbers, operators, `Enter`, `=`, `Backspace`, and `Escape`
- Responsive, accessible controls for desktop, tablet, and mobile browsers

## Technology

- HTML5
- CSS3
- JavaScript ES6 modules
- Node.js built-in test runner (development only)

No production dependencies, backend, database, or network requests are used.

## Architecture

```text
View <-> Controller -> Calculator Core -> Operations
```

The view owns DOM rendering, the controller translates UI events into calculator commands, the calculator owns state, and the operations module contains arithmetic functions.

## Project Structure

```text
.
├── index.html
├── favicon.svg
├── css/
│   └── calculator.css
├── js/
│   ├── app.js
│   ├── controllers/calculatorController.js
│   ├── core/calculator.js
│   ├── core/operations.js
│   └── ui/calculatorView.js
├── tests/
│   ├── calculator.test.js
│   └── operations.test.js
├── docs/
│   ├── requirements.md
│   ├── design.md
│   └── test-plan.md
├── package.json
└── README.md
```

## Run

Because the app uses ES modules, serve the project from a local web server:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. VS Code Live Server works as an alternative.

## Tests

Node.js 18 or newer is recommended. No install step is required.

```bash
npm test
```

The test script uses Node's same-process isolation mode so it also works in restricted course and CI environments that disallow child processes.

## Documentation

- [Requirements](docs/requirements.md)
- [Design](docs/design.md)
- [Test plan](docs/test-plan.md)

## Roadmap

- **v1.0:** Basic arithmetic calculator
- **v1.1:** Calculation history and LocalStorage
- **v1.2:** Theme and UX enhancements
- **v2.0:** Scientific calculator
- **Future:** Optional backend API and user system

## License

This course project has no license file at present.
