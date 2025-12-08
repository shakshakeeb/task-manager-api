# Task Manager Frontend

A React TypeScript frontend for the HMCTS Task Manager system.

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Testing:** Vitest + React Testing Library

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env if your API is running on a different URL
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run lint` | Run ESLint |

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── TaskForm.tsx           # Task creation form
│   │   ├── TaskForm.test.tsx      # Form unit tests
│   │   ├── TaskConfirmation.tsx   # Success confirmation display
│   │   └── TaskConfirmation.test.tsx
│   ├── services/
│   │   └── api.ts                 # API client
│   ├── types/
│   │   └── task.ts                # TypeScript interfaces
│   ├── test/
│   │   └── setup.ts               # Test configuration
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Tailwind imports
├── .env.example
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Features

- Create new tasks with title, description, status, and due date
- Form validation with error messages
- Success confirmation with task details
- Responsive design
- Loading states
- TypeScript type safety

## API Integration

The frontend expects the backend API to be running at `http://localhost:8000/api` (configurable via `VITE_API_URL` environment variable).

### Expected API Endpoint

**POST /api/tasks/**

Creates a new task and returns the created task details.
