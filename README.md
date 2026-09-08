# BMI Calculator

A browser-based BMI (Body Mass Index) calculator built with vanilla HTML, CSS, and JavaScript (no frameworks or libraries) — practicing form input handling, unit conversion, nested validation, and conditional styling.

## How to Use

1. Choose a height unit (cm or ft/in) and a weight unit (kg or pound).
2. Enter your height (and inches, if using ft/in) and weight.
3. Click **Calculate**.
4. Your BMI is displayed along with a category (underweight, normal, overweight, obese), and the result box changes color to match the category.
5. Invalid or missing input (empty fields, non-numeric values, negative numbers) triggers an alert instead of a calculation.

## Features

- Supports two height units (cm, ft/in) and two weight units (kg, pound), each selected independently via dropdowns
- The height/weight input fields dynamically switch their placeholder (and the extra inches field shows/hides) based on the selected unit
- Full input validation, including validation scoped only to the fields actually in use (e.g. inches is only validated when ft/in is selected)
- BMI formula and category thresholds follow the standard WHO ranges
- Result box color-codes by category using `classList`, with old category classes cleared before each new calculation

## Project Structure

```
├── index.html      # Page structure: unit selectors, height/weight inputs, Calculate button, result box
├── index.js        # Input handling, unit conversion, validation, BMI calculation, category display
└── style.css       # Styling: form layout, inputs, button, and category-based result colors
```

## Core Logic Overview

- **Reading input** — height, weight, and inch values are read from their `<input>` elements (`.value`, always a string) and immediately cleared, matching the pattern used in Countdown Timer.
- **Validation** — a first check rejects empty, non-numeric, or negative height/weight. A second, nested check validates the inches field, but only inside the `if (heightUnit.value === "ftin")` block — so it never fires when the ft/in unit isn't in use, since the hidden inches field would otherwise always read as an empty string.
- **Unit conversion** — before calling `formula()`:
  - If height unit is `"ftin"`, `heightValue` is overwritten with `(heightValue * 12 + inchValue) * 2.54` (feet+inches → cm).
  - If weight unit is `"pound"`, `weightValue` is overwritten with `weightValue / 2.20462` (pounds → kg).
  - `formula()` itself always receives values already in kg and cm — it has no knowledge of which unit the user originally chose.
- **`formula(value1, value2)`** — computes `BMI = weight / (height/100)²`, rounds it to 2 decimals with `.toFixed(2)` for display (while comparisons use the unrounded value), and updates both the result text and its category class.
- **Category styling** — before applying a new category class, `outputEl.classList.remove('underweight', 'normal', 'overweight', 'obese')` clears all possible category classes, preventing classes from a previous calculation from lingering and conflicting with the new one.

## What This Project Practices

- Reading and validating multiple `<input>`/`<select>` values in one form
- Nesting a conditional validation block inside another condition, so it only runs when relevant
- Reassigning a variable to hold a converted value, so a function further down the flow can stay unit-agnostic
- Unit conversion arithmetic (cm↔m, cm↔ft/in, kg↔lbs)
- Using `classList.remove(...)` with multiple arguments to reset state before applying a new one — the same pattern as clearing a previous "current" item before setting a new one (as in Whack-a-Mole)
- Choosing `if/else if/else` over `switch` for range-based (rather than exact-match) conditions

## Possible Improvements

- Switch inputs to `type="number"` to restrict input at the browser level
- Add a BMI history log for repeated calculations
- Add a visual scale/slider showing where the result falls within the BMI range
- Support additional units (e.g. stone for weight)
