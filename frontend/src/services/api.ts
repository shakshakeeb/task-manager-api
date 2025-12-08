import axios, { AxiosError } from 'axios';
import type { TaskFormData, ApiResponse, ApiError } from '../types/task';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createTask = async (taskData: TaskFormData): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>('/tasks/', taskData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data?.errors) {
        throw axiosError.response.data;
      }
    }
    throw { errors: { general: ['An unexpected error occurred. Please try again.'] } };
  }
};
