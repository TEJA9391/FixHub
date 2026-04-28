import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Star, ChevronRight, SlidersHorizontal, Plus, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../lib/CartContext';
import toast from 'react-hot-toast';

const services = [
  { id: 1, name: 'Full Home Deep Cleaning', category: 'Cleaning', price: '1299', rating: 4.9, reviews: 850, img: 'https://images.unsplash.com/photo-1581578731548-c64695ce6954?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'AC Service & Repair', category: 'Repair', price: '449', rating: 4.8, reviews: 1200, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Mens Grooming Package', category: 'Salon', price: '599', rating: 4.7, reviews: 500, img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Sofa & Carpet Shampooing', category: 'Cleaning', price: '799', rating: 4.6, reviews: 320, img: 'https://images.unsplash.com/photo-1550963295-019d8a8a61c5?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Kitchen Chimney Cleaning', category: 'Cleaning', price: '649', rating: 4.9, reviews: 210, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
  { id: 6, name: 'Electrician Callout', category: 'Electric', price: '149', rating: 4.5, reviews: 2400, img: 'https://images.unsplash.com/photo-1621905252507-b354bc2d18c4?auto=format&fit=crop&q=80&w=400' },
  { id: 7, name: 'Full Home Painting', category: 'Painting', price: '4999', rating: 4.9, reviews: 150, img: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&q=80&w=400' },
  { id: 8, name: 'Plumbing Leak Repair', category: 'Plumbing', price: '199', rating: 4.4, reviews: 1800, img: 'https://images.unsplash.com/photo-1585704032915-c3400ca1f965?auto=format&fit=crop&q=80&w=400' },
  { id: 9, name: 'Womens Facial & Cleanup', category: 'Salon', price: '899', rating: 4.8, reviews: 940, img: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=400' },
  { id: 10, name: 'Furniture Assembly (Carpenter)', category: 'Carpentry', price: '299', rating: 4.7, reviews: 670, img: 'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&q=80&w=400' },
  { id: 11, name: 'Cockroach Control Service', category: 'Pest Control', price: '699', rating: 4.6, reviews: 430, img: 'https://images.unsplash.com/photo-1615460547269-02bc45bb425c?auto=format&fit=crop&q=80&w=400' },
  { id: 12, name: 'TV Installation & Repair', category: 'Repair', price: '349', rating: 4.5, reviews: 1100, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400' },
];

const ServiceListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSearchParams({ ...Object.fromEntries(searchParams), category: cat });
  };

  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
    const cat = searchParams.get('category') || 'All';
    setActiveCategory(cat);
  }, [searchParams]);

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (e, service) => {
    e.stopPropagation();
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 font-inter">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Services</h1>
          <p className="text-gray-500 text-[13px] font-medium mt-1">Discover expert help for your home</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchParams({ ...Object.fromEntries(searchParams), search: e.target.value });
              }}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-6 py-3 text-sm font-medium focus:outline-none focus:border-[#0c831f]/30 transition-all placeholder:text-gray-300"
            />
          </div>
          <button className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <SlidersHorizontal size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {['All', 'Cleaning', 'Repair', 'Salon', 'Electric', 'Plumbing', 'Painting', 'Carpentry', 'Pest Control'].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={cn(
              "px-6 py-2.5 rounded-full text-[13px] font-bold transition-all shrink-0 border",
              activeCategory === cat 
                ? "bg-[#0c831f] border-[#0c831f] text-white shadow-md" 
                : "bg-white border-gray-100 text-gray-500 hover:border-gray-200 hover:text-gray-900"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => {
          const isInCart = cartItems.some(item => item.id === service.id);
          return (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate(`/services/${service.id}`)}
              className="group flex flex-col cursor-pointer border border-gray-100 bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={service.img} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-white/90 backdrop-blur-sm border border-black/5 text-[10px] font-bold text-gray-900 shadow-sm">
                  {service.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#0c831f] transition-colors">{service.name}</h3>
                  <div className="flex items-center gap-1 shrink-0 bg-gray-50 px-2 py-0.5 rounded-md">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-[11px] text-gray-700">{service.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500 mb-6 line-clamp-2 leading-relaxed text-[13px] font-medium">
                  Expert {service.category.toLowerCase()} solutions delivered by top-rated professionals.
                </p>
                
                <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-extrabold text-gray-900">₹{service.price}</span>
                  </div>
                  <button 
                    onClick={(e) => handleAddToCart(e, service)}
                    disabled={isInCart}
                    className={cn(
                      "px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-[12px] transition-all",
                      isInCart 
                        ? "bg-gray-100 text-gray-400 cursor-default" 
                        : "bg-[#0c831f] text-white hover:bg-[#0a6e1a] shadow-sm active:scale-95"
                    )}
                  >
                    {isInCart ? 'Added' : <><Plus size={14} /> Add</>}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceListing;
