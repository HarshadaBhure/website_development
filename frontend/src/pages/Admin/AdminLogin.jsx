import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Mail, AlertCircle, LogIn, ShieldCheck, UserPlus, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/Common/SEO';
import api from '../../services/api';

export default function AdminLogin() {
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  const [regData, setRegData] = useState({ email: '', username: '', full_name: '', password: '', confirm_password: '' });
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [regSubmitting, setRegSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginSubmitting(true);
    setLoginError('');
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setLoginError(err.response?.data?.detail || 'Invalid admin credentials. Please try again.');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError('');
    if (regData.password !== regData.confirm_password) {
      setRegError('Passwords do not match.');
      return;
    }
    if (regData.password.length < 8) {
      setRegError('Password must be at least 8 characters.');
      return;
    }
    setRegSubmitting(true);
    try {
      await api.post('/auth/register', {
        email: regData.email,
        username: regData.username,
        full_name: regData.full_name,
        password: regData.password,
      });
      setRegSuccess(true);
    } catch (err) {
      setRegError(err.response?.data?.detail || 'Registration failed. Please check your details and try again.');
    } finally {
      setRegSubmitting(false);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-cyan placeholder:text-slate-400";

  return (
    <>
      <SEO title="Admin Portal | Swaraj Asia Technologies" description="Admin portal authentication." />
      <section className="min-h-[88vh] flex items-center justify-center py-16 px-4 bg-white">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="relative">
            {/* Header */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-brand-cyan mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="font-display text-2xl font-bold text-slate-900">Admin Portal</h1>
              <p className="text-xs text-slate-500">Restricted to official Swaraj Asia company email accounts.</p>
            </div>

            {/* Tab Toggle */}
            <div className="flex rounded-xl bg-slate-100 border border-slate-200 p-1 mb-6">
              <button
                onClick={() => { setMode('login'); setLoginError(''); setRegError(''); setRegSuccess(false); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${mode === 'login' ? 'bg-brand-cyan text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </button>
              <button
                onClick={() => { setMode('register'); setLoginError(''); setRegError(''); setRegSuccess(false); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${mode === 'register' ? 'bg-brand-cyan text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <UserPlus className="w-3.5 h-3.5" /> Create Account
              </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.div key="login" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                  {loginError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 mb-4">
                      <AlertCircle className="w-4 h-4 shrink-0" /><span>{loginError}</span>
                    </div>
                  )}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input type="text" required placeholder="admin_username" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <button type="submit" disabled={loginSubmitting}
                      className="btn-cyan w-full py-3 text-slate-900 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
                      {loginSubmitting ? 'Authenticating...' : <><LogIn className="w-4 h-4" /><span>Sign In to Dashboard</span></>}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="register" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                  {regSuccess ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="font-display font-bold text-slate-900 text-xl">Account Created!</h3>
                      <p className="text-slate-600 text-sm">Your admin account has been created. You can now sign in.</p>
                      <button onClick={() => { setMode('login'); setRegSuccess(false); }} className="btn-cyan px-5 py-2.5 font-semibold text-sm">
                        Go to Sign In
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-slate-800 text-[11px] mb-4 flex items-start gap-2 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-cyan" />
                        <span>Only <strong>@swarajasia.com</strong> email addresses are permitted. Enforced server-side.</span>
                      </div>
                      {regError && (
                        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 mb-4">
                          <AlertCircle className="w-4 h-4 shrink-0" /><span>{regError}</span>
                        </div>
                      )}
                      <form onSubmit={handleRegister} className="space-y-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Company Email *</label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input type="email" required placeholder="you@swarajasia.com" value={regData.email} onChange={(e) => setRegData(p => ({ ...p, email: e.target.value }))} className={inputClass} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input type="text" placeholder="Your full name" value={regData.full_name} onChange={(e) => setRegData(p => ({ ...p, full_name: e.target.value }))} className={inputClass} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Username *</label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input type="text" required placeholder="admin_username" value={regData.username} onChange={(e) => setRegData(p => ({ ...p, username: e.target.value }))} className={inputClass} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input type="password" required placeholder="Min. 8 characters" value={regData.password} onChange={(e) => setRegData(p => ({ ...p, password: e.target.value }))} className={inputClass} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password *</label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input type="password" required placeholder="Repeat password" value={regData.confirm_password} onChange={(e) => setRegData(p => ({ ...p, confirm_password: e.target.value }))} className={inputClass} />
                          </div>
                        </div>
                        <button type="submit" disabled={regSubmitting}
                          className="btn-cyan w-full py-3 text-slate-900 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-1">
                          {regSubmitting ? 'Creating Account...' : <><UserPlus className="w-4 h-4" /><span>Create Admin Account</span></>}
                        </button>
                      </form>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
