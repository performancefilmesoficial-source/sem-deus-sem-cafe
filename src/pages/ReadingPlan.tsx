import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Circle, Calendar } from 'lucide-react';
import { generateYearlyPlan } from '../utils/planGenerator';
import type { BibleParams } from '../types';

interface ReadingPlanProps {
  onNavigate: (tab: string, params?: BibleParams) => void;
  completedDays: number[];
  onToggleDay: (id: number) => void;
}

const DAYS = generateYearlyPlan();

const ReadingPlan: React.FC<ReadingPlanProps> = ({ onNavigate, completedDays, onToggleDay }) => {
  const todayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rolar suavemente para o dia de hoje quando o componente montar
    if (todayRef.current) {
      setTimeout(() => {
        todayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, []);

  const progress = Math.round((completedDays.length / DAYS.length) * 100);

  return (
    <div className="page animate-fade-in">

      {/* Header with Progress */}
      <header className="header">
        <div className="plan-header-top">
          <div>
            <h1>Plano de Leitura</h1>
            <p>Plano Bíblico Anual • 2026</p>
          </div>
          <div className="progress-badge">{progress}%</div>
        </div>

        <div className="plan-progress-track">
          <div className="plan-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="plan-progress-label">
          {completedDays.length} de {DAYS.length} leituras concluídas
        </p>
      </header>

      {/* Days List */}
      <div className="card" style={{ padding: '0 20px' }}>
        {DAYS.map((day, index) => {
          const isDone = completedDays.includes(day.id);
          return (
            <div
              key={day.id}
              ref={day.tag === 'Hoje' ? todayRef : null}
              className={`plan-item ${index !== DAYS.length - 1 ? 'border' : ''}`}
              style={day.tag === 'Hoje' ? { background: 'var(--accent-pastel)', padding: '16px', borderRadius: '16px', margin: '4px -16px' } : {}}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                <button
                  className="check-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleDay(day.id);
                  }}
                  title={isDone ? "Marcar como não lido" : "Marcar como lido"}
                >
                  {isDone ? (
                    <CheckCircle2
                      color="var(--accent-primary)"
                      fill="var(--accent-light)"
                      size={27}
                    />
                  ) : (
                    <Circle color="var(--text-muted)" size={27} />
                  )}
                </button>

                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                    <span className={`plan-title ${isDone ? 'completed' : ''}`}>
                      {day.title}
                    </span>
                    {day.tag && (
                      <span className={`plan-tag ${day.tag === 'Hoje' ? 'today-tag' : ''}`}>
                        {day.tag}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                    <Calendar size={11} color="var(--text-muted)" />
                    <span className="plan-date">{day.date}</span>
                  </div>
                </div>
              </div>

              {!isDone && (
                <button
                  className="read-btn"
                  onClick={() => onNavigate('bible', {
                    bookIndex: day.atPassage?.bookIndex ?? day.bookIndex ?? 0,
                    chapterIndex: day.atPassage?.startChapter ?? day.chapterIndex ?? 0,
                    dayMode: true,
                    atPassage: day.atPassage,
                    ntPassage: day.ntPassage,
                    dayTitle: day.title,
                  })}
                >
                  Ler
                </button>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ReadingPlan;
