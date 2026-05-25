const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
  dueDate: { type: Date },
  position: { type: Number, default: 0 } // Useful for drag and drop sorting
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
