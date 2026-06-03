import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { useDesign, TestScenario } from '../context/DesignContext';
import { Loader } from '../components/Loader';

export const Stage4TestScenarios: React.FC = () => {
  const { 
    scenarios, 
    requirements, 
    addScenario, 
    editScenario, 
    deleteScenario, 
    nextStage, 
    prevStage,
    compareTestScenarios,
    mode,
    loading,
    error 
  } = useDesign();

  // Accordion state
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScenario, setEditingScenario] = useState<TestScenario | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formPriority, setFormPriority] = useState('П2');
  const [formPreconditions, setFormPreconditions] = useState('');
  const [formSteps, setFormSteps] = useState('');
  const [formExpectedResults, setFormExpectedResults] = useState('');
  const [formCoverage, setFormCoverage] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(x => x !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const handleOpenAdd = () => {
    setEditingScenario(null);
    setFormName('');
    setFormPriority('П2');
    setFormPreconditions('');
    setFormSteps('');
    setFormExpectedResults('');
    setFormCoverage([]);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sc: TestScenario, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion toggling
    setEditingScenario(sc);
    setFormName(sc.name);
    setFormPriority(sc.priority);
    setFormPreconditions(sc.preconditions.join('\n'));
    setFormSteps(sc.steps.join('\n'));
    setFormExpectedResults(sc.expected_results.join('\n'));
    setFormCoverage(sc.coverage);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion toggling
    if (confirm('Вы уверены, что хотите удалить этот тест-сценарий?')) {
      deleteScenario(id);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const preconditions = formPreconditions.split('\n').map(x => x.trim()).filter(Boolean);
    const steps = formSteps.split('\n').map(x => x.trim()).filter(Boolean);
    const expected_results = formExpectedResults.split('\n').map(x => x.trim()).filter(Boolean);
    
    if (editingScenario) {
      // Edit
      editScenario(editingScenario.id, {
        name: formName,
        priority: formPriority,
        preconditions,
        steps,
        expected_results,
        coverage: formCoverage
      });
    } else {
      // Add
      const nextNum = scenarios.length + 1;
      const newId = `TC-${nextNum < 10 ? '00' + nextNum : nextNum < 100 ? '0' + nextNum : nextNum}`;
      
      const newSc: TestScenario = {
        id: newId,
        name: formName,
        priority: formPriority,
        preconditions,
        steps,
        expected_results,
        coverage: formCoverage
      };
      addScenario(newSc);
    }
    
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (reqId: string) => {
    if (formCoverage.includes(reqId)) {
      setFormCoverage(formCoverage.filter(x => x !== reqId));
    } else {
      setFormCoverage([...formCoverage, reqId]);
    }
  };

  const handleNextTransition = () => {
    if (mode === 'existing') {
      compareTestScenarios();
    } else {
      nextStage();
    }
  };

  if (loading) {
    return <Loader message="Анализируем изменения и составляем отчет..." />;
  }

  return (
    <div className="container animated-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
            Этап 4: Генерация и редактирование тест-сценариев
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            ИИ сгенерировал следующие тест-кейсы. Вы можете дополнить, изменить или удалить сценарии.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} />
          Создать тест-сценарий
        </button>
      </div>

      {error && (
        <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', color: 'var(--danger)', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {/* Scenarios Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
        {scenarios.length === 0 ? (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Нет созданных тест-сценариев. Нажмите кнопку сверху, чтобы добавить вручную.
          </div>
        ) : (
          scenarios.map((sc) => {
            const isExpanded = expandedIds.includes(sc.id);
            
            return (
              <div 
                key={sc.id} 
                className="glass-panel" 
                style={{ 
                  overflow: 'hidden', 
                  borderLeft: `4px solid ${sc.priority === 'П1' ? 'var(--danger)' : sc.priority === 'П2' ? 'var(--warning)' : 'var(--primary)'}` 
                }}
              >
                {/* Accordion Header */}
                <div 
                  onClick={() => toggleExpand(sc.id)}
                  style={{ 
                    padding: '20px 24px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary)', minWidth: '70px' }}>{sc.id}</span>
                    <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>{sc.name}</span>
                    
                    <span className={`badge badge-${sc.priority.toLowerCase()}`}>
                      {sc.priority === 'П1' ? 'Критичный' : sc.priority === 'П2' ? 'Важный' : 'Низкий'}
                    </span>
                    
                    {sc.coverage.length > 0 && (
                      <div style={{ display: 'flex', gap: '4px', marginLeft: '10px' }}>
                        {sc.coverage.map(cId => (
                          <span 
                            key={cId}
                            style={{ 
                              fontSize: '0.7rem', 
                              background: 'rgba(255,255,255,0.06)', 
                              padding: '2px 6px', 
                              borderRadius: '4px',
                              border: '1px solid var(--border)' 
                            }}
                          >
                            {cId}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      className="btn-icon" 
                      onClick={(e) => handleOpenEdit(sc, e)}
                      title="Редактировать"
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="btn-icon" 
                      onClick={(e) => handleDelete(sc.id, e)}
                      title="Удалить"
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Accordion Content */}
                {isExpanded && (
                  <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.1)' }}>
                    
                    {/* Preconditions */}
                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Предусловия
                      </h4>
                      {sc.preconditions.length === 0 ? (
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Нет предусловий</p>
                      ) : (
                        <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                          {sc.preconditions.map((p, idx) => (
                            <li key={idx} style={{ marginBottom: '4px' }}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Steps & Expected Results grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                      <div>
                        <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          Шаги
                        </h4>
                        <ol style={{ paddingLeft: '20px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                          {sc.steps.map((step, idx) => (
                            <li key={idx} style={{ marginBottom: '6px' }}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      
                      <div>
                        <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          Ожидаемый результат
                        </h4>
                        <ol style={{ paddingLeft: '20px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                          {sc.expected_results.map((res, idx) => (
                            <li key={idx} style={{ marginBottom: '6px' }}>{res}</li>
                          ))}
                        </ol>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-secondary" onClick={prevStage}>
          <ArrowLeft size={16} />
          Назад к вопросам
        </button>
        <button className="btn btn-primary" onClick={handleNextTransition}>
          Далее
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '1.4rem' }}>
              {editingScenario ? `Редактировать сценарий ${editingScenario.id}` : 'Создать новый тест-сценарий'}
            </h3>
            
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Название сценария *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Например: Открытие формы авторизации"
                    required
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Приоритет</label>
                  <select
                    className="form-select"
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                  >
                    <option value="П1">П1 - Критический</option>
                    <option value="П2">П2 - Важный</option>
                    <option value="П3">П3 - Низкий</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Предусловия (каждое с новой строки)</label>
                <textarea
                  className="form-textarea"
                  value={formPreconditions}
                  onChange={(e) => setFormPreconditions(e.target.value)}
                  placeholder="Пример:&#13;Пользователь находится на главной странице&#13;База данных доступна"
                  style={{ minHeight: '80px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Шаги (каждый шаг с новой строки) *</label>
                  <textarea
                    className="form-textarea"
                    value={formSteps}
                    onChange={(e) => setFormSteps(e.target.value)}
                    placeholder="Пример:&#13;Открыть браузер&#13;Перейти на форму авторизации"
                    style={{ minHeight: '120px' }}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Ожидаемые результаты (каждый с новой строки) *</label>
                  <textarea
                    className="form-textarea"
                    value={formExpectedResults}
                    onChange={(e) => setFormExpectedResults(e.target.value)}
                    placeholder="Пример:&#13;Браузер успешно запущен&#13;Форма авторизации отобразилась корректно"
                    style={{ minHeight: '120px' }}
                    required
                  />
                </div>
              </div>

              {/* Requirement Coverage Checkboxes */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Покрытие требований матрицы трассируемости</label>
                <div 
                  style={{ 
                    maxHeight: '120px', 
                    overflowY: 'auto', 
                    border: '1px solid var(--border)', 
                    padding: '12px', 
                    borderRadius: 'var(--radius-sm)', 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '10px',
                    background: 'rgba(0,0,0,0.15)'
                  }}
                >
                  {requirements.map((req) => (
                    <label 
                      key={req.id} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontSize: '0.85rem', 
                        cursor: 'pointer',
                        color: formCoverage.includes(req.id) ? 'var(--text-primary)' : 'var(--text-muted)'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formCoverage.includes(req.id)}
                        onChange={() => handleCheckboxChange(req.id)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span><strong>{req.id}</strong>: {req.description.slice(0, 30)}...</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Отмена
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingScenario ? 'Сохранить' : 'Создать'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
