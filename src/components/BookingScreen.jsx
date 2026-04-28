import React, { useState } from 'react';

const BookingScreen = ({ tech, onConfirm, onBack }) => {
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('3:00 PM');
  const dates = ['Today', 'Tomorrow', '23 Apr', '24 Apr', '25 Apr'];
  const times = ['10:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '6:00 PM'];

  return (
    <div className="screen" style={{maxWidth: '1000px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px'}}>
        <button onClick={onBack} className="google-btn btn-outlined" style={{width: 'auto', padding: '10px'}}>
          <span className="symbol">arrow_back</span>
        </button>
        <h1 className="section-title">Schedule Service</h1>
      </div>

      <div style={{display: 'flex', gap: '48px', flexWrap: 'wrap'}}>
        <div style={{flex: 2, minWidth: '400px'}}>
            <h3 style={{fontSize: '18px', fontWeight: '800', marginBottom: '16px'}}>Select Date & Time</h3>
            <div style={{display: 'flex', gap: '12px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '10px'}}>
                {dates.map(d => (
                    <div key={d} onClick={() => setDate(d)} className={`card-premium ${date === d ? 'active' : ''}`} style={{
                        padding: '16px 24px', 
                        minWidth: '120px', 
                        textAlign: 'center', 
                        cursor: 'pointer',
                        borderColor: date === d ? 'var(--primary)' : 'var(--border)',
                        background: date === d ? '#DCFCE7' : 'white'
                    }}>
                        <div style={{fontWeight: '800', color: date === d ? 'var(--primary)' : 'var(--text-main)'}}>{d}</div>
                        <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>Available</div>
                    </div>
                ))}
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '40px'}}>
                {times.map(t => (
                    <div key={t} onClick={() => setTime(t)} className={`card-premium ${time === t ? 'active' : ''}`} style={{
                        padding: '12px', 
                        textAlign: 'center', 
                        cursor: 'pointer',
                        borderColor: time === t ? 'var(--primary)' : 'var(--border)',
                        background: time === t ? '#DCFCE7' : 'white',
                        fontSize: '14px',
                        fontWeight: '700'
                    }}>
                        {t}
                    </div>
                ))}
            </div>

            <h3 style={{fontSize: '18px', fontWeight: '800', marginBottom: '16px'}}>Service Address</h3>
            <div className="card-premium" style={{display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px'}}>
                <span className="symbol" style={{color: 'var(--secondary)'}}>location_on</span>
                <div style={{flex: 1}}>
                    <div style={{fontWeight: '700', fontSize: '15px'}}>Sector 62, Noida</div>
                    <div style={{fontSize: '13px', color: 'var(--text-muted)'}}>Uttar Pradesh - 201301</div>
                </div>
                <button className="google-btn btn-outlined" style={{width: 'auto', padding: '8px 16px', fontSize: '12px'}}>Change</button>
            </div>

            <h3 style={{fontSize: '18px', fontWeight: '800', marginBottom: '16px'}}>Job Description</h3>
            <textarea 
                placeholder="Mention specific issues (e.g., 'Kitchen sink is leaking', 'Switchboard not working')"
                style={{width: '100%', height: '120px', padding: '20px', borderRadius: '16px', border: '2px solid var(--border)', fontFamily: 'inherit', fontSize: '15px', outline: 'none', marginBottom: '40px'}}
            ></textarea>

            <div style={{display: 'flex', gap: '24px'}}>
                 <button className="google-btn btn-filled" style={{flex: 1}} onClick={() => onConfirm({ tech, date, time, price: tech.price + 49 })}>
                     Confirm Booking
                 </button>
                 <button className="google-btn btn-outlined" style={{flex: 1}} onClick={onBack}>Cancel</button>
            </div>
        </div>

        <div style={{flex: 1, minWidth: '300px'}}>
            <div className="card-premium">
                <h3 style={{fontSize: '18px', fontWeight: '800', marginBottom: '24px'}}>Bill Summary</h3>
                <div style={{display: 'flex', gap: '16px', alignItems: 'center', paddingBottom: '20px', borderBottom: '1.5px solid var(--border)', marginBottom: '20px'}}>
                    <div style={{width: '48px', height: '48px', borderRadius: '10px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>
                        <span className="symbol">{tech.avatar}</span>
                    </div>
                    <div>
                        <div style={{fontWeight: '700'}}>{tech.name}</div>
                        <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>{tech.categoryLabel}</div>
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px'}}>
                    <span style={{color: 'var(--text-muted)'}}>Item Total</span>
                    <span style={{fontWeight: '700'}}>₹{tech.price}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px'}}>
                    <span style={{color: 'var(--text-muted)'}}>Visiting Fee</span>
                    <span style={{fontWeight: '700'}}>₹49</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '14px', color: 'var(--primary)'}}>
                    <span style={{fontWeight: '600'}}>Promo (FIRSTFIX)</span>
                    <span style={{fontWeight: '700'}}>-₹0</span>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1.5px solid var(--text-main)'}}>
                    <span style={{fontWeight: '800', fontSize: '18px'}}>Amount Payable</span>
                    <span style={{fontWeight: '900', fontSize: '24px', color: 'var(--text-main)'}}>₹{tech.price + 49}</span>
                </div>

                <div className="card-premium" style={{marginTop: '32px', background: '#F0FDF4', border: 'none', display: 'flex', gap: '12px', alignItems: 'center'}}>
                    <span className="symbol" style={{color: 'var(--primary)'}}>verified</span>
                    <span style={{fontSize: '12px', fontWeight: '600', color: '#166534'}}>Safe & Secure Payments</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingScreen;
