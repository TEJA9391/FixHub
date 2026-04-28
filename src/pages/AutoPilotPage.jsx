import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle, Sparkles, X, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AutoPilotPage = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex flex-col items-center">
      <div className="w-full max-w-4xl p-6 md:p-12 mt-10">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">FixHub Auto-Pilot</h1>
            <p className="text-gray-500 font-medium mt-2">Predictive AI Maintenance Scheduler</p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
          <div className="bg-gradient-to-r from-[#0c831f] to-green-500 p-12 text-white relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative z-10 w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md shadow-xl border border-white/20 mb-6"
            >
              <Bot size={48} className="text-white drop-shadow-md" />
            </motion.div>
            
            <h2 className="text-3xl font-black tracking-tight relative z-10">Smart Home Brain</h2>
            <p className="text-white/80 font-medium text-lg mt-2 relative z-10 max-w-lg">Let our AI track your appliances and auto-schedule maintenance before breakdowns occur.</p>
          </div>

          <div className="p-12 bg-gray-50/50">
            {isScanning ? (
              <div className="flex flex-col items-center justify-center py-20 gap-8">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 border-8 border-[#0c831f]/20 rounded-full" />
                  <div className="absolute inset-0 border-8 border-[#0c831f] border-t-transparent rounded-full animate-spin" />
                  <Activity size={48} className="text-[#0c831f] animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-[#0c831f] font-black text-2xl tracking-tight mb-2 animate-pulse">Running Diagnostics...</p>
                  <p className="text-gray-500 font-medium">Scanning home appliance history and local weather data</p>
                </div>
              </div>
            ) : isActive ? (
              <div className="flex flex-col items-center justify-center py-20 gap-8 text-center">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}
                  className="w-32 h-32 bg-green-100 text-[#0c831f] rounded-full flex items-center justify-center shadow-inner mb-4"
                >
                  <CheckCircle size={64} />
                </motion.div>
                <div>
                  <h3 className="text-4xl font-black text-gray-900 tracking-tight">Auto-Pilot is Active!</h3>
                  <p className="text-gray-500 mt-4 text-lg font-medium max-w-md mx-auto leading-relaxed">Relax. Your home is now under FixHub AI monitoring. We will proactively auto-book your servicing right before you need it.</p>
                </div>
                <button 
                  onClick={() => navigate('/')}
                  className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:scale-105 transition-all mt-4"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">AI Recommendations Found:</h3>
                
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#0c831f]/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">❄️</span>
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl">AC Deep Cleaning</h4>
                      <p className="text-sm font-medium text-gray-500 mt-1">AI predicts heavy usage starting next month based on heatwave forecast.</p>
                    </div>
                  </div>
                  <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">Recommended</span>
                </div>
                
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-500/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">💧</span>
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl">RO Filter Change</h4>
                      <p className="text-sm font-medium text-gray-500 mt-1">Local water TDS logs indicate filter life ends in 3 Months.</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">In 3 Months</span>
                </div>

                <div className="pt-8 flex flex-col items-center">
                  <button 
                    onClick={() => setIsActive(true)}
                    className="w-full md:w-auto px-12 py-5 bg-[#0c831f] text-white rounded-2xl font-black text-lg shadow-[0_20px_40px_rgba(12,131,31,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <Sparkles size={24} /> Enable AI Scheduler
                  </button>
                  <p className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mt-6">
                    <ShieldCheck size={14} /> Zero upfront cost. Pay only when service is done.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AutoPilotPage;
