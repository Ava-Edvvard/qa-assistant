import React from 'react';
import { FilePlus, FileEdit } from 'lucide-react';
import { useDesign } from '../context/DesignContext';

export const Dashboard: React.FC = () => {
  const { startNewDesign, startExistingDesign } = useDesign();

  return (
    <div 
      className="container animated-in" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '70vh',
        padding: '20px 16px',
        gap: '24px'
      }}
    >
      <h1 
        style={{ 
          fontSize: '1.6rem', 
          fontFamily: 'var(--font-display)', 
          fontWeight: 700, 
          color: 'var(--primary)', 
          textAlign: 'center',
          marginBottom: '8px'
        }}
      >
        Выберите режим проработки тест-дизайна
      </h1>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '700px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {/* Mode 1: New Test Design */}
        <div 
          className="glass-panel" 
          onClick={startNewDesign}
          style={{
            padding: '20px',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(28, 100, 242, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              border: '1px solid rgba(28, 100, 242, 0.1)'
            }}
          >
            <FilePlus size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', marginBottom: '4px', fontWeight: 650, color: 'var(--text-primary)' }}>Новый тест-дизайн</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4 }}>
              Разработка тест-плана полностью с нуля. Загрузите требования, сформируйте требования в виде матрицы, уточните нестыковки с ИИ и получите готовые тест-кейсы.
            </p>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>
            Запустить (5 этапов) →
          </div>
        </div>

        {/* Mode 2: Existing Test Design */}
        <div 
          className="glass-panel" 
          onClick={startExistingDesign}
          style={{
            padding: '20px',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(71, 85, 105, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              border: '1px solid rgba(71, 85, 105, 0.1)'
            }}
          >
            <FileEdit size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', marginBottom: '4px', fontWeight: 650, color: 'var(--text-primary)' }}>Доработка существующего</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4 }}>
              Загрузите новые требования вместе со старыми тест-кейсами. ИИ проведет анализ обновлений, сгенерирует новые тест-кейсы и покажет сводку различий (diff report).
            </p>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>
            Запустить (6 этапов) →
          </div>
        </div>
      </div>
    </div>
  );
};
