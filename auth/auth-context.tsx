import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

interface AuthContextValue {
  isLoaded: boolean;
  isSignedIn: boolean;
  getToken: () => Promise<string | null>;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync(ACCESS_TOKEN_KEY).then((token) => {
      setAccessToken(token);
      setIsLoaded(true);
    });
  }, []);

  const getToken = useCallback(async () => {
    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  }, []);

  const setTokens = useCallback(
    async (access: string, refresh: string) => {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh);
      setAccessToken(access);
    },
    [],
  );

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    setAccessToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoaded,
      isSignedIn: accessToken !== null,
      getToken,
      setTokens,
      signOut,
    }),
    [isLoaded, accessToken, getToken, setTokens, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
