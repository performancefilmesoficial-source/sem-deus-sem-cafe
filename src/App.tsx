import { useState, useEffect } from 'react';
import BottomNav from './components/molecules/BottomNav';
import Dashboard from './pages/Dashboard';
import BibleReader from './pages/BibleReader';
import ReadingPlan from './pages/ReadingPlan';
import Reflections from './pages/Reflections';
import Register from './pages/Register';
import { Skeleton } from './components/atoms/Skeleton';
import { useAuth } from './contexts/AuthContext';
import { getCompletedDays, addCompletedDay, removeCompletedDay } from './lib/sync';
import { supabase } from './lib/supabase';
import type { BibleParams } from './types';
import './App.css';

function App() {
  const { session, loading } = useAuth();
  const userId = session?.user?.id || '';

  const [activeTab, setActiveTab] = useState('dashboard');
  const [bibleParams, setBibleParams] = useState<BibleParams>({ bookIndex: 0, chapterIndex: 0 });
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Carrega os dias concluídos
  useEffect(() => {
    if (userId) {
      getCompletedDays(userId).then(setCompletedDays);
    }
  }, [userId]);

  const handleToggleDay = async (id: number) => {
    let newDays: number[] = [];
    if (completedDays.includes(id)) {
      newDays = completedDays.filter(d => d !== id).sort((a, b) => a - b);
      setCompletedDays(newDays);
      await removeCompletedDay(userId, id);
    } else {
      newDays = [...completedDays, id].sort((a, b) => a - b);
      setCompletedDays(newDays);
      await addCompletedDay(userId, id);
    }
  };

  const handleTabChange = (tab: string, params?: BibleParams) => {
    if (tab === 'bible') {
      // Se veio com params (ex: do Plano), usa os params; senão, reseta para modo normal
      setBibleParams(params ?? { bookIndex: 0, chapterIndex: 0 });
    }
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setActiveTab('dashboard'); // reset tab on logout
  };

  if (loading) return (
    <div className="app-container">
      <main className="main-content" style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <Skeleton width={180} height={40} />
          <Skeleton width={60} height={36} />
        </div>
        <Skeleton width="100%" height={120} borderRadius={16} style={{ marginBottom: 16 }} />
        <div style={{ display: 'flex', gap: 16 }}>
          <Skeleton width="50%" height={100} borderRadius={16} />
          <Skeleton width="50%" height={100} borderRadius={16} />
        </div>
      </main>
    </div>
  );

  if (!session) {
    return (
      <div className="app-container">
        <main className="main-content">
          <Register />
        </main>
      </div>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleTabChange} userName={session?.user?.user_metadata?.name || 'Leitor'} onLogout={handleLogout} completedDays={completedDays} />;
      case 'bible':
        return <BibleReader
          initialBook={bibleParams.bookIndex}
          initialChapter={bibleParams.chapterIndex}
          dayMode={bibleParams.dayMode}
          atPassage={bibleParams.atPassage}
          ntPassage={bibleParams.ntPassage}
          dayTitle={bibleParams.dayTitle}
        />;
      case 'plan':
        return <ReadingPlan onNavigate={handleTabChange} completedDays={completedDays} onToggleDay={handleToggleDay} />;
      case 'reflections':
        return <Reflections />;
      default:
        return <Dashboard onNavigate={handleTabChange} userName={session?.user?.user_metadata?.name || 'Leitor'} onLogout={handleLogout} completedDays={completedDays} />;
    }
  };

  return (
    <div className="app-container">
      <main className="main-content">
        {renderPage()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={(tab) => handleTabChange(tab)} />
    </div>
  );
}

export default App;
