import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const LOCAL_USER_KEY = 'sdsc-local-user';

interface AppUser {
    id: string;
    user_metadata: { name: string };
}

interface AppSession {
    user: AppUser;
}

interface AuthContextType {
    user: AppUser | null;
    session: AppSession | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signOut: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<AppSession | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Tenta sessão do Supabase (login com conta)
        supabase.auth.getSession().then(({ data: { session: supaSession } }) => {
            if (supaSession?.user) {
                setSession({
                    user: {
                        id: supaSession.user.id,
                        user_metadata: { name: supaSession.user.user_metadata?.name ?? 'Leitor' },
                    }
                });
            } else {
                // 2. Fallback: usuário local salvo no localStorage
                const localStr = localStorage.getItem(LOCAL_USER_KEY);
                if (localStr) {
                    try {
                        setSession(JSON.parse(localStr));
                    } catch {
                        localStorage.removeItem(LOCAL_USER_KEY);
                    }
                }
            }
            setLoading(false);
        });

        // Escuta mudanças de sessão Supabase (login/logout remoto)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, supaSession) => {
            if (supaSession?.user) {
                setSession({
                    user: {
                        id: supaSession.user.id,
                        user_metadata: { name: supaSession.user.user_metadata?.name ?? 'Leitor' },
                    }
                });
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem(LOCAL_USER_KEY);
        localStorage.removeItem('sdsc-completed-days');
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ user: session?.user ?? null, session, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
