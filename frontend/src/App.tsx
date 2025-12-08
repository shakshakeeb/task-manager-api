import { useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskConfirmation } from './components/TaskConfirmation';
import { createTask } from './services/api';
import type { Task, TaskFormData, ApiError } from './types/task';

function App() {
  const [createdTask, setCreatedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (data: TaskFormData) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await createTask(data);
      setCreatedTask(response.task);
    } catch (error) {
      const apiError = error as ApiError;
      setErrors(apiError.errors || { general: ['An unexpected error occurred'] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAnother = () => {
    setCreatedTask(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HMCTS Task Manager</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create and manage caseworker tasks
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {createdTask ? (
            <TaskConfirmation task={createdTask} onCreateAnother={handleCreateAnother} />
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Task</h2>
              <TaskForm onSubmit={handleSubmit} isLoading={isLoading} errors={errors} />
            </>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          HMCTS Case Management System
        </p>
      </div>
    </div>
  );
}

export default App;
