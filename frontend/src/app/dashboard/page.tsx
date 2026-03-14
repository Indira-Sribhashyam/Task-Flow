'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTasks } from '@/context/TaskContext';
import { Task } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import { LogOut, Plus } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { tasks, loading, error, fetchTasks } = useTasks();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateNew = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Group tasks by status
  const columns = {
    todo: tasks.filter((t) => t.status === 'todo'),
    'in-progress': tasks.filter((t) => t.status === 'in-progress'),
    done: tasks.filter((t) => t.status === 'done'),
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Team Board
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:inline-block">
                Welcome, {user?.email}
              </span>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors flex items-center space-x-1"
                title="Logout"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline-block text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center shadow-sm transition-colors text-sm font-medium"
            >
              <Plus size={18} className="mr-1" /> New Task
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
              {error}
            </div>
          )}

          {loading && tasks.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* To Do Column */}
              <div className="bg-gray-100 p-4 rounded-xl min-h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-700 uppercase tracking-wide text-sm">To Do</h3>
                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    {columns.todo.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {columns.todo.map((task) => (
                    <TaskCard key={task._id} task={task} onEdit={handleEdit} />
                  ))}
                  {columns.todo.length === 0 && (
                    <div className="text-center p-4 text-sm text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
                      No tasks yet
                    </div>
                  )}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="bg-gray-100 p-4 rounded-xl min-h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-700 uppercase tracking-wide text-sm">In Progress</h3>
                  <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    {columns['in-progress'].length}
                  </span>
                </div>
                <div className="space-y-3">
                  {columns['in-progress'].map((task) => (
                    <TaskCard key={task._id} task={task} onEdit={handleEdit} />
                  ))}
                  {columns['in-progress'].length === 0 && (
                    <div className="text-center p-4 text-sm text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
                      Drop tasks here
                    </div>
                  )}
                </div>
              </div>

              {/* Done Column */}
              <div className="bg-gray-100 p-4 rounded-xl min-h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-700 uppercase tracking-wide text-sm">Done</h3>
                  <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    {columns.done.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {columns.done.map((task) => (
                    <TaskCard key={task._id} task={task} onEdit={handleEdit} />
                  ))}
                  {columns.done.length === 0 && (
                    <div className="text-center p-4 text-sm text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
                      Finish tasks to see them here
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
      />
    </ProtectedRoute>
  );
}
