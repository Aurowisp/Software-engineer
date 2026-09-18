# Web Calculator Requirements

## 1. Project Overview

Web Calculator v1.0.0 is a browser-based calculator for a software engineering course project. Its purpose is to deliver a usable arithmetic MVP while demonstrating clear requirements, modular design, testing, documentation, and a maintainable Git workflow.

## 2. Scope

### Included in v1.0

- Integer and decimal input
- Addition, subtraction, multiplication, and division
- Result calculation, all-clear, and backspace
- A simple expression display
- Immediate chained calculations
- Friendly error handling
- Keyboard input
- Responsive layout for modern desktop, tablet, and mobile browsers

### Excluded from v1.0

- Full expression parsing or operator precedence
- Scientific operations
- History and LocalStorage persistence
- Themes
- Backend APIs, databases, cloud synchronization, accounts, or authentication

## 3. Functional Requirements

- **FR-01 — Number input:** Accept digits 0 through 9 and show the entered number.
- **FR-02 — Addition:** Calculate `a + b`.
- **FR-03 — Subtraction:** Calculate `a - b`.
- **FR-04 — Multiplication:** Calculate `a × b`.
- **FR-05 — Division:** Calculate `a ÷ b` when `b` is non-zero.
- **FR-06 — Decimals:** Accept decimal values and prevent a second decimal point in one operand.
- **FR-07 — Equals:** Execute the pending operation when `=` is selected.
- **FR-08 — Clear:** `AC` resets all state and displays `0`.
- **FR-09 — Backspace:** Remove the last digit, falling back to `0` when no digits remain.
- **FR-10 — Expression:** Show the pending or most recently completed expression separately from the result.
- **FR-11 — Division by zero:** Show `不能除以 0`, never `Infinity` or `NaN`, and allow recovery with clear or new input.
- **FR-12 — Continuous calculation:** Support immediate chained operations and operations continued from a result.
- **FR-13 — Keyboard input:** Support digits, `.`, `+`, `-`, `*`, `/`, `Enter`, `=`, `Backspace`, and `Escape`.

## 4. Non-Functional Requirements

- **Usability:** Labels, visual hierarchy, keyboard focus, touch-sized buttons, and feedback must make controls easy to understand.
- **Reliability:** Invalid input sequences, repeated operators/equals, divide-by-zero, repeated decimals, clearing, and empty backspace must not crash the application.
- **Performance:** Arithmetic and rendering happen locally and should appear immediate; no network request is required.
- **Maintainability:** HTML, styling, interaction, state, and arithmetic are separated into focused modules; `eval` and implicit global state are prohibited.
- **Extensibility:** New arithmetic operations can be added in the operations/core layer; history or persistence can consume calculator state without putting those concerns in the UI.
- **Compatibility:** Current Chrome, Edge, and Firefox are the priority targets.

## 5. User Scenario

1. The user opens the calculator and sees `0`.
2. The user enters `8`.
3. The user selects `+`.
4. The user enters `2`.
5. The user selects `=`.
6. The system displays expression `8 + 2 =` and result `10`.

## 6. Exception Scenarios

- **Divide by zero:** `5 ÷ 0 =` enters a controlled error state with `不能除以 0`. `AC` or a new digit restores normal use.
- **Repeated decimal:** Entering `1.2.3` ignores the second point, producing `1.23`.
- **Repeated operator:** Selecting multiple operators before a second operand updates the pending operator without calculating or crashing.
- **Incomplete calculation:** Selecting `=` before a complete operation leaves the current state unchanged.
- **Repeated equals:** After a completed operation, selecting `=` repeats the last operation; it never crashes.
- **Numeric overflow:** A non-finite arithmetic result becomes the controlled message `结果超出范围`.
