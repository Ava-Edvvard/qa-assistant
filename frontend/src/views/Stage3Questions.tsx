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
    <div className="container animated-in" style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
          Этап 3: Уточняющие вопросы к требованиям
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          ИИ анализирует требования на наличие пробелов. Ответьте на вопросы, чтобы сделать тест-сценарии максимально точными.
        </p>
      </div>

      {currentQuestion ? (
        /* Active Question Card */
        <div className="glass-panel" style={{ padding: '30px', position: 'relative', overflow: 'hidden', marginBottom: '30px' }}>
          <div 
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '6px 12px',
              borderRadius: '0 0 0 var(--radius-sm)',
              fontSize: '0.75rem',
              color: 'var(--primary)',
              fontWeight: 600
            }}
          >
            Связано с: {currentQuestion.requirement_id}
          </div>
          
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div style={{ color: 'var(--primary)', padding: '6px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%' }}>
              <HelpCircle size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Вопросов в очереди: {questions.length}
              </span>
              <h3 style={{ fontSize: '1.25rem', marginTop: '4px', lineHeight: 1.4 }}>
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
                required
                style={{ minHeight: '100px' }}
                autoFocus
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleSkip}
                style={{ flex: 1 }}
              >
                Пропустить вопрос
                <ChevronRight size={16} />
              </button>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!activeAnswer.trim()}
                style={{ flex: 1 }}
              >
                Ответить
                <CornerDownLeft size={16} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Queue Empty: Review Answers and Proceed */
        <div className="glass-panel" style={{ padding: '40px 30px', textAlign: 'center', marginBottom: '30px' }}>
          <div 
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              color: 'var(--success)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}
          >
            <Sparkles size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
            Все вопросы проработаны!
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px auto' }}>
            Вы ответили на все уточняющие вопросы. Теперь ИИ готов провести полный тест-анализ и сгенерировать тест-сценарии.
          </p>
          
          {answers.length > 0 && (
            <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.15)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '30px', maxHeight: '200px', overflowY: 'auto' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                Ваши ответы:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {answers.map((ans, idx) => (
                  <div key={idx} style={{ fontSize: '0.9rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>Q: {ans.question}</div>
                    <div style={{ color: 'var(--text-primary)', marginTop: '2px', paddingLeft: '10px', borderLeft: '2px solid var(--border)' }}>
                      A: {ans.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="btn btn-primary" onClick={generateTestScenarios} style={{ padding: '14px 28px' }}>
            Начать тест-анализ
            <Sparkles size={16} />
          </button>
        </div>
      )}

      {/* Back Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button className="btn btn-secondary" onClick={prevStage}>
          <ArrowLeft size={16} />
          Назад к матрице
        </button>
      </div>

    </div>
  );
};
