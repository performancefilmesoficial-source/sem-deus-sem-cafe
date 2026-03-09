import React, { useState, useEffect } from 'react';
import bibleData from '../data/bible-full.json';
import { ChevronLeft, ChevronRight, ChevronDown, X, Search, ArrowLeft, BookOpen } from 'lucide-react';
import type { DayPassage } from '../types';

const HIGHLIGHT_COLORS = [
  { label: 'Amarelo', bg: '#FFF9C4', border: '#F9A825' },
  { label: 'Verde', bg: '#DCEDC8', border: '#558B2F' },
  { label: 'Azul', bg: '#B3E5FC', border: '#0277BD' },
  { label: 'Rosa', bg: '#FCE4EC', border: '#AD1457' },
];

const getKey = (b: number, c: number, v: number) => `${b}-${c}-${v}`;
type SelectorStep = 'book' | 'chapter' | 'verse';

interface BibleReaderProps {
  initialBook?: number;
  initialChapter?: number;
  dayMode?: boolean;
  atPassage?: DayPassage;
  ntPassage?: DayPassage;
  dayTitle?: string;
}

const BibleReader: React.FC<BibleReaderProps> = ({
  initialBook = 0,
  initialChapter = 0,
  dayMode = false,
  atPassage,
  ntPassage,
  dayTitle,
}) => {
  const [selectedBook, setSelectedBook] = useState(initialBook);
  const [selectedChapter, setSelectedChapter] = useState(initialChapter);
  const [showSelector, setShowSelector] = useState(false);
  const [selectorStep, setSelectorStep] = useState<SelectorStep>('book');
  const [tempBook, setTempBook] = useState(0);
  const [tempChapter, setTempChapter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // No dayMode: qual passagem está sendo lida ('at' | 'nt')
  const [dayTab, setDayTab] = useState<'at' | 'nt'>('at');

  const fontSize = 19;

  useEffect(() => {
    setSelectedBook(initialBook);
    setSelectedChapter(initialChapter);
    setDayTab('at');
  }, [initialBook, initialChapter]);

  // Highlighting
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [highlights, setHighlights] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem('biblical-flow-highlights') ?? '{}'); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem('biblical-flow-highlights', JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => { setSelectedVerse(null); }, [selectedBook, selectedChapter]);

  const applyHighlight = (color: string) => {
    if (selectedVerse === null) return;
    setHighlights(prev => ({ ...prev, [getKey(selectedBook, selectedChapter, selectedVerse)]: color }));
    setSelectedVerse(null);
  };

  const removeHighlight = () => {
    if (selectedVerse === null) return;
    setHighlights(prev => {
      const next = { ...prev };
      delete next[getKey(selectedBook, selectedChapter, selectedVerse)];
      return next;
    });
    setSelectedVerse(null);
  };

  const handleVerseClick = (index: number) => setSelectedVerse(prev => prev === index ? null : index);

  // ── Passagem ativa no modo dia ──────────────────────────────────
  const activePassage = dayMode
    ? (dayTab === 'at' ? atPassage : ntPassage) ?? atPassage
    : null;

  // ── Navegação ────────────────────────────────────────────────────
  const book = bibleData[selectedBook];
  const chapter = book?.chapters[selectedChapter] ?? [];

  // No modo dia: limites do capítulo são determinados pela passagem ativa
  const minChapter = dayMode && activePassage ? activePassage.startChapter : 0;
  const maxChapter = dayMode && activePassage
    ? Math.min(activePassage.endChapter, (bibleData[activePassage.bookIndex]?.chapters.length ?? 1) - 1)
    : book.chapters.length - 1;

  const isFirstChapter = dayMode
    ? selectedChapter <= minChapter
    : selectedChapter === 0 && selectedBook === 0;

  const isLastChapter = dayMode
    ? selectedChapter >= maxChapter
    : selectedChapter === book.chapters.length - 1 && selectedBook === bibleData.length - 1;

  const goPrev = () => {
    if (dayMode) {
      if (selectedChapter > minChapter) setSelectedChapter(c => c - 1);
    } else {
      if (selectedChapter > 0) { setSelectedChapter(c => c - 1); }
      else if (selectedBook > 0) {
        const prevBook = bibleData[selectedBook - 1];
        setSelectedBook(b => b - 1);
        setSelectedChapter(prevBook.chapters.length - 1);
      }
    }
  };

  const goNext = () => {
    if (dayMode) {
      if (selectedChapter < maxChapter) setSelectedChapter(c => c + 1);
    } else {
      if (selectedChapter < book.chapters.length - 1) { setSelectedChapter(c => c + 1); }
      else if (selectedBook < bibleData.length - 1) { setSelectedBook(b => b + 1); setSelectedChapter(0); }
    }
  };

  // Troca de aba AT/NT no modo dia
  const switchDayTab = (tab: 'at' | 'nt') => {
    setDayTab(tab);
    const passage = tab === 'at' ? atPassage : ntPassage;
    if (passage) {
      setSelectedBook(passage.bookIndex);
      setSelectedChapter(passage.startChapter);
    }
  };

  // ── Seletor livre (modo normal) ──────────────────────────────────
  const openSelector = () => {
    setSearchQuery('');
    setSelectorStep('book');
    setTempBook(selectedBook);
    setTempChapter(selectedChapter);
    setShowSelector(true);
  };

  const closeSelector = () => { setShowSelector(false); setSearchQuery(''); };

  const handleSelectBook = (bookIndex: number) => {
    setTempBook(bookIndex);
    setTempChapter(0);
    setSelectorStep('chapter');
  };

  const handleSelectChapter = (chapterIndex: number) => {
    setTempChapter(chapterIndex);
    setSelectorStep('verse');
  };

  const handleSelectVerse = (verseIndex: number) => {
    setSelectedBook(tempBook);
    setSelectedChapter(tempChapter);
    setTimeout(() => {
      document.getElementById(`verse-${verseIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    closeSelector();
  };

  const goBackStep = () => {
    if (selectorStep === 'chapter') { setSelectorStep('book'); setSearchQuery(''); }
    else if (selectorStep === 'verse') setSelectorStep('chapter');
  };

  const filteredBooks = bibleData.map((b, i) => ({ ...b, originalIndex: i }))
    .filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const tempBookData = bibleData[tempBook];
  const tempChapterData = tempBookData?.chapters[tempChapter] ?? [];

  const activeHighlight = selectedVerse !== null
    ? highlights[getKey(selectedBook, selectedChapter, selectedVerse)] ?? null : null;

  const selectorTitle = selectorStep === 'book' ? 'Selecionar Livro'
    : selectorStep === 'chapter' ? `${tempBookData?.name} — Capítulo`
      : `${tempBookData?.name} ${tempChapter + 1} — Versículo`;

  return (
    <div className="reader-page">

      {/* ── Header ── */}
      <header className="reader-header">
        {dayMode ? (
          // Modo Dia: mostra o título do dia
          <div className="day-header-title">
            <BookOpen size={16} color="var(--accent-primary)" />
            <span>{dayTitle ?? 'Leitura do Dia'}</span>
          </div>
        ) : (
          <button className="book-select" onClick={openSelector}>
            {book?.name} {selectedChapter + 1}
            <ChevronDown size={15} />
          </button>
        )}

        {!dayMode && (
          <div className="reader-header-actions">
            <button className="icon-btn search-book-btn" onClick={openSelector} title="Pesquisar livro">
              <Search size={18} />
            </button>
          </div>
        )}
      </header>

      {/* ── Tabs AT / NT (somente modo dia) ── */}
      {dayMode && (
        <div className="day-tabs">
          <button
            className={`day-tab ${dayTab === 'at' ? 'active' : ''}`}
            onClick={() => switchDayTab('at')}
          >
            {atPassage?.label ?? 'Antigo Testamento'}
          </button>
          {ntPassage && (
            <button
              className={`day-tab ${dayTab === 'nt' ? 'active' : ''}`}
              onClick={() => switchDayTab('nt')}
            >
              {ntPassage.label}
            </button>
          )}
        </div>
      )}

      {/* ── Versículos ── */}
      <div className="reading-content">
        <h2 className="chapter-title">
          {book?.name}
          <small>Capítulo {selectedChapter + 1}</small>
        </h2>

        {chapter.map((verse, index) => {
          const key = getKey(selectedBook, selectedChapter, index);
          const highlightColor = highlights[key];
          const isSelected = selectedVerse === index;
          return (
            <p
              id={`verse-${index}`}
              key={index}
              className={`verse${isSelected ? ' verse-selected' : ''}`}
              style={{ fontSize: `${fontSize}px`, background: highlightColor ?? undefined }}
              onClick={() => handleVerseClick(index)}
            >
              <span className="verse-number">{index + 1}</span>
              {verse}
            </p>
          );
        })}
      </div>

      {/* ── Navegação de Capítulo ── */}
      <div className="reader-controls">
        <button disabled={isFirstChapter} onClick={goPrev} className="control-btn" aria-label="Capítulo anterior">
          <ChevronLeft size={24} />
        </button>
        <span className="chapter-label">
          {selectedChapter + 1} {dayMode ? `/ ${maxChapter - minChapter + 1}` : `/ ${book.chapters.length}`}
        </span>
        <button disabled={isLastChapter} onClick={goNext} className="control-btn" aria-label="Próximo capítulo">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* ── Highlight Toolbar ── */}
      {selectedVerse !== null && (
        <div className="highlight-toolbar">
          <span className="highlight-toolbar-label">Destacar versículo {selectedVerse + 1}</span>
          <div className="highlight-colors">
            {HIGHLIGHT_COLORS.map(hc => (
              <button key={hc.bg} className="highlight-color-btn"
                style={{ background: hc.bg, borderColor: hc.border }}
                onClick={() => applyHighlight(hc.bg)} title={hc.label} />
            ))}
            {activeHighlight && (
              <button className="highlight-clear-btn" onClick={removeHighlight}>✕</button>
            )}
          </div>
        </div>
      )}

      {/* ── Seletor livre (apenas modo normal) ── */}
      {!dayMode && showSelector && (
        <div className="overlay" onClick={closeSelector}>
          <div className="book-selector-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-drag-handle" />
            <div className="sheet-header">
              <div className="sheet-header-left">
                {selectorStep !== 'book' && (
                  <button className="icon-btn back-btn" onClick={goBackStep}><ArrowLeft size={18} /></button>
                )}
                <h3>{selectorTitle}</h3>
              </div>
              <button className="icon-btn" onClick={closeSelector}><X size={18} /></button>
            </div>

            {selectorStep === 'book' && (
              <>
                <div className="search-box">
                  <Search size={16} className="search-icon" />
                  <input type="text" placeholder="Pesquisar livro..." value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)} autoFocus />
                </div>
                <div className="book-options-container">
                  {filteredBooks.map(b => (
                    <button key={b.originalIndex}
                      className={`book-option ${selectedBook === b.originalIndex ? 'active' : ''}`}
                      onClick={() => handleSelectBook(b.originalIndex)}>
                      <span>{b.name}</span>
                      <span className="book-chapters">{b.chapters.length} cap.</span>
                    </button>
                  ))}
                  {filteredBooks.length === 0 && <div className="no-results">Nenhum livro encontrado</div>}
                </div>
              </>
            )}

            {selectorStep === 'chapter' && (
              <div className="number-grid-container">
                <div className="number-grid">
                  {tempBookData?.chapters.map((_, idx) => (
                    <button key={idx}
                      className={`number-btn ${tempChapter === idx && selectedBook === tempBook ? 'active' : ''}`}
                      onClick={() => handleSelectChapter(idx)}>
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectorStep === 'verse' && (
              <div className="number-grid-container">
                <div className="number-grid">
                  {tempChapterData.map((_, idx) => (
                    <button key={idx} className="number-btn" onClick={() => handleSelectVerse(idx)}>
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleReader;
