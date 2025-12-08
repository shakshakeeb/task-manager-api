# HMCTS Task Manager

A full-stack task management system for HMCTS caseworkers to create and track their tasks.

## Overview

This application provides a simple interface for caseworkers to create tasks with the following properties:
- **Title** (required)
- **Description** (optional)
- **Status** (pending, in progress, completed)
- **Due date/time** (required)

## Tech Stack

### Backend
- **Framework:** Django 4.2 + Django REST Framework
- **Database:** PostgreSQL
- **Testing:** Pytest

### Frontend
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library

## Project Structure

```
task-manager/
├── backend/
│   ├── config/          # Django project settings
│   ├── tasks/           # Tasks app (models, views, serialisers, tests)
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API client
│   │   └── types/       # TypeScript interfaces
│   ├── package.json
│   └── README.md
└── README.md
```

## Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Create database
createdb task_manager

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start development server
npm run dev
```

## Running Tests

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm run test:run
```

## API Documentation

### Create Task

**Endpoint:** `POST /api/tasks/`

**Request Body:**
```json
{
  "title": "Review case documents",
  "description": "Review all submitted documents for case #12345",
  "status": "pending",
  "due_date": "2024-12-31T17:00:00Z"
}
```

**Success Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Review case documents",
    "description": "Review all submitted documents for case #12345",
    "status": "pending",
    "due_date": "2024-12-31T17:00:00Z",
    "created_at": "2024-12-08T10:30:00Z",
    "updated_at": "2024-12-08T10:30:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "errors": {
    "title": ["This field is required."]
  }
}
```

### Status Options

| Value | Display |
|-------|---------|
| `pending` | Pending |
| `in_progress` | In Progress |
| `completed` | Completed |
