export interface UserData {
  name: string;
  completedDays: number[];
}

export interface DayPassage {
  bookIndex: number;
  startChapter: number;
  endChapter: number;
  label: string;  // e.g. "Gênesis 1-2"
}

export interface BibleParams {
  bookIndex: number;
  chapterIndex: number;
  dayMode?: boolean;           // se true, restringe a navegação
  atPassage?: DayPassage;      // leitura do AT do dia
  ntPassage?: DayPassage;      // leitura do NT do dia
  dayTitle?: string;           // título completo do dia, e.g. "Gênesis 1-2 / Mateus 1"
}
