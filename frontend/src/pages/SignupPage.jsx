import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { CheckCircle, Mail, Lock, User } from 'lucide-react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created successfully! 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex justify-start mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <CheckCircle size={24} />
              </div>
              <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">TaskFlow</span>
            </Link>
          </div>
          
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Create Account ✨</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">Join us and supercharge your team's workflow.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white transition-all shadow-sm text-lg"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white transition-all shadow-sm text-lg"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white transition-all shadow-sm text-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl py-4 rounded-xl mt-4 disabled:opacity-70 text-lg font-bold transition-all"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </motion.button>
          </form>

          <p className="mt-8 text-gray-600 dark:text-gray-400 text-lg">
            Already have an account? <Link to="/login" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">Sign in instead</Link>
          </p>
        </motion.div>
      </div>

      {/* Left Column: Moving Graphics / GIF-like animations */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-dark-card dark:via-dark-bg dark:to-purple-900/20 relative overflow-hidden items-center justify-center p-12">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

        {/* Central Illustration Area */}
        <div className="relative z-10 w-full max-w-lg aspect-square">
          {/* Main Floating Card */}
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="absolute inset-0 m-auto w-64 h-72 glass-card rounded-3xl shadow-2xl flex flex-col p-6 items-center justify-center border-t border-l border-white/40 bg-white/70 dark:bg-dark-card/70"
          >
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/40 rounded-3xl flex items-center justify-center mb-6 transform rotate-12">
              <span className="text-3xl">🔥</span>
            </div>
            <h3 className="font-bold text-xl dark:text-white mb-2 text-center text-gray-800">Super Fast</h3>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">Everything syncs instantly without delays.</p>
          </motion.div>

          {/* Floating Emoji 1 */}
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute top-12 left-12 text-6xl drop-shadow-xl"
          >
            💡
          </motion.div>

          {/* Floating Emoji 2 */}
          <motion.div 
            animate={{ 
              y: [0, 40, 0],
              x: [0, -20, 0],
              rotate: [0, 20, -20, 0]
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-4 text-7xl drop-shadow-xl"
          >
            🤩
          </motion.div>

          {/* Floating Emoji 3 */}
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute top-1/3 -left-8 text-5xl drop-shadow-xl z-20"
          >
            ⚡
          </motion.div>
        </div>
      </div>
    
    </div>
  );
};

export default SignupPage;
