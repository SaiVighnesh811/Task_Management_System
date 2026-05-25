import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, LayoutDashboard } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const LandingPage = () => {
  const { theme, toggleTheme } = useAuthStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar */}
        <nav className="flex justify-between items-center py-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              <CheckCircle size={24} />
            </div>
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">TaskFlow</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">Login</Link>
            <Link to="/signup" className="btn-primary">Get Started 🚀</Link>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <motion.div 
          className="text-center mt-20 md:mt-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Manage tasks with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              Lightning Speed ⚡
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the most fluid, visually stunning, and interactive project management tool designed for modern teams.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="btn-primary py-4 px-8 text-lg rounded-2xl">
              Start for free 🔥
            </Link>
            <a href="#features" className="glass-card py-4 px-8 text-lg font-medium rounded-2xl hover:bg-gray-50 dark:hover:bg-dark-card transition-colors flex items-center justify-center gap-2">
              View Features
            </a>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div id="features" className="mt-32 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Real-time Syncing</h3>
            <p className="text-gray-500 dark:text-gray-400">Watch tasks update instantly across all your devices using advanced WebSocket technology.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
              <LayoutDashboard size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Kanban Boards</h3>
            <p className="text-gray-500 dark:text-gray-400">Drag and drop your tasks effortlessly. Organize your workflow seamlessly.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
              <Shield size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Secure & Reliable</h3>
            <p className="text-gray-500 dark:text-gray-400">Enterprise-grade security using JWT authentication and robust authorization rules.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
