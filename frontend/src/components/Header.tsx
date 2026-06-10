import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useDesign } from '../context/DesignContext';

export const Header: React.FC = () => {
  const { mode, resetSession } = useDesign();

  return (
    <header className="header" style={{ borderBottom: '1px solid var(--border)', background: '#ffffff', padding: '10px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={resetSession}>
          <div 
            style={{
              background: 'var(--primary)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
            }}
          >
            <span style={{ color: 'white', fontWeight: 800, fontSize: '0.8rem', lineHeight: 1, fontFamily: 'var(--font-display)' }}>TD</span>
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              QA-Assistant
            </h1>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.02em', marginTop: '2px' }}>
              Test Design
            </p>
          </div>
        </div>

        {mode && (
          <button className="btn btn-secondary" onClick={resetSession} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            <ArrowLeft size={14} />
            На главную
          </button>
        )}
      </div>
    </header>
  );
};
