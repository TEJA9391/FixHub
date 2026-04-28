import React from 'react';
import { CHAT_MESSAGES } from '../data';

const ChatScreen = ({ tech, onBack }) => {
  return (
    <div className="screen" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="card-premium" style={{width: '100%', maxWidth: '800px', height: '80vh', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
            {/* Header */}
            <div style={{padding: '24px 32px', borderBottom: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', gap: '20px'}}>
                <button onClick={onBack} className="google-btn btn-outlined" style={{width: 'auto', padding: '8px'}}>
                    <span className="symbol">arrow_back</span>
                </button>
                <div style={{width: '56px', height: '56px', borderRadius: '16px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px'}}>
                    <span className="symbol">{tech.avatar}</span>
                </div>
                <div>
                    <div style={{fontWeight: '800', fontSize: '18px'}}>{tech.name}</div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--primary)', fontWeight: '700'}}>
                        <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)'}}></div>
                        Online
                    </div>
                </div>
                <div style={{marginLeft: 'auto', display: 'flex', gap: '12px'}}>
                    <button className="google-btn btn-outlined" style={{width: 'auto', padding: '10px'}}><span className="symbol">call</span></button>
                    <button className="google-btn btn-outlined" style={{width: 'auto', padding: '10px'}}><span className="symbol">videocam</span></button>
                </div>
            </div>

            {/* Messages */}
            <div style={{flex: 1, padding: '32px', overflowY: 'auto', background: '#F8FAFC'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    {CHAT_MESSAGES.map(msg => (
                        <div key={msg.id} style={{
                            alignSelf: msg.from === 'tech' ? 'flex-start' : 'flex-end',
                            maxWidth: '70%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                        }}>
                            <div style={{
                                padding: '16px 24px',
                                borderRadius: msg.from === 'tech' ? '20px 20px 20px 4px' : '20px 20px 4px 20px',
                                background: msg.from === 'tech' ? 'white' : 'var(--primary)',
                                color: msg.from === 'tech' ? 'var(--text-main)' : 'white',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                fontWeight: '500',
                                fontSize: '15px'
                            }}>
                                {msg.text}
                            </div>
                            <div style={{fontSize: '11px', color: 'var(--text-muted)', textAlign: msg.from === 'tech' ? 'left' : 'right', fontWeight: '600'}}>
                                {msg.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Input Area */}
            <div style={{padding: '24px 32px', borderTop: '1.5px solid var(--border)', display: 'flex', gap: '16px', alignItems: 'center'}}>
                <button className="google-btn btn-outlined" style={{width: 'auto', padding: '10px'}}><span className="symbol">add</span></button>
                <div style={{flex: 1, background: '#F1F5F9', borderRadius: '50px', display: 'flex', alignItems: 'center', padding: '0 24px'}}>
                    <input 
                        type="text" 
                        placeholder="Type a message to professional..." 
                        style={{flex: 1, border: 'none', background: 'none', padding: '14px 0', fontSize: '15px', outline: 'none', fontFamily: 'inherit'}}
                    />
                    <span className="symbol" style={{color: 'var(--text-muted)', cursor: 'pointer'}}>sentiment_satisfied</span>
                </div>
                <button className="google-btn btn-filled" style={{width: 'auto', padding: '12px 24px'}}>
                    <span className="symbol">send</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default ChatScreen;
