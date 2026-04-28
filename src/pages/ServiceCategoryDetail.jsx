import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Star, Clock, Plus, Minus, 
  Info, ShieldCheck, CheckCircle, ChevronRight,
  ShoppingBag, Search, Percent
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../lib/CartContext';
import toast, { Toaster } from 'react-hot-toast';

const ServiceCategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, totalAmount } = useCart();
  const [activeSubCategory, setActiveSubCategory] = useState('Packages');

  // Data Mapping for different categories
  const categoryData = {
    'Women\'s Salon': {
      subCategories: [
        { name: 'Packages', icon: '📦' },
        { name: 'Pedicure', icon: '🦶' },
        { name: 'Hair care', icon: '💇‍♀️' },
        { name: 'Face care', icon: '🧖' },
        { name: 'Massage', icon: '🧘' },
      ],
      packages: [
        { id: 101, name: 'Grooming essentials', price: 738, duration: '1 hr 15 mins', rating: 4.8, reviews: '260K', desc: ['Haircut: Haircut for men', 'Shave/beard grooming: Beard trimming & styling'] },
        { id: 102, name: 'Complete care', price: 1150, duration: '1 hr 45 mins', rating: 4.9, reviews: '200K', desc: ['Haircut: Haircut for men', 'Detan (O2+): Face & neck detan'] },
      ],
      services: [
        { id: 201, name: 'Aroma bomb pedicure', price: 1299, duration: '1 hr 15 mins', rating: 4.8, img: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?auto=format&fit=crop&q=80&w=400' },
        { id: 202, name: 'Nail cut & file (feet)', price: 120, duration: '15 mins', rating: 4.8, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'AC Repair': {
      subCategories: [
        { name: 'Service', icon: '❄️' },
        { name: 'Repair', icon: '🛠️' },
        { name: 'Install', icon: '🏗️' },
      ],
      packages: [
        { id: 301, name: 'AC Deep Cleaning (Foam-jet)', price: 1098, duration: '45 mins', rating: 4.8, reviews: '1.2M', desc: ['Deep cleaning of indoor unit', 'Outdoor unit water wash', 'Gas pressure check'] },
        { id: 302, name: 'Full AC Service', price: 449, duration: '30 mins', rating: 4.7, reviews: '800K', desc: ['Standard jet wash', 'Drainage cleaning'] },
      ],
      services: [
        { id: 401, name: 'Gas Leakage Fix', price: 2500, duration: '1.5 hrs', rating: 4.9, img: 'https://images.unsplash.com/photo-1621905252507-b354bc2d18c4?auto=format&fit=crop&q=80&w=400' },
        { id: 402, name: 'PCB Repair', price: 1500, duration: '2 hrs', rating: 4.6, img: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Cleaning': {
      subCategories: [
        { name: 'Full Home', icon: '🏠' },
        { name: 'Kitchen', icon: '🍳' },
        { name: 'Bathroom', icon: '🚿' },
      ],
      packages: [
        { id: 501, name: 'Full Home Deep Cleaning', price: 4999, duration: '6 hrs', rating: 4.9, reviews: '150K', desc: ['Kitchen deep cleaning', '2 Bathrooms deep cleaning', 'Living room & Bedroom dusting'] },
      ],
      services: [
        { id: 601, name: 'Sofa Shampooing', price: 799, duration: '1 hr', rating: 4.8, img: 'https://images.unsplash.com/photo-1550963295-019d8a8a61c5?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Cleaning & Pest': {
      subCategories: [
        { name: 'Full Home', icon: '🏠' },
        { name: 'Pest Control', icon: '🐜' },
      ],
      packages: [
        { id: 502, name: 'Cockroach Control', price: 699, duration: '45 mins', rating: 4.7, reviews: '40K', desc: ['Kitchen & Bathroom treatment', 'Gel-based solution'] },
      ],
      services: [
        { id: 602, name: 'Fridge Cleaning', price: 299, duration: '30 mins', rating: 4.7, img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Native Purifier': {
      subCategories: [
        { name: 'Service', icon: '💧' },
        { name: 'Repair', icon: '🛠️' },
      ],
      packages: [
        { id: 1301, name: 'Purifier Service Kit', price: 499, duration: '45 mins', rating: 4.8, reviews: '30K', desc: ['Sediment filter change', 'Membrane cleaning', 'TDS check'] },
      ],
      services: [
        { id: 1401, name: 'RO Installation', price: 599, duration: '1 hr', rating: 4.9, img: 'https://images.unsplash.com/photo-1585822310497-fb46968f94d9?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Smart Locks': {
      subCategories: [
        { name: 'Installation', icon: '🔐' },
        { name: 'Setup', icon: '📱' },
      ],
      packages: [
        { id: 1501, name: 'Smart Lock Setup Pro', price: 1299, duration: '2 hrs', rating: 4.9, reviews: '5K', desc: ['Installation on any door', 'Mobile app configuration', 'User training'] },
      ],
      services: [
        { id: 1601, name: 'Biometric Scanner Fix', price: 899, duration: '1 hr', rating: 4.7, img: 'https://images.unsplash.com/photo-1558002038-103792e097df?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'InstaHelp': {
      subCategories: [
        { name: 'Emergency', icon: '🆘' },
        { name: 'Urgent', icon: '⚡' },
      ],
      packages: [
        { id: 1701, name: 'Emergency Repair Visit', price: 199, duration: '30 mins arrival', rating: 4.9, reviews: '50K', desc: ['Priority technician assignment', 'Immediate diagnosis', 'Minor fix included'] },
      ],
      services: [
        { id: 1801, name: 'Short Circuit Help', price: 299, duration: 'Immediate', rating: 4.8, img: 'https://images.unsplash.com/photo-1621905252507-b354bc2d18c4?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Electrician': {
      subCategories: [
        { name: 'Fans', icon: '🚁' },
        { name: 'Lights', icon: '💡' },
        { name: 'Switch', icon: '🔌' },
      ],
      packages: [
        { id: 701, name: 'Home Electricity Audit', price: 299, duration: '45 mins', rating: 4.8, reviews: '20K', desc: ['Wiring check', 'MCB inspection', 'Safety report'] },
      ],
      services: [
        { id: 801, name: 'Ceiling Fan Install', price: 149, duration: '30 mins', rating: 4.9, img: 'https://images.unsplash.com/photo-1621905252507-b354bc2d18c4?auto=format&fit=crop&q=80&w=400' },
        { id: 802, name: 'Switchboard Repair', price: 99, duration: '20 mins', rating: 4.7, img: 'https://images.unsplash.com/photo-1558002038-103792e097df?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Painting': {
      subCategories: [
        { name: 'Full Home', icon: '🎨' },
        { name: 'Single Wall', icon: '🖌️' },
        { name: 'Waterproof', icon: '💧' },
      ],
      packages: [
        { id: 901, name: 'Living Room Makeover', price: 4999, duration: '2 days', rating: 4.9, reviews: '10K', desc: ['Premium emulsion paint', 'Wall putty application', 'Post-paint cleaning'] },
      ],
      services: [
        { id: 1001, name: 'Waterproofing (1 Room)', price: 2500, duration: '1 day', rating: 4.8, img: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Men\'s Salon': {
      subCategories: [
        { name: 'Haircut', icon: '💇‍♂️' },
        { name: 'Beard', icon: '🪒' },
        { name: 'Massage', icon: '🧘' },
      ],
      packages: [
        { id: 1101, name: 'Gentleman\'s Grooming', price: 599, duration: '1 hr', rating: 4.9, reviews: '100K', desc: ['Premium haircut', 'Beard styling', 'Relaxing head massage'] },
      ],
      services: [
        { id: 1201, name: 'Haircut for Men', price: 249, duration: '45 mins', rating: 4.8, img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Plumbing': {
      subCategories: [
        { name: 'Taps & Pipes', icon: '🚰' },
        { name: 'Drainage', icon: '🛁' },
        { name: 'Water Tank', icon: '🏙️' },
      ],
      packages: [
        { id: 10001, name: 'Full Home Plumbing Audit', price: 499, duration: '1 hr', rating: 4.8, reviews: '12K', desc: ['Leakage check', 'Pressure test', 'Tank inspection'] },
      ],
      services: [
        { id: 1001, name: 'Tap Repair/Replace', price: 199, duration: '30 mins', rating: 4.8, img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Carpentry': {
      subCategories: [
        { name: 'Furniture', icon: '🪑' },
        { name: 'Doors', icon: '🚪' },
      ],
      packages: [
        { id: 11001, name: 'Furniture Revamp', price: 1499, duration: '4 hrs', rating: 4.9, reviews: '8K', desc: ['Polishing', 'Hinge adjustment', 'Deep cleaning'] },
      ],
      services: [
        { id: 1101, name: 'Furniture Repair', price: 299, duration: '1 hr', rating: 4.7, img: 'https://images.unsplash.com/photo-1550963295-019d8a8a61c5?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Appliance Repair': {
      subCategories: [
        { name: 'Washing Machine', icon: '🧺' },
        { name: 'Refrigerator', icon: '🧊' },
        { name: 'Microwave', icon: '🍲' },
      ],
      packages: [
        { id: 12001, name: 'Ultimate Appliance Care', price: 999, duration: '2 hrs', rating: 4.8, reviews: '25K', desc: ['Cleaning', 'Gas check', 'Performance tuning'] },
      ],
      services: [
        { id: 1201, name: 'Washing Machine Fix', price: 499, duration: '1.5 hrs', rating: 4.8, img: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Home Security': {
      subCategories: [
        { name: 'CCTV', icon: '📹' },
        { name: 'Smart Locks', icon: '🔐' },
      ],
      packages: [
        { id: 13001, name: 'Secure Home Package', price: 2999, duration: '4 hrs', rating: 4.9, reviews: '2K', desc: ['4 Camera setup', 'NVR configuration', 'App setup'] },
      ],
      services: [
        { id: 1301, name: 'CCTV Setup', price: 1999, duration: '3 hrs', rating: 4.8, img: 'https://images.unsplash.com/photo-1558002038-103792e097df?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    'Office Maintenance': {
      subCategories: [
        { name: 'Furniture', icon: '💺' },
        { name: 'Setup', icon: '🖥️' },
        { name: 'Cleaning', icon: '🧹' },
      ],
      packages: [
        { id: 14001, name: 'Office Refresh', price: 2499, duration: '5 hrs', rating: 4.9, reviews: '1K', desc: ['Chair servicing', 'Desk sanitization', 'Network check'] },
      ],
      services: [
        { id: 1401, name: 'Office Chair Repair', price: 399, duration: '1 hr', rating: 4.7, img: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&q=80&w=400' },
      ]
    }
  };

  const currentData = categoryData[category] || categoryData['Women\'s Salon'];
  const subCategories = currentData.subCategories;
  const packages = currentData.packages;
  const individualServices = currentData.services;

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = subCategories.map(sub => document.getElementById(`section-${sub.name.replace(/\\s+/g, '-')}`));
      
      let currentActive = activeSubCategory;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            currentActive = subCategories[i].name;
            break;
          }
        }
      }
      
      if (currentActive && currentActive !== activeSubCategory) {
        setActiveSubCategory(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [subCategories, activeSubCategory]);

  return (
    <div className="min-h-screen bg-white font-inter">
      <Toaster position="top-center" />
      {/* Header */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight capitalize">{category || 'Salon Royale'}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Star size={12} className="fill-blue-600 text-blue-600" />
                <span className="text-[11px] font-bold text-gray-400">4.87 (1.1 M bookings)</span>
              </div>
            </div>
          </div>
          <div className="relative w-72 hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search for services" 
              className="w-full bg-gray-50 border border-transparent rounded-xl pl-12 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:border-gray-100 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar: Categories */}
        <aside className="w-64 border-r border-gray-100 h-[calc(100vh-80px)] sticky top-20 hidden lg:block overflow-y-auto py-8 px-4">
           <div className="space-y-1">
              {subCategories.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => {
                    setActiveSubCategory(sub.name);
                    const element = document.getElementById(`section-${sub.name.replace(/\\s+/g, '-')}`);
                    if (element) {
                      const topOffset = element.getBoundingClientRect().top + window.scrollY - 120;
                      window.scrollTo({ top: topOffset, behavior: 'smooth' });
                    }
                  }}
                  className={cn(
                    "w-full flex flex-col items-center gap-2 p-4 rounded-2xl transition-all group cursor-pointer active:scale-95",
                    activeSubCategory === sub.name ? "bg-gray-50 shadow-sm" : "hover:bg-gray-50/50"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all shadow-sm bg-white border border-gray-100",
                    activeSubCategory === sub.name ? "scale-110 border-[#0c831f]/20" : "group-hover:scale-105"
                  )}>
                    {sub.icon}
                  </div>
                  <span className={cn(
                    "text-[11px] font-bold text-center leading-tight transition-colors",
                    activeSubCategory === sub.name ? "text-gray-900" : "text-gray-400"
                  )}>{sub.name}</span>
                </button>
              ))}
           </div>
        </aside>

        {/* Center: Services */}
        <main className="flex-1 min-w-0 p-8 md:p-12 space-y-16">
          {subCategories.map((sub, index) => (
            <section key={sub.name} id={`section-${sub.name.replace(/\\s+/g, '-')}`} className="scroll-mt-24">
              <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">{sub.name}</h2>
              
              {index === 0 ? (
                <div className="space-y-10">
                  {packages.map((pkg) => {
                    const isInCart = cartItems.some(item => item.id === pkg.id);
                    return (
                      <div key={`${sub.name}-${pkg.id}`} className="pb-10 border-b border-gray-100 last:border-0 relative">
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                               <span className="bg-green-50 text-[#0c831f] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#0c831f]/10 uppercase tracking-tighter">Package</span>
                            </div>
                            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">{pkg.name}</h3>
                            <div className="flex items-center gap-4 text-gray-400 text-[12px] font-bold">
                               <span className="flex items-center gap-1"><Star size={12} className="fill-blue-600 text-blue-600" /> {pkg.rating} ({pkg.reviews} reviews)</span>
                               <span className="flex items-center gap-1">• {pkg.duration}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => addToCart(pkg)}
                            className={cn(
                              "px-8 py-2 rounded-xl text-sm font-bold shadow-sm transition-all border cursor-pointer active:scale-95",
                              isInCart ? "bg-gray-100 text-gray-400 border-gray-100" : "bg-white text-blue-600 border-gray-200 hover:border-blue-600 hover:shadow-md"
                            )}
                          >
                            {isInCart ? 'Added' : 'Add'}
                          </button>
                        </div>
                        <p className="text-lg font-bold text-gray-900 mb-6">₹{pkg.price}</p>
                        <ul className="space-y-2 mb-6">
                          {pkg.desc.map((d, i) => (
                            <li key={i} className="flex items-start gap-3 text-[13px] text-gray-500 font-medium leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-2 shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                        <button 
                          onClick={() => toast('Configure your package', { icon: '⚙️' })}
                          className="text-[12px] font-bold text-blue-600 hover:underline cursor-pointer"
                        >
                          Edit your package
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-12">
                  {individualServices.map((service) => {
                    const isInCart = cartItems.some(item => item.id === service.id);
                    return (
                      <div key={`${sub.name}-${service.id}`} className="flex gap-8 items-center justify-between pb-10 border-b border-gray-100 last:border-0">
                        <div className="flex-1 space-y-3">
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">{service.name}</h3>
                          <div className="flex items-center gap-4 text-gray-400 text-[11px] font-bold">
                            <span className="flex items-center gap-1"><Star size={10} className="fill-blue-600 text-blue-600" /> {service.rating}</span>
                            <span>• {service.duration}</span>
                          </div>
                          <p className="text-base font-extrabold text-gray-900">₹{service.price}</p>
                          <button 
                            onClick={() => toast('Service details loaded', { icon: 'ℹ️' })}
                            className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                          >
                            View details
                          </button>
                        </div>
                        <div className="relative shrink-0">
                          <img src={service.img} alt={service.name} className="w-32 h-32 rounded-2xl object-cover shadow-sm border border-gray-50" />
                          <button 
                            onClick={() => addToCart(service)}
                            className={cn(
                              "absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-xl text-xs font-bold shadow-lg border transition-all cursor-pointer active:scale-95",
                              isInCart ? "bg-gray-100 text-gray-400 border-gray-100" : "bg-white text-blue-600 border-gray-100 hover:border-blue-600 hover:shadow-xl"
                            )}
                          >
                            {isInCart ? 'Added' : 'Add'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
        </main>

        {/* Right Sidebar: Bill/Promise */}
        <aside className="w-[380px] h-[calc(100vh-80px)] sticky top-20 hidden xl:block p-8 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#0c831f]">
                <Percent size={20} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-gray-900 leading-tight">Get ₹50 coupon</p>
                <p className="text-[11px] text-gray-400 font-medium">After first service delivery</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">FixHub Promise</h3>
                <ShieldCheck size={32} className="text-[#0c831f] opacity-30" />
             </div>
             <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[13px] font-bold text-gray-600">
                  <CheckCircle size={16} className="text-[#0c831f]" /> Verified Professionals
                </li>
                <li className="flex items-center gap-3 text-[13px] font-bold text-gray-600">
                  <CheckCircle size={16} className="text-[#0c831f]" /> Hassle Free Booking
                </li>
                <li className="flex items-center gap-3 text-[13px] font-bold text-gray-600">
                  <CheckCircle size={16} className="text-[#0c831f]" /> Transparent Pricing
                </li>
             </ul>
          </div>

          <AnimatePresence>
            {cartItems.length > 0 && (
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#0c831f] text-white p-5 rounded-2xl flex items-center justify-between shadow-[0_20px_50px_rgba(12,131,31,0.2)] hover:scale-[1.02] active:scale-95 transition-all group"
              >
                <span className="text-lg font-black tracking-tight">₹{totalAmount}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider">View Cart</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </aside>
      </div>

      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="xl:hidden fixed bottom-6 left-6 right-6 z-50"
          >
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#0c831f] text-white p-4 rounded-2xl flex items-center justify-between shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold opacity-80">{cartItems.length} items</p>
                  <p className="text-lg font-black tracking-tight">₹{totalAmount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-wider">Checkout</span>
                <ChevronRight size={18} />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceCategoryDetail;
