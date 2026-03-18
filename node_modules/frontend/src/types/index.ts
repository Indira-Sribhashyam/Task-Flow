export interface User {
  _id: string;
  email: string;
}

export interface AuthResponse {
  _id: string;
  email: string;
  token: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  creator: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreateData {
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  assignedTo?: string;
}

export interface TaskUpdateData {
  title?: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
}
