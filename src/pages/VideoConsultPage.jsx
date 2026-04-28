import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Video as VideoIcon, Mic, MicOff, VideoOff, PhoneOff, User, Sparkles, Flashlight, Camera, Ruler, MessageSquare, Maximize, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VideoConsultPage = () => {
  const [status, setStatus] = useState('connecting'); // connecting, connected
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const experts = [
    { name: "Rahul Sharma", role: "Technical Support" },
    { name: "Priya Patel", role: "Diagnostics Specialist" },
    { name: "Amit Kumar", role: "Senior Advisor" },
    { name: "Sneha Reddy", role: "Service Expert" }
  ];
  const [assignedExpert, setAssignedExpert] = useState(experts[0]);

  const [chatHistory, setChatHistory] = useState([
    { sender: 'expert', text: 'Hi! Could you bring the camera a bit closer to the issue?', time: '10:05 AM' },
    { sender: 'user', text: 'Sure, give me a second.', time: '10:06 AM' }
  ]);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAssignedExpert(experts[Math.floor(Math.random() * experts.length)]);
    let mediaStream = null;
    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: isFrontCamera ? "user" : "environment" }, 
          audio: true 
        });
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
    }, 4000);

    return () => {
      clearTimeout(timer);
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isFrontCamera]);

  const handleEndCall = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col pt-20">
      {/* Header */}
      <header className="p-6 flex items-center justify-between bg-gradient-to-b from-black to-transparent absolute top-20 left-0 right-0 z-20">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50">
              <VideoIcon size={24} className="text-white" />
           </div>
           <div>
              <h1 className="text-xl font-black tracking-tight drop-shadow-md">FixHub Remote Diagnostics</h1>
              {status === 'connecting' ? (
                <p className="text-blue-400 font-medium text-sm flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" /> Connecting to our team...
                </p>
              ) : (
                <p className="text-green-400 font-medium text-sm flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Connection Secure • End-to-End Encrypted
                </p>
              )}
           </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 bg-indigo-500/10 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-500/20">
          <Sparkles size={16} className="text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Live AR Diagnostics Active</span>
        </div>
      </header>

      {/* Main Video Area */}
      <main className="flex-1 relative flex items-center justify-center bg-gray-900 overflow-hidden">
        {status === 'connecting' ? (
          <div className="flex flex-col items-center gap-8 z-10">
            <div className="relative">
              <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center z-10 relative border-4 border-slate-700 shadow-2xl">
                <User size={50} className="text-slate-400" />
              </div>
              <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-30" />
              <div className="absolute -inset-8 border-2 border-blue-500/30 rounded-full animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-white/80 font-bold text-xl tracking-tight mb-2">Analyzing Request...</p>
              <p className="text-white/40 text-sm">Connecting you with an available team member</p>
            </div>
          </div>
        ) : (
          <>
            {/* Expert Video (Simulated) */}
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1600" 
              className="absolute inset-0 w-full h-full object-cover opacity-90"
              alt="Expert"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* AR Tools Overlay (Professional Features) */}
            <motion.div 
              animate={{ x: isChatOpen ? -340 : 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10"
            >
              <button className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 shadow-lg group relative">
                 <Flashlight size={20} />
                 <span className="absolute right-14 bg-black/80 px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Toggle Torch</span>
              </button>
              <button className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/20 transition-all hover:scale-110 shadow-lg group relative">
                 <Ruler size={20} />
                 <span className="absolute right-14 bg-black/80 px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white">AR Measure</span>
              </button>
              <button className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 shadow-lg group relative">
                 <Camera size={20} />
                 <span className="absolute right-14 bg-black/80 px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Snapshot Issue</span>
              </button>
              <button 
                onClick={() => setIsFrontCamera(!isFrontCamera)}
                className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 shadow-lg group relative"
              >
                 <Maximize size={20} />
                 <span className="absolute right-14 bg-black/80 px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Flip Camera</span>
              </button>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-32 left-8 md:left-10 bg-black/50 backdrop-blur-2xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl"
            >
               <p className="text-white font-black text-2xl drop-shadow-lg">{assignedExpert.name}</p>
               <div className="flex items-center gap-2 mt-1">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                 <p className="text-blue-400 text-xs font-black uppercase tracking-widest drop-shadow-lg">{assignedExpert.role}</p>
               </div>
            </motion.div>
          </>
        )}

        {/* User PiP (Real Hardware Camera) */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: isChatOpen ? -340 : 0, opacity: 1 }}
          transition={{ delay: 0, type: 'spring', damping: 20 }}
          className="absolute bottom-10 right-10 w-40 h-60 md:w-64 md:h-96 bg-slate-800 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl z-10"
        >
           <video ref={videoRef} autoPlay playsInline muted={true} className={`w-full h-full object-cover scale-x-[-1] transition-opacity duration-300 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`} />
           {isVideoOff && (
             <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
               <User size={40} className="text-gray-600" />
             </div>
           )}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-white font-bold flex items-center gap-2">
             Live (You) {isMuted && <MicOff size={12} className="text-red-400" />}
           </div>
        </motion.div>

        {/* Side Chat Panel */}
        <motion.div 
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: isChatOpen ? 0 : 400, opacity: isChatOpen ? 1 : 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`absolute top-6 right-8 bottom-10 w-80 bg-gray-900/90 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden z-20 ${!isChatOpen && 'pointer-events-none'}`}
        >
          <div className="p-5 border-b border-white/10 bg-black/40 flex justify-between items-center shrink-0">
            <h3 className="text-white font-bold tracking-tight flex items-center gap-2">
              <MessageSquare size={16} className="text-indigo-400" /> Live Chat
            </h3>
            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors"><X size={16}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar flex flex-col">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white/10 text-gray-200 rounded-tl-sm'}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-500 font-medium mt-1.5 px-1">{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-black/60 border-t border-white/10 shrink-0">
            <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-indigo-500/50 focus-within:bg-white/10 transition-colors shadow-inner">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && chatMessage.trim()) {
                    setChatHistory([...chatHistory, { sender: 'user', text: chatMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
                    setChatMessage('');
                  }
                }}
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white focus:outline-none placeholder:text-gray-500 font-medium"
                placeholder="Type your message..."
              />
              <button 
                onClick={() => {
                  if (chatMessage.trim()) {
                    setChatHistory([...chatHistory, { sender: 'user', text: chatMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
                    setChatMessage('');
                  }
                }}
                className="px-4 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-400/10 font-bold text-sm transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Call Controls */}
      <footer className="h-28 bg-gray-950 border-t border-white/10 flex items-center justify-center gap-6 shrink-0 relative z-20 pb-4">
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 hidden md:flex rounded-full items-center justify-center transition-all shadow-lg ${isChatOpen ? 'bg-indigo-600 text-white shadow-indigo-600/30' : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'}`}
        >
          <MessageSquare size={24} />
        </button>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
        </button>
        <button 
          onClick={handleEndCall}
          className="w-20 h-20 bg-red-600 rounded-[2rem] flex items-center justify-center text-white hover:bg-red-700 hover:scale-105 transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)]"
        >
          <PhoneOff size={32} />
        </button>
        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isVideoOff ? <VideoOff size={28} /> : <VideoIcon size={28} />}
        </button>
      </footer>
    </div>
  );
};

export default VideoConsultPage;
