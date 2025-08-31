# Server-Driven UI Demo

A dynamic form rendering app built with **Next.js + React + TypeScript**. The client renders UI components based on configuration data provided by backend endpoint.

## Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Architecture](#architecture)
- [Software Design](#software-design)
- [Workflow](#workflow)

## Getting started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the Next.js development server:
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`
   APIs available at `http://localhost:3000/api/*`

### Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

#### End to End Testing

For recommended end-to-end testing strategy, see
**↔️ [END_TO_END_TESTING.md](./END_TO_END_TESTING.md)**

### Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Linting

```bash
npm run lint
```

## Features

### ⭐️ Demo features

- **Server-Driven UI**: Renders forms based on JSON configuration coming from backend endpoint, supporting five core UI components, fetching config and posting data to API routes
- **Error Handling**: Comprehensive error handling for API failures
- **Accessibility**: ARIA roles, keyboard navigation, screen reader support
- **Styling**: Lightweight, flexible and modern CSS system with Bulma
- **Testing**: Unit and integration tests with Jest and Testing Library
- **Documentation**:
  - [README.md](./README.md) (this file) - general setup instructions
  - [SOFTWARE_DESIGN.md](./SOFTWARE_DESIGN.md) - detailed technical specification
  - [WORKFLOW.md](./WORKFLOW.md) - development workflow
- **End to End Testing**:
  - [END_TO_END_TESTING.md](./END_TO_END_TESTING.md) - comprehensive testing strategy

### 🛠 Tech stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js App Router API routes
- **Styling**: Bulma
- **Testing**: Jest, @testing-library/react
- **Build Tool**: Next.js

### ⚠️ Error handling

- API failure handling with retry functionality
- Form validation with user-friendly messages
- Loading states with accessibility announcements
- Network error recovery

### 🚹 Accessibility features

- ARIA roles and properties
- Keyboard navigation support
- Screen reader announcements
- Focus management
- Required field indicators
- Error message associations

### 🚀 Improvements

Possible improvements that could have been added given more time:
- Server-side rendering for better performance
- Client-side form validation
- Passing default value from server - especially useful for dropdowns
- Refactor notifications to separate components

## Architecture

### APi endpoints

- **GET `/api/config`**: Returns UI configuration JSON
- **POST `/api/submit`**: Handles form submissions and logs data

### Project structure

```
app/
├── api/
│   ├── config/
│   │   └── route.ts         # GET /api/config - UI configuration endpoint
│   └── submit/
│       └── route.ts         # POST /api/submit - Form submission endpoint
├── layout.tsx               # Root layout component
└── page.tsx                 # Home page (renders App)

src/
├── components/
│   ├── ui-components/
│   │   ├── __tests__/
│   │   │   ├── Button.test.tsx
│   │   │   ├── Form.test.tsx
│   │   │   ├── Input.test.tsx
│   │   │   └── Text.test.tsx
│   │   ├── Button.tsx       # Action button component
│   │   ├── Dropdown.tsx     # Select dropdown component
│   │   ├── Form.tsx         # Form wrapper with submission logic
│   │   ├── Input.tsx        # Text input field component
│   │   └── Text.tsx         # Static text component
│   ├── App.tsx              # Main application component
│   ├── Component.tsx        # Dynamic component renderer
│   └── DynamicForm.tsx      # Form layout wrapper
├── types/
│   └── index.ts             # TypeScript type definitions
├── test/
│   └── setup.ts             # Jest test setup
└── __tests__/
    └── App.test.tsx         # Integration tests
```

### Configuration format

The system expects JSON configuration in this format:

```json
{
  "title": "Form Title",
  "components": [
    {
      "id": "unique-id",
      "type": "text|input|dropdown|button|form",
      "label": "Field Label",
      "required": true,
      // component-specific properties...
    }
  ]
}
```

#### Example configuration

```json
{
  "title": "User Registration",
  "components": [
    {
      "id": "welcome",
      "type": "text",
      "content": "Welcome! Please fill out the form."
    },
    {
      "id": "form",
      "type": "form",
      "children": [
        {
          "id": "firstName",
          "type": "input",
          "label": "First Name",
          "placeholder": "Enter your first name",
          "required": true
        },
        {
          "id": "country",
          "type": "dropdown",
          "label": "Country",
          "options": [
            { "label": "United States", "value": "us" },
            { "label": "Canada", "value": "ca" }
          ],
          "required": true
        },
        {
          "id": "submit",
          "type": "button",
          "text": "Submit",
          "variant": "primary",
          "action": "submit"
        }
      ]
    }
  ]
}
```

## Software design

For detailed architectural information, and design patterns, see
**📋 [SOFTWARE_DESIGN.md](./SOFTWARE_DESIGN.md)**

## Workflow

For development processes, see
**⚡ [WORKFLOW.md](./WORKFLOW.md)**
