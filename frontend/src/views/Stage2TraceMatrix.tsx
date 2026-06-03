import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useDesign, Requirement } from '../context/DesignContext';
import { Loader } from '../components/Loader';

export const Stage2TraceMatrix: React.FC = () => {
  const { 
    requirements, 
    addRequirement, 
    editRequirement, 
    deleteRequirement, 
    fetchQuestions, 
    prevStage,
    loading, 
    error 
  } = useDesign();

  // Local state for Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(null);
  
  const [addText, setAddText] = useState('');
  const [editText, setEditText] = useState('');

  const handleOpenAdd = () => {
    setAddText('');
    setIsAddOpen(true);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (addText.trim()) {
      addRequirement(addText.trim());
      setIsAddOpen(false);
    }
  };

  const handleOpenEdit = (req: Requirement) => {
    setSelectedReq(req);
    setEditText(req.description);
    setIsEditOpen(true);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReq && editText.trim()) {
      editRequirement(selectedReq.id, editText.trim());
      setIsEditOpen(false);
    }
  };

  if (loading) {
    return <Loader message="Генерируем уточняющие вопросы по требованиям..." />;
  }

  return (
    <div className="container animated-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '2px' }}>
            Этап 2: Проработка матрицы требований
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Выделите и отредактируйте требования перед запуском тест-анализа.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          <Plus size={14} />
          Добавить требование
        </button>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', background: '#fce8e6', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', color: 'var(--danger)', marginBottom: '16px', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      {/* Requirements Table */}
      <div className="glass-panel" style={{ overflowX: 'auto', marginBottom: '20px' }}>
        <table className="matrix-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>№</th>
              <th>Требование</th>
              <th style={{ width: '180px' }}>Всего покрывающих кейсов</th>
              <th style={{ width: '100px', textAlign: 'right' }}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {requirements.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Список требований пуст. Добавьте требования с помощью кнопки сверху.
                </td>
              </tr>
            ) : (
              requirements.map((req) => (
                <tr key={req.id}>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{req.id}</td>
                  <td style={{ color: 'var(--text-primary)' }}>{req.description}</td>
                  <td>
                    <span className="coverage-badge no-cover">0</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                      <button 
                        className="btn-icon" 
                        onClick={() => handleOpenEdit(req)}
                        title="Редактировать"
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        className="btn-icon" 
                        onClick={() => deleteRequirement(req.id)}
                        title="Удалить"
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <button className="btn btn-secondary" onClick={prevStage} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          <ArrowLeft size={14} />
          Назад
        </button>
        <button 
          className="btn btn-primary" 
          onClick={fetchQuestions}
          disabled={requirements.length === 0}
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
        >
          Далее
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Add Requirement Modal */}
      {isAddOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '14px', fontSize: '1.1rem', fontWeight: 700 }}>Добавить новое требование</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label">Описание требования</label>
                <textarea
                  className="form-textarea"
                  value={addText}
                  onChange={(e) => setAddText(e.target.value)}
                  placeholder="Пример: Система должна поддерживать авторизацию с помощью СМС кода..."
                  style={{ minHeight: '80px', fontSize: '0.85rem' }}
                  required
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '14px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddOpen(false)} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  Отмена
                </button>
                <button type="submit" className="btn btn-primary" disabled={!addText.trim()} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Requirement Modal */}
      {isEditOpen && selectedReq && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '14px', fontSize: '1.1rem', fontWeight: 700 }}>
              Редактировать требование {selectedReq.id}
            </h3>
            <form onSubmit={handleEdit}>
              <div className="form-group">
                <label className="form-label">Описание требования</label>
                <textarea
                  className="form-textarea"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ minHeight: '80px', fontSize: '0.85rem' }}
                  required
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '14px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditOpen(false)} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  Отмена
                </button>
                <button type="submit" className="btn btn-primary" disabled={!editText.trim()} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
