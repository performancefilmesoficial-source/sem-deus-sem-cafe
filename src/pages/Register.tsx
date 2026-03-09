import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { generateYearlyPlan } from '../utils/planGenerator';

const PLAN_DAYS = generateYearlyPlan();

const Register: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Para novos usuários
  const [step, setStep] = useState<1 | 2>(1);
  const [progressChoice, setProgressChoice] = useState<'on-track' | 'fresh' | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        // LOGIN
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Se sucesso, o AuthContext ouve a mudança e o App redesenha automaticamente
      } else {
        // SIGNUP - Passo 1 (Cria conta e mostra passo 2)
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name: name.trim() } // Salva o nome nos metadados JWT
          }
        });
        if (error) throw error;
        setStep(2); // Avança para escolher o progresso inicial após criar conta
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao autenticar. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProgressAndFinish = async () => {
    setLoading(true);
    let completedDays: number[] = [];

    if (progressChoice === 'on-track') {
      const todayIndex = PLAN_DAYS.findIndex(d => d.tag === 'Hoje');
      if (todayIndex > 0) {
        completedDays = PLAN_DAYS.slice(0, todayIndex).map(d => d.id);
      }
    } // else 'fresh' = []

    // Salva no localStorage imediatamente como fallback (mesma chave do sync.ts)
    localStorage.setItem('sdsc-completed-days', JSON.stringify(completedDays));

    try {
      // Faz login diretamente com as credenciais que o usuário acabou de preencher
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInData?.session?.user) {
        // Login bem-sucedido — salva progresso no banco
        await supabase.from('reading_progress').upsert({
          user_id: signInData.session.user.id,
          completed_days: completedDays,
          last_synced: new Date().toISOString()
        }, { onConflict: 'user_id' });
        // AuthContext detecta a mudança de sessão e redireciona automaticamente
        return;
      }

      // Se o erro for de confirmação de e-mail, orientar o usuário
      if (signInError) {
        const msg = signInError.message.toLowerCase();
        if (msg.includes('confirm') || msg.includes('email') || msg.includes('verified')) {
          setErrorMsg('Confirme seu e-mail e faça login para acessar o app. Seu progresso já foi salvo!');
        } else {
          setErrorMsg(signInError.message || 'Erro ao entrar. Tente fazer login manualmente.');
        }
        setStep(1);
        setIsLogin(true);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Erro ao salvar progresso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center' }}>

      {step === 1 && (
        <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: 24, borderRadius: 24, boxShadow: 'var(--shadow-medium)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img src="/logo-transparent.png" alt="Sem Deus, Sem Café" style={{ width: 180, height: 'auto', marginBottom: 8 }} />
            <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Acesso ao Plano</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Entre para continuar sua leitura.</p>
          </div>

          {errorMsg && (
            <div style={{ padding: 12, backgroundColor: 'var(--warning-bg)', color: 'var(--warning)', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
              {errorMsg}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'var(--bg-primary)', padding: 4, borderRadius: 12 }}>
            <button
              onClick={() => { setIsLogin(true); setErrorMsg(''); }}
              style={{ flex: 1, padding: '10px', borderRadius: 10, background: isLogin ? 'white' : 'transparent', fontWeight: 600, boxShadow: isLogin ? 'var(--shadow-card)' : 'none', color: isLogin ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              Entrar
            </button>
            <button
              onClick={() => { setIsLogin(false); setErrorMsg(''); }}
              style={{ flex: 1, padding: '10px', borderRadius: 10, background: !isLogin ? 'white' : 'transparent', fontWeight: 600, boxShadow: !isLogin ? 'var(--shadow-card)' : 'none', color: !isLogin ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              Criar Conta
            </button>
          </div>

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Nome de Identificação</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 12, marginTop: 4, border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)' }}
                  placeholder="Como quer ser chamado?"
                />
              </div>
            )}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, marginTop: 4, border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)' }}
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, marginTop: 4, border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)' }}
                placeholder="Mínimo 6 caracteres"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ padding: 16, marginTop: 8, fontSize: 16 }}
            >
              {loading ? 'Aguarde...' : (isLogin ? 'Entrar' : 'Cadastrar')}
            </button>
          </form>
        </div>
      )}

      {/* Passo 2 APENAS para novos cadastros (escolher progresso) */}
      {step === 2 && !isLogin && (
        <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: 24, borderRadius: 24, boxShadow: 'var(--shadow-medium)' }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Seja bem-vindo(a), {name}!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
            Onde você está na sua leitura diária?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={() => setProgressChoice('on-track')}
              style={{
                padding: '16px', borderRadius: 12, textAlign: 'left',
                border: `2px solid ${progressChoice === 'on-track' ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                background: progressChoice === 'on-track' ? 'var(--accent-pastel)' : 'transparent'
              }}
            >
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 4 }}>Estou em dia!</h4>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Marcar todos os dias anteriores a hoje como lidos automaticamente.</p>
            </button>

            <button
              onClick={() => setProgressChoice('fresh')}
              style={{
                padding: '16px', borderRadius: 12, textAlign: 'left',
                border: `2px solid ${progressChoice === 'fresh' ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                background: progressChoice === 'fresh' ? 'var(--accent-pastel)' : 'transparent'
              }}
            >
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 4 }}>Começando hoje</h4>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Meu plano começa limpo, sem nenhum check marcado.</p>
            </button>
          </div>

          <button
            onClick={handleSaveProgressAndFinish}
            disabled={!progressChoice || loading}
            className="btn-primary"
            style={{ width: '100%', padding: 16, marginTop: 24, fontSize: 16 }}
          >
            {loading ? 'Salvando...' : 'Entrar no Aplicativo'}
          </button>
        </div>
      )}

    </div>
  );
};

export default Register;
