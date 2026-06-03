import React from 'react';
import { FilePlus, FileEdit, Sparkles, ShieldCheck } from 'lucide-react';
import { useDesign } from '../context/DesignContext';

export const Dashboard: React.FC = () => {
  const { startNewDesign, startExistingDesign } = useDesign();

  return (
    <div className="container animated-in" style={{ padding: '60px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto 60px auto' }}>
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--primary-glow)',
            color: 'var(--primary)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '20px',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}
        >
          <Sparkles size={14} />
          Умный помощник тест-дизайнера
        </div>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.15 }}>
          Ускорьте проработку <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>тест-планов</span> с ИИ
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Выберите рабочий сценарий для автоматического составления матрицы покрытия требований, проработки спорных моментов и генерации детальных тест-сценариев.
        </p>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          maxWidth: '850px',
          margin: '0 auto'
        }}
      >
        {/* Mode 1: New Test Design */}
        <div 
          className="glass-panel" 
          onClick={startNewDesign}
          style={{
            padding: '40px 30px',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(99, 102, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}
          >
            <FilePlus size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Новый тест-дизайн</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Разработка тест-плана полностью с нуля. Загрузите требования, сформируйте требования в виде матрицы, уточните нестыковки с ИИ и получите готовые тест-кейсы.
            </p>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
            Запустить (5 этапов) →
          </div>
        </div>

        {/* Mode 2: Existing Test Design */}
        <div 
          className="glass-panel" 
          onClick={startExistingDesign}
          style={{
            padding: '40px 30px',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(217, 70, 239, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              border: '1px solid rgba(217, 70, 239, 0.2)'
            }}
          >
            <FileEdit size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Доработка существующего</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Загрузите новые требования вместе со старыми тест-кейсами. ИИ проведет анализ обновлений, сгенерирует новые тест-кейсы и покажет сводку различий (diff report).
            </p>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)' }}>
            Запустить (6 этапов) →
          </div>
        </div>
      </div>

      <div style={{ marginTop: '80px', display: 'flex', justifyItems: 'center', justifyContent: 'center', gap: '40px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} />
          <span>Генерация матриц покрытия в реальном времени</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} />
          <span>Поддержка OpenAI GPT-4o-mini</span>
        </div>
      </div>
    </div>
  );
};
