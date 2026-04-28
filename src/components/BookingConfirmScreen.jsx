import React from 'react';
import { CheckCircle, MapPin, MessageCircle, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingConfirmScreen = ({ booking, onTrack }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-[#FDFDFD]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white border border-gray-100 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl"
      >
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
          <CheckCircle size={48} className="text-green-600" />
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Woohoo! It's Booked.</h1>
        <p className="text-gray-500 text-lg font-medium mb-12">
          We've confirmed your appointment with <span className="text-gray-900 font-black">{booking?.tech?.name || 'our expert'}</span>.
        </p>

        <div className="bg-gray-50 rounded-3xl p-8 mb-12 border border-gray-100">
          <div className="grid grid-cols-2 gap-8 text-left">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Date & Time</p>
              <p className="font-black text-gray-900">{booking?.date || 'Today'} at {booking?.time || 'Flexible'}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Payable</p>
              <p className="font-black text-gray-900 text-lg">₹{booking?.price || '0'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={onTrack}
            className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <MapPin size={18} />
            Track Technician Location
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-4 bg-white text-gray-500 border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
          >
            <Home size={14} />
            Back to Home
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-center gap-3 text-green-600">
          <MessageCircle size={20} className="fill-current" />
          <span className="text-[10px] font-black uppercase tracking-widest">Updates sent to WhatsApp</span>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmScreen;
