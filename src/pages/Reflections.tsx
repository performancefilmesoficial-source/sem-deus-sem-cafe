import React, { useState, useEffect } from 'react';
import { Sparkles, PenLine, Save, BookOpen, Quote } from 'lucide-react';

const DAILY_VERSES = [
    { book: 'Salmos', chapter: 23, verse: 1, text: 'O Senhor é o meu pastor; nada me faltará.' },
    { book: 'João', chapter: 14, verse: 6, text: 'Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim.' },
    { book: 'Filipenses', chapter: 4, verse: 13, text: 'Posso todas as coisas naquele que me fortalece.' },
    { book: 'Provérbios', chapter: 3, verse: 5, text: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.' },
    { book: 'Mateus', chapter: 11, verse: 28, text: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
    { book: 'Josué', chapter: 1, verse: 9, text: 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te apavores, porque o Senhor, teu Deus, é contigo, por onde quer que fores.' },
    { book: 'Isaías', chapter: 41, verse: 10, text: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te esforço, e te ajudo, e te sustento com a dextra da minha justiça.' }
];

const Reflections: React.FC = () => {
    const [summary, setSummary] = useState(() => {
        return localStorage.getItem('daily-reflection-summary') || '';
    });
    const [saved, setSaved] = useState(false);
    const [dailyVerse, setDailyVerse] = useState(DAILY_VERSES[0]);

    useEffect(() => {
        // Pick a verse based on the day of the year
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        setDailyVerse(DAILY_VERSES[dayOfYear % DAILY_VERSES.length]);
    }, []);

    const handleSave = () => {
        localStorage.setItem('daily-reflection-summary', summary);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="page reflections-page">
            <header className="header">
                <h1>Reflexões</h1>
                <p>Alimento para sua alma e espaço para seus pensamentos.</p>
            </header>

            <section className="word-of-the-day-section">
                <div className="card word-card">
                    <div className="word-header">
                        <Sparkles className="icon-sparkle" size={20} />
                        <span>Palavra do Dia</span>
                    </div>
                    <div className="word-content">
                        <Quote className="icon-quote" size={40} />
                        <p className="verse-text">"{dailyVerse.text}"</p>
                        <cite className="verse-ref">{dailyVerse.book} {dailyVerse.chapter}:{dailyVerse.verse}</cite>
                    </div>
                </div>
            </section>

            <section className="daily-summary-section">
                <div className="section-header">
                    <h3>Resumo da Leitura</h3>
                    <PenLine size={18} color="var(--accent-primary)" />
                </div>
                <div className="card summary-card">
                    <textarea
                        placeholder="O que Deus falou com você hoje através da leitura?"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="reflection-textarea"
                    />
                    <button
                        className={`btn-primary save-btn ${saved ? 'btn-saved' : ''}`}
                        onClick={handleSave}
                    >
                        {saved ? (
                            <>Salvo! <Save size={18} /></>
                        ) : (
                            <>Salvar Reflexão <Save size={18} /></>
                        )}
                    </button>
                </div>
            </section>

            <div className="reflection-tips">
                <div className="tip-item">
                    <BookOpen size={20} />
                    <div>
                        <h4>Dica de Meditação</h4>
                        <p>Tente ler em voz alta o versículo do dia e repetir calmamente, focando em cada palavra.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reflections;
