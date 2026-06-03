import React, { useState } from 'react';
import { HelpCircle, ChevronRight, CornerDownLeft, Sparkles, ArrowLeft } from 'lucide-react';
import { useDesign } from '../context/DesignContext';
import { Loader } from '../components/Loader';

export const Stage3Questions: React.FC = () => {
  const { 
    questions, 
    answers, 
    submitAnswer, 
    skipQuestion, 
    generateTestScenarios, 
    prevStage,
    loading 
  } = useDesign();

  const [activeAnswer, setActiveAnswer] = useState('');

  const currentQuestion = questions.length > 0 ? questions[0] : null;

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestion && activeAnswer.trim()) {
      submitAnswer(currentQuestion.id, activeAnswer.trim());
      setActiveAnswer('');
    }
  };

  const handleSkip = () => {
    if (currentQuestion) {
      skipQuestion(currentQuestion.id);
      setActiveAnswer('');
    }
  };

  if (loading) {
    return <Loader message="Генерируем тест-сценарии..." />;
  }

  return (
    <div className="container animated-in" style={{ maxWidth: '650px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '2px' }}>
          Этап 3: Уточняющие вопросы к требованиям
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Ответьте на вопросы, чтобы сделать тест-сценарии максимально точными.
        </p>
      </div>

      {currentQuestion ? (
        /* Active Question Card */
        <div className="glass-panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden', marginBottom: '20px' }}>
          <div 
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              background: '#f1f5f9',
              padding: '4px 8px',
              borderRadius: '0 0 0 var(--radius-sm)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              borderLeft: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)'
            }}
          >
            Связано с: {currentQuestion.requirement_id}
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '14px', marginTop: '8px' }}>
            <div style={{ color: 'var(--primary)', padding: '4px', background: 'var(--primary-glow)', borderRadius: '50%' }}>
              <HelpCircle size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Вопросов в очереди: {questions.length}
              </span>
              <h3 style={{ fontSize: '1.05rem', marginTop: '2px', lineHeight: 1.35, fontWeight: 650, color: 'var(--text-primary)' }}>
                {currentQuestion.question}
              </h3>
            </div>
          </div>

          <form onSubmit={handleAnswerSubmit}>
            <div className="form-group">
              <textarea
                className="form-textarea"
                value={activeAnswer}
                onChange={(e) => setActiveAnswer(e.target.value)}
                placeholder="Введите ваш ответ на вопрос..."
                style={{ minHeight: '80px', fontSize: '0.85rem' }}
                required
                autoFocus
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleSkip}
                style={{ flex: 1, padding: '6px 12px', fontSize: '0.8rem' }}
              >
                Пропустить
                <ChevronRight size={14} />
              </button>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!activeAnswer.trim()}
                style={{ flex: 1, padding: '6px 12px', fontSize: '0.8rem' }}
              >
                Ответить
                <CornerDownLeft size={14} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Queue Empty: Review Answers and Proceed */
        <div className="glass-panel" style={{ padding: '30px 20px', textAlign: 'center', marginBottom: '20px' }}>
          <div 
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#e6f4ea',
              color: 'var(--success)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}
          >
            <Sparkles size={22} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '6px', fontWeight: 700 }}>
            Все вопросы проработаны!
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px', maxWidth: '440px', margin: '0 auto 16px auto' }}>
            Вы ответили на все уточняющие вопросы. Теперь ИИ готов провести полный тест-анализ и сгенерировать тест-сценарии.
          </p>
          
          {answers.length > 0 && (
            <div style={{ textAlign: 'left', background: '#f8fafc', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '20px', maxHeight: '150px', overflowY: 'auto' }}>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                Ваши ответы:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {answers.map((ans, idx) => (
                  <div key={idx} style={{ fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 650, color: 'var(--primary)' }}>Q: {ans.question}</div>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '2px', paddingLeft: '8px', borderLeft: '2px solid var(--border)' }}>
                      A: {ans.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="btn btn-primary" onClick={generateTestScenarios} style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            Начать тест-анализ
            <Sparkles size={14} />
          </button>
        </div>
      )}

      {/* Back Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button className="btn btn-secondary" onClick={prevStage} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          <ArrowLeft size={14} />
          Назад к матрице
        </button>
      </div>

    </div>
  );
};
