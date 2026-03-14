import { Response } from 'express';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get all tasks
// @route   GET /tasks
// @access  Private
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a task
// @route   POST /tasks
// @access  Private
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, status, assignedTo } = req.body;

  try {
    if (!title) {
      res.status(400).json({ message: 'Please add a title' });
      return;
    }

    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'todo',
      assignedTo: assignedTo || '',
      creator: req.user?.id,
    });

    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /tasks/:id
// @access  Private
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Only task creator can edit
    if (task.creator.toString() !== req.user?.id) {
      res.status(401).json({ message: 'User not authorized to update this task' });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /tasks/:id
// @access  Private
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Only task creator can delete
    if (task.creator.toString() !== req.user?.id) {
      res.status(401).json({ message: 'User not authorized to delete this task' });
      return;
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
