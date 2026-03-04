import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthSession, AuthUser } from '../../types/auth';
import { getSession, setSession, clearSession } from './sessionStorage';

interface AuthContextValue {
  session: AuthSession | null;
  isAuthenticated: boolean;
  login: (email: string, _password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession | null>(() => getSession());
  const navigate = useNavigate();

  useEffect(() => {
    const restored = getSession();
    if (restored) setSessionState(restored);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    const user: AuthUser = {
      id: 'some-user-id',
      email,
      name: 'Demo User',
    };
    const newSession: AuthSession = { user, token: 'abc' };
    setSessionState(newSession);
    setSession(newSession);
    navigate('/', { replace: true });
  }, [navigate]);

  const logout = useCallback(async () => {
    setSessionState(null);
    clearSession();
    navigate('/auth/login', { replace: true });
  }, [navigate]);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: session !== null,
      login,
      logout,
    }),
    [session, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
