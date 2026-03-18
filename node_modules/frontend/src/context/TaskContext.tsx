'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task, TaskCreateData, TaskUpdateData } from '@/types';
import api from '@/lib/api';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (data: TaskCreateData) => Promise<void>;
  updateTask: (id: string, data: TaskUpdateData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (data: TaskCreateData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/tasks', data);
      setTasks((prev) => [...prev, response.data]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, data: TaskUpdateData) => {
    setError(null);
    try {
      const response = await api.put(`/tasks/${id}`, data);
      setTasks((prev) => prev.map((task) => (task._id === id ? response.data : task)));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    setError(null);
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
