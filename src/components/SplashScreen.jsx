import React, { useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-uc" style={{height: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div className="logo-text" style={{fontSize: '64px'}}>
        Fix<span>Hub</span>
      </div>
      <div style={{marginTop: '24px', width: '120px', height: '4px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden'}}>
         <div style={{height: '100%', width: '40%', background: '#673AB7', borderRadius: '2px', animation: 'progress 1s infinite ease-in-out'}}></div>
      </div>
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
