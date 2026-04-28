import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Wallet, Smartphone, Banknote, ShieldCheck, 
  MapPin, ChevronRight, Lock, Trash2, ShoppingBag, 
  Plus, Minus, Clock, ChevronLeft, Percent,
  HelpCircle, Star, Info, Building2, Apple, X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import toast from 'react-hot-toast';

const BookingCheckout = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, totalAmount, clearCart, addToCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [selectedUPI, setSelectedUPI] = useState('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [gatewayStep, setGatewayStep] = useState(1);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    saved: false
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  
  const deliveryFee = 0;
  const handlingFee = 49;
  const taxes = Math.round(totalAmount * 0.18);
  const finalTotal = totalAmount + deliveryFee + handlingFee + taxes;

  const handleBooking = () => {
    if (!address.saved) {
      toast.error('Please add your address before proceeding', { style: { borderRadius: '12px', background: '#333', color: '#fff' } });
      return;
    }

    setIsProcessing(true);
    
    if (paymentMethod === 'upi') {
      if (selectedUPI === 'qr') {
        toast.loading('Verifying QR payment status...', { id: 'payment' });
      } else {
        toast.loading('Request sent to your UPI App. Please approve...', { id: 'payment' });
      }
      
      setTimeout(() => {
        toast.success('Payment Successful!', { id: 'payment', style: { background: '#0c831f', color: '#fff', borderRadius: '12px' } });
        setTimeout(() => {
          clearCart();
          navigate('/tracking/ORD' + Math.floor(Math.random() * 1000000));
        }, 1000);
      }, 2500);
      
    } else if (paymentMethod === 'card') {
      toast.loading('Redirecting to secure card gateway...', { id: 'payment' });
      setTimeout(() => {
        toast.loading('Processing Card...', { id: 'payment' });
        setTimeout(() => {
          toast.success('Payment Successful!', { id: 'payment', style: { background: '#0c831f', color: '#fff', borderRadius: '12px' } });
          setTimeout(() => {
            clearCart();
            navigate('/tracking/ORD' + Math.floor(Math.random() * 1000000));
          }, 1000);
        }, 2000);
      }, 1500);
      
    } else if (paymentMethod === 'netbanking') {
      toast.loading('Redirecting to your bank...', { id: 'payment' });
      setTimeout(() => {
        toast.success('Payment Successful!', { id: 'payment', style: { background: '#0c831f', color: '#fff', borderRadius: '12px' } });
        setTimeout(() => {
          clearCart();
          navigate('/tracking/ORD' + Math.floor(Math.random() * 1000000));
        }, 1000);
      }, 3000);
      
    } else if (paymentMethod === 'cash') {
      toast.loading('Confirming order...', { id: 'payment' });
      setTimeout(() => {
        toast.success('Order Confirmed!', { id: 'payment', style: { background: '#0c831f', color: '#fff', borderRadius: '12px' } });
        setTimeout(() => {
          clearCart();
          navigate('/tracking/ORD' + Math.floor(Math.random() * 1000000));
        }, 1000);
      }, 1500);
    }
  };

  const renderGateway = () => {
    if (!showGateway) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl relative"
        >
          <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center">
            <div>
               <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Secure Checkout</p>
               <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">FixHub Pay</h3>
            </div>
            <button onClick={() => setShowGateway(false)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm border border-gray-100">
               <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="p-8">
            {paymentMethod === 'card' && gatewayStep === 1 && (
              <div className="space-y-4">
                <div className="flex gap-2 items-center text-sm font-bold text-gray-700 mb-6"><CreditCard className="text-blue-600"/> Enter Card Details</div>
                <input type="text" placeholder="Card Number (e.g. 4111...)" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm tracking-widest focus:outline-none focus:border-blue-500 transition-colors" />
                <div className="flex gap-4">
                  <input type="text" placeholder="MM/YY" className="w-1/2 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                  <input type="password" placeholder="CVV" maxLength="3" className="w-1/2 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm tracking-widest focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <input type="text" placeholder="Name on Card" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors" />
                
                <button onClick={() => { toast.loading('Sending OTP...', {id: 'otp'}); setTimeout(() => { toast.dismiss('otp'); setGatewayStep(2); }, 1500) }} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors mt-4">
                  Proceed to Pay ₹{finalTotal}
                </button>
              </div>
            )}

            {paymentMethod === 'card' && gatewayStep === 2 && (
              <div className="text-center space-y-6">
                <ShieldCheck size={48} className="text-green-500 mx-auto" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Verify Payment</h3>
                  <p className="text-sm text-gray-500 mt-2">Enter the OTP sent to your mobile number</p>
                </div>
                <input type="text" placeholder="• • • • • •" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-2xl tracking-[1em] text-center focus:outline-none focus:border-green-500 transition-colors" />
                <button onClick={() => { setShowGateway(false); handleBooking(); }} className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/30 hover:bg-green-700 transition-colors">
                  Submit & Pay ₹{finalTotal}
                </button>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-6">
                <div className="flex gap-2 items-center text-sm font-bold text-gray-700 mb-2"><Building2 className="text-purple-600"/> Select Bank</div>
                <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                   <option>HDFC Bank</option>
                   <option>SBI</option>
                   <option>ICICI Bank</option>
                   <option>Axis Bank</option>
                   <option>Kotak Mahindra</option>
                </select>
                <div className="bg-purple-50 p-4 rounded-xl text-xs font-medium text-purple-700">
                  You will be redirected to your bank's secure portal to complete the payment.
                </div>
                <button onClick={() => { setShowGateway(false); handleBooking(); }} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-600/30 hover:bg-purple-700 transition-colors">
                  Continue to Bank
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-64 h-64 mb-10">
          <img src="https://cdn.grofers.com/layout-engine/2022-04/empty-cart.png" alt="Empty" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 max-w-xs mb-10 font-medium">Looks like you haven't added any services yet.</p>
        <Link to="/" className="bg-[#0c831f] text-white px-12 py-4 rounded-xl font-bold text-sm shadow-xl hover:bg-[#0a6e1a] transition-all">Explore Services</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f7] font-inter pb-32">
      <AnimatePresence>
        {renderGateway()}
      </AnimatePresence>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <ChevronLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Lock size={16} />
            <span className="text-[11px] font-bold uppercase tracking-widest">Safe & Secure</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Summary & Payment Selection */}
          <div className="flex-1 space-y-6 w-full">
            
            {/* Address Section */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 overflow-hidden">
               <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Service Address</h2>
               </div>
               <div className="p-8">
                 {!address.saved || isEditingAddress ? (
                   <div className="space-y-4">
                     <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Flat / House No / Building</label>
                       <input 
                         type="text" 
                         value={address.street} 
                         onChange={(e) => setAddress({...address, street: e.target.value})} 
                         className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold text-sm text-gray-900 focus:ring-2 focus:ring-[#0c831f] transition-all outline-none" 
                         placeholder="e.g. 101, Elite Apartments" 
                       />
                     </div>
                     <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City / Area</label>
                       <input 
                         type="text" 
                         value={address.city} 
                         onChange={(e) => setAddress({...address, city: e.target.value})} 
                         className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold text-sm text-gray-900 focus:ring-2 focus:ring-[#0c831f] transition-all outline-none" 
                         placeholder="e.g. Mumbai" 
                       />
                     </div>
                     <button 
                       onClick={() => {
                         if(address.street && address.city) {
                           setAddress({...address, saved: true});
                           setIsEditingAddress(false);
                         } else {
                           toast.error('Please enter complete address');
                         }
                       }}
                       className="bg-[#0c831f] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                     >
                       Save Address
                     </button>
                   </div>
                 ) : (
                   <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0c831f] shadow-sm border border-gray-50">
                         <MapPin size={20} />
                       </div>
                       <div>
                         <p className="font-extrabold text-gray-900 text-sm">Deliver to Home</p>
                         <p className="text-gray-500 text-xs font-medium mt-0.5">{address.street}, {address.city}</p>
                       </div>
                     </div>
                     <button 
                       onClick={() => setIsEditingAddress(true)}
                       className="text-[#0c831f] text-[10px] font-black uppercase tracking-widest hover:underline"
                     >
                       Change
                     </button>
                   </div>
                 )}
               </div>
            </div>

            {/* Basket Summary */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 overflow-hidden">
               <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Service Basket</h2>
                  <span className="text-gray-400 text-sm font-bold">{cartItems.length} items</span>
               </div>
               <div className="divide-y divide-gray-50">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex items-center gap-6 group">
                      <img src={item.img} className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">{item.name}</h4>
                        <p className="text-[11px] font-bold text-gray-400 mt-0.5">45 mins • Verified Expert</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <p className="text-sm font-extrabold text-gray-900">₹{item.price}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                          title="Remove service"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50">
              <h2 className="text-lg font-extrabold text-gray-900 tracking-tight mb-8">Select Payment Method</h2>
              
              <div className="space-y-4">
                {/* UPI Section */}
                <div 
                  onClick={() => setPaymentMethod('upi')}
                  className={cn(
                    "p-6 rounded-2xl border transition-all cursor-pointer",
                    paymentMethod === 'upi' ? "border-[#0c831f] bg-[#0c831f]/5" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-50">
                        <Smartphone size={20} className="text-blue-600" />
                      </div>
                      <span className="font-bold text-gray-900">UPI</span>
                    </div>
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", paymentMethod === 'upi' ? "border-[#0c831f]" : "border-gray-200")}>
                      {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 bg-[#0c831f] rounded-full" />}
                    </div>
                  </div>
                  
                  {paymentMethod === 'upi' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 ml-14 space-y-4">
                      <div className="flex gap-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedUPI('qr'); }}
                          className={cn(
                            "px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-all flex-1",
                            selectedUPI === 'qr' ? "bg-white border-[#0c831f] text-[#0c831f] shadow-md" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                          )}
                        >
                          Scan QR Code
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedUPI('id'); }}
                          className={cn(
                            "px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-all flex-1",
                            selectedUPI === 'id' ? "bg-white border-[#0c831f] text-[#0c831f] shadow-md" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                          )}
                        >
                          Enter UPI ID
                        </button>
                      </div>

                      {selectedUPI === 'qr' ? (
                         <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center space-y-3 shadow-sm cursor-default" onClick={e => e.stopPropagation()}>
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=merchant@upi&pn=FixHub&am=${finalTotal}`} alt="QR Code" className="w-32 h-32 rounded-lg" />
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Scan with any UPI App</p>
                         </div>
                      ) : (
                         <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                            <input type="text" placeholder="e.g. 9876543210@ybl" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0c831f] transition-colors" />
                         </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Cards Section */}
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={cn(
                    "p-6 rounded-2xl border transition-all cursor-pointer",
                    paymentMethod === 'card' ? "border-[#0c831f] bg-[#0c831f]/5" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-50">
                        <CreditCard size={20} className="text-orange-500" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">Credit / Debit Card</span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Visa, Mastercard, RuPay</p>
                      </div>
                    </div>
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", paymentMethod === 'card' ? "border-[#0c831f]" : "border-gray-200")}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-[#0c831f] rounded-full" />}
                    </div>
                  </div>
                </div>

                {/* Netbanking Section */}
                <div 
                  onClick={() => setPaymentMethod('netbanking')}
                  className={cn(
                    "p-6 rounded-2xl border transition-all cursor-pointer",
                    paymentMethod === 'netbanking' ? "border-[#0c831f] bg-[#0c831f]/5" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-50">
                        <Building2 size={20} className="text-purple-600" />
                      </div>
                      <span className="font-bold text-gray-900">Netbanking</span>
                    </div>
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", paymentMethod === 'netbanking' ? "border-[#0c831f]" : "border-gray-200")}>
                      {paymentMethod === 'netbanking' && <div className="w-2.5 h-2.5 bg-[#0c831f] rounded-full" />}
                    </div>
                  </div>
                </div>

                {/* Cash After Service */}
                <div 
                  onClick={() => setPaymentMethod('cash')}
                  className={cn(
                    "p-6 rounded-2xl border transition-all cursor-pointer",
                    paymentMethod === 'cash' ? "border-[#0c831f] bg-[#0c831f]/5" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-50">
                        <Banknote size={20} className="text-emerald-600" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">Cash after service</span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Pay at your doorstep</p>
                      </div>
                    </div>
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", paymentMethod === 'cash' ? "border-[#0c831f]" : "border-gray-200")}>
                      {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 bg-[#0c831f] rounded-full" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bill Details & Pay CTA */}
          <div className="lg:w-[380px] space-y-6 w-full sticky top-28">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-8">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-500">Service Total</span>
                  <span className="text-gray-900">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-500">Safety & Handling</span>
                  <span className="text-gray-900">₹{handlingFee}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-500">Taxes</span>
                  <span className="text-gray-900">₹{taxes}</span>
                </div>
                <div className="h-px bg-gray-50 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">Total Payable</span>
                  <span className="text-2xl font-black text-gray-900">₹{finalTotal}</span>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                <div className="flex items-center gap-3 text-emerald-600">
                  <ShieldCheck size={18} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">UC Insurance Protected</span>
                </div>
                <button 
                  onClick={() => {
                    if (paymentMethod === 'card' || paymentMethod === 'netbanking') {
                      setShowGateway(true);
                      setGatewayStep(1);
                    } else {
                      handleBooking();
                    }
                  }}
                  disabled={isProcessing}
                  className={cn(
                    "w-full bg-[#6b33e3] text-white py-5 rounded-[2rem] font-bold text-lg shadow-[0_20px_50px_rgba(107,51,227,0.3)] transition-all flex items-center justify-center gap-3 group",
                    isProcessing ? "opacity-70 cursor-not-allowed" : "hover:bg-[#5829c1] hover:scale-[1.02] active:scale-95"
                  )}
                >
                  {isProcessing ? 'Processing...' : (
                    <>
                      <span>Pay ₹{finalTotal}</span>
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100 flex items-center gap-4">
               <img src="https://img.icons8.com/color/48/safe-ok.png" className="w-10 h-10" alt="Safe" />
               <p className="text-[11px] font-bold text-gray-500 leading-relaxed">FixHub uses 128-bit encryption to secure your transactions and payment data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCheckout;
