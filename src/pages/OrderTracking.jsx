import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Clock, Circle, MapPin, 
  MessageSquare, Phone, Star, ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cn } from '../lib/utils';

const OrderTracking = () => {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [steps, setSteps] = useState([
    { name: 'Booking Confirmed', time: '10:00 AM', status: 'complete', desc: 'We have received your request' },
    { name: 'Pro Assigned', time: '10:05 AM', status: 'complete', desc: 'Expert Rajesh Kumar will arrive soon' },
    { name: 'On the Way', time: '10:20 AM', status: 'active', desc: 'Expert is 2km away from your location' },
    { name: 'Work in Progress', time: '--:--', status: 'pending', desc: 'Estimated completion: 2:00 PM' },
    { name: 'Completed', time: '--:--', status: 'pending', desc: 'Quality check & Handover' },
  ]);

  const handleMarkCompleted = () => {
    setSteps([
      { name: 'Booking Confirmed', time: '10:00 AM', status: 'complete', desc: 'We have received your request' },
      { name: 'Pro Assigned', time: '10:05 AM', status: 'complete', desc: 'Expert Rajesh Kumar will arrive soon' },
      { name: 'Arrived', time: '10:35 AM', status: 'complete', desc: 'Expert has reached your location' },
      { name: 'Work in Progress', time: '10:45 AM', status: 'complete', desc: 'Service execution started' },
      { name: 'Completed', time: '11:30 AM', status: 'complete', desc: 'Quality check & Handover complete' },
    ]);
    setIsCompleted(true);
    setShowFeedback(true);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    toast.success('Feedback submitted!', {
      style: {
        background: '#0c831f',
        color: '#fff',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600'
      }
    });
    setShowFeedback(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 font-inter bg-white">
      <div className="flex justify-between items-center mb-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Home
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: Tracking & Status */}
        <div className="flex-1 space-y-12">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <span className="text-[11px] font-bold text-[#0c831f] uppercase tracking-wider mb-2 block">Live Updates</span>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Booking Status</h1>
                <p className="text-gray-400 text-[12px] font-bold mt-1">Order ID: #FH-99201-B</p>
              </div>
              <div className={cn("px-5 py-2.5 rounded-xl border font-bold text-[13px] flex items-center gap-3", isCompleted ? "bg-[#0c831f] border-[#0c831f] text-white" : "bg-green-50 border-green-100 text-[#0c831f]")}>
                {!isCompleted && <div className="w-2 h-2 rounded-full bg-[#0c831f] animate-pulse" />}
                {isCompleted ? "Service Completed" : "Expert On Way"}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0 relative">
              <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-gray-100" />
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex gap-8 pb-12 last:pb-0">
                  <div className={cn(
                    "relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-4 border-white shadow-sm transition-all duration-500",
                    step.status === 'complete' ? "bg-[#0c831f] text-white" : 
                    step.status === 'active' ? "bg-gray-900 text-white scale-110" : 
                    "bg-gray-50 text-gray-300"
                  )}>
                    {step.status === 'complete' ? <CheckCircle size={20} /> : 
                     step.status === 'active' ? <Clock size={20} className="animate-spin-slow" /> : 
                     <Circle size={20} />}
                  </div>
                  <div className={cn(
                    "flex-1 pt-1 transition-opacity",
                    step.status === 'pending' && "opacity-40"
                  )}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{step.name}</h3>
                      <span className="text-[12px] font-bold text-gray-400">{step.time}</span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          {!isCompleted && (
            <div className="bg-gray-100 rounded-3xl h-[400px] relative overflow-hidden border border-gray-100 shadow-inner group">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
                alt="Map" 
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0c831f] shadow-xl flex items-center justify-center text-white animate-bounce">
                  <MapPin size={32} />
                </div>
                <div className="bg-white px-5 py-2 rounded-xl font-bold text-[12px] text-gray-900 shadow-lg border border-gray-100">Expert is 2km away</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-[360px] space-y-8 shrink-0">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center">
            <h2 className="text-[11px] font-bold mb-8 uppercase tracking-widest text-gray-400">Assigned Expert</h2>
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-gray-50">
                  <img 
                    src="https://i.pravatar.cc/150?img=12" 
                    alt="Pro" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-500 w-8 h-8 rounded-xl border-2 border-white flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck size={16} />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900">Rajesh Kumar</h3>
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded-md">
                  <Star size={12} className="fill-current" />
                  <span className="font-bold text-xs">4.9</span>
                </div>
                <span className="text-gray-400 font-bold">•</span>
                <span className="text-[12px] text-gray-400 font-bold uppercase tracking-wider">1,240 Services</span>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 border border-gray-50 hover:bg-white hover:border-[#0c831f]/20 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-gray-900 shadow-sm group-hover:scale-105 transition-transform">
                    <MessageSquare size={20} />
                  </div>
                  <span className="font-bold text-[11px] uppercase tracking-wider text-gray-500 group-hover:text-[#0c831f]">Chat</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 border border-gray-50 hover:bg-white hover:border-[#0c831f]/20 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-gray-900 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone size={20} />
                  </div>
                  <span className="font-bold text-[11px] uppercase tracking-wider text-gray-500 group-hover:text-[#0c831f]">Call</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Card */}
          <div className="bg-gray-900 p-8 rounded-3xl text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0c831f]" />
            {!isCompleted ? (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white tracking-tight">Service Finished?</h3>
                <p className="text-gray-400 text-[13px] font-medium leading-relaxed">Please share your experience once the service is complete.</p>
                <button 
                  onClick={handleMarkCompleted}
                  className="w-full bg-[#0c831f] text-white py-4 rounded-xl font-bold text-sm shadow-lg hover:bg-[#0a6e1a] active:scale-95 transition-all"
                >
                  Mark Completed
                </button>
              </div>
            ) : !showFeedback ? (
              <div className="space-y-6 py-4">
                 <div className="w-16 h-16 bg-[#0c831f]/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-[#0c831f]" />
                 </div>
                 <h3 className="text-xl font-bold text-white tracking-tight">Thank you!</h3>
                 <p className="text-gray-400 font-medium text-sm">Your feedback helps us maintain our quality standards.</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h3 className="text-lg font-bold text-white tracking-tight">Rate Experience</h3>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button 
                      key={i}
                      onClick={() => setRating(i)}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        rating >= i ? "bg-[#0c831f] text-white" : "bg-white/10 text-gray-500 hover:bg-white/20"
                      )}
                    >
                      <Star size={20} className={cn(rating >= i && "fill-white")} />
                    </button>
                  ))}
                </div>
                <textarea 
                  placeholder="Share your thoughts..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-medium text-white focus:outline-none focus:border-[#0c831f]/50 transition-all placeholder:text-gray-600 h-24"
                />
                <button 
                  onClick={handleSubmitReview}
                  className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all shadow-lg active:scale-95"
                >
                  Submit
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
