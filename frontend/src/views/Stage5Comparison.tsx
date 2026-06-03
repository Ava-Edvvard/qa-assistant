import React from 'react';
import { ArrowLeft, ArrowRight, GitCompare, AlertCircle } from 'lucide-react';
import { useDesign } from '../context/DesignContext';

export const Stage5Comparison: React.FC = () => {
  const { comparisonReport, nextStage, prevStage } = useDesign();

  return (
    <div className="container animated-in" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
          Этап 5: Сводка изменений (Diff Report)
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          ИИ проанализировал старые тест-кейсы и сопоставил их с новыми. Ниже представлена сводка изменений:
        </p>
      </div>

      {/* Report Container */}
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <GitCompare size={20} style={{ color: 'var(--accent)' }} />
          <h3 style={{ fontSize: '1.15rem' }}>Отчет сравнения версий</h3>
        </div>
        
        {comparisonReport ? (
          <div 
            style={{ 
              lineHeight: 1.6, 
              color: 'var(--text-primary)', 
              whiteSpace: 'pre-wrap', 
              fontSize: '1rem',
              fontFamily: 'var(--font-body)'
            }}
          >
            {/* Custom basic styling for markdown layout */}
            {comparisonReport}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
            <AlertCircle size={20} />
            <span>Не удалось сгенерировать сводный отчет. Пожалуйста, продолжите для просмотра финальных результатов.</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-secondary" onClick={prevStage}>
          <ArrowLeft size={16} />
          Назад к сценариям
        </button>
        <button className="btn btn-primary" onClick={nextStage}>
          Далее к результатам
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};
