import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ticket, Sparkles, Zap, Gift, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';

const offers = [
  { id: 1, title: 'First Time Special', discount: '50% OFF', code: 'FIXNEW50', desc: 'Valid on your first booking above ₹499', icon: <Sparkles />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: 2, title: 'Super Saver Week', discount: '₹200 OFF', code: 'SAVER200', desc: 'Flat discount on all deep cleaning services', icon: <Zap />, color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { id: 3, title: 'Referral Bonus', discount: '₹150 OFF', code: 'REFERRAL', desc: 'Refer a friend and you both get rewards', icon: <Gift />, color: 'bg-pink-50 text-pink-600 border-pink-100' },
];

const Offers = () => {
  const navigate = useNavigate();

  const handleClaim = (code) => {
    toast.success(`Code ${code} copied!`, { icon: '🎟️' });
    setTimeout(() => navigate('/services'), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 bg-[#FDFDFD]">
      <div className="text-center mb-24">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Savings & Perks</span>
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-6 text-slate-900">Exclusive Offers</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">Premium service doesn't have to break the bank. <br />Explore our latest deals and vouchers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {offers.map((offer, idx) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.1 }}
            whileHover={{ y: -12 }}
            className="bg-white border border-slate-50 rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all group"
          >
            <div className={cn("h-48 flex items-center justify-center relative overflow-hidden", offer.color)}>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-3xl shadow-2xl transition-transform group-hover:scale-110">
                {offer.icon}
              </div>
            </div>
            
            <div className="p-12 text-center">
              <h2 className="text-xl font-black mb-3 uppercase text-slate-900 tracking-tighter">{offer.title}</h2>
              <p className="text-slate-400 mb-10 text-xs font-bold leading-relaxed">{offer.desc}</p>
              
              <div className="text-5xl font-black text-primary mb-10 tracking-tighter">
                {offer.discount}
              </div>
              
              <div className="bg-slate-50 border-2 border-dashed border-slate-100 rounded-2xl p-8 relative group/code overflow-hidden">
                <p className="text-[9px] text-slate-300 uppercase font-black tracking-widest mb-3">Voucher Code</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{offer.code}</p>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover/code:opacity-5 transition-opacity" />
              </div>
              
              <button 
                onClick={() => handleClaim(offer.code)}
                className="w-full mt-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20"
              >
                Claim Offer
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Featured Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 bg-primary rounded-[4rem] p-16 md:p-24 relative overflow-hidden group shadow-2xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Join the Elite Club</h3>
            <p className="text-white/70 text-lg max-w-md font-medium leading-relaxed tracking-tight">Get unlimited free deliveries, priority booking, and 20% off on all services for just ₹999/year.</p>
          </div>
          <button 
            onClick={() => { toast.success('Welcome to the Elite Club!'); navigate('/checkout'); }}
            className="px-16 py-6 bg-white text-primary font-black uppercase tracking-widest text-[11px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            Upgrade Now
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[120px] group-hover:scale-125 transition-transform duration-1000" />
        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-black/10 rounded-full blur-[100px]" />
      </motion.div>
    </div>
  );
};

export default Offers;
