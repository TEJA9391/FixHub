import React from 'react';
import { NOTIFICATIONS } from '../data';

const NotificationsScreen = () => {
  return (
    <div className="screen">
      <h2 className="section-title" style={{marginBottom: '32px'}}>Your Notifications</h2>

      <div style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px'}}>
        {NOTIFICATIONS.map(notif => (
          <div key={notif.id} className="card-premium" style={{
            display: 'flex', 
            gap: '20px', 
            background: notif.read ? 'white' : '#F0F9FF',
            borderColor: notif.read ? 'var(--border)' : '#BAE6FD',
            alignItems: 'center'
          }}>
            <div style={{
              width: '56px', 
              height: '56px', 
              borderRadius: '16px', 
              background: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}>
              <span className="symbol" style={{fontSize: '28px', color: 'var(--secondary)'}}>{notif.icon}</span>
            </div>
            <div style={{flex: 1}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}>
                <span style={{fontWeight: '800', fontSize: '16px'}}>{notif.title}</span>
                {!notif.read && <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--secondary)'}}></div>}
              </div>
              <p style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px'}}>{notif.body}</p>
              <span style={{fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600'}}>{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsScreen;
