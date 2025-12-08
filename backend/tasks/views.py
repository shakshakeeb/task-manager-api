from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


@api_view(['POST'])
def create_task(request):
    """
    Create a new task.
    
    Request Body:
        - title (string, required): The task title
        - description (string, optional): Task description
        - status (string, required): One of 'pending', 'in_progress', 'completed'
        - due_date (datetime, required): ISO 8601 format (e.g., '2024-12-31T17:00:00Z')
    
    Returns:
        201: Task created successfully with task details
        400: Validation error with error messages
    """
    serializer = TaskSerializer(data=request.data)
    
    if serializer.is_valid():
        task = serializer.save()
        return Response(
            {
                'message': 'Task created successfully',
                'task': TaskSerializer(task).data
            },
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        {'errors': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST
    )
