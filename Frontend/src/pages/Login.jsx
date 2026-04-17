import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate Login Logic
    setTimeout(() => {
      console.log('Login Success:', formData.email);
      // Store user info in localStorage
      const userName = formData.email.split('@')[0];
      localStorage.setItem('user', JSON.stringify({ name: userName, email: formData.email }));
      navigate('/dashboard');
    }, 1200);
  };

  const inputClasses = "w-full bg-white/5 border border-charcoal/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lime-neon/50 transition-all font-medium text-charcoal placeholder:text-charcoal/30";
  const labelClasses = "block text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-charcoal-muted mb-2 ml-4";

  return (
    <div className="min-h-screen bg-ivory pt-40 pb-20 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-lime-neon/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />
      
      <div className="w-full max-w-xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass p-12 md:p-16 rounded-[48px] shadow-[40px_40px_100px_-20px_rgba(0,0,0,0.05)] border-white/60 border-2"
        >
          <header className="mb-12 text-center">
            <div className="mono-label mb-4">Sentiq Platform Login</div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 italic">Welcome <span className="text-lime-neon">Back</span></h1>
            <p className="text-charcoal-muted font-medium text-lg">Log in to your executive dashboard.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div>
              <label className={labelClasses}>Work Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/30" />
                <input 
                  required 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com" 
                  className={`${inputClasses} pl-14`} 
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2 px-4">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-charcoal-muted">Password</label>
                <Link to="#" className="text-[10px] font-mono uppercase tracking-widest text-lime-neon font-bold hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/30" />
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className={`${inputClasses} pl-14`} 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-charcoal text-white py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-4 hover:bg-black transition-all shadow-lg group relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-lime-neon rounded-full animate-spin" />
                ) : (
                  <>
                    Log in
                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500 ease-out" />
                  </>
                )}
              </button>
              
              <p className="text-center mt-10 text-sm text-charcoal-muted font-medium">
                Don't have an account? <Link to="/signup" className="text-charcoal font-bold underline decoration-lime-neon decoration-4 underline-offset-4">Sign up</Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
