import React from 'react';
import { REVIEWS } from '../data';

const ServiceDetailScreen = ({ tech, onBook, onChat, onBack }) => {
  return (
    <div className="section-uc">
      <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px'}}>
        <button onClick={onBack} className="icon-btn-uc" style={{border: 'none', background: '#F3F4F6'}}>
          <span className="symbol">arrow_back</span>
        </button>
        <span style={{fontWeight: '700', fontSize: '18px'}}>Service Details</span>
      </div>

      <div style={{display: 'flex', gap: '64px', flexWrap: 'wrap'}}>
        {/* Left Info */}
        <div style={{flex: 2, minWidth: '400px'}}>
          <div style={{display: 'flex', gap: '32px', marginBottom: '48px'}}>
             <div style={{width: '120px', height: '120px', background: '#F9FAFB', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '72px'}}>
                <span className="symbol" style={{fontSize: '72px', color: '#9CA3AF'}}>{tech.avatar}</span>
             </div>
             <div style={{flex: 1}}>
                <h1 style={{fontSize: '32px', fontWeight: '800', marginBottom: '4px'}}>{tech.name}</h1>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                   <div style={{display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700'}}>
                      <span className="symbol" style={{fontSize: '18px'}}>star</span> {tech.rating}
                   </div>
                   <span style={{color: '#9CA3AF'}}>•</span>
                   <span style={{fontWeight: '600', color: '#4B5563'}}>{tech.reviews} Ratings</span>
                </div>
                <div style={{display: 'flex', gap: '8px'}}>
                   <span style={{padding: '4px 12px', background: '#F0FDF4', color: '#166534', borderRadius: '4px', fontSize: '12px', fontWeight: '800'}}>TOP RATED</span>
                   <span style={{padding: '4px 12px', background: '#EFF6FF', color: '#1E40AF', borderRadius: '4px', fontSize: '12px', fontWeight: '800'}}>VERIFIED PRO</span>
                </div>
             </div>
          </div>

          <section style={{marginBottom: '48px'}}>
             <h2 style={{fontSize: '22px', fontWeight: '750', marginBottom: '16px'}}>Service Overview</h2>
             <p style={{color: '#4B5563', lineHeight: '1.8', fontSize: '16px'}}>{tech.bio}</p>
          </section>

          <section style={{marginBottom: '48px'}}>
             <h2 style={{fontSize: '22px', fontWeight: '750', marginBottom: '16px'}}>Customer Reviews</h2>
             <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                {REVIEWS.map(rev => (
                   <div key={rev.id} style={{borderBottom: '1px solid #F3F4F6', paddingBottom: '24px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                         <div style={{fontWeight: '700', fontSize: '15px'}}>{rev.user}</div>
                         <div style={{display: 'flex', color: '#000'}}>
                            {[...Array(rev.rating)].map((_, i) => <span key={i} className="symbol" style={{fontSize: '14px'}}>star</span>)}
                         </div>
                      </div>
                      <p style={{fontSize: '14px', color: '#4B5563'}}>{rev.comment}</p>
                      <div style={{marginTop: '8px', fontSize: '11px', color: '#9CA3AF', fontWeight: '600'}}>{rev.date}</div>
                   </div>
                ))}
             </div>
          </section>
        </div>

        {/* Right Action Box */}
        <div style={{flex: 1, minWidth: '320px'}}>
           <div style={{border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', position: 'sticky', top: '120px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.04)'}}>
              <h3 style={{fontSize: '18px', fontWeight: '800', marginBottom: '24px'}}>Book this service</h3>
              
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#4B5563'}}>
                 <span>Start price</span>
                 <span style={{fontWeight: '700', color: '#000'}}>₹{tech.price}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '14px', color: '#4B5563'}}>
                 <span>Response time</span>
                 <span style={{fontWeight: '700', color: '#166534'}}>~ 15 mins</span>
              </div>

              <button className="btn-primary-uc" style={{width: '100%', padding: '16px', borderRadius: '8px', marginBottom: '16px', fontSize: '16px'}} onClick={() => onBook(tech)}>
                 Book Appointment
              </button>
              
              <div style={{display: 'flex', gap: '12px'}}>
                 <button className="btn-primary-uc" style={{flex: 1, background: '#F1F5F9', color: '#1E293B', padding: '12px'}} onClick={() => onChat(tech)}>
                    <span className="symbol" style={{fontSize: '18px', marginRight: '8px'}}>chat</span> Chat
                 </button>
                 <button className="btn-primary-uc" style={{flex: 1, background: '#F1F5F9', color: '#1E293B', padding: '12px'}}>
                    <span className="symbol" style={{fontSize: '18px', marginRight: '8px'}}>call</span> Call
                 </button>
              </div>

              <div style={{marginTop: '24px', padding: '16px', background: '#F9FAFB', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center'}}>
                 <span className="symbol" style={{color: 'var(--secondary)'}}>verified</span>
                 <span style={{fontSize: '11px', fontWeight: '600', color: '#6B7280'}}>Every booking is covered under FixHub Guarantee</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailScreen;
