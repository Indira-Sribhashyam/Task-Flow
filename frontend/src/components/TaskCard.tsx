'use client';

import { useTasks } from '@/context/TaskContext';
import { useAuth } from '@/context/AuthContext';
import { Task } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask, updateTask } = useTasks();
  const { user } = useAuth();
  const isCreator = user?._id === task.creator;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTask(task._id, { status: e.target.value as 'todo' | 'in-progress' | 'done' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-3 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800 break-words">{task.title}</h3>
        {isCreator && (
          <div className="flex space-x-2 text-gray-400">
            <button onClick={() => onEdit(task)} className="hover:text-blue-500">
              <Pencil size={16} />
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this task?')) {
                  deleteTask(task._id);
                }
              }}
              className="hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 line-clamp-3">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between text-xs mt-4">
        <div className="flex items-center space-x-1 font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">
          <span className="w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold">
            {task.assignedTo ? task.assignedTo.charAt(0).toUpperCase() : '?'}
          </span>
          <span>{task.assignedTo || 'Unassigned'}</span>
        </div>
        
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="bg-transparent border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}
