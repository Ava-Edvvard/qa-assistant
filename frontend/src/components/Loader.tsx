import React from 'react';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Обработка запроса...' }) => {
  return (
    <div 
      className="glass-panel" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 30px',
        margin: '40px 0',
        minHeight: '200px'
      }}
    >
      <div 
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '4px solid var(--border)',
          borderTopColor: 'var(--primary)',
          animation: 'spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite',
          marginBottom: '20px'
        }}
      />
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{message}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Пожалуйста, подождите, нейросеть анализирует данные...</p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
