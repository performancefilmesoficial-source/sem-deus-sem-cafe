import React from 'react';

import { Flame, ChevronRight, BookOpen, TrendingUp } from 'lucide-react';
import { generateYearlyPlan } from '../utils/planGenerator';
import type { BibleParams } from '../types';

interface DashboardProps {
  onNavigate: (tab: string, params?: BibleParams) => void;
  userName: string;
  onLogout: () => void;
  completedDays: number[];
}

const WEEK_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, userName, onLogout, completedDays }) => {
  const PLAN_DAYS = generateYearlyPlan();
  const todayIndex = PLAN_DAYS.findIndex(d => d.tag === 'Hoje');
  const todayPlan = todayIndex >= 0 ? PLAN_DAYS[todayIndex] : PLAN_DAYS[0];

  // Sequência: dias consecutivos concluídos até hoje
  const streak = (() => {
    let count = 0;
    for (let i = todayPlan.id; i >= 1; i--) {
      if (completedDays.includes(i)) count++;
      else break;
    }
    return count;
  })();

  // Últimos 7 dias do plano (semana atual)
  const weekItems = PLAN_DAYS
    .slice(Math.max(0, todayIndex - 6), todayIndex + 1)
    .map(d => ({
      label: WEEK_LABELS[new Date(2026, 0, d.id).getDay()],
      done: completedDays.includes(d.id),
    }));
  const weekDone = weekItems.filter(w => w.done).length;

  return (
    <div className="page animate-fade-in">

      {/* Header */}
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo-transparent.png" alt="Logo" style={{ height: 64, width: 'auto' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.4rem' }}>Olá, {userName}! 👋</h1>
            <p style={{ margin: 0, marginTop: '4px' }}>A força para hoje está na Palavra.</p>
          </div>
        </div>
        <button onClick={onLogout} className="logout-btn" title="Sair da conta">
          Sair
        </button>
      </header>

      {/* Streak Card */}
      <div className="card">
        <div className="streak-header">
          <div className="streak-icon-wrap">
            <Flame color="#FF6B35" size={26} />
          </div>
          <div className="streak-info">
            <h3>{streak > 0 ? `${streak} ${streak === 1 ? 'Dia Seguido' : 'Dias Seguidos'}!` : 'Comece hoje!'}</h3>
            <p>{streak > 0 ? 'Você está no caminho certo. Continue!' : 'Marque sua primeira leitura.'}</p>
          </div>
        </div>
        <div className="streak-dots">
          {weekItems.map((day, i) => (
            <div key={i} className="streak-day">
              <div className={`streak-dot ${day.done ? 'active' : ''}`}>
                {day.done && <Flame size={15} color="white" />}
              </div>
              <span className="streak-day-label">{day.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: 'var(--accent-light)' }}>
            <BookOpen size={16} color="var(--accent-primary)" />
          </div>
          <p className="stat-label">Esta semana</p>
          <div className="stat-value">
            {weekDone}<small>/{weekItems.length}</small>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${Math.round((weekDone / Math.max(weekItems.length, 1)) * 100)}%` }} />
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon" style={{ background: 'var(--accent-pastel)' }}>
            <TrendingUp size={16} color="var(--accent-secondary)" />
          </div>
          <p className="stat-label">Progresso Anual</p>
          <div className="stat-value">
            {todayPlan.id}<small>/365</small>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${(todayPlan.id / 365) * 100}%`, background: 'var(--accent-secondary)' }} />
          </div>
        </div>
      </div>

      {/* Today's Reading */}
      <section style={{ marginTop: '4px' }}>
        <div className="section-header">
          <h3>Leitura de Hoje</h3>
          <button className="link-btn" onClick={() => onNavigate('plan')}>
            Ver plano
          </button>
        </div>

        <button
          className="card today-card"
          onClick={() => onNavigate('bible', {
            bookIndex: todayPlan.atPassage?.bookIndex ?? 0,
            chapterIndex: todayPlan.atPassage?.startChapter ?? 0,
            dayMode: true,
            atPassage: todayPlan.atPassage,
            ntPassage: todayPlan.ntPassage,
            dayTitle: todayPlan.title
          })}
        >
          <div className="today-left">
            <div className="today-icon" style={{ background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12 }}>
              <BookOpen size={24} color="var(--accent-primary)" />
            </div>
            <div>
              <h4 className="today-title">{todayPlan.title}</h4>
              <p className="today-sub">Plano Anual • Dia {todayPlan.id} de 365</p>
            </div>
          </div>
          <div className="today-right">
            <span className="start-badge">Ler agora</span>
            <ChevronRight size={16} color="var(--accent-primary)" />
          </div>
        </button>
      </section>

    </div>
  );
};

export default Dashboard;
