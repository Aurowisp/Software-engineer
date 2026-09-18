# Web Calculator Test Plan

## 1. Objective

Verify that Web Calculator v1.0.0 performs basic arithmetic correctly, handles expected error/input edge cases safely, and remains usable across its target viewport sizes and input methods.

## 2. Scope

Automated tests cover the arithmetic operations and calculator state. Manual checks cover DOM integration, keyboard controls, accessibility basics, browser console health, and responsive presentation. Backend, persistence, history, scientific functions, and full expression precedence are outside v1.0.

## 3. Method

- Run unit tests with Node's built-in test runner using `npm test` (same-process isolation avoids child-process requirements).
- Serve the project with `python -m http.server 8000` for browser checks.
- Test current Chrome, Edge, or Firefox at desktop width and narrow mobile width (approximately 320–390 px).
- Inspect the browser console while using buttons and keyboard controls.

## 4. Test Cases

| ID | Input / action | Expected result | Type |
| --- | --- | --- | --- |
| TC-01 | `2 + 3` | `5` | Automated |
| TC-02 | `5 - 8` | `-3` | Automated |
| TC-03 | `6 × 7` | `42` | Automated |
| TC-04 | `8 ÷ 2` | `4` | Automated |
| TC-05 | `0 + 5` | `5` | Automated |
| TC-06 | `1.5 + 2.5` | `4` | Automated |
| TC-07 | `0.1 + 0.2` | Display `0.3` | Automated |
| TC-08 | `5 ÷ 0` | Controlled `不能除以 0` error; no Infinity | Automated + manual |
| TC-09 | Enter `123`, backspace | `12` | Automated + manual |
| TC-10 | Enter `123`, AC | Initial `0` state | Automated + manual |
| TC-11 | Enter `1.2.3` | Second point ignored; `1.23` | Automated + manual |
| TC-12 | Click operators repeatedly | Pending operator changes; no crash | Automated + manual |
| TC-13 | `2 + 3 =`, then `+ 4 =` | `9` | Automated + manual |
| TC-14 | `2 + 3 + 4 =` | `9` using immediate execution | Automated |
| TC-15 | Repeat `=` after `2 + 3 =` | Repeats addition safely (`8`) | Automated |
| TC-16 | Keyboard digits/operators/Enter | Same result as buttons | Manual |
| TC-17 | Escape and Backspace keys | Clear and delete work | Manual |
| TC-18 | 320 px viewport | No horizontal page overflow; keys remain usable | Manual |
| TC-19 | Tab through controls | Visible focus and logical order | Manual |
| TC-20 | Normal interaction | No browser console error | Manual |

## 5. Acceptance Criteria

- All automated tests pass.
- TC-01 through TC-13 pass with their stated results.
- No `NaN`, `Infinity`, or uncaught error is shown to the user.
- The page has no obvious horizontal overflow at a 320 px viewport.
- Mouse/touch buttons and documented keyboard input work.
- Browser console has no application errors during the manual scenario set.
