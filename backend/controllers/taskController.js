const Task = require('../models/Task');

// @desc    Get logged in user tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    // Sort tasks by position or creation date
    const tasks = await Task.find({ user: req.user.id }).sort('position'); 
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate, position } = req.body;

    const task = new Task({
      user: req.user.id,
      title,
      description,
      priority,
      status,
      dueDate,
      position: position || 0
    });

    const createdTask = await task.save();

    // Broadcast socket event in user's room
    if (req.io) {
      req.io.to(req.user.id).emit('task_created', createdTask);
    }

    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate, position } = req.body;

    const task = await Task.findById(req.params.id);

    if (task) {
      // Check for user
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      task.title = title || task.title;
      task.description = description || task.description;
      task.priority = priority || task.priority;
      task.status = status || task.status;
      task.dueDate = dueDate || task.dueDate;
      task.position = position !== undefined ? position : task.position;

      const updatedTask = await task.save();

      // Realtime update
      if (req.io) {
        req.io.to(req.user.id).emit('task_updated', updatedTask);
      }

      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      // Check for user
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      await task.deleteOne();

      // Realtime update
      if (req.io) {
        req.io.to(req.user.id).emit('task_deleted', req.params.id);
      }

      res.json({ message: 'Task removed' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
