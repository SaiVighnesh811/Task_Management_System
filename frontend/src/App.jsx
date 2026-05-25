import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/useAuthStore';
import io from 'socket.io-client';
import useTaskStore from './store/useTaskStore';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Layout from './components/Layout';

function App() {
  const { user, theme } = useAuthStore();
  const { updateTaskRealtime, addTaskRealtime, deleteTaskRealtime } = useTaskStore();

  useEffect(() => {
    // Set initial theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Socket setup
  useEffect(() => {
    if (user) {
      const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
      
      socket.emit('join_user_room', user._id);

      socket.on('task_created', (newTask) => addTaskRealtime(newTask));
      socket.on('task_updated', (updatedTask) => updateTaskRealtime(updatedTask));
      socket.on('task_deleted', (taskId) => deleteTaskRealtime(taskId));

      return () => socket.disconnect();
    }
  }, [user]);

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
