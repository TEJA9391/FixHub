import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, MapPin, Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';

const providers = [
  { id: 1, name: 'Karan Sharma', service: 'Master Electrician', rating: 4.9, jobs: 1200, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: 2, name: 'Priya Das', service: 'Deep Cleaning Expert', rating: 4.8, jobs: 850, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: 3, name: 'Rahul Verma', service: 'AC Specialist', rating: 4.7, jobs: 2100, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: 4, name: 'Sonia Goel', service: 'Professional Stylist', rating: 4.9, jobs: 600, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', verified: true },
];

const Providers = () => {
  const [search, setSearch] = useState('');

  const filteredProviders = providers.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.service.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewProfile = (name) => {
    toast(`Viewing profile of ${name}`, { icon: '👤' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 bg-[#FDFDFD]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Our Elite Workforce</span>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 text-slate-900">Expert Partners</h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">Work with the top 1% of service professionals in your city.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search experts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-[1.25rem] pl-12 pr-6 py-4 text-sm font-bold focus:outline-none focus:border-primary/30 transition-all shadow-xl shadow-slate-200/20 placeholder:text-slate-300"
            />
          </div>
          <button className="p-4 rounded-[1.25rem] bg-white border border-slate-100 hover:border-primary/20 transition-all shadow-xl shadow-slate-200/20 group">
            <Filter size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredProviders.map((pro, idx) => (
          <motion.div
            key={pro.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.1 }}
            whileHover={{ y: -15 }}
            className="bg-white border border-slate-50 rounded-[3rem] p-10 text-center group shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-32 h-32 mx-auto mb-10">
              <img 
                src={pro.img} 
                alt={pro.name} 
                className="relative w-full h-full rounded-[2.5rem] object-cover border-8 border-slate-50 group-hover:border-primary/5 transition-all duration-700 shadow-inner"
              />
              {pro.verified && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-2xl border-4 border-white flex items-center justify-center shadow-2xl">
                  <ShieldCheck size={20} fill="currentColor" />
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-black mb-1 text-slate-900 uppercase tracking-tighter group-hover:text-primary transition-colors">{pro.name}</h3>
            <p className="text-slate-300 font-black text-[9px] mb-8 uppercase tracking-[0.3em]">{pro.service}</p>
            
            <div className="flex items-center justify-center gap-8 py-6 border-y border-slate-50 mb-10">
              <div>
                <div className="flex items-center gap-1.5 text-primary font-black">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm">{pro.rating}</span>
                </div>
                <p className="text-[9px] text-slate-300 uppercase font-black tracking-widest mt-1.5">Rating</p>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div>
                <p className="font-black text-slate-900 text-sm">{pro.jobs}+</p>
                <p className="text-[9px] text-slate-300 uppercase font-black tracking-widest mt-1.5">Success</p>
              </div>
            </div>
            
            <button 
              onClick={() => handleViewProfile(pro.name)}
              className="w-full py-5 bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20"
            >
              View Profile
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Providers;
