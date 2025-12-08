import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from '../components/TaskForm';

describe('TaskForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields', () => {
    render(<TaskForm onSubmit={mockOnSubmit} isLoading={false} errors={{}} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument();
  });

  it('displays field errors when provided', () => {
    const errors = {
      title: ['Title is required'],
      due_date: ['Invalid date format'],
    };

    render(<TaskForm onSubmit={mockOnSubmit} isLoading={false} errors={errors} />);

    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid date format')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} isLoading={false} errors={{}} />);

    await user.type(screen.getByLabelText(/title/i), 'Test Task');
    await user.type(screen.getByLabelText(/description/i), 'Test Description');
    await user.selectOptions(screen.getByLabelText(/status/i), 'in_progress');
    
    const dueDateInput = screen.getByLabelText(/due date/i);
    fireEvent.change(dueDateInput, { target: { value: '2024-12-31T17:00' } });

    await user.click(screen.getByRole('button', { name: /create task/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    const callArgs = mockOnSubmit.mock.calls[0][0];
    expect(callArgs.title).toBe('Test Task');
    expect(callArgs.description).toBe('Test Description');
    expect(callArgs.status).toBe('in_progress');
    expect(callArgs.due_date).toContain('2024-12-31');
  });
});