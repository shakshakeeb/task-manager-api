import pytest
from rest_framework import status
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    """Return an API client for testing."""
    return APIClient()


@pytest.mark.django_db
class TestCreateTask:
    """
    Unit tests for the POST /api/tasks/ endpoint.
    Tests cover the happy path and key validation scenarios.
    """
    
    def test_create_task_success(self, api_client):
        """
        Test successful task creation with all valid fields.
        Verifies that:
        - API returns 201 Created status
        - Response includes success message
        - Task data is correctly stored and returned
        - Task ID is generated
        """
        task_data = {
            'title': 'Complete technical assessment',
            'description': 'Build a task management API',
            'status': 'pending',
            'due_date': '2024-12-31T17:00:00Z'
        }
        
        response = api_client.post('/api/tasks/', task_data, format='json')
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['message'] == 'Task created successfully'
        assert response.data['task']['title'] == task_data['title']
        assert 'id' in response.data['task']
    
    def test_create_task_missing_title(self, api_client):
        """
        Test that task creation fails when title is not provided.
        Title is a required field - API should return 400 Bad Request
        with appropriate error message for the title field.
        """
        task_data = {
            'status': 'pending',
            'due_date': '2024-12-31T17:00:00Z'
        }
        
        response = api_client.post('/api/tasks/', task_data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'title' in response.data['errors']
    
    def test_create_task_empty_title(self, api_client):
        """
        Test that task creation fails when title is empty or whitespace.
        Even if title field is present, it must contain actual content.
        API should reject whitespace-only titles with 400 Bad Request.
        """
        task_data = {
            'title': '   ',
            'status': 'pending',
            'due_date': '2024-12-31T17:00:00Z'
        }
        
        response = api_client.post('/api/tasks/', task_data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'title' in response.data['errors']
    
    def test_create_task_missing_due_date(self, api_client):
        """
        Test that task creation fails when due_date is not provided.
        Due date is a required field - API should return 400 Bad Request
        with appropriate error message for the due_date field.
        """
        task_data = {
            'title': 'Task without due date',
            'status': 'pending'
        }
        
        response = api_client.post('/api/tasks/', task_data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'due_date' in response.data['errors']
    
    def test_create_task_invalid_status(self, api_client):
        """
        Test that task creation fails with an invalid status value.
        Status must be one of: 'pending', 'in_progress', 'completed'.
        Any other value should return 400 Bad Request with status error.
        """
        task_data = {
            'title': 'Task with invalid status',
            'status': 'invalid_status',
            'due_date': '2024-12-31T17:00:00Z'
        }
        
        response = api_client.post('/api/tasks/', task_data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'status' in response.data['errors']