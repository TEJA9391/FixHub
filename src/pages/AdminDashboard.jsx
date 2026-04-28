import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  Settings, 
  LayoutGrid, 
  Star,
  CheckCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  PieChart,
  ShieldAlert,
  BellRing,
  Ticket,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '12.5k', icon: <Users />, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Providers', value: '450', icon: <UserCheck />, color: 'bg-green-50 text-green-600' },
    { label: 'Monthly Revenue', value: '₹24.8L', icon: <PieChart />, color: 'bg-purple-50 text-purple-600' },
    { label: 'Pending KYC', value: '18', icon: <ShieldAlert />, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white font-inter">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Console</h1>
          <p className="text-gray-500 font-medium mt-1 text-sm">Manage the entire Fixhub ecosystem</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 font-bold hover:bg-gray-100 transition-all text-xs uppercase tracking-widest flex items-center gap-2">
            <BellRing size={16} />
            Broadcast
          </button>
          <button className="px-6 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-all text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95">
            <Settings size={16} />
            System Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all rounded-[2rem] p-8 group overflow-hidden relative"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", stat.color)}>
              {stat.icon}
            </div>
            <p className="text-4xl font-black text-gray-900 tracking-tight mb-1">{stat.value}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
            <ArrowUpRight className="absolute top-8 right-8 text-gray-100 group-hover:text-gray-300 transition-colors" size={48} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Recent Bookings</h2>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-400">Service</th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-400">User</th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-400">Provider</th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-400">Amount</th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-400 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[1,2,3,4,5].map(i => (
                    <tr key={i} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-5 font-bold text-gray-900 text-sm">Deep Cleaning</td>
                      <td className="py-5 text-sm font-medium text-gray-500">User_{i}293</td>
                      <td className="py-5 text-sm font-medium text-gray-500">Pro_Karan</td>
                      <td className="py-5 font-extrabold text-gray-900 text-sm">₹1,249</td>
                      <td className="py-5 text-right">
                        <span className="px-2.5 py-1 rounded-md bg-green-50 text-green-600 border border-green-100 text-[9px] font-black uppercase tracking-widest">Completed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-8">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mb-8">Management</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Categories', icon: <LayoutGrid size={20} className="text-blue-500" /> },
                { label: 'KYC Verification', icon: <ShieldAlert size={20} className="text-red-500" /> },
                { label: 'Promo Codes', icon: <Ticket size={20} className="text-purple-500" /> },
                { label: 'Complaints', icon: <ShieldAlert size={20} className="text-orange-500" /> },
              ].map((action, idx) => (
                <button key={idx} className="w-full flex items-center justify-between p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#0c831f]/30 hover:bg-[#0c831f]/5 transition-all group">
                  <div className="flex items-center gap-4 font-bold text-gray-700 text-sm group-hover:text-[#0c831f] transition-colors">
                    {action.icon}
                    {action.label}
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#0c831f] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0c831f] border border-[#0c831f] shadow-lg shadow-[#0c831f]/20 rounded-[2rem] p-8 group overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-1 tracking-tight">SYSTEM AUDIT</h3>
              <p className="text-white/80 font-medium text-sm mb-6">Last checked: 2 hours ago</p>
              <button className="w-full py-4 bg-white text-gray-900 font-bold text-[11px] uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-transform shadow-lg">
                Run Full Scan
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
