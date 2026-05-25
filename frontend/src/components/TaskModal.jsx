import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import useTaskStore from '../store/useTaskStore';
import toast from 'react-hot-toast';

const TaskModal = ({ isOpen, onClose }) => {
  const { createTask } = useTaskStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ ...formData, status: 'todo' });
      toast.success('Task created successfully! 🎉');
      onClose();
      setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-dark-card w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-gray-200 dark:border-dark-border"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-dark-border">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Task ✨</h2>
                <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Task Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-[#151e2d] focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-all"
                    placeholder="E.g., Design the Landing Page"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea 
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-[#151e2d] focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-all resize-none"
                    placeholder="Add details about this task..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                    <select 
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-[#151e2d] focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-all appearance-none"
                    >
                      <option value="low">🟡 Low</option>
                      <option value="medium">🟠 Medium</option>
                      <option value="high">🔴 High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                    <input 
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-[#151e2d] focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-dark-border flex justify-end gap-3">
                  <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary py-2.5 px-6">
                    Create Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

export default TaskModal;
