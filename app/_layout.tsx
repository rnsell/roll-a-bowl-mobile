import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider as ReduxProvider } from 'react-redux';

import { Newsreader_700Bold } from '@expo-google-fonts/newsreader';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ColorSchemeProvider } from '@/components/ColorSchemeProvider';
import { useColorScheme } from '@/components/useColorScheme';
import { colors as themeColors } from '@/design-system';
import { GlobalErrorBoundary } from '@/components/ErrorBoundary';
import { BootstrapGate } from '@/components/BootstrapGate';
import { AuthProvider, useAuth } from '@/auth';
import { GraphQLProvider } from '@/graphql';
import { store } from '@/store';
import { clearUser } from '@/store/user';

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
    Newsreader_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ColorSchemeProvider>
        <RootLayoutNav />
      </ColorSchemeProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav(): React.JSX.Element {
  const colorScheme = useColorScheme();

  const LightNavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: themeColors.light.primary,
      background: themeColors.light.background,
      card: themeColors.light.background,
      text: themeColors.light.text,
      border: themeColors.light.border,
    },
  };

  const DarkNavTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: themeColors.dark.primary,
      background: themeColors.dark.background,
      card: themeColors.dark.background,
      text: themeColors.dark.text,
      border: themeColors.dark.border,
    },
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkNavTheme : LightNavTheme}>
      <GlobalErrorBoundary>
        <ReduxProvider store={store}>
          <AuthProvider>
            <GraphQLProvider>
              <BottomSheetModalProvider>
                <AuthGate />
              </BottomSheetModalProvider>
            </GraphQLProvider>
          </AuthProvider>
        </ReduxProvider>
      </GlobalErrorBoundary>
    </ThemeProvider>
  );
}

function AuthGate(): React.JSX.Element | null {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const onSignIn = segments[0] === 'sign-in';

    if (!isSignedIn && !onSignIn) {
      store.dispatch(clearUser());
      router.replace('/sign-in');
    } else if (isSignedIn && onSignIn) {
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, segments, router]);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
      </Stack>
    );
  }

  return (
    <BootstrapGate>
      <Stack screenOptions={{ headerShown: false, headerBackButtonDisplayMode: 'minimal' }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="family-group" options={{ headerShown: true, title: 'Family Group' }} />
        <Stack.Screen name="recipe/[slug]" options={{ headerShown: true, title: 'Recipe' }} />
        <Stack.Screen name="edit-recipe" options={{ headerShown: true, title: 'Edit Recipe' }} />
        <Stack.Screen name="edit-recipe-instructions" options={{ headerShown: true, title: 'Edit Instructions' }} />
        <Stack.Screen name="create-recipe" options={{ headerShown: true, title: 'New Recipe' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </BootstrapGate>
  );
}
