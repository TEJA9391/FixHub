import React from 'react';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import { ShoppingBag, ChevronRight, X, ShieldCheck, CheckCircle, Mail, Info, FileText, Lock, Globe, MessageSquare } from 'lucide-react';
import AIChatbot from './AIChatbot';

const InfoModal = ({ title, content, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-[3rem] p-12 max-w-2xl w-full relative shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h2>
        <div className="text-gray-500 font-medium leading-relaxed space-y-4">
           {content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
        </div>
        <button onClick={onClose} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-sm">Close</button>
      </div>
    </motion.div>
  </motion.div>
);

const SafetyInfoModal = ({ onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-[3rem] p-12 max-w-2xl w-full relative overflow-hidden shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
      
      <div className="space-y-8">
        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-600">
           <ShieldCheck size={40} />
        </div>
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Our Safety Commitment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Verified Pros</h3>
              <p className="text-gray-400 text-sm font-medium">Every partner undergoes rigorous background checks and criminal record verification.</p>
           </div>
           <div className="space-y-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> SOS Support</h3>
              <p className="text-gray-400 text-sm font-medium">Real-time emergency assistance available 24/7 during every service session.</p>
           </div>
           <div className="space-y-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Insurance Cover</h3>
              <p className="text-gray-400 text-sm font-medium">Comprehensive protection for your property and the professional during the job.</p>
           </div>
           <div className="space-y-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Secure Payments</h3>
              <p className="text-gray-400 text-sm font-medium">Your money is held in escrow and only released after your 100% satisfaction.</p>
           </div>
        </div>
        <button onClick={onClose} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-sm shadow-xl hover:scale-[1.02] transition-all">Understood</button>
      </div>
    </motion.div>
  </motion.div>
);

const ContactSupportModal = ({ onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-[3rem] p-12 max-w-lg w-full relative shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Contact Support</h2>
          <p className="text-gray-400 font-medium mt-2">We typically respond within 15 minutes.</p>
        </div>

        <form action="https://formsubmit.co/support@fixhub.com" method="POST" className="space-y-6">
           <input type="hidden" name="_subject" value="Fixhub Support Request" />
           <input type="hidden" name="_captcha" value="false" />
           <input type="hidden" name="_next" value={window.location.href} />
           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
              <input type="text" name="name" required className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-[#0c831f] outline-none" placeholder="John Doe" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input type="email" name="email" required className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-[#0c831f] outline-none" placeholder="john@example.com" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
              <textarea name="message" required rows="4" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-[#0c831f] outline-none resize-none" placeholder="How can we help?"></textarea>
           </div>
           <button type="submit" className="w-full bg-[#0c831f] text-white py-5 rounded-2xl font-bold text-sm shadow-xl shadow-green-900/20 hover:scale-[1.02] active:scale-95 transition-all">Send Message</button>
        </form>
      </div>
    </motion.div>
  </motion.div>
);

const Layout = ({ children }) => {
  const location = useLocation();
  const { cartItems, totalAmount } = useCart();
  const isCheckoutPage = location.pathname === '/checkout';
  const isAuthPage = location.pathname === '/auth';
  const [modalContent, setModalContent] = React.useState(null);
  const [showContact, setShowContact] = React.useState(false);
  const [showSafety, setShowSafety] = React.useState(false);

  const infoData = {
    about: { title: "About Fixhub", content: "Fixhub is India's most trusted marketplace for premium home services. We connect millions of customers with high-quality professionals for everything from salon services and cleaning to appliance repair and home painting.\n\nOur mission is to empower millions of service professionals by delivering services in a way that has never been experienced before." },
    impact: { title: "Our Impact", content: "Since our inception, Fixhub has transformed the lives of over 50,000 service professionals by providing them with consistent work, fair wages, and comprehensive insurance cover.\n\nWe believe in building a sustainable ecosystem where quality work meets fair recognition." },
    terms: { title: "Terms & Conditions", content: "By using Fixhub, you agree to our standard operating procedures which ensure the safety of both the customer and the service professional.\n\nAll services booked through our platform are covered by the Fixhub Guarantee which protects you against any accidental damage or unsatisfactory work." },
    privacy: { title: "Privacy Policy", content: "At Fixhub, your privacy is our priority. We use industry-standard encryption to protect your personal data and service history.\n\nWe never share your personal information with third-party advertisers. Your data is used strictly to provide you with the best home service experience." },
    blog: { title: "Fixhub Blog", content: "Welcome to the Fixhub Blog! Here we share tips on home maintenance, beauty trends, and stories from our top-performing partners.\n\nStay tuned for our upcoming expert series on sustainable living and modern home styling." }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 selection:bg-black selection:text-white overflow-x-hidden font-inter">
      {!isAuthPage && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={isAuthPage ? "min-h-screen w-full" : "pt-16 min-h-[80vh]"}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {!isAuthPage && <AIChatbot />}

      <AnimatePresence>
        {modalContent && <InfoModal title={modalContent.title} content={modalContent.content} onClose={() => setModalContent(null)} />}
        {showContact && <ContactSupportModal onClose={() => setShowContact(false)} />}
        {showSafety && <SafetyInfoModal onClose={() => setShowSafety(false)} />}
      </AnimatePresence>
      
      {/* Footer */}
      {!isAuthPage && (
      <footer className="py-20 px-6 border-t border-gray-100 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-black text-xs">FH</span>
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-slate-900">FIXHUB</span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed text-[13px] font-medium">
              Experience the gold standard of home services. Professional, reliable, and lightning-fast service at your doorstep.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-gray-900 uppercase tracking-widest text-[10px]">Company</h4>
            <ul className="space-y-3 text-gray-500 text-[12px] font-medium">
              <li onClick={() => setModalContent(infoData.about)} className="hover:text-[#0c831f] transition-colors cursor-pointer">About Us</li>
              <li onClick={() => setModalContent(infoData.impact)} className="hover:text-[#0c831f] transition-colors cursor-pointer">Impact</li>
              <li onClick={() => setModalContent(infoData.terms)} className="hover:text-[#0c831f] transition-colors cursor-pointer">Terms & Conditions</li>
              <li onClick={() => setModalContent(infoData.privacy)} className="hover:text-[#0c831f] transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-gray-900 uppercase tracking-widest text-[10px]">For Partners</h4>
            <ul className="space-y-3 text-gray-500 text-[12px] font-medium">
              <Link to="/auth" className="hover:text-[#0c831f] transition-colors cursor-pointer block">Register as a partner</Link>
              <Link to="/auth" className="hover:text-[#0c831f] transition-colors cursor-pointer block">Partner login</Link>
              <li onClick={() => setModalContent(infoData.blog)} className="hover:text-[#0c831f] transition-colors cursor-pointer">Blog</li>
              <li onClick={() => setShowContact(true)} className="hover:text-[#0c831f] transition-colors cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-400 font-bold">
          <p>© 2026 FIXHUB TECHNOLOGIES INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span onClick={() => setShowSafety(true)} className="hover:text-[#0c831f] cursor-pointer transition-colors">Security</span>
            <span onClick={() => setModalContent(infoData.privacy)} className="hover:text-[#0c831f] cursor-pointer transition-colors">Accessibility</span>
            <span onClick={() => setModalContent(infoData.about)} className="hover:text-[#0c831f] cursor-pointer transition-colors">Status</span>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};

export default Layout;
