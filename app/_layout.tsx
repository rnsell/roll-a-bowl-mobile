import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { GlobalErrorBoundary } from '@/components/ErrorBoundary';
import { AuthProvider, useAuth } from '@/auth';
import { GraphQLProvider } from '@/graphql';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout(): React.JSX.Element | null {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav(): React.JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GlobalErrorBoundary>
        <AuthProvider>
          <GraphQLProvider>
            <AuthGate />
          </GraphQLProvider>
        </AuthProvider>
      </GlobalErrorBoundary>
    </ThemeProvider>
  );
}

function AuthGate(): React.JSX.Element | null {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inSignIn = (segments[0] as string) === 'sign-in';

    if (isSignedIn && inSignIn) {
      router.replace('/(tabs)');
    } else if (!isSignedIn && !inSignIn) {
      router.replace('/sign-in');
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
