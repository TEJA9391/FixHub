import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Calendar, 
  ClipboardList, 
  Wallet, 
  UserCircle, 
  Settings, 
  ToggleLeft as Toggle,
  Star,
  CheckCircle2,
  CheckCircle,
  Clock,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { cn } from '../lib/utils';

const ProviderDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Today\'s Earnings', value: '₹4,520', trend: '+12%', icon: <Wallet className="text-[#0c831f]" /> },
    { label: 'Completed Jobs', value: '156', trend: '+5%', icon: <CheckCircle className="text-blue-500" /> },
    { label: 'Avg. Rating', value: '4.9', trend: 'High', icon: <Star className="text-yellow-500" /> },
    { label: 'Total Hours', value: '420h', trend: '+8%', icon: <Clock className="text-purple-500" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Provider Hub</h1>
            <div className={cn(
              "px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border",
              isOnline ? "bg-green-50 border-green-100 text-green-600" : "bg-red-50 border-red-100 text-red-600"
            )}>
              {isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
          <p className="text-gray-500 font-medium text-sm">Welcome back, Rajesh! You have 3 jobs scheduled for today.</p>
        </div>

        <div className="flex items-center gap-6 bg-white border border-gray-100 shadow-sm rounded-2xl px-6 py-4">
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Status</p>
            <p className="font-extrabold text-sm text-gray-900">{isOnline ? 'Accepting Jobs' : 'On Break'}</p>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={cn(
              "w-14 h-7 rounded-full relative transition-colors duration-500 p-1",
              isOnline ? "bg-[#0c831f]" : "bg-gray-200"
            )}
          >
            <div className={cn(
              "w-5 h-5 rounded-full bg-white transition-all duration-500 shadow-sm",
              isOnline ? "translate-x-7" : "translate-x-0"
            )} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Stats */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform border border-gray-100">
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-[#0c831f] uppercase tracking-widest bg-green-50 px-2 py-1 rounded-md">
                  <TrendingUp size={12} />
                  {stat.trend}
                </div>
              </div>
              <p className="text-3xl font-black text-gray-900 tracking-tight mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-8 md:p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                <Calendar className="text-[#0c831f]" />
                Active Schedule
              </h2>
              <button className="text-xs font-bold text-blue-600 hover:underline">View Calendar</button>
            </div>

            <div className="space-y-6">
              {[
                { time: '10:00 AM', user: 'Alex Rivers', service: 'Kitchen Deep Cleaning', address: 'Bellandur, Bangalore', type: 'High Priority' },
                { time: '02:30 PM', user: 'Sarah Jenkins', service: 'AC Power Jet Service', address: 'HSR Layout, Bangalore', type: 'Regular' },
                { time: '05:00 PM', user: 'Mike Ross', service: 'Full Home Sanitization', address: 'Indiranagar, Bangalore', type: 'Regular' },
              ].map((job, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6 group">
                  <div className="flex items-center gap-6 w-full">
                    <div className="text-center shrink-0 w-24">
                      <p className="text-xl font-black text-gray-900">{job.time.split(' ')[0]}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{job.time.split(' ')[1]}</p>
                    </div>
                    <div className="h-12 w-px bg-gray-100 hidden md:block" />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-extrabold text-lg text-gray-900">{job.service}</h4>
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                          job.type === 'High Priority' ? "bg-red-50 text-red-600 border border-red-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                        )}>
                          {job.type}
                        </span>
                      </div>
                      <p className="text-[13px] font-medium text-gray-500 flex items-center gap-2">
                        <UserCircle size={14} className="text-gray-400" /> {job.user} • {job.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 font-bold hover:bg-gray-100 transition-all text-[11px] uppercase tracking-widest">
                      Navigate
                    </button>
                    <button className="flex-1 md:flex-none px-8 py-3 rounded-xl bg-[#0c831f] text-white font-bold hover:bg-[#0a6e1a] hover:scale-[1.02] active:scale-95 transition-all shadow-lg text-[11px] uppercase tracking-widest">
                      Start Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Mini Components */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-8 text-center">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">KYC Status</h3>
            <div className="w-20 h-20 rounded-full bg-green-50 text-[#0c831f] mx-auto flex items-center justify-center mb-6">
              <CheckCircle size={40} />
            </div>
            <p className="font-extrabold text-gray-900 mb-2">Verified Professional</p>
            <p className="text-xs font-medium text-gray-500">All documents have been approved by the admin team.</p>
          </div>

          <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-8">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Wallet Balance</h3>
            <p className="text-4xl font-black text-[#0c831f] tracking-tight mb-2">₹12,840</p>
            <p className="text-[10px] text-gray-400 mb-8 font-bold uppercase tracking-widest">Available for Payout</p>
            <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 shadow-lg transition-all">
              Request Payout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
