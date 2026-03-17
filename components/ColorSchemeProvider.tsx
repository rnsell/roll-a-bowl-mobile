import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type ColorSchemePreference = 'light' | 'dark' | 'system';
type ResolvedColorScheme = 'light' | 'dark';

interface ColorSchemeContextValue {
  colorScheme: ResolvedColorScheme;
  preference: ColorSchemePreference;
  setPreference: (preference: ColorSchemePreference) => void;
}

const STORAGE_KEY = 'color-scheme-preference';

const ColorSchemeContext = createContext<ColorSchemeContextValue>({
  colorScheme: 'light',
  preference: 'system',
  setPreference: () => {},
});

export function ColorSchemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const systemScheme = useSystemColorScheme();
  const [preference, setPreferenceState] = useState<ColorSchemePreference>('system');

  useEffect(() => {
    SecureStore.getItemAsync(STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setPreferenceState(stored);
      }
    });
  }, []);

  const setPreference = useCallback((next: ColorSchemePreference) => {
    setPreferenceState(next);
    SecureStore.setItemAsync(STORAGE_KEY, next);
  }, []);

  const colorScheme: ResolvedColorScheme =
    preference === 'system' ? (systemScheme ?? 'light') : preference;

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, preference, setPreference }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorScheme(): ResolvedColorScheme {
  return useContext(ColorSchemeContext).colorScheme;
}

export function useColorSchemePreference() {
  const { preference, setPreference } = useContext(ColorSchemeContext);
  return { preference, setPreference };
}
