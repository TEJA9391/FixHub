import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Lock, ChevronRight, Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('phone'); // phone, otp, profile
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    toast.success('OTP sent successfully!');
    setStep('otp');
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.join('').length < 4) {
      toast.error('Please enter complete OTP');
      return;
    }
    toast.success('Verified successfully!');
    setStep('profile');
  };

  return (
    <div className="min-h-screen bg-white font-inter flex relative z-[100]">
      {/* Left side: Premium Image Area */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=1200" 
          alt="Premium Home Service" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute inset-x-0 bottom-0 p-16 space-y-6 text-white">
           <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl mb-8">
             <Sparkles size={32} className="text-white" />
           </div>
           <h1 className="text-5xl font-black tracking-tight leading-[1.1]">
             Premium services,<br/>delivered to your door.
           </h1>
           <p className="text-lg text-white/70 font-medium max-w-md leading-relaxed">
             Join over 2 million satisfied customers who trust FixHub for their daily home and beauty needs.
           </p>
           
           <div className="flex items-center gap-6 pt-8 mt-8 border-t border-white/20">
              <div className="flex -space-x-4">
                 <img src="https://i.pravatar.cc/100?img=1" className="w-12 h-12 rounded-full border-2 border-black" />
                 <img src="https://i.pravatar.cc/100?img=2" className="w-12 h-12 rounded-full border-2 border-black" />
                 <img src="https://i.pravatar.cc/100?img=3" className="w-12 h-12 rounded-full border-2 border-black" />
              </div>
              <div>
                 <div className="flex gap-1 text-yellow-400 text-lg">★★★★★</div>
                 <p className="text-sm font-bold text-white/80 mt-1">4.9/5 from 500k+ reviews</p>
              </div>
           </div>
        </div>
      </div>

      {/* Right side: Clean Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative bg-white">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 p-3 rounded-full hover:bg-gray-50 transition-colors group flex items-center gap-2"
        >
           <ArrowLeft size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
           <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-900">Back</span>
        </button>

        <div className="w-full max-w-md">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Welcome to FixHub</h2>
            <p className="text-gray-500 font-medium">Please enter your details to continue.</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'phone' && (
              <motion.form
                key="phone"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handlePhoneSubmit}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
                  <div className="relative flex items-center bg-gray-50 border border-gray-100 rounded-2xl focus-within:border-[#0c831f] focus-within:ring-4 focus-within:ring-[#0c831f]/10 transition-all overflow-hidden group">
                    <div className="px-5 text-gray-900 font-bold border-r border-gray-200 group-focus-within:border-[#0c831f]/30 transition-colors">+91</div>
                    <input 
                      type="tel" 
                      maxLength="10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="98765 43210"
                      className="w-full bg-transparent px-5 py-4 text-lg font-bold outline-none placeholder:text-gray-300 text-gray-900"
                      autoFocus
                    />
                  </div>
                </div>

                <button className="bg-gray-900 text-white w-full py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20 hover:scale-[1.02] active:scale-95 transition-all group">
                  <span className="font-bold">Continue Securely</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            )}

            {step === 'otp' && (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleOtpSubmit}
                className="space-y-10"
              >
                <div className="space-y-8">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Enter the 4-digit verification code sent to
                    </p>
                    <p className="text-gray-900 font-black text-lg mt-1">+91 {phone}</p>
                  </div>
                  <div className="flex gap-4">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="tel"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value.replace(/\D/g, ''))}
                        className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-2xl text-center text-2xl font-black focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 focus:bg-white outline-none transition-all text-gray-900"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="bg-[#0c831f] text-white w-full py-4 rounded-2xl font-bold shadow-xl shadow-[#0c831f]/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Verify Account
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep('phone')}
                    className="w-full text-[12px] font-bold text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    Entered wrong number?
                  </button>
                </div>
              </motion.form>
            )}

            {step === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-8"
              >
                <div className="w-20 h-20 rounded-full bg-green-50 text-[#0c831f] mx-auto flex items-center justify-center shadow-inner relative">
                  <motion.div 
                     initial={{ scale: 0 }} 
                     animate={{ scale: 1 }} 
                     transition={{ delay: 0.2, type: 'spring' }}
                  >
                     <ShieldCheck size={40} />
                  </motion.div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Verified successfully!</h2>
                  <p className="text-gray-500 mt-2 font-medium">Preparing your personalized dashboard...</p>
                </div>
                <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    onAnimationComplete={() => window.location.href = '/'}
                    className="h-full bg-[#0c831f]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 pt-8 border-t border-gray-50">
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
              By proceeding, you accept our <br />
              <span className="text-gray-900 hover:text-[#0c831f] cursor-pointer transition-colors">Terms of Service</span> & <span className="text-gray-900 hover:text-[#0c831f] cursor-pointer transition-colors">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
