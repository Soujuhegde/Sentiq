import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Globe, Building2, Briefcase, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    jobTitle: '',
    companyName: '',
    companySize: '',
    industry: '',
    country: '',
    agreeTerms: false
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: 'Weak',
    color: 'bg-red-500'
  });

  // Simple password strength logic
  useEffect(() => {
    const password = formData.password;
    let score = 0;
    if (password.length > 6) score += 1;
    if (password.length > 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let label = 'Weak';
    let color = 'bg-red-500';
    
    if (score >= 4) {
      label = 'Strong';
      color = 'bg-lime-neon';
    } else if (score >= 2) {
      label = 'Medium';
      color = 'bg-yellow-500';
    }

    setPasswordStrength({ score, label, color });
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send data to the backend here
    console.log('Signup data:', formData);
    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify({ name: formData.firstName, email: formData.email }));
    navigate('/dashboard');
  };

  const inputClasses = "w-full bg-white/5 border border-charcoal/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lime-neon/50 transition-all font-medium text-charcoal placeholder:text-charcoal/30";
  const labelClasses = "block text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-charcoal-muted mb-2 ml-4";

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Decorative Neural Background Elements */}
      <div className="absolute top-40 -left-20 w-80 h-80 bg-lime-neon/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 md:p-16 rounded-[48px] shadow-[40px_40px_100px_-20px_rgba(0,0,0,0.05)] border-white/60 border-2"
        >
          <header className="mb-12 text-center md:text-left">
            <div className="mono-label mb-4">Sentiq Platform</div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">Create your <span className="text-lime-neon italic underline decoration-4 underline-offset-8">Account</span></h1>
            <p className="text-charcoal-muted font-medium text-lg">Join the world's most advanced customer sentiment platform.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>First Name</label>
                <input 
                  required 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g., Alex" 
                  className={inputClasses} 
                />
              </div>
              <div>
                <label className={labelClasses}>Last Name</label>
                <input 
                  required 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g., Chen" 
                  className={inputClasses} 
                />
              </div>
            </div>

            {/* Email & Password Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Work Email</label>
                <input 
                  required 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com" 
                  className={inputClasses} 
                />
                <p className="text-[10px] text-charcoal-muted mt-2 ml-4 opacity-50">Hint: Use your company email</p>
              </div>
              <div>
                <label className={labelClasses}>Password</label>
                <div className="relative">
                  <input 
                    required 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className={inputClasses} 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Strength Indicator */}
                <div className="mt-3 px-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-charcoal-muted opacity-50">Password Strength</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${passwordStrength.label === 'Strong' ? 'text-lime-neon' : ''}`}>{passwordStrength.label}</span>
                  </div>
                  <div className="h-1 w-full bg-charcoal/5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${passwordStrength.color}`}
                      initial={{ width: '0%' }}
                      animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Details Area */}
            <div className="h-px w-full bg-charcoal/5 my-10" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Job Title</label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/30" />
                  <input 
                    required 
                    type="text" 
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g., Head of Product" 
                    className={`${inputClasses} pl-14`} 
                  />
                </div>
              </div>
              <div>
                <label className={labelClasses}>Company Name</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/30" />
                  <input 
                    required 
                    type="text" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g., NexaTech" 
                    className={`${inputClasses} pl-14`} 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClasses}>Company Size</label>
                <select 
                  required 
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className={`${inputClasses} text-sm appearance-none cursor-pointer`}
                >
                  <option value="">Range...</option>
                  <option value="1-10">1–10 employees</option>
                  <option value="11-50">11–50 employees</option>
                  <option value="51-200">51–200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Industry</label>
                <select 
                  required 
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className={`${inputClasses} text-sm appearance-none cursor-pointer`}
                >
                  <option value="">Sector...</option>
                  <option value="SaaS">SaaS / Cloud</option>
                  <option value="Retail">Retail & Ecommerce</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Fintech / Finance</option>
                  <option value="Other">Other Strategic Sector</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Country</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/30" />
                  <select 
                    required 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`${inputClasses} pl-14 text-sm appearance-none cursor-pointer`}
                  >
                    <option value="">Region...</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Global / Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-1">
                  <input 
                    type="checkbox" 
                    required 
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="appearance-none w-5 h-5 rounded-lg border-2 border-charcoal/10 checked:bg-lime-neon checked:border-lime-neon transition-all" 
                  />
                  <ShieldCheck size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-charcoal opacity-0 group-hover:opacity-20 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs text-charcoal-muted font-medium mt-0.5">
                  I agree to the <span className="text-charcoal underline decoration-charcoal/20">Terms of Service</span> and <span className="text-charcoal underline decoration-charcoal/20">Privacy Policy</span>. I acknowledge this is a business intelligence workspace.
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button 
                type="submit"
                className="w-full bg-charcoal text-white py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-4 hover:bg-black transition-all shadow-lg group"
              >
                Create Account
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500 ease-out" />
              </button>
              <p className="text-center mt-8 text-sm text-charcoal-muted font-medium">
                Already registered? <Link to="/login" className="text-charcoal font-bold underline decoration-lime-neon decoration-4 underline-offset-4">Log in</Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
