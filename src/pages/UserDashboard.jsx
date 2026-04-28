import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  ChevronRight,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle,
  Edit2
} from 'lucide-react';
import { cn } from '../lib/utils';

const UserDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab'));
    }
  }, [searchParams]);

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
    { id: 'bookings', label: 'My Bookings', icon: <Package size={20} /> },
    { id: 'addresses', label: 'Saved Addresses', icon: <MapPin size={20} /> },
    { id: 'payments', label: 'Payment Methods', icon: <CreditCard size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 text-center border border-gray-100 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-[#0c831f]/5" />
            <div className="relative mt-4">
              <div className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md overflow-hidden mb-4 relative group-hover:scale-105 transition-transform">
                <img src="https://i.pravatar.cc/150?img=33" alt="User" className="w-full h-full object-cover" />
                <button className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] font-bold py-1 opacity-0 group-hover:opacity-100 transition-opacity">EDIT</button>
              </div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Rajesh T.</h2>
              <div className="flex items-center justify-center gap-1 mt-1 text-[#0c831f]">
                <ShieldCheck size={14} />
                <p className="text-[11px] font-bold uppercase tracking-widest">Elite Member</p>
              </div>
            </div>
          </div>

          <nav className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSearchParams({ tab: item.id });
                }}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl transition-all font-bold text-sm",
                  activeTab === item.id 
                    ? "bg-[#0c831f]/10 text-[#0c831f]" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-lg", activeTab === item.id ? "bg-[#0c831f]/20" : "bg-gray-100 text-gray-400")}>
                    {item.icon}
                  </div>
                  {item.label}
                </div>
                <ChevronRight size={16} className={activeTab === item.id ? "text-[#0c831f]" : "text-gray-300"} />
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-50">
              <button onClick={() => navigate('/auth')} className="w-full flex items-center gap-4 p-4 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm">
                <div className="p-2 rounded-lg bg-red-100 text-red-500">
                  <LogOut size={20} />
                </div>
                Log Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm min-h-[600px]">
            <header className="mb-10 pb-6 border-b border-gray-50">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight capitalize">{activeTab.replace('-', ' ')}</h1>
              <p className="text-gray-400 font-medium mt-2 text-sm">Manage your {activeTab.replace('-', ' ')} and preferences</p>
            </header>

            <div className="space-y-6">
              {activeTab === 'bookings' && (
                <>
                  {[
                    { id: 'ORD-78291', name: 'AC Deep Cleaning', date: 'Oct 24, 2024', status: 'Upcoming', price: '₹1,098', icon: '❄️' },
                    { id: 'ORD-65231', name: 'Sofa Shampooing', date: 'Oct 15, 2024', status: 'Completed', price: '₹799', icon: '🛋️' },
                    { id: 'ORD-55123', name: 'Men\'s Haircut', date: 'Sep 28, 2024', status: 'Completed', price: '₹259', icon: '💇‍♂️' },
                  ].map((booking, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border border-gray-100 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover:border-gray-200 transition-colors group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 text-3xl border border-gray-100 group-hover:scale-110 transition-transform">
                        {booking.icon}
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-1">
                          <h3 className="text-lg font-extrabold text-gray-900">{booking.name}</h3>
                          <span className={cn(
                            "inline-flex self-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest",
                            booking.status === 'Upcoming' ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                          )}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold text-gray-400">
                          <span className="flex items-center gap-1"><Clock size={12} /> {booking.date}</span>
                          <span>•</span>
                          <span className="text-gray-900">{booking.price}</span>
                          <span>•</span>
                          <span>{booking.id}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all text-xs">
                          Details
                        </button>
                        {booking.status === 'Completed' && (
                          <button className="px-5 py-2.5 rounded-xl bg-[#0c831f]/10 text-[#0c831f] font-bold hover:bg-[#0c831f] hover:text-white transition-all text-xs">
                            Re-book
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-8 max-w-xl">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">First Name</p>
                        <p className="font-extrabold text-gray-900">Rajesh</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Last Name</p>
                        <p className="font-extrabold text-gray-900">T.</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 col-span-2">
                        <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Email Address</p>
                        <p className="font-extrabold text-gray-900">rajesht@example.com</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 col-span-2">
                        <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Phone Number</p>
                        <p className="font-extrabold text-gray-900">+91 98765 43210</p>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">
                    Edit Profile
                  </button>
                </div>
              )}
              
              {activeTab !== 'bookings' && activeTab !== 'profile' && (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-6">
                    {menuItems.find(i => i.id === activeTab)?.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Nothing here yet</h3>
                  <p className="text-gray-400 font-medium text-sm max-w-sm">
                    You haven't added any {activeTab.replace('-', ' ')} yet. They will appear here once you do.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
