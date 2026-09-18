# Web Calculator Design

## 1. Architecture

The application uses four small layers:

1. **View** renders state and captures DOM/keyboard events.
2. **Controller** translates input events into calculator commands.
3. **Calculator Core** owns input, operation, result, and error state.
4. **Operations** implements arithmetic and domain errors.

This is deliberately small for v1.0: there is no service implementation until history, persistence, or an API creates a real need for one.

## 2. Module Responsibilities

| Module | Responsibility | Must not do |
| --- | --- | --- |
| `calculatorView.js` | Query DOM elements, bind click/keyboard input, render display and button state | Perform arithmetic |
| `calculatorController.js` | Dispatch input commands and request a render | Duplicate calculator state or formulas |
| `calculator.js` | Manage operands, input rules, calculation state, formatting, and error recovery | Access the DOM |
| `operations.js` | Provide explicit arithmetic functions and controlled operation errors | Depend on the UI or controller |
| `app.js` | Compose and start the modules | Contain business logic |

## 3. Dependency

```text
              View
                ↑↓
index.html -> Controller
                 ↓
             Calculator
                 ↓
              Operations
```

Dependencies point inward toward calculation logic. Operations can be tested without a browser.

## 4. Data Flow

```text
Button or keyboard input
          ↓
        View
          ↓ input event
      Controller
          ↓ command
   Calculator Core
          ↓ when arithmetic is needed
      Operations
          ↓ result or controlled error
   Calculator state
          ↓ render
        View
```

The calculator uses the conceptual states `INITIAL`, `INPUTTING`, `OPERATOR_SELECTED`, `RESULT`, and `ERROR`. `AC` always returns to `INITIAL`; a digit entered from `ERROR` also starts clean input.

Chained expressions use immediate execution. For example, `2 + 3 × 4 =` evaluates as `(2 + 3) × 4 = 20`; v1.0 intentionally has no parser or precedence engine.

## 5. Extension

- **Scientific operations:** Add explicit operation functions and expose new commands/buttons. A future expression parser can sit above operations without coupling to the DOM.
- **History:** The controller can send completed result snapshots to a `HistoryService` without changing arithmetic functions.
- **LocalStorage:** A persistence adapter can store history/preferences behind a service interface once persistence is in scope.
- **Backend API:** A future API service can replace or supplement local persistence while leaving view and arithmetic logic independent.
- **Themes:** CSS custom properties and a preference controller can introduce themes without changing calculator behavior.
