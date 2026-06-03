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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
            Этап 2: Проработка матрицы требований
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            ИИ выделил следующие требования. Вы можете редактировать их, удалять или добавлять новые вручную.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} />
          Добавить требование
        </button>
      </div>

      {error && (
        <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', color: 'var(--danger)', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {/* Requirements Table */}
      <div className="glass-panel" style={{ padding: '10px', overflowX: 'auto', marginBottom: '30px' }}>
        <table className="matrix-table">
          <thead>
            <tr>
              <th style={{ width: '100px' }}>№</th>
              <th>Требование</th>
              <th style={{ width: '220px' }}>Всего покрывающих кейсов</th>
              <th style={{ width: '120px', textAlign: 'right' }}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {requirements.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                  Список требований пуст. Добавьте требования с помощью кнопки сверху.
                </td>
              </tr>
            ) : (
              requirements.map((req) => (
                <tr key={req.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{req.id}</td>
                  <td>{req.description}</td>
                  <td>
                    <span className="coverage-badge no-cover">0</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button 
                        className="btn-icon" 
                        onClick={() => handleOpenEdit(req)}
                        title="Редактировать"
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="btn-icon" 
                        onClick={() => deleteRequirement(req.id)}
                        title="Удалить"
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--danger)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        <Trash2 size={16} />
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button className="btn btn-secondary" onClick={prevStage}>
          <ArrowLeft size={16} />
          Назад
        </button>
        <button 
          className="btn btn-primary" 
          onClick={fetchQuestions}
          disabled={requirements.length === 0}
        >
          Далее
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Add Requirement Modal */}
      {isAddOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>Добавить новое требование</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label">Описание требования</label>
                <textarea
                  className="form-textarea"
                  value={addText}
                  onChange={(e) => setAddText(e.target.value)}
                  placeholder="Пример: Система должна поддерживать авторизацию с помощью СМС кода..."
                  required
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddOpen(false)}>
                  Отмена
                </button>
                <button type="submit" className="btn btn-primary" disabled={!addText.trim()}>
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
            <h3 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>
              Редактировать требование {selectedReq.id}
            </h3>
            <form onSubmit={handleEdit}>
              <div className="form-group">
                <label className="form-label">Описание требования</label>
                <textarea
                  className="form-textarea"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditOpen(false)}>
                  Отмена
                </button>
                <button type="submit" className="btn btn-primary" disabled={!editText.trim()}>
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
