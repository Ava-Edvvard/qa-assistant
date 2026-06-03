import React from 'react';
import { FilePlus, FileEdit, Sparkles, ShieldCheck } from 'lucide-react';
import { useDesign } from '../context/DesignContext';

export const Dashboard: React.FC = () => {
  const { startNewDesign, startExistingDesign } = useDesign();

  return (
    <div className="container animated-in" style={{ padding: '30px 16px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto 30px auto' }}>
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--primary-glow)',
            color: 'var(--primary)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '14px',
            border: '1px solid rgba(28, 100, 242, 0.1)'
          }}
        >
          <Sparkles size={12} />
          Помощник тест-дизайнера
        </div>
        <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 850, marginBottom: '12px', lineHeight: 1.2, color: 'var(--text-primary)' }}>
          Ускорьте проектирование <span style={{ color: 'var(--primary)' }}>тест-планов</span> с ИИ
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Автоматическое составление матрицы покрытия требований, проработка спорных моментов и быстрая генерация тест-сценариев.
        </p>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '750px',
          margin: '0 auto'
        }}
      >
        {/* Mode 1: New Test Design */}
        <div 
          className="glass-panel" 
          onClick={startNewDesign}
          style={{
            padding: '24px',
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
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(28, 100, 242, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              border: '1px solid rgba(28, 100, 242, 0.1)'
            }}
          >
            <FilePlus size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '4px', fontWeight: 650 }}>Новый тест-дизайн</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.4 }}>
              Разработка тест-плана полностью с нуля. Загрузите требования, сформируйте требования в виде матрицы, уточните нестыковки с ИИ и получите готовые тест-кейсы.
            </p>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>
            Запустить (5 этапов) →
          </div>
        </div>

        {/* Mode 2: Existing Test Design */}
        <div 
          className="glass-panel" 
          onClick={startExistingDesign}
          style={{
            padding: '24px',
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
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(71, 85, 105, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              border: '1px solid rgba(71, 85, 105, 0.1)'
            }}
          >
            <FileEdit size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '4px', fontWeight: 650 }}>Доработка существующего</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.4 }}>
              Загрузите новые требования вместе со старыми тест-кейсами. ИИ проведет анализ обновлений, сгенерирует новые тест-кейсы и покажет сводку различий (diff report).
            </p>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>
            Запустить (6 этапов) →
          </div>
        </div>
      </div>

      <div style={{ marginTop: '50px', display: 'flex', justifyItems: 'center', justifyContent: 'center', gap: '30px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} />
          <span>Матрицы покрытия в реальном времени</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} />
          <span>Интеграция с GPT-4o-mini</span>
        </div>
      </div>
    </div>
  );
};
