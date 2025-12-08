import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskConfirmation } from '../components/TaskConfirmation';
import { Task } from '../types/task';

describe('TaskConfirmation', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending',
    due_date: '2024-12-31T17:00:00Z',
    created_at: '2024-12-08T10:00:00Z',
    updated_at: '2024-12-08T10:00:00Z',
  };

  const mockOnCreateAnother = vi.fn();

  beforeEach(() => {
    mockOnCreateAnother.mockClear();
  });

  it('renders success message', () => {
    render(<TaskConfirmation task={mockTask} onCreateAnother={mockOnCreateAnother} />);

    expect(screen.getByText('Task created successfully!')).toBeInTheDocument();
  });

  it('displays task details correctly', () => {
    render(<TaskConfirmation task={mockTask} onCreateAnother={mockOnCreateAnother} />);

    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('shows placeholder when description is empty', () => {
    const taskWithoutDescription = { ...mockTask, description: '' };
    render(<TaskConfirmation task={taskWithoutDescription} onCreateAnother={mockOnCreateAnother} />);

    expect(screen.getByText('No description provided')).toBeInTheDocument();
  });

  it('displays correct status badge for pending', () => {
    render(<TaskConfirmation task={mockTask} onCreateAnother={mockOnCreateAnother} />);

    const statusBadge = screen.getByText('Pending');
    expect(statusBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('displays correct status badge for in_progress', () => {
    const inProgressTask = { ...mockTask, status: 'in_progress' as const };
    render(<TaskConfirmation task={inProgressTask} onCreateAnother={mockOnCreateAnother} />);

    const statusBadge = screen.getByText('In Progress');
    expect(statusBadge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('displays correct status badge for completed', () => {
    const completedTask = { ...mockTask, status: 'completed' as const };
    render(<TaskConfirmation task={completedTask} onCreateAnother={mockOnCreateAnother} />);

    const statusBadge = screen.getByText('Completed');
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('calls onCreateAnother when button is clicked', async () => {
    const user = userEvent.setup();
    render(<TaskConfirmation task={mockTask} onCreateAnother={mockOnCreateAnother} />);

    await user.click(screen.getByRole('button', { name: /create another task/i }));

    expect(mockOnCreateAnother).toHaveBeenCalledTimes(1);
  });

  it('formats dates correctly', () => {
    render(<TaskConfirmation task={mockTask} onCreateAnother={mockOnCreateAnother} />);

    // Check that dates are formatted (the exact format depends on locale)
    // We just check that the raw ISO string is not displayed
    expect(screen.queryByText('2024-12-31T17:00:00Z')).not.toBeInTheDocument();
    expect(screen.queryByText('2024-12-08T10:00:00Z')).not.toBeInTheDocument();
  });
});
