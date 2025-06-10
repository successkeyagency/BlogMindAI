import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { axios, setToken } = useAppContext();

  // Pre-filled demo credentials
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('a12345678910');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/admin/login', { email, password });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = data.token;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 px-4">
      <section className="w-full max-w-md bg-white/5 border border-white/10 text-white p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            🔐 <span className="text-primary">Admin</span> Login
          </h1>
          <p className="text-white/70 text-sm">Use demo credentials to explore</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded hover:bg-primary/90 transition-all"
          >
            🔓 Login as Demo
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
