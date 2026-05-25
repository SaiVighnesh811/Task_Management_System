import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('userInfo')) || null,
  theme: localStorage.getItem('theme') || 'light',
  
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),

  login: async (email, password) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    set({ user: data });
  },

  register: async (name, email, password) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    set({ user: data });
  },

  logout: () => {
    localStorage.removeItem('userInfo');
    set({ user: null });
  }
}));

export default useAuthStore;
