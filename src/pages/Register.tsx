import React, { useState } from 'react';
import { generateYearlyPlan } from '../utils/planGenerator';

const PLAN_DAYS = generateYearlyPlan();
const LOCAL_USER_KEY = 'sdsc-local-user';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [progressChoice, setProgressChoice] = useState<'on-track' | 'fresh' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (name.trim()) setStep(2);
  };

  const handleFinish = () => {
    setLoading(true);

    let completedDays: number[] = [];
    if (progressChoice === 'on-track') {
      const todayIndex = PLAN_DAYS.findIndex(d => d.tag === 'Hoje');
      if (todayIndex > 0) {
        completedDays = PLAN_DAYS.slice(0, todayIndex).map(d => d.id);
      }
    }

    // Gera um ID único e salva o usuário local
    const id = crypto.randomUUID();
    const localSession = { user: { id, user_metadata: { name: name.trim() } } };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localSession));
    localStorage.setItem('sdsc-completed-days', JSON.stringify(completedDays));

    window.location.reload();
  };

  return (
    <div className="register-page" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center' }}>

      {step === 1 && (
        <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: 24, borderRadius: 24, boxShadow: 'var(--shadow-medium)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img src="/logo-transparent.png" alt="Sem Deus, Sem Café" style={{ width: 180, height: 'auto', marginBottom: 8 }} />
            <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Bem-vindo(a)!</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Como você se chama?</p>
          </div>

          <form onSubmit={handleContinue} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Seu nome</label>
              <input
                type="text"
                required
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, marginTop: 4, border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)', fontSize: 16 }}
                placeholder="Como quer ser chamado?"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="btn-primary"
              style={{ padding: 16, marginTop: 8, fontSize: 16 }}
            >
              Continuar
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: 24, borderRadius: 24, boxShadow: 'var(--shadow-medium)' }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Olá, {name}!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
            Onde você está na sua leitura diária?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={() => setProgressChoice('on-track')}
              style={{
                padding: '16px', borderRadius: 12, textAlign: 'left',
                border: `2px solid ${progressChoice === 'on-track' ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                background: progressChoice === 'on-track' ? 'var(--accent-pastel)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 4 }}>✅ Estou em dia!</h4>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Marcar todos os dias anteriores a hoje como lidos automaticamente.</p>
            </button>

            <button
              onClick={() => setProgressChoice('fresh')}
              style={{
                padding: '16px', borderRadius: 12, textAlign: 'left',
                border: `2px solid ${progressChoice === 'fresh' ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                background: progressChoice === 'fresh' ? 'var(--accent-pastel)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 4 }}>🌱 Começando hoje</h4>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Meu plano começa limpo, sem nenhum check marcado.</p>
            </button>
          </div>

          <button
            onClick={handleFinish}
            disabled={!progressChoice || loading}
            className="btn-primary"
            style={{ width: '100%', padding: 16, marginTop: 24, fontSize: 16 }}
          >
            {loading ? 'Entrando...' : 'Iniciar minha jornada'}
          </button>
        </div>
      )}

    </div>
  );
};

export default Register;
