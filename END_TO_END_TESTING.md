# ↔️ End to End Testing

## Current testing coverage

The project currently includes:
- **Unit Tests**: Individual UI components (Button, Form, Input, Dropdown, Text)
- **Integration Tests**: App component with mocked API calls and full form submission workflow
- **Test Setup**: Jest + @testing-library/react with jsdom environment

## Recommended E2E Testing Strategy

For comprehensive end-to-end testing, I recommend implementing the following approach:

### Tool selection: Playwright
```bash
# Install Playwright for E2E testing
npm install -D @playwright/test
npx playwright install
```

> **Alternative**: Cypress - Also good, but Playwright has better TypeScript integration and parallel execution

### Test Architecture
```
e2e/
├── fixtures/
│   ├── basic-form.json          # Simple form configuration
│   ├── complex-form.json        # Multi-component form
│   └── validation-form.json     # Form with validation scenarios
├── pages/
│   └── form-page.ts             # Page Object Model
└── tests/
    ├── form-rendering.spec.ts   # UI rendering tests
    ├── form-submission.spec.ts  # Form submission workflows
    ├── error-handling.spec.ts   # Error scenarios
    └── accessibility.spec.ts    # A11y testing
```

### Anti-Brittle Test Strategy

1. **Stable Selectors**: Use `data-testid` attributes instead of relying on text content
   ```typescript
   // Add to components
   <button data-testid="submit-button" type="submit">
     {component.text}
   </button>

   // Use in tests
   await page.click('[data-testid="submit-button"]');
   ```

2. **API Mocking**: Intercept network calls to return predictable test data
   ```typescript
   await page.route('/api/config', route => {
     route.fulfill({ json: testFixtures.basicForm });
   });
   ```

3. **Multiple Test Configurations**: Test different UI scenarios without depending on live API
   ```typescript
   const testConfigs = {
     basic: require('./fixtures/basic-form.json'),
     complex: require('./fixtures/complex-form.json'),
     validation: require('./fixtures/validation-form.json')
   };
   ```

### Key Test Scenarios

- **Happy Path Flow**
  - Load application → Fetch config → Render form → Fill inputs → Submit successfully

- **Error Scenarios**
  - Network failures during config fetch
  - Server validation errors during submission
  - Client-side error recovery (retry functionality)

- **Dynamic UI Rendering**
  - Different component types render correctly
  - Required field indicators appear
  - Form submission enables/disables appropriately

- **Cross-Configuration Testing**
  - Forms with different component combinations
  - Optional vs required fields
  - Different dropdown options and default values

- **Accessibility Testing**
  - Keyboard navigation through form
  - Screen reader announcements for errors/success
  - ARIA attributes and roles

### Example E2E Test
```typescript
test('complete form submission workflow', async ({ page }) => {
  // Mock the config API
  await page.route('/api/config', route => {
    route.fulfill({ json: testFixtures.basicForm });
  });

  // Mock the submit API
  await page.route('/api/submit', route => {
    route.fulfill({ json: { message: 'Success!' } });
  });

  await page.goto('/');

  // Wait for form to load
  await page.waitForSelector('[data-testid="dynamic-form"]');

  // Fill form fields
  await page.fill('[data-testid="firstName-input"]', 'John');
  await page.selectOption('[data-testid="country-select"]', 'us');

  // Submit form
  await page.click('[data-testid="submit-button"]');

  // Verify success message
  await expect(page.locator('[data-testid="success-message"]'))
    .toContainText('Success!');
});
```

### Config-Driven UI Rendering Validation Strategy

1. **Configuration Schema Validation**: Validate that the configuration matches expected structure before testing UI rendering, using schema validation libraries like Zod.
2. **Component-to-DOM Mapping Tests**: Test that each component type in the config produces the expected DOM elements. 
3. **Dynamic Component Tree Validation**: Verify that the DOM structure matches the configuration hierarchy. Test that nested components appear in the correct order, parent-child relationships are preserved, and the component.
  tree structure in the DOM reflects the configuration structure.
4. **Property-to-Attribute Mapping**: Test that configuration properties correctly translate to HTML attributes.
5. **Visual Regression Testing**: Ensure UI appearance is consistent across different configurations. Take screenshots of different configuration scenarios and compare them to baseline images to catch unexpected visual changes when configurations are updated.
6. **Configuration Edge Cases**: Test edge cases and malformed configurations.
7. **Data Flow Validation**: Test that form data collection matches the configuration structure.


## Running E2E Tests
```bash
# Run all E2E tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test form-submission.spec.ts

# Generate test report
npx playwright show-report
```

This E2E testing strategy ensures comprehensive coverage while maintaining test reliability through predictable test data and stable element selection.
