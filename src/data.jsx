// FixHub Mock Data (Google Material Symbols Edition)

export const CATEGORIES = [
  { id: 'electrician', label: 'Electrician', icon: 'bolt', color: '#CA8A04', bg: '#FEF9C3' },
  { id: 'plumber', label: 'Plumber', icon: 'plumbing', color: '#2563EB', bg: '#DBEAFE' },
  { id: 'ac', label: 'AC Repair', icon: 'ac_unit', color: '#0284C7', bg: '#E0F2FE' },
  { id: 'painter', label: 'Painter', icon: 'format_paint', color: '#DB2777', bg: '#FCE7F3' },
  { id: 'cleaning', label: 'Cleaning', icon: 'cleaning_services', color: '#16A34A', bg: '#DCFCE7' },
  { id: 'carpenter', label: 'Carpenter', icon: 'carpenter', color: '#D97706', bg: '#FEF3C7' },
  { id: 'pest', label: 'Pest Control', icon: 'bug_report', color: '#9333EA', bg: '#F3E8FF' },
  { id: 'appliance', label: 'Appliances', icon: 'refrigerator', color: '#E11D48', bg: '#FFE4E6' },
];

export const OFFERS = [
  { id: 1, title: '20% OFF', subtitle: 'First Booking', desc: 'Use code FIRSTFIX', bg: 'linear-gradient(135deg,#22C55E,#16A34A)', icon: 'celebration' },
  { id: 2, title: 'FREE Visit', subtitle: 'AC Service', desc: 'Limited time offer', bg: 'linear-gradient(135deg,#2563EB,#1D4ED8)', icon: 'ac_unit' },
  { id: 3, title: '₹99 Only', subtitle: 'Home Cleaning', desc: 'For 2BHK homes', bg: 'linear-gradient(135deg,#FACC15,#EAB308)', icon: 'home' },
];

export const TECHNICIANS = [
  { id: 1, name: 'Rajesh Kumar', category: 'electrician', categoryLabel: 'Electrician', rating: 4.9, reviews: 312, experience: '8 yrs', price: 299, distance: '1.2 km', available: true, verified: true, avatar: 'Engineering', skills: ['Wiring','Panel','Inverter'], bio: 'Expert in home & commercial electrical work. Certified & insured.', phone: '+91 98765 43210' },
  { id: 2, name: 'Suresh Yadav', category: 'plumber', categoryLabel: 'Plumber', rating: 4.7, reviews: 198, experience: '6 yrs', price: 249, distance: '0.8 km', available: true, verified: true, avatar: 'Construction', skills: ['Leakage','Pipes','Motor'], bio: 'Specializes in pipe fitting, drainage and water motor repair.', phone: '+91 98765 12345' },
  { id: 3, name: 'Amit Singh', category: 'ac', categoryLabel: 'AC Repair', rating: 4.8, reviews: 445, experience: '10 yrs', price: 399, distance: '2.1 km', available: true, verified: true, avatar: 'HVAC', skills: ['Service','Gas Fill','Installation'], bio: 'Top-rated AC specialist with 10+ years in HVAC systems.', phone: '+91 98765 67890' },
  { id: 4, name: 'Priya Sharma', category: 'cleaning', categoryLabel: 'Cleaning', rating: 4.6, reviews: 87, experience: '3 yrs', price: 199, distance: '0.5 km', available: false, verified: true, avatar: 'Person', skills: ['Deep Clean','Bathroom','Kitchen'], bio: 'Professional home cleaning with eco-friendly products.', phone: '+91 98765 11111' },
];

export const REVIEWS = [
  { id: 1, user: 'Ananya M.', rating: 5, comment: 'Excellent work! Very professional and punctual.', date: '2 days ago', avatar: 'face' },
  { id: 2, user: 'Rohit K.', rating: 5, comment: 'Fixed the issue quickly. Highly recommend!', date: '1 week ago', avatar: 'face_2' },
  { id: 3, user: 'Sita D.', rating: 4, comment: 'Good service, came on time and cleaned up after.', date: '2 weeks ago', avatar: 'face_3' },
];

export const NOTIFICATIONS = [
  { id: 1, type: 'booking', title: 'Booking Confirmed!', body: 'Rajesh Kumar will arrive by 3:00 PM today.', time: '2 min ago', read: false, icon: 'check_circle' },
  { id: 2, type: 'offer', title: '20% Off this weekend!', body: 'Book any service and save big. Use code WEEKEND20.', time: '1 hr ago', read: false, icon: 'local_offer' },
  { id: 3, type: 'update', title: 'Technician On the Way', body: 'Suresh Yadav is 5 minutes away.', time: '3 hrs ago', read: true, icon: 'directions_car' },
];

export const TRACKING_STEPS = [
  { id: 1, label: 'Booking Accepted', done: true, time: '2:30 PM', icon: 'task_alt' },
  { id: 2, label: 'On the Way', done: true, time: '2:45 PM', icon: 'shipped' },
  { id: 3, label: 'Arrived', done: true, time: '3:00 PM', icon: 'home_pin' },
  { id: 4, label: 'Work Started', done: false, time: '', icon: 'build_circle' },
  { id: 5, label: 'Completed', done: false, time: '', icon: 'verified' },
];
