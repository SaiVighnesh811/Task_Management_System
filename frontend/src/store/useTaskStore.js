import { create } from 'zustand';
import axios from 'axios';

const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, config);
      set({ tasks: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error(error);
    }
  },

  createTask: async (taskData) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskData, config);
      set((state) => {
        if (state.tasks.find(t => t._id === data._id)) return state;
        return { tasks: [...state.tasks, data] };
      });
    } catch (error) {
      console.error(error);
    }
  },

  updateTaskStatus: async (taskId, status) => {
    // Optimistic UI updates
    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.map(t => t._id === taskId ? { ...t, status } : t)
    }));

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, { status }, config);
    } catch (error) {
      console.error('Update failed, reverting state');
      set({ tasks: previousTasks });
    }
  },

  updateTaskRealtime: (updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map(t => t._id === updatedTask._id ? updatedTask : t)
    }));
  },

  addTaskRealtime: (newTask) => {
    set((state) => {
      if (state.tasks.find(t => t._id === newTask._id)) return state;
      return { tasks: [...state.tasks, newTask] };
    });
  },

  deleteTaskRealtime: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter(t => t._id !== taskId)
    }));
  }
}));

export default useTaskStore;
