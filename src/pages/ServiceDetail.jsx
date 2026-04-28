import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Clock, ShieldCheck, MapPin, ChevronLeft, 
  Calendar, Info, Zap, ShoppingBag, Plus, Check,
  ChevronRight, X
} from 'lucide-react';
import { useCart } from '../lib/CartContext';
import toast from 'react-hot-toast';
import { cn } from '../lib/utils';

const services_data = [
  { id: 1, name: 'Full Home Deep Cleaning', category: 'Cleaning', price: '1299', oldPrice: '1599', rating: 4.9, reviews: 850, img: 'https://images.unsplash.com/photo-1581578731548-c64695ce6954?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, name: 'AC Service & Repair', category: 'Repair', price: '449', oldPrice: '599', rating: 4.8, reviews: 1200, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200' },
];

const BookingQuestions = ({ service, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const questions = {
    'Cleaning': [
      { id: 'size', q: 'How many rooms need cleaning?', options: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'] },
      { id: 'focus', q: 'Any specific focus area?', options: ['Kitchen', 'Bathrooms', 'Windows', 'Full Deep Clean'] },
    ],
    'Repair': [
      { id: 'type', q: 'What type of appliance?', options: ['Split AC', 'Window AC', 'Refrigerator', 'Washing Machine'] },
      { id: 'issue', q: 'What is the primary issue?', options: ['Not starting', 'Strange noise', 'Leakage', 'General Service'] },
    ],
  };

  const currentQuestions = questions[service.category] || [
    { id: 'pref', q: 'Any specific instructions?', options: ['None', 'Morning Slot', 'Afternoon Slot'] }
  ];

  const handleAnswer = (id, val) => {
    const newAnswers = { ...answers, [id]: val };
    setAnswers(newAnswers);
    if (step < currentQuestions.length) {
      setStep(step + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm font-inter"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white w-full max-w-lg rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
          <motion.div 
            className="h-full bg-[#0c831f]" 
            initial={{ width: 0 }}
            animate={{ width: `${(step / currentQuestions.length) * 100}%` }}
          />
        </div>
        
        <button 
          onClick={onCancel}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-10 mt-4">
          <span className="text-[11px] font-bold text-[#0c831f] uppercase tracking-wider mb-2 block">Step {step} of {currentQuestions.length}</span>
          <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">{currentQuestions[step-1].q}</h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentQuestions[step-1].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(currentQuestions[step-1].id, opt)}
              className="p-5 rounded-2xl bg-gray-50 border border-gray-100 text-left font-bold text-sm text-gray-700 hover:border-[#0c831f]/30 hover:bg-[#0c831f]/5 hover:text-[#0c831f] transition-all flex justify-between items-center group"
            >
              {opt}
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const service = services_data.find(s => s.id === parseInt(id)) || services_data[0];
  const isInCart = cartItems.some(item => item.id === service.id);
  
  const handleAddToCart = () => {
    addToCart(service);
    toast.success(`${service.name} added to cart!`, {
      style: {
        background: '#0c831f',
        color: '#fff',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600'
      },
    });
  };

  const onBookingComplete = (answers) => {
    if (!isInCart) addToCart(service);
    setShowBookingForm(false);
    toast.success('Preferences saved!', { icon: '✅' });
    setTimeout(() => navigate('/checkout'), 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 font-inter bg-white">
      <AnimatePresence>
        {showBookingForm && (
          <BookingQuestions 
            service={service} 
            onComplete={onBookingComplete} 
            onCancel={() => setShowBookingForm(false)} 
          />
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm transition-colors"
        >
          <ChevronLeft size={20} />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <img 
              src={service.img} 
              alt={service.name} 
              className="w-full aspect-video object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-wider">{service.category}</span>
              <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-sm">
                <Star size={16} className="fill-current" />
                <span className="text-gray-900">{service.rating} ({service.reviews} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">{service.name}</h1>
            
            <p className="text-lg text-gray-500 leading-relaxed font-medium">
              Professional {service.category.toLowerCase()} service for your home. Our expert partners ensure quality results with a 100% satisfaction guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                <Info size={20} className="text-[#0c831f]" />
                What's Included
              </h2>
              <ul className="space-y-3">
                {['Inspection', 'Service Cleanup', 'Post-service check'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[13px] font-semibold text-gray-600">
                    <Check size={16} className="text-[#0c831f]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#0c831f]" />
                Why us?
              </h2>
              <ul className="space-y-3">
                {['Verified Experts', '60-min Arrival', 'Insured Work'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[13px] font-semibold text-gray-600">
                    <Check size={16} className="text-[#0c831f]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 p-8 rounded-3xl border border-gray-100 shadow-xl bg-white space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Price</p>
                <p className="text-4xl font-extrabold text-gray-900">₹{service.price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm line-through text-gray-300 font-bold">₹{service.oldPrice}</p>
                <p className="text-[11px] text-[#0c831f] font-bold uppercase tracking-wider mt-0.5">Offered Price</p>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleAddToCart}
                disabled={isInCart}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-3",
                  isInCart 
                    ? "bg-gray-100 text-gray-400 cursor-default" 
                    : "bg-white border border-gray-100 text-gray-900 hover:border-[#0c831f] hover:text-[#0c831f]"
                )}
              >
                {isInCart ? <><Check size={18} /> Selected</> : <><Plus size={18} /> Add to Cart</>}
              </button>
              
              <button 
                onClick={() => setShowBookingForm(true)}
                className="w-full py-4 rounded-xl font-bold text-sm bg-[#0c831f] text-white hover:bg-[#0a6e1a] transition-all shadow-lg active:scale-95"
              >
                Book Now
              </button>
            </div>

            <div className="pt-6 border-t border-gray-50 flex items-center justify-center gap-2 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
              <ShieldCheck size={18} className="text-[#0c831f]" />
              Safe & Secure Booking
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
