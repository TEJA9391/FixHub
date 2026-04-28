import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  Play, 
  Wrench, 
  Sparkles, 
  Home, 
  Zap, 
  Smartphone,
  ChevronLeft,
  Users,
  MapPin
} from 'lucide-react';
import { cn } from '../lib/utils';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: "Women's Salon", icon: <Sparkles size={24} />, color: "bg-purple-50 text-purple-600" },
    { name: "Men's Salon", icon: <Users size={24} />, color: "bg-blue-50 text-blue-600" },
    { name: "AC Repair", icon: <Zap size={24} />, color: "bg-orange-50 text-orange-600" },
    { name: "Cleaning", icon: <Home size={24} />, color: "bg-green-50 text-green-600" },
    { name: "Electrician", icon: <Wrench size={24} />, color: "bg-amber-50 text-amber-600" },
    { name: "Painting", icon: <Smartphone size={24} />, color: "bg-indigo-50 text-indigo-600" },
  ];

  return (
    <div className="bg-white min-h-screen font-inter">
      {/* Search Header */}
      <section className="pt-20 pb-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="flex-1 text-center md:text-left space-y-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
            Home services, <br />
            <span className="text-[#0c831f]">on demand.</span>
          </h1>
          
          <div className="relative max-w-2xl">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 text-gray-400 border-r border-gray-100 pr-4">
               <MapPin size={18} className="text-[#0c831f]" />
               <span className="text-sm font-bold text-gray-900">Bangalore</span>
            </div>
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            <input 
              type="text" 
              placeholder="Search for 'AC service'..." 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-40 pr-16 py-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#0c831f]/5 focus:border-[#0c831f]/20 transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {['AC Service', 'Bathroom Cleaning', 'Haircut', 'Sofa Cleaning'].map((tag) => (
              <button key={tag} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-[12px] font-semibold text-gray-500 hover:bg-gray-100 transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full max-w-xl relative">
           <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white spring-up"
              >
                <img src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&w=800" alt="Home Care" className="w-full aspect-[4/3] object-cover" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-10 -right-10 w-48 h-48 rounded-[32px] overflow-hidden border-8 border-white shadow-2xl hidden md:block"
              >
                <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400" alt="Salon" className="w-full h-full object-cover" />
              </motion.div>
           </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="px-6 max-w-5xl mx-auto py-12">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(`/category/${cat.name}`)}
                className="flex flex-col items-center gap-4 group cursor-pointer"
              >
                <div className={cn("w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105", cat.color)}>
                  {cat.icon}
                </div>
                <span className="text-[12px] md:text-[13px] font-bold text-gray-700 text-center leading-tight group-hover:text-[#0c831f] transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="px-6 max-w-5xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f3f9f5] p-10 rounded-3xl flex items-center justify-between group cursor-pointer overflow-hidden relative">
            <div className="space-y-4 relative z-10">
              <span className="text-[11px] font-bold text-[#0c831f] uppercase tracking-widest">New Launch</span>
              <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">Native Water Purifier <br />Starting at ₹499</h2>
              <button className="bg-[#0c831f] text-white px-6 py-2.5 rounded-xl font-bold text-xs">Book Now</button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1585822310497-fb46968f94d9?auto=format&fit=crop&w=400" 
              alt="Purifier" 
              className="w-32 h-32 object-cover rounded-2xl rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-xl"
            />
          </div>
          <div className="bg-[#fef9f2] p-10 rounded-3xl flex items-center justify-between group cursor-pointer overflow-hidden relative">
            <div className="space-y-4 relative z-10">
              <span className="text-[11px] font-bold text-orange-600 uppercase tracking-widest">Limited Offer</span>
              <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">Flat 20% Off on <br />AC Power Clean</h2>
              <button className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs">Claim Now</button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400" 
              alt="AC" 
              className="w-32 h-32 object-cover rounded-2xl rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-24 px-6 mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl font-extrabold text-gray-900">Why book with FixHub?</h2>
            <p className="text-gray-500 font-medium">Safe, reliable, and professional services at your fingertips.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Verified Experts", desc: "Top 1% professionals with background checks.", icon: <ShieldCheck size={28} className="text-[#0c831f]" /> },
              { title: "On-time Arrival", desc: "Professionals arrive at your doorstep in 60 mins.", icon: <Clock size={28} className="text-blue-600" /> },
              { title: "Transparent Pricing", desc: "Fixed pricing with no hidden surprises.", icon: <Zap size={28} className="text-orange-600" /> },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100 text-center space-y-6">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="px-6 max-w-5xl mx-auto py-24">
         <div className="bg-gray-900 rounded-[40px] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden relative">
            <div className="relative z-10 flex-1 space-y-8">
                <div className="text-[#0c831f] font-bold text-xs uppercase tracking-widest">Safety First</div>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Our priority is <br />your safety.</h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md font-medium">From background checks to SOS tech, we've got you covered throughout the service.</p>
                <button className="bg-white text-black px-10 py-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">Safety Measures</button>
            </div>
            <div className="relative z-0 opacity-10 pointer-events-none">
               <Users size={300} />
            </div>
         </div>
      </section>

      {/* Cities Section */}
      <section className="px-6 max-w-5xl mx-auto py-12 mb-20 border-t border-gray-50">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Available in 65+ Cities</h3>
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'].map(city => (
            <span key={city} className="text-gray-900 font-bold text-[14px] hover:text-[#0c831f] cursor-pointer transition-colors">{city}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
