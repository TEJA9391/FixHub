import React from 'react';

const ProfileScreen = ({ user, onLogout }) => {
  const menuItems = [
    { label: 'Booking History', icon: 'history' },
    { label: 'Saved Addresses', icon: 'location_on' },
    { label: 'Payment Methods', icon: 'payments' },
    { label: 'Refer & Earn', icon: 'redeem', badge: 'New' },
    { label: 'Help & Support', icon: 'support_agent' },
    { label: 'Safety Guidelines', icon: 'security' },
    { label: 'Settings', icon: 'settings' }
  ];

  return (
    <div className="screen" style={{maxWidth: '1000px'}}>
      <div className="card-premium" style={{display: 'flex', gap: '40px', alignItems: 'center', marginBottom: '48px', padding: '40px'}}>
        <div style={{
          width: '120px', 
          height: '120px', 
          borderRadius: '32px', 
          background: 'var(--secondary)', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '48px', 
          fontWeight: '800',
          boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)'
        }}>
          {user.name ? user.name[0] : 'U'}
        </div>
        <div style={{flex: 1}}>
          <h2 style={{fontSize: '32px', fontWeight: '800', marginBottom: '8px'}}>{user.name || 'User'}</h2>
          <p style={{color: 'var(--text-muted)', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span className="symbol" style={{fontSize: '20px'}}>phone_iphone</span> +91 {user.phone}
          </p>
          <div style={{display: 'flex', gap: '12px', marginTop: '20px'}}>
             <div className="google-btn btn-filled" style={{width: 'auto', padding: '8px 24px', fontSize: '13px'}}>Edit Profile</div>
             <div className="google-btn btn-outlined" style={{width: 'auto', padding: '8px 24px', fontSize: '13px'}} onClick={onLogout}>Logout</div>
          </div>
        </div>
        <div style={{display: 'flex', gap: '24px'}}>
            <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '24px', fontWeight: '800'}}>12</div>
                <div style={{fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600'}}>Completed</div>
            </div>
            <div style={{width: '1.5px', height: '40px', background: 'var(--border)'}}></div>
            <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '24px', fontWeight: '800'}}>4.9</div>
                <div style={{fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600'}}>Rating</div>
            </div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px'}}>
        {menuItems.map((item, i) => (
          <div key={i} className="card-premium" style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            cursor: 'pointer',
            padding: '20px 24px'
          }}>
            <div style={{background: '#F1F5F9', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span className="symbol" style={{color: 'var(--text-main)', fontSize: '24px'}}>{item.icon}</span>
            </div>
            <span style={{flex: 1, fontWeight: '700', fontSize: '16px'}}>{item.label}</span>
            {item.badge && <span className="badge-pro badge-warning" style={{borderRadius: '10px'}}>{item.badge}</span>}
            <span className="symbol" style={{color: '#CBD5E1'}}>chevron_right</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileScreen;
