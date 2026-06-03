import React, { useState, useRef } from 'react';
import { Upload, X, FileSpreadsheet, Image as ImageIcon, FileText, ArrowRight } from 'lucide-react';
import { useDesign } from '../context/DesignContext';
import { Loader } from '../components/Loader';

export const Stage1Requirements: React.FC = () => {
  const { mode, parseRequirements, loading, error } = useDesign();
  
  const [reqText, setReqText] = useState('');
  const [addInfo, setAddInfo] = useState('');
  const [oldTcs, setOldTcs] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachedFiles([...attachedFiles, ...filesArray]);
    }
  };

  const removeFile = (idx: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqText.trim()) return;
    
    parseRequirements(reqText, addInfo, mode === 'existing' ? oldTcs : undefined, attachedFiles);
  };

  if (loading) {
    return <Loader message="Парсим требования и обрабатываем файлы..." />;
  }

  return (
    <div className="container animated-in" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
          Этап 1: Ввод требований и файлов
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          {mode === 'existing' 
            ? 'Введите новые требования, прикрепите файлы (Excel/изображения) и вставьте старые тест-сценарии для доработки.'
            : 'Введите требования к продукту, дополнительную информацию и прикрепите файлы для анализа.'
          }
        </p>
      </div>

      {error && (
        <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', color: 'var(--danger)', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Main Requirements Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="reqs-input">Основные требования к системе *</label>
          <textarea
            id="reqs-input"
            className="form-textarea"
            placeholder="Пример: Пользователь должен иметь возможность авторизоваться в системе. Пароль должен быть не менее 8 символов..."
            value={reqText}
            onChange={(e) => setReqText(e.target.value)}
            required
          />
        </div>

        {/* Additional Info Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="info-input">Дополнительная информация (необязательно)</label>
          <textarea
            id="info-input"
            className="form-textarea"
            placeholder="Контекст проекта, описание окружения, ссылки на документацию..."
            value={addInfo}
            onChange={(e) => setAddInfo(e.target.value)}
            style={{ minHeight: '80px' }}
          />
        </div>

        {/* Conditional Old Test Cases Field for Existing Design Mode */}
        {mode === 'existing' && (
          <div className="form-group">
            <label className="form-label" htmlFor="tcs-input">Существующие тест-сценарии (Которые уже созданы) *</label>
            <textarea
              id="tcs-input"
              className="form-textarea"
              placeholder="Пример:&#13;TC-001: Тестовый сценарий открытие главной страницы - П1&#13;Предусловия:&#13;- Есть доступ к продукту&#13;Шаги:&#13;1. Открыть браузер..."
              value={oldTcs}
              onChange={(e) => setOldTcs(e.target.value)}
              required
            />
          </div>
        )}

        {/* File Upload Zone */}
        <div className="form-group">
          <label className="form-label">Прикрепить файлы (Excel таблицы / Макеты макетов)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '30px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.01)',
              transition: 'all var(--transition-normal)'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <Upload size={32} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Нажмите для выбора файлов
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Поддерживаются файлы .xlsx, .xls, .png, .jpg
            </p>
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              multiple
              accept=".xlsx,.xls,.png,.jpg,.jpeg,.webp"
            />
          </div>

          {/* Files List */}
          {attachedFiles.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              {attachedFiles.map((file, idx) => {
                const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
                const isImage = file.name.match(/\.(jpg|jpeg|png|webp)$/i);
                
                return (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {isExcel && <FileSpreadsheet size={18} style={{ color: '#10b981' }} />}
                      {isImage && <ImageIcon size={18} style={{ color: '#ec4899' }} />}
                      {!isExcel && !isImage && <FileText size={18} style={{ color: '#3b82f6' }} />}
                      <span style={{ fontSize: '0.9rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {file.name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeFile(idx)} 
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      onMouseOver={(e) => e.currentTarget.style.color = 'var(--danger)'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      <X size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!reqText.trim() || (mode === 'existing' && !oldTcs.trim())}
          style={{ width: '100%', padding: '14px', marginTop: '10px' }}
        >
          Далее
          <ArrowRight size={18} />
        </button>

      </form>
    </div>
  );
};
