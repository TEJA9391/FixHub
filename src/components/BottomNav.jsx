import React from 'react';

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Explore', icon: 'explore' },
    { id: 'bookings', label: 'Bookings', icon: 'calendar_month' },
    { id: 'notifications', label: 'Alerts', icon: 'notifications' },
    { id: 'profile', label: 'Profile', icon: 'person' }
  ];

  return (
    <div className="bottom-nav">
      {tabs.map(tab => (
        <div 
          key={tab.id} 
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="symbol" style={{fontSize: '28px'}}>{tab.icon}</span>
          <span style={{fontSize: '11px', fontWeight: '700'}}>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
