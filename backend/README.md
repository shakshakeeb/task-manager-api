# Task Manager API

A Django REST Framework API for managing caseworker tasks.

## Tech Stack

- **Framework:** Django 4.2 + Django REST Framework
- **Database:** PostgreSQL
- **Testing:** Pytest

## Setup

### Prerequisites

- Python 3.10+
- PostgreSQL

### Installation

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. Create the PostgreSQL database:
   ```bash
   createdb task_manager
   ```

6. Run migrations:
   ```bash
   python manage.py migrate
   ```

7. Start the development server:
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000`.

## API Documentation

### Create Task

Creates a new task in the system.

**Endpoint:** `POST /api/tasks/`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | The task title (max 255 characters) |
| description | string | No | Optional task description |
| status | string | Yes | One of: `pending`, `in_progress`, `completed` |
| due_date | datetime | Yes | ISO 8601 format (e.g., `2024-12-31T17:00:00Z`) |

**Example Request:**

```json
{
  "title": "Review case documents",
  "description": "Review all submitted documents for case #12345",
  "status": "pending",
  "due_date": "2024-12-31T17:00:00Z"
}
```

**Success Response (201 Created):**

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

**Error Response (400 Bad Request):**

```json
{
  "errors": {
    "title": ["This field is required."],
    "due_date": ["Datetime has wrong format."]
  }
}
```

### Status Options

| Value | Display Name |
|-------|--------------|
| `pending` | Pending |
| `in_progress` | In Progress |
| `completed` | Completed |

## Running Tests

```bash
pytest
```

To run tests with coverage:

```bash
pytest --cov=tasks
```

## Project Structure

```
backend/
├── config/
│   ├── settings.py      # Django settings
│   ├── urls.py          # Root URL configuration
│   └── wsgi.py
├── tasks/
│   ├── models.py        # Task model
│   ├── serializers.py   # DRF serializers
│   ├── views.py         # API views
│   ├── urls.py          # Task URL routes
│   └── tests.py         # Unit tests
├── manage.py
├── requirements.txt
├── pytest.ini
└── .env.example
```
