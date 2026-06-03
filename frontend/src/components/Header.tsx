import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useDesign } from '../context/DesignContext';

export const Header: React.FC = () => {
  const { mode, resetSession } = useDesign();

  return (
    <header className="header">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={resetSession}>
          <div 
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-primary)'
            }}
          >
            <ShieldAlert size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              QA-Assistant
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Test Design AI Studio
            </p>
          </div>
        </div>

        {mode && (
          <button className="btn btn-secondary" onClick={resetSession} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <ArrowLeft size={16} />
            На главную
          </button>
        )}
      </div>
    </header>
  );
};
