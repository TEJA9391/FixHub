import React from 'react';
import { TRACKING_STEPS } from '../data';

const TrackingScreen = ({ booking, onBack }) => {
  return (
    <div className="screen">
      <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px'}}>
        <button onClick={onBack} className="google-btn btn-outlined" style={{width: 'auto', padding: '10px'}}>
          <span className="symbol">arrow_back</span>
        </button>
        <h1 className="section-title">Track Technician</h1>
      </div>

      <div style={{display: 'flex', gap: '48px', flexWrap: 'wrap'}}>
        {/* Left: Map */}
        <div style={{flex: '2', minWidth: '400px'}}>
            <div className="map-view-d">
                <div style={{position: 'absolute', left: '40%', top: '40%', width: '32px', height: '32px', background: 'var(--secondary)', border: '4px solid white', borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', boxShadow: 'var(--shadow-lg)'}}></div>
                <div style={{position: 'absolute', left: '55%', top: '50%', width: '40px', height: '40px', background: 'var(--primary)', border: '4px solid white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-lg)'}}>
                    <span className="symbol" style={{color: 'white', fontSize: '20px'}}>home</span>
                </div>
                
                <div className="map-card-floating">
                    <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px'}}>
                        <div style={{width: '48px', height: '48px', borderRadius: '12px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>
                            <span className="symbol" style={{color: 'var(--text-main)'}}>{booking.tech.avatar}</span>
                        </div>
                        <div>
                            <div style={{fontWeight: '800'}}>{booking.tech.name}</div>
                            <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>On the way • 4 mins away</div>
                        </div>
                    </div>
                    <div style={{display: 'flex', gap: '12px'}}>
                        <button className="google-btn btn-filled" style={{flex: 1, padding: '8px', fontSize: '13px'}}><span className="symbol" style={{fontSize: '18px'}}>call</span> Call</button>
                        <button className="google-btn btn-outlined" style={{flex: 1, padding: '8px', fontSize: '13px'}}><span className="symbol" style={{fontSize: '18px'}}>chat</span> Message</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Right: Timeline */}
        <div style={{flex: '1', minWidth: '320px'}}>
            <div className="card-premium">
                <h3 style={{fontSize: '18px', fontWeight: '800', marginBottom: '32px'}}>Service Updates</h3>
                
                <div className="timeline">
                    {TRACKING_STEPS.map(step => (
                        <div key={step.id} className="timeline-step">
                            <div className={`step-dot ${step.done ? 'done' : ''}`}></div>
                            <div className="step-info">
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <span className="symbol" style={{fontSize: '20px', color: step.done ? 'var(--primary)' : 'var(--text-muted)'}}>{step.icon}</span>
                                    <span className="step-label" style={{color: step.done ? 'var(--text-main)' : 'var(--text-muted)'}}>{step.label}</span>
                                </div>
                                {step.time && <div className="step-time" style={{marginLeft: '30px'}}>{step.time}</div>}
                            </div>
                            {step.done && <span className="symbol" style={{color: 'var(--primary)', fontSize: '20px'}}>check</span>}
                        </div>
                    ))}
                </div>

                <div className="card-premium" style={{marginTop: '40px', background: '#F8FAFC', borderStyle: 'dashed', textAlign: 'center'}}>
                    <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>Share this OTP when work is done:</p>
                    <div style={{fontSize: '32px', fontWeight: '900', letterSpacing: '8px', color: 'var(--text-main)', marginTop: '8px'}}>4592</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingScreen;
