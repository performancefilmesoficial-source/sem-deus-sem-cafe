import type { DayPassage } from '../types';

export interface PlanDay {
  id: number;
  title: string;
  date: string;
  month: string;
  tag: string;
  bookIndex?: number;
  chapterIndex?: number;
  atPassage?: DayPassage;
  ntPassage?: DayPassage;
}

// ─── Plano Cronológico Bíblico — nomes completos ─────────────────────────────
// Formato: "Livro AT cap-cap / Livro NT cap"
const PASSAGES: string[] = [
  // JANEIRO (31 dias)
  'Gênesis 1-2 / Mateus 1', 'Gênesis 3-4 / Mateus 2', 'Gênesis 5-7 / Mateus 5',
  'Gênesis 8-10 / Mateus 4', 'Gênesis 11-13 / Mateus 5-6', 'Gênesis 14-16 / Mateus 7-8',
  'Gênesis 17-19 / Mateus 9', 'Gênesis 20-22 / Mateus 10', 'Gênesis 23-24 / Mateus 11',
  'Gênesis 25-26 / Mateus 12', 'Gênesis 27-28 / Mateus 13', 'Gênesis 29-30 / Mateus 14',
  'Gênesis 31-32 / Mateus 15', 'Gênesis 33-34 / Mateus 16', 'Gênesis 35-36 / Mateus 17',
  'Gênesis 37-38 / Mateus 18', 'Gênesis 39-40 / Mateus 19', 'Gênesis 41-42 / Marcos 1',
  'Gênesis 43-45 / Marcos 2', 'Gênesis 46-48 / Marcos 3', 'Gênesis 49-50 / Marcos 4',
  'Êxodo 1-3 / Marcos 5', 'Êxodo 4-6 / Marcos 6', 'Êxodo 7-8 / Marcos 7',
  'Êxodo 9-10 / Marcos 8', 'Êxodo 11-12 / Marcos 9', 'Êxodo 13-14 / Marcos 10',
  'Êxodo 15-16 / Marcos 10', 'Êxodo 17-18 / Marcos 11', 'Êxodo 19-20 / Marcos 12',
  'Êxodo 21-22 / Marcos 13',
  // FEVEREIRO (28 dias)
  'Êxodo 23-24 / Lucas 1', 'Êxodo 25-26 / Lucas 2', 'Êxodo 27-28 / Lucas 3',
  'Êxodo 29-30 / Lucas 4', 'Êxodo 31-32 / Lucas 5', 'Êxodo 33-35 / Lucas 6',
  'Êxodo 36-38 / Lucas 7', 'Êxodo 39-40 / Lucas 8', 'Levítico 1-3 / Lucas 9',
  'Levítico 4-5 / Lucas 10', 'Levítico 6-7 / Lucas 11', 'Levítico 8-9 / Lucas 12',
  'Levítico 10-11 / Lucas 13', 'Levítico 12-13 / Lucas 14', 'Levítico 14-15 / Lucas 15',
  'Levítico 15-16 / Lucas 16', 'Levítico 17-18 / Lucas 17', 'Levítico 19-20 / Lucas 18',
  'Levítico 20-21 / Lucas 19', 'Levítico 22-23 / Lucas 20', 'Levítico 23-24 / Lucas 21',
  'Levítico 24-25 / Lucas 22', 'Levítico 26-27 / Lucas 23', 'Números 1-2 / Lucas 24',
  'Números 3-4 / João 1', 'Números 5-6 / João 2', 'Números 7-8 / João 3',
  'Números 9-10 / João 4',
  // MARÇO (31 dias)
  'Números 11-12 / João 5', 'Números 13-14 / João 6', 'Números 15-16 / João 7',
  'Números 17-18 / João 8', 'Números 19-20 / João 9', 'Números 21-22 / João 10',
  'Números 23-24 / João 11', 'Números 25-26 / João 12', 'Números 27-28 / João 13',
  'Números 29-30 / João 14', 'Números 31-32 / João 15', 'Números 33-34 / João 16',
  'Números 35-36 / João 17', 'Deuteronômio 1-2 / João 18', 'Deuteronômio 3-4 / João 19',
  'Deuteronômio 5-6 / João 20', 'Deuteronômio 7-8 / João 21', 'Deuteronômio 9-10 / Atos 1',
  'Deuteronômio 11-12 / Atos 2', 'Deuteronômio 13-14 / Atos 3', 'Deuteronômio 15-16 / Atos 4',
  'Deuteronômio 17-18 / Atos 5', 'Deuteronômio 19-20 / Atos 6', 'Deuteronômio 21-22 / Atos 7',
  'Deuteronômio 23-24 / Atos 8', 'Deuteronômio 25-26 / Atos 9', 'Deuteronômio 27-28 / Atos 10',
  'Deuteronômio 29-30 / Atos 11', 'Deuteronômio 31-32 / Atos 12', 'Deuteronômio 33-34 / Atos 13',
  'Josué 1-2 / Atos 14',
  // ABRIL (30 dias)
  'Josué 3-4 / Atos 15', 'Josué 5-6 / Atos 16', 'Josué 7-8 / Atos 17',
  'Josué 9-10 / Atos 18', 'Josué 11-12 / Atos 19', 'Josué 13-14 / Atos 20',
  'Josué 15-16 / Atos 21', 'Josué 17-18 / Atos 22', 'Josué 19-20 / Atos 23',
  'Josué 21-22 / Atos 24-25', 'Josué 23-24 / Atos 26', 'Juízes 1-2 / Atos 27',
  'Juízes 3-4 / Atos 28', 'Juízes 5-6 / Romanos 1', 'Juízes 7-8 / Romanos 2',
  'Juízes 9-10 / Romanos 3', 'Juízes 11-12 / Romanos 4', 'Juízes 13-14 / Romanos 5',
  'Juízes 15-16 / Romanos 6', 'Juízes 17-18 / Romanos 7', 'Juízes 19-20 / Romanos 8',
  'Juízes 21 / Romanos 9', 'Rute 1-2 / Romanos 10', 'Rute 3-4 / Romanos 11',
  '1 Samuel 1-2 / Romanos 12', '1 Samuel 3-4 / Romanos 13', '1 Samuel 5-6 / Romanos 14',
  '1 Samuel 7-8 / Romanos 15', '1 Samuel 9-10 / Romanos 16', '1 Samuel 11-12 / 1 Coríntios 1',
  // MAIO (31 dias)
  '1 Samuel 13-14 / 1 Coríntios 2', '1 Samuel 15-16 / 1 Coríntios 3', '1 Samuel 17-18 / 1 Coríntios 4',
  '1 Samuel 19-20 / 1 Coríntios 5', '1 Samuel 21-22 / 1 Coríntios 6', '1 Samuel 23-24 / 1 Coríntios 7',
  '1 Samuel 25-26 / 1 Coríntios 8', '1 Samuel 27-28 / 1 Coríntios 9', '1 Samuel 29-31 / 1 Coríntios 10',
  '2 Samuel 1-2 / 1 Coríntios 11', '2 Samuel 3-4 / 1 Coríntios 12', '2 Samuel 5-6 / 1 Coríntios 13',
  '2 Samuel 7-8 / 1 Coríntios 14', '2 Samuel 9-10 / 1 Coríntios 15', '2 Samuel 11-12 / 1 Coríntios 16',
  '2 Samuel 13-14 / 2 Coríntios 1', '2 Samuel 15-16 / 2 Coríntios 2', '2 Samuel 17-18 / 2 Coríntios 3',
  '2 Samuel 19-20 / 2 Coríntios 4', '2 Samuel 21-22 / 2 Coríntios 5', '2 Samuel 23-24 / 2 Coríntios 6',
  '1 Reis 1-2 / 2 Coríntios 7', '1 Reis 3-4 / 2 Coríntios 8', '1 Reis 5-6 / 2 Coríntios 9',
  '1 Reis 7-8 / 2 Coríntios 10', '1 Reis 9-10 / 2 Coríntios 11', '1 Reis 11-12 / 2 Coríntios 12',
  '1 Reis 13-14 / 2 Coríntios 13', '1 Reis 15-16 / Gálatas 1', '1 Reis 17-18 / Gálatas 2',
  '1 Reis 19-20 / Gálatas 3',
  // JUNHO (30 dias)
  '1 Reis 21-22 / Gálatas 4', '2 Reis 1-2 / Gálatas 5', '2 Reis 3-4 / Gálatas 6',
  '2 Reis 5-6 / Efésios 1', '2 Reis 7-8 / Efésios 2', '2 Reis 9-10 / Efésios 3',
  '2 Reis 11-12 / Efésios 4', '2 Reis 13-14 / Efésios 5', '2 Reis 15-16 / Efésios 6',
  '2 Reis 17-18 / Filipenses 1', '2 Reis 19-20 / Filipenses 2', '2 Reis 21-22 / Filipenses 3',
  '2 Reis 23-24 / Filipenses 4', '2 Reis 25 / Colossenses 1', '1 Crônicas 1-2 / Colossenses 2',
  '1 Crônicas 3-4 / Colossenses 3', '1 Crônicas 5-6 / Colossenses 4', '1 Crônicas 7-8 / 1 Tessalonicenses 1',
  '1 Crônicas 9-10 / 1 Tessalonicenses 2', '1 Crônicas 11-12 / 1 Tessalonicenses 3', '1 Crônicas 13-14 / 1 Tessalonicenses 4',
  '1 Crônicas 15-16 / 1 Tessalonicenses 5', '1 Crônicas 17-18 / 2 Tessalonicenses 1', '1 Crônicas 19-20 / 2 Tessalonicenses 2',
  '1 Crônicas 21-22 / 2 Tessalonicenses 3', '1 Crônicas 23-24 / 1 Timóteo 1', '1 Crônicas 25-26 / 1 Timóteo 2',
  '1 Crônicas 27-28 / 1 Timóteo 3', '1 Crônicas 29 / 1 Timóteo 4', '2 Crônicas 1-2 / 1 Timóteo 5',
  // JULHO (31 dias)
  '2 Crônicas 3-4 / 1 Timóteo 6', '2 Crônicas 5-6 / 2 Timóteo 1', '2 Crônicas 7-8 / 2 Timóteo 2',
  '2 Crônicas 9-10 / 2 Timóteo 3', '2 Crônicas 11-12 / 2 Timóteo 4', '2 Crônicas 13-14 / Tito 1',
  '2 Crônicas 15-16 / Tito 2', '2 Crônicas 17-18 / Tito 3', '2 Crônicas 19-20 / Filemom',
  '2 Crônicas 21-22 / Hebreus 1', '2 Crônicas 23-24 / Hebreus 2', '2 Crônicas 25-26 / Hebreus 3',
  '2 Crônicas 27-28 / Hebreus 4', '2 Crônicas 29-30 / Hebreus 5', '2 Crônicas 31-32 / Hebreus 6',
  '2 Crônicas 33-34 / Hebreus 7', '2 Crônicas 35-36 / Hebreus 8', 'Esdras 1-2 / Hebreus 9',
  'Esdras 3-4 / Hebreus 10', 'Esdras 5-6 / Hebreus 11', 'Esdras 7-8 / Hebreus 12',
  'Esdras 9-10 / Hebreus 13', 'Neemias 1-2 / Tiago 1', 'Neemias 3-4 / Tiago 2',
  'Neemias 5-6 / Tiago 3', 'Neemias 7-8 / Tiago 4', 'Neemias 9-10 / Tiago 5',
  'Neemias 11-12 / 1 Pedro 1', 'Neemias 13 / 1 Pedro 2', 'Ester 1-2 / 1 Pedro 3',
  'Ester 3-5 / 1 Pedro 4',
  // AGOSTO (31 dias)
  'Ester 6-8 / 1 Pedro 5', 'Ester 9-10 / 2 Pedro 1', 'Jó 1-2 / 2 Pedro 2',
  'Jó 3-4 / 2 Pedro 3', 'Jó 5-6 / 1 João 1', 'Jó 7-8 / 1 João 2',
  'Jó 9-10 / 1 João 3', 'Jó 11-12 / 1 João 4', 'Jó 13-14 / 1 João 5',
  'Jó 15-16 / 2 João', 'Jó 17-18 / 3 João', 'Jó 19-20 / Judas',
  'Jó 21-22 / Apocalipse 1', 'Jó 23-24 / Apocalipse 2', 'Jó 25-26 / Apocalipse 3',
  'Jó 27-28 / Apocalipse 4', 'Jó 29-30 / Apocalipse 5', 'Jó 31-32 / Apocalipse 6',
  'Jó 33-34 / Apocalipse 7', 'Jó 35-36 / Apocalipse 8', 'Jó 37-38 / Apocalipse 9',
  'Jó 39-40 / Apocalipse 10', 'Jó 41-42 / Apocalipse 11', 'Salmos 1-5 / Apocalipse 12',
  'Salmos 6-10 / Apocalipse 13', 'Salmos 11-15 / Apocalipse 14', 'Salmos 16-19 / Apocalipse 15',
  'Salmos 20-24 / Apocalipse 16', 'Salmos 25-29 / Apocalipse 17', 'Salmos 30-34 / Apocalipse 18',
  'Salmos 35-37 / Apocalipse 19',
  // SETEMBRO (30 dias)
  'Salmos 38-42 / Apocalipse 20', 'Salmos 43-47 / Apocalipse 21', 'Salmos 48-52 / Apocalipse 22',
  'Salmos 53-58 / Mateus 1', 'Salmos 59-63 / Mateus 2', 'Salmos 64-68 / Mateus 3',
  'Salmos 69-72 / Mateus 4', 'Salmos 73-77 / Mateus 5', 'Salmos 78-80 / Mateus 6',
  'Salmos 81-85 / Mateus 7', 'Salmos 86-90 / Mateus 8', 'Salmos 91-95 / Mateus 9',
  'Salmos 96-100 / Mateus 10', 'Salmos 101-104 / Mateus 11', 'Salmos 105-107 / Mateus 12',
  'Salmos 108-112 / Mateus 13', 'Salmos 113-118 / Mateus 14', 'Salmos 119 / Mateus 15',
  'Salmos 120-125 / Mateus 16', 'Salmos 126-131 / Mateus 17', 'Salmos 132-136 / Mateus 18',
  'Salmos 137-141 / Mateus 19', 'Salmos 142-145 / Mateus 20', 'Salmos 146-150 / Mateus 21',
  'Provérbios 1-3 / Mateus 22', 'Provérbios 4-6 / Mateus 23', 'Provérbios 7-9 / Mateus 24',
  'Provérbios 10-12 / Mateus 25', 'Provérbios 13-15 / Mateus 26', 'Provérbios 16-18 / Mateus 27',
  // OUTUBRO (31 dias)
  'Provérbios 19-21 / Mateus 28', 'Provérbios 22-24 / Marcos 1', 'Provérbios 25-27 / Marcos 2',
  'Provérbios 28-31 / Marcos 3', 'Eclesiastes 1-3 / Marcos 4', 'Eclesiastes 4-6 / Marcos 5',
  'Eclesiastes 7-9 / Marcos 6', 'Eclesiastes 10-12 / Marcos 7', 'Cantares 1-4 / Marcos 8',
  'Cantares 5-8 / Marcos 9', 'Isaías 1-3 / Marcos 10', 'Isaías 4-6 / Marcos 11',
  'Isaías 7-9 / Marcos 12', 'Isaías 10-12 / Marcos 13', 'Isaías 13-15 / Marcos 14',
  'Isaías 16-18 / Marcos 15', 'Isaías 19-21 / Marcos 16', 'Isaías 22-24 / Lucas 1',
  'Isaías 25-27 / Lucas 2', 'Isaías 28-30 / Lucas 3', 'Isaías 31-33 / Lucas 4',
  'Isaías 34-36 / Lucas 5', 'Isaías 37-39 / Lucas 6', 'Isaías 40-42 / Lucas 7',
  'Isaías 43-45 / Lucas 8', 'Isaías 46-48 / Lucas 9', 'Isaías 49-51 / Lucas 10',
  'Isaías 52-54 / Lucas 11', 'Isaías 55-57 / Lucas 12', 'Isaías 58-60 / Lucas 13',
  'Isaías 61-63 / Lucas 14',
  // NOVEMBRO (30 dias)
  'Isaías 64-66 / Lucas 15', 'Jeremias 1-2 / Lucas 16', 'Jeremias 3-5 / Lucas 17',
  'Jeremias 6-8 / Lucas 18', 'Jeremias 9-11 / Lucas 19', 'Jeremias 12-14 / Lucas 20',
  'Jeremias 15-17 / Lucas 21', 'Jeremias 18-20 / Lucas 22', 'Jeremias 21-23 / Lucas 23',
  'Jeremias 24-26 / Lucas 24', 'Jeremias 27-29 / João 1', 'Jeremias 30-32 / João 2',
  'Jeremias 33-35 / João 3', 'Jeremias 36-38 / João 4', 'Jeremias 39-41 / João 5',
  'Jeremias 42-44 / João 6', 'Jeremias 45-47 / João 7', 'Jeremias 48-49 / João 8',
  'Jeremias 50-52 / João 9', 'Lamentações 1-2 / João 10', 'Lamentações 3-5 / João 11',
  'Ezequiel 1-3 / João 12', 'Ezequiel 4-6 / João 13', 'Ezequiel 7-9 / João 14',
  'Ezequiel 10-12 / João 15', 'Ezequiel 13-15 / João 16', 'Ezequiel 16-18 / João 17',
  'Ezequiel 19-21 / João 18', 'Ezequiel 22-24 / João 19', 'Ezequiel 25-27 / João 20',
  // DEZEMBRO (31 dias)
  'Ezequiel 28-30 / João 21', 'Ezequiel 31-33 / Atos 1', 'Ezequiel 34-36 / Atos 2',
  'Ezequiel 37-39 / Atos 3', 'Ezequiel 40-42 / Atos 4', 'Ezequiel 43-45 / Atos 5',
  'Ezequiel 46-48 / Atos 6', 'Daniel 1-2 / Atos 7', 'Daniel 3-4 / Atos 8',
  'Daniel 5-6 / Atos 9', 'Daniel 7-9 / Atos 10', 'Daniel 10-12 / Atos 11',
  'Oséias 1-3 / Atos 12', 'Oséias 4-7 / Atos 13', 'Oséias 8-10 / Atos 14',
  'Oséias 11-14 / Atos 15', 'Joel 1-3 / Atos 16', 'Amós 1-3 / Atos 17',
  'Amós 4-6 / Atos 18', 'Amós 7-9 / Atos 19', 'Obadias / Atos 20',
  'Jonas 1-4 / Atos 21', 'Miquéias 1-4 / Atos 22', 'Naum 1-3 / Atos 23',
  'Habacuque 1-3 / Atos 24', 'Sofonias 1-3 / Atos 25', 'Ageu 1-2 / Atos 26',
  'Zacarias 1-4 / Atos 27', 'Zacarias 5-9 / Atos 28', 'Zacarias 10-14 / Romanos 1',
  'Malaquias 1-4 / Romanos 2',
];

// Garante exatamente 365 dias
while (PASSAGES.length < 365) PASSAGES.push(`Leitura Bíblica — Dia ${PASSAGES.length + 1}`);
if (PASSAGES.length > 365) PASSAGES.splice(365);

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const MONTH_ABBREVS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const BIBLE_BOOKS = [
  'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio', 'Josué', 'Juízes', 'Rute',
  '1 Samuel', '2 Samuel', '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras', 'Neemias',
  'Ester', 'Jó', 'Salmos', 'Provérbios', 'Eclesiastes', 'Cantares', 'Isaías', 'Jeremias',
  'Lamentações', 'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós', 'Obadias',
  'Jonas', 'Miquéias', 'Naum', 'Habacuque', 'Sofonias', 'Ageu', 'Zacarias', 'Malaquias',
  'Mateus', 'Marcos', 'Lucas', 'João', 'Atos', 'Romanos', '1 Coríntios', '2 Coríntios',
  'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses',
  '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', '1 Pedro', '2 Pedro',
  '1 João', '2 João', '3 João', 'Judas', 'Apocalipse',
];

// Lista pré-ordenada por comprimento de nome (maior primeiro) para evitar
// que nomes curtos (ex: "Jó") interceptem nomes mais longos (ex: "João").
const BIBLE_BOOKS_SORTED = BIBLE_BOOKS
  .map((name, idx) => ({ name, idx }))
  .sort((a, b) => b.name.length - a.name.length);

function parseOnePart(part: string): DayPassage {
  const p = part.trim();
  const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const normP = normalize(p);

  for (const { name, idx } of BIBLE_BOOKS_SORTED) {
    const bookNorm = normalize(name);
    if (normP.startsWith(bookNorm)) {
      // Garante que após o nome vem um espaço, número ou fim de string (não outra letra)
      const charAfter = normP[bookNorm.length];
      if (charAfter !== undefined && /[a-záéíóúàãõâêîôûç]/i.test(charAfter)) continue;

      const rest = p.substring(name.length).trim();
      const rangeMatch = rest.match(/^(\d+)(?:-(\d+))?/);
      const startChapter = rangeMatch ? parseInt(rangeMatch[1]) - 1 : 0;
      const endChapter = rangeMatch && rangeMatch[2] ? parseInt(rangeMatch[2]) - 1 : startChapter;
      return {
        bookIndex: idx,
        startChapter,
        endChapter,
        label: `${name} ${rest || '1'}`.trim(),
      };
    }
  }
  return { bookIndex: 0, startChapter: 0, endChapter: 0, label: p };
}

function parsePassage(passage: string): { bookIndex: number; chapterIndex: number; atPassage: DayPassage; ntPassage?: DayPassage } {
  const parts = passage.split('/');
  const atPassage = parseOnePart(parts[0]);
  const ntPassage = parts[1] ? parseOnePart(parts[1]) : undefined;
  return {
    bookIndex: atPassage.bookIndex,
    chapterIndex: atPassage.startChapter,
    atPassage,
    ntPassage,
  };
}

export function generateYearlyPlan(): PlanDay[] {
  const today = new Date();
  const todayNorm = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const yesterdayNorm = todayNorm - 86_400_000;

  const plan: PlanDay[] = [];
  let id = 1;

  for (let m = 0; m < 12; m++) {
    for (let d = 1; d <= DAYS_IN_MONTH[m]; d++) {
      const dateNorm = new Date(2026, m, d).getTime();
      let tag = '';
      if (dateNorm === todayNorm) tag = 'Hoje';
      else if (dateNorm === yesterdayNorm) tag = 'Ontem';

      const passage = PASSAGES[id - 1];
      const { bookIndex, chapterIndex, atPassage, ntPassage } = parsePassage(passage);

      plan.push({
        id,
        title: passage,
        date: `${String(d).padStart(2, '0')} ${MONTH_ABBREVS[m]}`,
        month: MONTH_NAMES[m],
        tag,
        bookIndex,
        chapterIndex,
        atPassage,
        ntPassage,
      });
      id++;
    }
  }

  return plan;
}
