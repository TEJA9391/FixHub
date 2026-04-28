import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Star, Users, ChevronRight, Search, 
  MapPin, ShieldCheck, Sparkles, Clock,
  ChevronLeft, X, CheckCircle, Video as VideoIcon, Bot,
  Mic, MicOff, VideoOff, PhoneOff, User
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../lib/CartContext';
import toast from 'react-hot-toast';

const SafetyInfoModal = ({ onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-[3rem] p-12 max-w-2xl w-full relative overflow-hidden shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
      
      <div className="space-y-8">
        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-600">
           <ShieldCheck size={40} />
        </div>
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">The FixHub Promise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Verified Pros</h3>
              <p className="text-gray-400 text-sm font-medium">Every professional undergoes a 12-point background check and skill certification.</p>
           </div>
           <div className="space-y-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> SOS Support</h3>
              <p className="text-gray-400 text-sm font-medium">Real-time emergency assistance available 24/7 during every service session.</p>
           </div>
           <div className="space-y-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> FixHub Guarantee</h3>
              <p className="text-gray-400 text-sm font-medium">Comprehensive protection for your property and the professional during the job.</p>
           </div>
           <div className="space-y-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Secure Payments</h3>
              <p className="text-gray-400 text-sm font-medium">Your money is held in escrow and only released after your 100% satisfaction.</p>
           </div>
        </div>
        <button onClick={onClose} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-sm shadow-xl hover:scale-[1.02] transition-all">Understood</button>
      </div>
    </motion.div>
  </motion.div>
);

const ContactSupportModal = ({ onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-[3rem] p-12 max-w-lg w-full relative shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Contact Support</h2>
          <p className="text-gray-400 font-medium mt-2">We typically respond within 15 minutes.</p>
        </div>

        <form action="https://formsubmit.co/support@fixhub.com" method="POST" className="space-y-6">
           <input type="hidden" name="_subject" value="Fixhub Support Request" />
           <input type="hidden" name="_captcha" value="false" />
           <input type="hidden" name="_next" value={window.location.href} />

           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
              <input type="text" name="name" required className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-[#0c831f] transition-all outline-none" placeholder="John Doe" />
           </div>
           
           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input type="email" name="email" required className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-[#0c831f] transition-all outline-none" placeholder="john@example.com" />
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
              <textarea name="message" required rows="4" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-[#0c831f] transition-all outline-none resize-none" placeholder="How can we help you today?"></textarea>
           </div>

           <button type="submit" className="w-full bg-[#0c831f] text-white py-5 rounded-2xl font-bold text-sm shadow-xl shadow-green-900/20 hover:scale-[1.02] active:scale-95 transition-all">Send Message</button>
        </form>
      </div>
    </motion.div>
  </motion.div>
);

const VideoConsultModal = ({ onClose }) => {
  const [status, setStatus] = useState('connecting'); // connecting, connected
  const videoRef = useRef(null);

  useEffect(() => {
    let mediaStream = null;
    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    };
    startCamera();

    const timer = setTimeout(() => {
      setStatus('connected');
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl"
    >
      <div className="w-full max-w-4xl h-[80vh] md:h-[600px] bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col border border-white/10">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <VideoIcon size={20} className="text-white" />
             </div>
             <div>
                <h3 className="text-white font-bold tracking-tight text-lg shadow-black drop-shadow-md">FixHub Remote Diagnostics</h3>
                {status === 'connecting' ? (
                  <p className="text-blue-400 font-medium text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" /> Connecting to available expert...
                  </p>
                ) : (
                  <p className="text-green-400 font-medium text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> 00:03 • Encrypted Call
                  </p>
                )}
             </div>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-black flex items-center justify-center">
          {status === 'connecting' ? (
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center z-10 relative border-4 border-slate-700">
                  <User size={40} className="text-slate-400" />
                </div>
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-20" />
                <div className="absolute -inset-4 border-2 border-blue-500/50 rounded-full animate-pulse" />
              </div>
              <p className="text-white/60 font-medium text-lg tracking-tight">Finding the best technician...</p>
            </div>
          ) : (
            <>
              {/* Expert Video (Simulated) */}
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-90"
                alt="Expert"
              />
              <div className="absolute bottom-32 left-8 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                 <p className="text-white font-bold">Ramesh Kumar</p>
                 <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Master Electrician</p>
              </div>

              {/* User PiP (Real Hardware Camera) */}
              <div className="absolute bottom-8 right-8 w-32 h-48 bg-slate-800 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl z-10">
                 <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                 <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-bold backdrop-blur-md">Live (You)</div>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="h-24 bg-slate-900 border-t border-white/10 flex items-center justify-center gap-6 shrink-0 relative z-20">
          <button className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <Mic size={24} />
          </button>
          <button className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <VideoIcon size={24} />
          </button>
          <button 
            onClick={onClose}
            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 hover:scale-105 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            <PhoneOff size={28} />
          </button>
        </div>

      </div>
    </motion.div>
  );
};

const AutoPilotModal = ({ onClose }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
        className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#0c831f] to-green-500 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors z-10"><X size={20} /></button>
          
          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">FixHub Auto-Pilot</h2>
              <p className="text-white/80 font-medium text-sm">Predictive AI Maintenance Scheduler</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50/50">
          {isScanning ? (
            <div className="flex flex-col items-center justify-center py-12 gap-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-[#0c831f]/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-[#0c831f] border-t-transparent rounded-full animate-spin" />
                <Bot size={36} className="text-[#0c831f] animate-pulse" />
              </div>
              <p className="text-gray-500 font-bold animate-pulse text-lg tracking-tight">AI scanning appliance history...</p>
            </div>
          ) : isActive ? (
            <div className="flex flex-col items-center justify-center py-12 gap-6 text-center">
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}
                className="w-24 h-24 bg-green-100 text-[#0c831f] rounded-full flex items-center justify-center mb-2 shadow-inner"
              >
                <CheckCircle size={48} />
              </motion.div>
              <div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Auto-Pilot Activated</h3>
                <p className="text-gray-500 mt-3 font-medium max-w-sm mx-auto leading-relaxed">Your home is now under FixHub AI monitoring. We will proactively auto-book your servicing right before you need it.</p>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">AC Deep Cleaning</h4>
                  <p className="text-sm font-medium text-gray-500 mt-1">AI predicts heavy usage starting next month.</p>
                </div>
                <span className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Recommended</span>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">RO Filter Change</h4>
                  <p className="text-sm font-medium text-gray-500 mt-1">Based on local water TDS logs.</p>
                </div>
                <span className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">In 3 Months</span>
              </div>

              <button 
                onClick={() => setIsActive(true)}
                className="w-full py-5 bg-[#0c831f] text-white rounded-2xl font-black text-lg shadow-[0_15px_40px_rgba(12,131,31,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-6"
              >
                <Sparkles size={20} /> Enable AI Scheduler
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const PaymentModal = ({ onClose, onSuccess }) => {
  const [method, setMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(onSuccess, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
        className="bg-white rounded-[3rem] p-10 max-w-lg w-full relative overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
        
        <div className="space-y-8">
           <div>
              <div className="flex items-center gap-2 mb-2">
                 <ShieldCheck className="text-indigo-600" size={18} />
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure Checkout</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Upgrade to Elite</h2>
              <p className="text-gray-500 font-medium mt-1">Unlock exclusive savings and priority service.</p>
           </div>

           <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
              {['card', 'upi', 'bank'].map(m => (
                <button 
                  key={m}
                  onClick={() => setMethod(m)}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    method === m ? "bg-white text-indigo-600 shadow-md" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {m === 'card' ? 'Card' : m === 'upi' ? 'UPI' : 'Bank'}
                </button>
              ))}
           </div>

           <form onSubmit={handlePay} className="space-y-6">
              {method === 'card' && (
                <div className="space-y-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Card Number</label>
                      <input required type="text" placeholder="**** **** **** 4455" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Expiry</label>
                         <input required type="text" placeholder="MM/YY" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CVC</label>
                         <input required type="text" placeholder="123" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600" />
                      </div>
                   </div>
                </div>
              )}
              
              {method === 'upi' && (
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">UPI ID</label>
                   <input required type="text" placeholder="username@upi" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
              )}

              {method === 'bank' && (
                <p className="text-[12px] font-medium text-gray-500 bg-gray-50 p-4 rounded-xl">You will be redirected to your bank's secure login page to complete the transaction.</p>
              )}

              <div className="pt-2">
                 <div className="flex justify-between items-center mb-6 px-1">
                    <span className="font-bold text-gray-500">Total Amount</span>
                    <span className="text-2xl font-black text-gray-900">₹299</span>
                 </div>
                 <button 
                   disabled={isProcessing}
                   type="submit" 
                   className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-indigo-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                 >
                   {isProcessing ? (
                     <>
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       Processing...
                     </>
                   ) : 'Pay & Upgrade Now'}
                 </button>
              </div>
           </form>

           <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-gray-400 opacity-60">
              <span className="flex items-center gap-1"><ShieldCheck size={12} /> SSL Secured</span>
              <span className="flex items-center gap-1">• PCI Compliant</span>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CategorySelectionModal = ({ category, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const categoryData = {
    'Women\'s Salon': [
      { id: 101, name: 'Grooming essentials', price: 738, icon: '💆‍♀️' },
      { id: 102, name: 'Complete care', price: 1150, icon: '🧖‍♀️' },
      { id: 201, name: 'Aroma bomb pedicure', price: 1299, icon: '🦶' },
      { id: 202, name: 'Diamond Glow Facial', price: 1899, icon: '✨' },
      { id: 203, name: 'Chocolate Waxing (Full)', price: 899, icon: '🍫' },
      { id: 204, name: 'Bridal Makeup Pro', price: 4999, icon: '👰' },
      { id: 205, name: 'Threading & Upper Lip', price: 99, icon: '🧵' },
    ],
    'AC Repair': [
      { id: 301, name: 'AC Deep Cleaning', price: 1098, icon: '❄️' },
      { id: 401, name: 'Gas Leakage Fix', price: 2500, icon: '🛠️' },
    ],
    'Cleaning & Pest': [
      { id: 501, name: 'Full Home Cleaning', price: 4999, icon: '🏠' },
      { id: 601, name: 'Sofa Shampooing', price: 799, icon: '🛋️' },
    ],
    'Electrician': [
      { id: 701, name: 'Electricity Audit', price: 299, icon: '🔌' },
      { id: 801, name: 'Fan Installation', price: 149, icon: '🚁' },
    ],
    'Painting': [
      { id: 901, name: 'Living Room Paint', price: 4999, icon: '🎨' },
    ],
    'Plumbing': [
      { id: 1001, name: 'Tap Repair/Replace', price: 199, icon: '🚰' },
      { id: 1002, name: 'Drainage Unblocking', price: 399, icon: '🛁' },
      { id: 1003, name: 'Water Tank Cleaning', price: 999, icon: '🏙️' },
    ],
    'Carpentry': [
      { id: 1101, name: 'Furniture Repair', price: 299, icon: '🪑' },
      { id: 1102, name: 'Door Lock Fix', price: 149, icon: '🚪' },
    ],
    'Appliance Repair': [
      { id: 1201, name: 'Washing Machine Fix', price: 499, icon: '🧺' },
      { id: 1202, name: 'Refrigerator Repair', price: 599, icon: '🧊' },
    ],
    'Home Security': [
      { id: 1301, name: 'CCTV Setup', price: 1999, icon: '📹' },
      { id: 1302, name: 'Smart Lock Setup', price: 999, icon: '🔐' },
    ],
    'Office Maintenance': [
      { id: 1401, name: 'Office Chair Repair', price: 399, icon: '💺' },
      { id: 1402, name: 'Workstation Setup', price: 1499, icon: '🖥️' },
    ],
    'IT Support': [
      { id: 1501, name: 'System Troubleshooting', price: 999, icon: '💻' },
      { id: 1502, name: 'Network & Router Setup', price: 1999, icon: '🌐' },
    ],
    'Coffee Machine': [
      { id: 1601, name: 'Descaling & Service', price: 599, icon: '☕' },
      { id: 1602, name: 'Commercial Machine Repair', price: 2499, icon: '🔧' },
    ],
    'Deep Cleaning': [
      { id: 1701, name: 'Office Floor Scrubbing', price: 1299, icon: '🧹' },
      { id: 1702, name: 'Carpet Shampooing (1000 sqft)', price: 3999, icon: '🧼' },
    ],
    'Spa for Women': [
      { id: 1801, name: 'Swedish Massage (60 min)', price: 1299, icon: '💆‍♀️' },
      { id: 1802, name: 'Deep Tissue Massage', price: 1599, icon: '🌿' },
    ],
    'Makeup & Styling': [
      { id: 1901, name: 'Party Makeup', price: 1999, icon: '💄' },
      { id: 1902, name: 'Hair Styling Only', price: 799, icon: '🎀' },
    ],
    'Nail Studio': [
      { id: 2001, name: 'Gel Polish Application', price: 499, icon: '💅' },
      { id: 2002, name: 'Acrylic Extensions', price: 1499, icon: '✨' },
    ]
  };

  const options = categoryData[category] || [
    { id: 99, name: 'Standard Service', price: 499, icon: '✨' },
    { id: 98, name: 'Premium Package', price: 999, icon: '👑' }
  ];

  const handleSelect = (e, service) => {
    addToCart(service);
    onClose(e, service);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <span className="text-[10px] font-bold text-[#0c831f] uppercase tracking-widest mb-1 block">Quick Selection</span>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{category}</h2>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl shadow-sm transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Select a service to proceed</p>
          {options.map((option, index) => (
            <button 
              key={option.id}
              onClick={(e) => handleSelect(e, option)}
              className="w-full flex items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-[#0c831f] hover:bg-[#0c831f]/5 transition-all group text-left"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm border border-gray-50 group-hover:scale-110 transition-transform">
                  <motion.div
                    animate={{ 
                      y: [0, -4, 0], 
                      rotate: [0, index % 2 === 0 ? 5 : -5, 0] 
                    }}
                    transition={{ 
                      duration: 2.5 + (index % 2) * 0.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.15
                    }}
                  >
                    {option.icon}
                  </motion.div>
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 group-hover:text-[#0c831f] transition-colors">{option.name}</h4>
                  <p className="text-[13px] font-bold text-gray-400 mt-0.5">₹{option.price}</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#0c831f] group-hover:text-white transition-all">
                <ChevronRight size={20} />
              </div>
            </button>
          ))}
        </div>
        
        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center gap-3 text-gray-400">
          <ShieldCheck size={16} />
          <span className="text-[11px] font-bold uppercase tracking-wider">Secure Booking • Pay after service</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdvancedSolutionModal = ({ solution, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBook = (e) => {
    const service = { id: Math.random(), name: solution.title, price: 999, icon: '✨' };
    addToCart(service);
    onClose(e, service);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl p-10 relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
           <ShieldCheck size={32} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">{solution.title}</h2>
        <p className="text-gray-500 font-medium leading-relaxed mb-8">{solution.desc}</p>
        
        <div className="space-y-4 mb-10">
          <h3 className="text-[11px] font-black uppercase tracking-widest text-indigo-600">What's Included</h3>
          <ul className="space-y-3">
             <li className="flex items-center gap-3 text-sm font-bold text-gray-700"><CheckCircle size={16} className="text-green-500"/> Expert Consultation</li>
             <li className="flex items-center gap-3 text-sm font-bold text-gray-700"><CheckCircle size={16} className="text-green-500"/> Detailed Assessment Report</li>
             <li className="flex items-center gap-3 text-sm font-bold text-gray-700"><CheckCircle size={16} className="text-green-500"/> Priority Implementation</li>
          </ul>
        </div>

        <button 
          onClick={handleBook}
          className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Book Consultation <ChevronRight size={18} />
        </button>
      </motion.div>
    </motion.div>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAdvancedSolution, setSelectedAdvancedSolution] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Home');
  const [isElite, setIsElite] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [flyItem, setFlyItem] = useState(null);

  const handleUpgrade = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setIsElite(true);
    setShowPaymentModal(false);
    toast.success('Welcome to FixHub Elite! Your benefits are now active.', {
      icon: '✨',
      style: {
        borderRadius: '20px',
        background: '#1e1b4b',
        color: '#fff',
        fontWeight: 'bold',
      },
    });
  };

  const categories = [
    // Beauty Services (12 Items)
    { label: "Women's Salon", icon: '🧖‍♀️', color: 'bg-purple-50', type: 'Beauty' },
    { label: "Men's Salon", icon: '💇‍♂️', color: 'bg-blue-50', type: 'Beauty' },
    { label: "Spa for Women", icon: '💆‍♀️', color: 'bg-pink-50', type: 'Beauty' },
    { label: "Spa for Men", icon: '💆‍♂️', color: 'bg-slate-100', type: 'Beauty' },
    { label: "Massage Therapy", icon: '🧘‍♀️', color: 'bg-teal-50', type: 'Beauty' },
    { label: "Makeup & Styling", icon: '💄', color: 'bg-rose-50', type: 'Beauty' },
    { label: "Hair Color & Care", icon: '🎀', color: 'bg-purple-100', type: 'Beauty' },
    { label: "Nail Studio", icon: '💅', color: 'bg-fuchsia-50', type: 'Beauty' },
    { label: "Skincare", icon: '🧴', color: 'bg-cyan-50', type: 'Beauty' },
    { label: "Bridal Packages", icon: '👰', color: 'bg-amber-50', type: 'Beauty' },
    { label: "Laser Reduction", icon: '✨', color: 'bg-indigo-50', type: 'Beauty' },
    { label: "Waxing & Threading", icon: '🦵', color: 'bg-rose-100', type: 'Beauty' },

    // Home Services
    { label: "InstaHelp", icon: '🆘', color: 'bg-red-50', type: 'Home' },
    { label: "AC Repair", icon: '❄️', color: 'bg-sky-50', type: 'Home' },
    { label: "Cleaning & Pest", icon: '🧹', color: 'bg-green-50', type: 'Home' },
    { label: "Plumbing", icon: '🚰', color: 'bg-blue-50', type: 'Home' },
    { label: "Electrician", icon: '🔌', color: 'bg-amber-50', type: 'Home' },
    { label: "Carpentry", icon: '🔨', color: 'bg-orange-50', type: 'Home' },
    { label: "Appliance Repair", icon: '🔌', color: 'bg-rose-50', type: 'Home' },
    { label: "Home Security", icon: '🔐', color: 'bg-indigo-50', type: 'Home' },
    { label: "Painting", icon: '🎨', color: 'bg-emerald-50', type: 'Home' },
    
    // Office Services
    { label: "Office Maintenance", icon: '🏢', color: 'bg-slate-100', type: 'Office' },
    { label: "IT Support", icon: '🖥️', color: 'bg-blue-50', type: 'Office' },
    { label: "Deep Cleaning", icon: '🧽', color: 'bg-cyan-50', type: 'Office' },
    { label: "Printer Service", icon: '🖨️', color: 'bg-gray-100', type: 'Office' },
    { label: "Coffee Machine", icon: '☕', color: 'bg-amber-50', type: 'Office' },
    { label: "Disinfection", icon: '🏥', color: 'bg-green-50', type: 'Office' },
    { label: "Glass Cleaning", icon: '🪟', color: 'bg-sky-50', type: 'Office' },
    { label: "Corporate AC", icon: '❄️', color: 'bg-blue-50', type: 'Office' },
    { label: "Pest Control", icon: '🐜', color: 'bg-orange-50', type: 'Office' },
    { label: "Furniture Fix", icon: '🪑', color: 'bg-amber-50', type: 'Office' },
    { label: "Lighting Setup", icon: '💡', color: 'bg-yellow-50', type: 'Office' },
    { label: "CCTV Systems", icon: '📹', color: 'bg-slate-100', type: 'Office' },
  ];

  const filteredCategories = activeFilter === 'All' 
    ? categories 
    : categories.filter(c => c.type === activeFilter);

  const spotlights = [
    { title: 'Deep clean with foam-jet AC service', desc: 'AC service & repair', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800', color: 'bg-gray-100', link: '/category/AC Repair' },
    { title: 'Revamp Spring 26 Collection', desc: 'New textures, new moldings', img: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&q=80&w=800', color: 'bg-emerald-950 text-white', link: '/category/Painting' },
    { title: 'Insta Help: Trained house help', desc: 'When your maid is on leave', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800', color: 'bg-indigo-700 text-white', link: '/category/InstaHelp' },
    { title: 'Luxury Salon at Home', desc: 'Premium beauty services', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800', color: 'bg-rose-50', link: '/category/Women\'s Salon' },
    { title: 'Stress Relief Massage', desc: 'Professional therapists', img: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800', color: 'bg-stone-100', link: '/category/Men\'s Salon' },
  ];

  const noteworthy = [
    { name: 'Wall Makeover', img: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=600&q=80', link: '/category/Painting' },
    { name: 'Native Water Purifier', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', link: '/category/Native Purifier' },
    { name: 'Native Smart Locks', img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&q=80', link: '/category/Smart Locks' },
    { name: 'Kitchen Cleaning', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', link: '/category/Cleaning & Pest' },
    { name: 'Stove Repair', img: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80', link: '/category/AC Repair' },
  ];

  const mostBooked = [
    { name: 'Intense cleaning (2 bathrooms)', rating: '4.8 (5.3M)', price: '913', oldPrice: '999', img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=400', link: '/category/Cleaning' },
    { name: 'Haircut for men', rating: '4.87 (472K)', price: '259', oldPrice: '', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400', link: '/category/Men\'s Salon' },
    { name: 'Foam-jet service (2 ACs)', rating: '4.76 (2.4M)', price: '1098', oldPrice: '1198', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80', link: '/category/AC Repair' },
    { name: 'Full Home Painting', rating: '4.95 (1.8M)', price: '8999', oldPrice: '12000', img: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=400&q=80', link: '/category/Painting' },
    { name: 'Classic Pedicure', rating: '4.82 (890K)', price: '499', oldPrice: '599', img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=400&q=80', link: '/category/Women\'s Salon' },
  ];

  const spotlightRef = useRef(null);
  const mostBookedRef = useRef(null);
  const customerVoiceRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 500;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      
      {/* Selection Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <CategorySelectionModal 
            category={selectedCategory} 
            onClose={(e, service) => {
              setSelectedCategory(null);
              if (e && service) {
                setFlyItem({ x: e.clientX, y: e.clientY, icon: service.icon });
                setTimeout(() => setFlyItem(null), 800);
              }
            }} 
          />
        )}
        {selectedAdvancedSolution && (
          <AdvancedSolutionModal 
            solution={selectedAdvancedSolution} 
            onClose={(e, service) => {
              setSelectedAdvancedSolution(null);
              if (e && service) {
                setFlyItem({ x: e.clientX, y: e.clientY, icon: service.icon });
                setTimeout(() => setFlyItem(null), 800);
              }
            }} 
          />
        )}
        {showContactModal && <ContactSupportModal onClose={() => setShowContactModal(false)} />}
        {showSafetyModal && <SafetyInfoModal onClose={() => setShowSafetyModal(false)} />}
        {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} onSuccess={handlePaymentSuccess} />}
        
        {flyItem && (
          <motion.div
            initial={{ x: flyItem.x, y: flyItem.y, scale: 1.5, opacity: 1 }}
            animate={{ 
              x: window.innerWidth - (window.innerWidth > 768 ? 100 : 60), 
              y: 20, 
              scale: 0.1, 
              opacity: 0 
            }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.2 }}
            className="fixed z-[9999] text-5xl pointer-events-none drop-shadow-2xl"
          >
            {flyItem.icon}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section: Split Layout */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-10 w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Home services at your <br className="hidden md:block" />
            <span className="text-[#0c831f]">doorstep</span>
          </h1>
          
          <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.06)] p-10 md:p-14 max-w-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0c831f]/5 blur-3xl rounded-full" />
            
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
              <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Select Category</h2>
              <div className="flex items-center gap-3">
                {['Home', 'Office', 'Beauty'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border",
                      activeFilter === f ? "bg-white text-[#0c831f] shadow-md border-gray-100" : "bg-gray-50 border-gray-100/50 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-12">
              <AnimatePresence mode="popLayout">
                {filteredCategories.map((cat, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={cat.label} 
                    onClick={() => setSelectedCategory(cat.label)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl mb-4 shadow-sm border border-transparent group-hover:shadow-xl group-hover:scale-110 transition-all duration-500",
                      cat.color,
                      "group-hover:border-white group-hover:bg-white"
                    )}>
                      <motion.div
                        animate={{ 
                          y: [0, -6, 0], 
                          rotate: [0, index % 2 === 0 ? 4 : -4, 0] 
                        }}
                        transition={{ 
                          duration: 3 + (index % 3) * 0.5, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: index * 0.1
                        }}
                      >
                        {cat.icon}
                      </motion.div>
                    </div>
                    <span className="text-[12px] font-extrabold text-gray-700 text-center leading-tight group-hover:text-[#0c831f] transition-colors">{cat.label}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-2xl">
           <div className="grid grid-cols-2 gap-4 h-[500px]">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800" 
                  alt="Salon"
                  className="w-full h-3/5 object-cover rounded-[2rem] shadow-lg border border-gray-100" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800" 
                  alt="AC Repair"
                  className="w-full h-2/5 object-cover rounded-[2rem] shadow-lg border border-gray-100" 
                />
              </div>
              <div className="space-y-4 pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800" 
                  alt="Massage"
                  className="w-full h-2/5 object-cover rounded-[2rem] shadow-lg border border-gray-100" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" 
                  alt="Cleaning"
                  className="w-full h-3/5 object-cover rounded-[2rem] shadow-lg border border-gray-100" 
                />
              </div>
           </div>
        </div>
      </section>

      {/* FixHub Pulse & Elite Membership (Surpassing UC Features) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* FixHub Elite Membership Card */}
           <motion.div 
             whileHover={{ y: -10 }}
             className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 p-10 text-white shadow-2xl group cursor-pointer"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                 <div className="flex justify-between items-start">
                    <div>
                       <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                             <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          </div>
                          <span className="text-sm font-black uppercase tracking-[0.2em]">FixHub Elite</span>
                       </div>
                       <h2 className="text-4xl font-black tracking-tight leading-none">Join the top 1% <br />of homeowners.</h2>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 text-center">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Starting at</p>
                       <p className="text-2xl font-black">₹299</p>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    <p className="text-white/70 font-medium leading-relaxed">Save up to ₹3,000 on every service, get priority scheduling, and zero-fee cancellations.</p>
                    <button 
                      onClick={handleUpgrade}
                      className={cn(
                        "px-10 py-5 rounded-2xl font-bold text-sm shadow-xl transition-all w-full md:w-auto",
                        isElite ? "bg-green-500 text-white" : "bg-white text-indigo-900 hover:scale-105 active:scale-95"
                      )}
                    >
                      {isElite ? 'Elite Member Active' : 'Upgrade to Elite'}
                    </button>
                 </div>
              </div>
           </motion.div>

           {/* FixHub Pulse (Emergency Help) */}
           <motion.div 
             whileHover={{ y: -10 }}
             onClick={() => navigate('/category/InstaHelp')}
             className="relative overflow-hidden rounded-[3rem] bg-red-50 border-2 border-red-100 p-10 group cursor-pointer"
           >
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse">
                       <Clock size={24} />
                    </div>
                    <div>
                       <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.3em] block">FixHub Pulse</span>
                       <h2 className="text-3xl font-black text-gray-900 tracking-tight">Need help <span className="text-red-600 underline decoration-red-200 underline-offset-8 italic">right now?</span></h2>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-8">
                    <div className="space-y-2">
                       <p className="text-4xl font-black text-gray-900">15 <span className="text-lg font-bold text-gray-400">Mins</span></p>
                       <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Guaranteed Arrival</p>
                    </div>
                    <div className="w-px h-16 bg-red-200" />
                    <p className="text-gray-500 font-medium leading-relaxed max-w-[200px]">Trained professionals for urgent repairs, cleaning, or help when you're in a pinch.</p>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="flex -space-x-4">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm">
                           <img src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-full h-full object-cover" />
                         </div>
                       ))}
                       <div className="w-10 h-10 rounded-full border-2 border-white bg-red-100 flex items-center justify-center text-red-600 text-[10px] font-black shadow-sm">+80</div>
                    </div>
                    <div className="flex items-center gap-2 text-red-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
                       Book Instant Help <ChevronRight size={18} />
                    </div>
                 </div>
              </div>
           </motion.div>
            {/* Advanced: Live Video Consult */}
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => navigate('/video-consult')}
              className="relative overflow-hidden rounded-[3rem] bg-slate-900 text-white p-10 shadow-2xl group cursor-pointer border border-gray-800"
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800')] opacity-20 object-cover group-hover:scale-105 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
               <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                  <div className="flex justify-between items-start">
                     <div>
                        <div className="flex items-center gap-2 mb-4">
                           <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                              <VideoIcon size={16} className="text-blue-400" />
                           </div>
                           <span className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">Remote Diagnostics</span>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight leading-none">Live Video <br />Consultation</h2>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <p className="text-gray-300 font-medium leading-relaxed">Don't want to wait? Video call a certified technician in 60 seconds to diagnose your issue instantly over AR.</p>
                     <div className="flex items-center gap-2 text-blue-400 font-bold text-sm group-hover:translate-x-2 transition-transform">
                        Start Free Consult <ChevronRight size={18} />
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Advanced: FixHub Auto-Pilot */}
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => navigate('/auto-pilot')}
              className="relative overflow-hidden rounded-[3rem] bg-[#0c831f]/10 border border-[#0c831f]/20 p-10 group cursor-pointer"
            >
               <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                  <div className="flex justify-between items-start">
                     <div>
                        <div className="flex items-center gap-2 mb-4">
                           <div className="w-8 h-8 bg-[#0c831f] rounded-lg flex items-center justify-center">
                              <Bot size={16} className="text-white" />
                           </div>
                           <span className="text-sm font-black uppercase tracking-[0.2em] text-[#0c831f]">AI Maintenance</span>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">FixHub <br />Auto-Pilot</h2>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <p className="text-gray-600 font-medium leading-relaxed">Let our AI predict and auto-schedule your seasonal maintenance (ACs, deep cleaning) before breakdowns happen.</p>
                     <div className="flex items-center gap-2 text-[#0c831f] font-bold text-sm group-hover:translate-x-2 transition-transform">
                        Enable Auto-Pilot <ChevronRight size={18} />
                     </div>
                  </div>
               </div>
            </motion.div>
        </div>
      </section>

      {/* Premier Collections (Redesigned: High-End Visuals) */}
      <section className="py-24 bg-white relative group">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Premier Collections</h2>
              <p className="text-gray-400 font-bold text-sm mt-2 uppercase tracking-widest">Handpicked for your home</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => scroll(spotlightRef, 'left')} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll(spotlightRef, 'right')} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm"><ChevronRight size={20} /></button>
            </div>
          </div>
          
          <div 
            ref={spotlightRef}
            className="flex gap-8 overflow-x-auto no-scrollbar pb-12 scroll-smooth"
          >
            {spotlights.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02, y: -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => navigate(item.link)}
                className="min-w-[320px] md:min-w-[440px] h-[320px] rounded-[3rem] relative overflow-hidden group cursor-pointer shadow-xl shadow-black/5 z-0 hover:z-10"
              >
                 <img src={item.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                    <span className="bg-white/20 backdrop-blur-md text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block border border-white/10">Limited Time</span>
                    <h3 className="text-2xl font-black leading-tight mb-2">{item.title}</h3>
                    <p className="text-white/70 font-medium text-sm">{item.desc}</p>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Arrivals (Redesigned: Sleek Grid) */}
      <section className="py-24 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-gray-900 mb-12 tracking-tight">Fresh Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {noteworthy.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => navigate(item.link)} 
                className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer flex flex-col items-center text-center space-y-6"
              >
                <div className="w-24 h-24 rounded-3xl overflow-hidden relative">
                   <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
                <div>
                   <p className="text-[14px] font-extrabold text-gray-900 group-hover:text-[#0c831f] transition-colors">{item.name}</p>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">Explore Now</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Booked Services (Redesigned: Premium Horizontal Cards) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">Services that people <span className="text-purple-600">trust</span> the most</h2>
            <p className="text-gray-400 font-medium mt-4 text-lg">Real reviews, real results, delivered by experts.</p>
          </div>
          
          <div className="relative group/booked">
            <button 
              onClick={() => scroll(mostBookedRef, 'left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center z-20 opacity-0 group-hover/booked:opacity-100 transition-all hover:scale-110 active:scale-95 border border-gray-50"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll(mostBookedRef, 'right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center z-20 opacity-0 group-hover/booked:opacity-100 transition-all hover:scale-110 active:scale-95 border border-gray-50"
            >
              <ChevronRight size={24} />
            </button>

            <div 
              ref={mostBookedRef}
              className="flex gap-8 overflow-x-auto no-scrollbar pb-12 scroll-smooth"
            >
              {mostBooked.map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(item.link)}
                  className="min-w-[320px] md:min-w-[500px] flex flex-col md:flex-row items-center gap-6 bg-white rounded-[3rem] p-6 border border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-2xl transition-all group cursor-pointer relative"
                >
                  <div className="w-full md:w-48 h-40 rounded-[2rem] overflow-hidden flex-shrink-0 relative">
                     <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[9px] font-black px-3 py-1.5 rounded-full shadow-lg border border-black/5 uppercase tracking-tighter text-purple-600">Best Seller</div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-full">
                         <Star size={10} className="fill-purple-600 text-purple-600" />
                         <span className="text-[11px] font-black text-purple-600">{item.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-black text-gray-900 group-hover:text-purple-600 transition-colors leading-tight">{item.name}</h3>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-gray-900">₹{item.price}</span>
                        {item.oldPrice && <span className="text-[11px] text-gray-300 line-through font-bold">₹{item.oldPrice}</span>}
                      </div>
                      <button className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-bold shadow-lg shadow-purple-200 hover:scale-105 active:scale-95 transition-all cursor-pointer">Quick Add</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The FixHub Promise (Redesigned: High Authority) */}
       <section className="py-32 bg-slate-900 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0c831f]/10 blur-[120px] rounded-full translate-x-1/2" />
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-20">
               <div className="flex-1 space-y-12">
                  <div>
                    <span className="text-[#0c831f] font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">The Gold Standard</span>
                    <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">The <span className="text-[#0c831f]">FixHub</span> Promise</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                     <div className="space-y-4 group/item cursor-pointer">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-[#0c831f]/50 transition-colors">
                           <ShieldCheck className="text-[#0c831f]" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover/item:text-[#0c831f] transition-colors">Verified Excellence</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Every professional undergoes a 12-point background check and skill certification.</p>
                     </div>
                     <div className="space-y-4 group/item cursor-pointer">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-[#0c831f]/50 transition-colors">
                           <CheckCircle className="text-[#0c831f]" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover/item:text-[#0c831f] transition-colors">FixHub Guarantee</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Zero-risk bookings with comprehensive insurance cover up to ₹10,000 for every job.</p>
                     </div>
                     <div className="space-y-4 group/item cursor-pointer">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-[#0c831f]/50 transition-colors">
                           <Clock className="text-[#0c831f]" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover/item:text-[#0c831f] transition-colors">On-Time Or Free</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">We value your time. If our professional is late, your service is on the house.</p>
                     </div>
                     <div className="space-y-4 group/item cursor-pointer">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-[#0c831f]/50 transition-colors">
                           <Users className="text-[#0c831f]" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover/item:text-[#0c831f] transition-colors">24/7 Concierge</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Dedicated support team available round the clock for any assistance you need.</p>
                     </div>
                  </div>

                  <div className="flex gap-6 pt-4">
                    <button onClick={() => setShowSafetyModal(true)} className="bg-[#0c831f] text-white px-10 py-5 rounded-2xl font-bold text-sm shadow-xl shadow-[#0c831f]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer">Know more</button>
                    <button onClick={() => setShowContactModal(true)} className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold text-sm hover:bg-white/10 active:scale-95 transition-all cursor-pointer">Contact Support</button>
                  </div>
               </div>
               
               <div className="flex-1 relative">
                  <div className="relative z-10 bg-white/5 backdrop-blur-2xl p-1 rounded-[3.5rem] border border-white/10 shadow-2xl overflow-hidden group">
                     <img 
                       src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" 
                       alt="Quality"
                       className="w-full h-[600px] object-cover rounded-[3rem] group-hover:scale-105 transition-transform duration-1000"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                     <div className="absolute bottom-12 left-12 right-12 flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                        <div className="w-12 h-12 bg-[#0c831f] rounded-2xl flex items-center justify-center shadow-lg">
                           <ShieldCheck size={24} className="text-white" />
                        </div>
                        <div>
                           <p className="text-white font-bold text-sm tracking-tight">Certified Professional at Work</p>
                           <p className="text-white/60 text-[11px] font-medium uppercase tracking-widest">FixHub Standard Verified</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
       </section>

       {/* Advanced Solutions Section (New: High-Tech Services) */}
       <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
             <div className="max-w-2xl mb-20">
                <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">FixHub Premium</span>
                <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Advanced Solutions.</h2>
                <p className="text-gray-400 font-medium mt-4 text-lg">Next-generation home technology and specialized services for the modern living space.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    title: 'AI Home Health Audit', 
                    desc: 'Using computer vision to detect hidden structural or electrical issues before they become emergencies.', 
                    icon: <Search className="text-indigo-600" size={32} />,
                    tag: 'New'
                  },
                  { 
                    title: 'Smart Home Automation', 
                    desc: 'Seamless integration of lighting, security, and climate control into a single unified dashboard.', 
                    icon: <ShieldCheck className="text-indigo-600" size={32} />,
                    tag: 'Popular'
                  },
                  { 
                    title: 'Solar & Green Energy', 
                    desc: 'Complete rooftop solar installation and maintenance with real-time efficiency monitoring.', 
                    icon: <Sparkles className="text-indigo-600" size={32} />,
                    tag: 'Save 40%'
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -12 }}
                    onClick={() => setSelectedAdvancedSolution(item)}
                    className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6">
                       <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{item.tag}</span>
                    </div>
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                       {item.icon}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed mb-8">{item.desc}</p>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                       Learn More <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
       </section>

       {/* FixHub Native Ecosystem (Directly Competing with UC Native) */}
       <section className="py-32 bg-gray-950 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0c831f] blur-[150px] rounded-full" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
             <div className="flex flex-col md:flex-row items-center justify-between gap-20">
                <div className="flex-1 space-y-10">
                   <div>
                      <span className="text-[#0c831f] font-black text-[11px] uppercase tracking-[0.4em] mb-4 block">FixHub Native</span>
                      <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">The Future of <br /><span className="text-[#0c831f]">Home Hardware.</span></h2>
                   </div>
                   <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-xl">We don't just fix homes; we build them smarter. Explore our range of IoT-enabled hardware designed for zero-maintenance performance.</p>
                   
                   <div className="flex flex-wrap gap-6 pt-4">
                      <div 
                         onClick={() => navigate('/category/Smart Locks')}
                         className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] flex-1 min-w-[280px] group cursor-pointer hover:bg-white/10 transition-all"
                      >
                         <div className="w-14 h-14 bg-[#0c831f] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#0c831f]/20">
                            <ShieldCheck className="text-white" size={28} />
                         </div>
                         <h3 className="text-xl font-bold text-white mb-2">Native M2 Smart Lock</h3>
                         <p className="text-gray-500 text-sm mb-6">5-in-1 Biometric access with real-time mobile alerts and anti-theft shield.</p>
                         <button className="text-[#0c831f] font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Shop Now <ChevronRight size={14} /></button>
                      </div>
                      <div 
                         onClick={() => navigate('/category/Native Purifier')}
                         className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] flex-1 min-w-[280px] group cursor-pointer hover:bg-white/10 transition-all"
                      >
                         <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                            <Sparkles className="text-white" size={28} />
                         </div>
                         <h3 className="text-xl font-bold text-white mb-2">Native M1 Purifier</h3>
                         <p className="text-gray-500 text-sm mb-6">The world's first no-service purifier for 2 years. IoT-tracked filter health.</p>
                         <button className="text-blue-500 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Shop Now <ChevronRight size={14} /></button>
                      </div>
                   </div>
                </div>

                <div className="flex-1 relative">
                   <div className="relative z-10 rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                      <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" className="w-full h-[600px] object-cover" alt="Smart Home" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-12 left-12 right-12">
                         <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                            <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            </div>
                            <div>
                               <p className="text-white font-bold text-sm">System Online</p>
                               <p className="text-white/40 text-[10px] uppercase font-black tracking-widest">IoT Status: Connected</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* Verified Experts (New Section) */}
       <section className="py-32 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center max-w-2xl mx-auto mb-20">
                <span className="text-purple-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Meet the Elites</span>
                <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Our Verified Experts</h2>
                <p className="text-gray-400 font-medium mt-4 text-lg">The top 1% of service professionals in India, handpicked for your needs.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { name: 'Arjun Mehra', exp: '8+ Years', rating: '4.98', cat: 'Master Painter', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Sarah Khan', exp: '6+ Years', rating: '4.95', cat: 'Senior Esthetician', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
                  { name: 'David Wilson', exp: '10+ Years', rating: '5.0', cat: 'HVAC Specialist', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
                ].map((pro, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-6 mx-auto ring-4 ring-purple-50 ring-offset-4 ring-offset-white">
                       <img src={pro.img} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                       <h3 className="text-xl font-bold text-gray-900">{pro.name}</h3>
                       <p className="text-[11px] font-black text-purple-600 uppercase tracking-widest">{pro.cat}</p>
                       <div className="flex items-center justify-center gap-4 pt-4">
                          <div className="text-center">
                             <p className="text-xs font-black text-gray-900">{pro.exp}</p>
                             <p className="text-[9px] font-bold text-gray-400 uppercase">Experience</p>
                          </div>
                          <div className="w-px h-8 bg-gray-100" />
                          <div className="text-center">
                             <p className="text-xs font-black text-gray-900">★ {pro.rating}</p>
                             <p className="text-[9px] font-bold text-gray-400 uppercase">Rating</p>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
       </section>

       {/* Customer Voice (New Section) */}
       <section className="py-32 bg-white pb-40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
             <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-10">
                <div className="max-w-xl text-center md:text-left">
                  <span className="text-[#0c831f] font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Testimonials</span>
                  <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Customer Voice</h2>
                  <p className="text-gray-400 font-medium mt-4 text-lg">Join 5 Million+ happy customers who trust FixHub for their daily home needs.</p>
                </div>
                <div className="flex gap-4">
                   <button onClick={() => scroll(customerVoiceRef, 'left')} className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer active:scale-95"><ChevronLeft size={24} /></button>
                   <button onClick={() => scroll(customerVoiceRef, 'right')} className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"><ChevronRight size={24} /></button>
                </div>
             </div>

             <div 
               ref={customerVoiceRef}
               className="flex gap-8 overflow-x-auto no-scrollbar pb-10 scroll-smooth"
             >
                {[
                  { user: 'Priya S.', review: 'The deep cleaning service was outstanding. The team arrived on time and used premium equipment. My kitchen looks brand new!', city: 'Mumbai' },
                  { user: 'Amit R.', review: 'Booked an AC repair at 10 PM, and the pro was at my door by 9 AM next day. Lightning fast service and fair pricing.', city: 'Delhi' },
                  { user: 'Sanjana M.', review: 'FixHub salon services are a lifesaver for working moms. The esthetician was highly skilled and very hygienic.', city: 'Bangalore' },
                  { user: 'Vikram K.', review: 'The painting team did a flawless job. No mess left behind and the finish is exactly what I wanted. Highly recommended.', city: 'Chennai' }
                ].map((t, i) => (
                  <div key={i} className="min-w-[320px] md:min-w-[400px] bg-gray-50/50 p-8 md:p-10 rounded-[3rem] border border-gray-100 space-y-8">
                     <div className="flex gap-1 text-[#0c831f]">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                     </div>
                     <p className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed italic">"{t.review}"</p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#0c831f] rounded-2xl flex items-center justify-center text-white font-black text-sm">{t.user[0]}</div>
                        <div>
                           <p className="font-bold text-gray-900">{t.user}</p>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.city}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </section>
      <AnimatePresence>
        {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} onSuccess={() => {
          setShowPaymentModal(false);
          setIsElite(true);
        }} />}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
