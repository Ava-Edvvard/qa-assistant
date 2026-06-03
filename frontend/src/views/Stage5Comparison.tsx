import React from 'react';
import { ArrowLeft, ArrowRight, GitCompare, AlertCircle } from 'lucide-react';
import { useDesign } from '../context/DesignContext';

export const Stage5Comparison: React.FC = () => {
  const { comparisonReport, nextStage, prevStage } = useDesign();

  return (
    <div className="container animated-in" style={{ maxWidth: '750px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '2px' }}>
          Этап 5: Сводка изменений (Diff Report)
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Сравнение старых тест-кейсов с новыми тест-сценариями.
        </p>
      </div>

      {/* Report Container */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
          <GitCompare size={16} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Сводный отчет изменений</h3>
        </div>
        
        {comparisonReport ? (
          <div 
            style={{ 
              lineHeight: 1.5, 
              color: 'var(--text-secondary)', 
              whiteSpace: 'pre-wrap', 
              fontSize: '0.85rem',
              fontFamily: 'var(--font-body)'
            }}
          >
            {comparisonReport}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', padding: '12px', background: '#f8fafc', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
            <AlertCircle size={16} />
            <span>Сводный отчет пуст или не сгенерирован. Вы можете продолжить к результатам.</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-secondary" onClick={prevStage} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          <ArrowLeft size={14} />
          Назад к сценариям
        </button>
        <button className="btn btn-primary" onClick={nextStage} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          Далее к результатам
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
};
