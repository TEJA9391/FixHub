import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ShoppingCart, User, ChevronDown, LogOut, ShieldCheck, X, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../lib/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [locationName, setLocationName] = useState('Detecting...');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isScrolled = true;

  const mainCategories = [
    { label: 'Home', link: '/category/AC Repair' },
    { label: 'Office', link: '/category/Office Maintenance' },
    { label: 'Beauty', link: '/category/Women\'s Salon' }
  ];

  const fallbackIpLocation = async () => {
    try {
      const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
      const data = await res.json();
      setLocationName(data.city ? `${data.city}, ${data.region}` : 'Jubilee Hills, Hyderabad');
    } catch {
      setLocationName('Jubilee Hills, Hyderabad');
    }
  };

  const fetchLocation = () => {
    setLocationName('Detecting location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
              headers: { 'Accept-Language': 'en-US,en' }
            });
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.village || 'Hyderabad';
            const suburb = data.address.suburb || data.address.neighbourhood || data.address.residential || '';
            setLocationName(suburb ? `${suburb}, ${city}` : city);
          } catch (error) {
            fallbackIpLocation();
          }
        },
        () => {
          fallbackIpLocation();
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      fallbackIpLocation();
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    const allServices = [
      { name: 'AC Deep Cleaning', cat: 'Repair', link: '/category/AC Repair' },
      { name: 'Plumbing & Leakage', cat: 'Repair', link: '/category/Plumbing' },
      { name: 'Tap Repair/Replace', cat: 'Plumbing', link: '/category/Plumbing' },
      { name: 'Furniture Repair', cat: 'Carpentry', link: '/category/Carpentry' },
      { name: 'Door Lock Fix', cat: 'Carpentry', link: '/category/Carpentry' },
      { name: 'Washing Machine Repair', cat: 'Appliance', link: '/category/Appliance Repair' },
      { name: 'Refrigerator Service', cat: 'Appliance', link: '/category/Appliance Repair' },
      { name: 'CCTV Setup/Security', cat: 'Security', link: '/category/Home Security' },
      { name: 'Smart Lock Setup', cat: 'Security', link: '/category/Home Security' },
      { name: 'Office Chair Repair', cat: 'Office', link: '/category/Office Maintenance' },
      { name: 'Workstation Setup', cat: 'Office', link: '/category/Office Maintenance' },
      { id: 101, name: 'Grooming essentials', cat: 'Salon', link: '/category/Women\'s Salon' },
      { id: 102, name: 'Complete care salon', cat: 'Salon', link: '/category/Women\'s Salon' },
      { id: 301, name: 'AC Foam-jet service', cat: 'Repair', link: '/category/AC Repair' },
      { id: 501, name: 'Full Home Cleaning', cat: 'Cleaning', link: '/category/Cleaning & Pest' },
      { id: 601, name: 'Sofa Shampooing', cat: 'Cleaning', link: '/category/Cleaning & Pest' },
      { id: 701, name: 'Electricity Audit', cat: 'Electrician', link: '/category/Electrician' },
      { id: 801, name: 'Fan Installation', cat: 'Electrician', link: '/category/Electrician' },
      { id: 901, name: 'Living Room Painting', cat: 'Painting', link: '/category/Painting' },
      { name: 'Wall Painting', cat: 'Home', link: '/category/Painting' },
      { name: 'Haircut for Men', cat: 'Salon', link: '/category/Men\'s Salon' },
      { name: 'Pedicure', cat: 'Salon', link: '/category/Women\'s Salon' }
    ];

    if (val.length >= 2) {
      const searchTerms = val.toLowerCase().split(' ').filter(t => t.length > 0);
      const filtered = allServices.filter(s => {
        const searchableText = `${s.name} ${s.cat}`.toLowerCase();
        // Return true only if ALL terms are found in the searchable text
        return searchTerms.every(term => searchableText.includes(term));
      });
      // Sort by best match (if name starts with the first term, rank higher)
      filtered.sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(searchTerms[0]) ? -1 : 1;
        const bStarts = b.name.toLowerCase().startsWith(searchTerms[0]) ? -1 : 1;
        return aStarts - bStarts;
      });
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      const bestMatch = searchSuggestions[0] || { link: `/category/${searchQuery}` };
      navigate(bestMatch.link);
      setSearchSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion.name);
    setSearchSuggestions([]);
    navigate(suggestion.link);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled 
          ? "bg-white/70 backdrop-blur-2xl border-b border-gray-100/50 shadow-xl py-0" 
          : "bg-slate-900 py-2"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="h-20 flex items-center justify-between gap-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all group-hover:rotate-12 duration-500",
              isScrolled ? "bg-indigo-600 shadow-indigo-100" : "bg-white shadow-black/10"
            )}>
              <span className={cn("font-black text-xs", isScrolled ? "text-white" : "text-indigo-600")}>FH</span>
            </div>
            <span className={cn(
              "font-black text-2xl tracking-tighter uppercase transition-colors",
              isScrolled ? "text-gray-900" : "text-white"
            )}>FixHub</span>
          </Link>

          {/* Unified Search Bar */}
          <div className={cn(
            "hidden md:flex flex-1 max-w-xl items-center rounded-2xl h-12 overflow-visible group transition-all relative border",
            isScrolled 
              ? "bg-gray-100/50 border-gray-100 focus-within:bg-white focus-within:border-indigo-200" 
              : "bg-white/10 border-white/20 backdrop-blur-md focus-within:bg-white focus-within:border-white"
          )}>
            <div 
              onClick={fetchLocation}
              className={cn(
                "flex items-center gap-2 px-4 h-full cursor-pointer transition-colors shrink-0 rounded-l-2xl",
                isScrolled ? "hover:bg-gray-200/50" : "hover:bg-white/10"
              )}
            >
              <MapPin size={16} className={isScrolled ? "text-indigo-600" : "text-white"} />
              <span className={cn(
                "text-[12px] font-bold truncate max-w-[150px]",
                isScrolled ? "text-gray-700" : "text-white/90"
              )}>{locationName}</span>
              <ChevronDown size={14} className={isScrolled ? "text-gray-300" : "text-white/40"} />
            </div>

            <div className={cn("w-px h-6", isScrolled ? "bg-gray-200" : "bg-white/20")} />

            <div className="relative flex-1 h-full">
              <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2", isScrolled ? "text-gray-400" : "text-white/60")} size={16} />
              <input
                type="text"
                placeholder='Search for services...'
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearch}
                className={cn(
                  "w-full h-full pl-12 pr-4 py-2 text-sm font-medium focus:outline-none bg-transparent transition-colors",
                  isScrolled ? "text-gray-900 placeholder:text-gray-400" : "text-white placeholder:text-white/60"
                )}
              />
              
              <AnimatePresence>
                {searchSuggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 overflow-hidden"
                  >
                    {searchSuggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => selectSuggestion(s)}
                        className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center justify-between group/s transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Search size={14} className="text-gray-300" />
                          <div>
                            <p className="text-[13px] font-bold text-gray-900">{s.name}</p>
                            <p className="text-[11px] text-gray-400">{s.cat}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link to="/checkout" className="relative p-2.5 rounded-xl transition-all group">
              <ShoppingCart size={22} className={cn("transition-colors", isScrolled ? "text-gray-700" : "text-white")} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black ring-4 ring-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            <div className="relative">
              <button 
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className={cn(
                  "flex items-center gap-2 p-1.5 pr-4 rounded-full transition-all border",
                  isScrolled ? "bg-gray-50 border-gray-100 text-gray-900" : "bg-white/10 border-white/20 text-white backdrop-blur-md"
                )}
              >
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", isScrolled ? "bg-white text-indigo-600" : "bg-white text-indigo-600 shadow-lg")}>
                  <User size={18} />
                </div>
                <span className="text-sm font-bold">Account</span>
              </button>

              <AnimatePresence>
                {isAccountMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsAccountMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-[calc(100%+12px)] right-0 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-50"
                    >
                      <div className="p-4 border-b border-gray-50 mb-1">
                        <p className="font-bold text-gray-900 text-sm">Rajesh T.</p>
                        <p className="text-[11px] text-indigo-600 font-bold mt-0.5">Elite Member</p>
                      </div>
                      <div className="space-y-0.5">
                        <Link
                          to="/profile?tab=profile"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                          <User size={16} />
                          Profile
                        </Link>
                        <Link
                          to="/profile?tab=bookings"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                          <ShieldCheck size={16} />
                          My Bookings
                        </Link>
                        <Link
                          to="/auth"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-500 transition-all text-sm font-bold mt-1"
                        >
                          <LogOut size={16} />
                          Logout
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>


      </div>
    </motion.nav>
  );
};

export default Navbar;
