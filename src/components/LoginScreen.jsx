import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (otp.length < 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ id: 'user123', name: 'John Doe', phone: phone });
    }, 1000);
  };

  return (
    <div style={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC'}}>
      <div className="card-premium" style={{width: '100%', maxWidth: '440px', padding: '48px', textAlign: 'center'}}>
        <div style={{background: 'var(--primary)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: 'white'}}>
          <span className="symbol" style={{fontSize: '32px'}}>engineering</span>
        </div>
        
        <h1 style={{fontSize: '28px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px'}}>
          {step === 'phone' ? 'Login to FixHub' : 'Verify Account'}
        </h1>
        <p style={{color: 'var(--text-muted)', marginBottom: '40px', fontSize: '15px'}}>
          {step === 'phone' 
            ? 'Enter your mobile number to get started' 
            : `Enter the code sent to +91 ${phone}`}
        </p>

        {step === 'phone' ? (
          <div style={{marginBottom: '32px', textAlign: 'left'}}>
            <label style={{display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '10px'}}>MOBILE NUMBER</label>
            <div style={{display: 'flex', gap: '12px'}}>
              <div style={{padding: '14px', background: '#F1F5F9', borderRadius: '12px', fontWeight: '800', color: 'var(--text-main)', fontSize: '16px', display: 'flex', alignItems: 'center'}}>+91</div>
              <input 
                type="tel" 
                placeholder="9876543210"
                style={{flex: 1, padding: '14px', borderRadius: '12px', border: '2px solid var(--border)', fontSize: '16px', fontWeight: '600', outline: 'none'}}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
            </div>
          </div>
        ) : (
          <div style={{marginBottom: '32px'}}>
            <label style={{display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '10px'}}>OTP CODE</label>
            <input 
              type="text" 
              placeholder="0000"
              style={{width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid var(--border)', fontSize: '28px', textAlign: 'center', letterSpacing: '12px', fontWeight: '900', outline: 'none'}}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
            />
          </div>
        )}

        <button 
          className="google-btn btn-filled" 
          onClick={step === 'phone' ? handleSendOTP : handleVerifyOTP}
          disabled={loading || (step === 'phone' ? phone.length < 10 : otp.length < 4)}
          style={{width: '100%', padding: '16px', fontSize: '16px'}}
        >
          {loading ? 'Crunching numbers...' : (step === 'phone' ? 'Get Verification Code' : 'Verify & Continue')}
        </button>

        {step === 'otp' && (
          <p onClick={() => setStep('phone')} style={{marginTop: '24px', fontSize: '14px', color: 'var(--secondary)', fontWeight: '700', cursor: 'pointer'}}>
            Change phone number
          </p>
        )}

        <p style={{marginTop: '48px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
          By proceeding, you agree to our <strong>Terms of Service</strong> and acknowledge our <strong>Privacy Policy</strong>.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
