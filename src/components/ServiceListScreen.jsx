import React from 'react';
import { TECHNICIANS } from '../data';

const ServiceListScreen = ({ category, onSelectTech, onBack }) => {
  const techs = TECHNICIANS.filter(t => !category || t.category === category.id);

  return (
    <div className="section-uc">
      <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px'}}>
        <button onClick={onBack} className="icon-btn-uc" style={{border: 'none', background: '#F3F4F6'}}>
          <span className="symbol">arrow_back</span>
        </button>
        <div>
          <h1 style={{fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px'}}>
            {category ? category.label : 'Professional Services'}
          </h1>
          <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>Top rated experts in your area</p>
        </div>
      </div>

      <div style={{display: 'flex', gap: '12px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '8px'}}>
         {['Relevance', 'Ratings 4.5+', 'Price: Low to High', 'Fast Delivery'].map(filter => (
           <div key={filter} style={{
             padding: '8px 20px', 
             border: '1px solid var(--border)', 
             borderRadius: '50px', 
             fontSize: '13px', 
             fontWeight: '600', 
             whiteSpace: 'nowrap',
             cursor: 'pointer'
           }}>
             {filter}
           </div>
         ))}
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px'}}>
        {techs.map(tech => (
          <div key={tech.id} className="service-card-uc" style={{display: 'flex', flexDirection: 'column', height: '100%', transition: 'box-shadow 0.3s'}} onClick={() => onSelectTech(tech)}>
             <div className="service-img-uc" style={{position: 'relative', height: '200px'}}>
                <span className="symbol" style={{fontSize: '80px', color: '#CBD5E1'}}>{tech.avatar}</span>
                {tech.verified && (
                  <div style={{position: 'absolute', top: '12px', left: '12px', background: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '800', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                    <span className="symbol" style={{fontSize: '14px'}}>verified</span> VERIFIED
                  </div>
                )}
             </div>
             <div className="service-info-uc" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px'}}>
                  <h3 className="service-title-uc" style={{fontSize: '18px'}}>{tech.name}</h3>
                  <div style={{fontWeight: '900', fontSize: '18px'}}>₹{tech.price}</div>
                </div>
                <div className="service-rating-uc" style={{marginBottom: '12px'}}>
                   <span className="symbol" style={{fontSize: '16px', color: '#000'}}>star</span>
                   <span>{tech.rating}</span>
                   <span style={{color: '#9CA3AF', fontWeight: '400'}}>({tech.reviews} reviews)</span>
                </div>
                <div style={{marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500'}}>
                   <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <span className="symbol" style={{fontSize: '16px'}}>schedule</span> {tech.experience} Exp
                   </div>
                   <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <span className="symbol" style={{fontSize: '16px'}}>distance</span> {tech.distance}
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListScreen;
