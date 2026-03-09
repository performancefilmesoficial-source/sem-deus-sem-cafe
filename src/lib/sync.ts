import { supabase } from './supabase';

/**
 * Função responsável por sincronizar os dias concluídos
 * Salva localmente e tenta enviar para o Supabase (fire-and-forget).
 * Se offline, o supabase fetch falhará, mas o localStorage persistirá.
 */

// Chave local legacy
const LOCAL_DAYS_KEY = 'sdsc-completed-days';

export async function getCompletedDays(userId: string): Promise<number[]> {
    // 1. Pega do local primeiro para ser super rápido (offline-first read)
    const localListStr = localStorage.getItem(LOCAL_DAYS_KEY);
    let localList: number[] = localListStr ? JSON.parse(localListStr) : [];

    // Se o usuário não estiver logado, apenas retorna o local
    if (!userId) return localList;

    try {
        // 2. Tenta buscar da nuvem
        const { data, error } = await supabase
            .from('reading_progress')
            .select('completed_days')
            .eq('user_id', userId)
            .single();

        if (!error && data) {
            // 3. Mesclar remoto com o local (Delta Simples - união única)
            const remoteList = data.completed_days as number[];
            const merged = Array.from(new Set([...localList, ...remoteList])).sort((a, b) => a - b);

            // Salva de volta a versão mesclada no local
            localStorage.setItem(LOCAL_DAYS_KEY, JSON.stringify(merged));
            return merged;
        }
    } catch (err) {
        console.error('Erro ao sincronizar do supabase (possível offline)', err);
    }

    return localList;
}

export async function addCompletedDay(userId: string, dayId: number) {
    // 1. Otimista: Salva Local
    const localListStr = localStorage.getItem(LOCAL_DAYS_KEY);
    const localList: number[] = localListStr ? JSON.parse(localListStr) : [];

    if (!localList.includes(dayId)) {
        const newList = [...localList, dayId].sort((a, b) => a - b);
        localStorage.setItem(LOCAL_DAYS_KEY, JSON.stringify(newList));

        // 2. Tenta salvar na nuvem se autenticado
        if (userId) {
            // Upsert: atualiza a linha inteira do usuário
            supabase.from('reading_progress').upsert({
                user_id: userId,
                completed_days: newList,
                last_synced: new Date().toISOString()
            }, { onConflict: 'user_id' }).then(({ error }) => {
                if (error) console.error("Falha ao sync diário", error);
            });
        }
    }
}

export async function removeCompletedDay(userId: string, dayId: number) {
    const localListStr = localStorage.getItem(LOCAL_DAYS_KEY);
    const localList: number[] = localListStr ? JSON.parse(localListStr) : [];

    if (localList.includes(dayId)) {
        const newList = localList.filter(id => id !== dayId).sort((a, b) => a - b);
        localStorage.setItem(LOCAL_DAYS_KEY, JSON.stringify(newList));

        if (userId) {
            supabase.from('reading_progress').upsert({
                user_id: userId,
                completed_days: newList,
                last_synced: new Date().toISOString()
            }, { onConflict: 'user_id' }).then();
        }
    }
}
