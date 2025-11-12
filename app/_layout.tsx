import { ThemeProvider } from '@/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Circular-Std-Medium': require('../assets/fonts/CircularStd-Medium.otf'),
    'Circular-Std-Bold': require('../assets/fonts/circular-std-bold.ttf'),
    'CircularStd-Regular': require('../assets/fonts/CircularStd-Regular.otf'),
    'CircularStd-Light': require('../assets/fonts/CircularStd-Light.otf'),
    'Syne-Medium': require('../assets/fonts/Syne-Medium.ttf'),
    'Syne-Bold': require('../assets/fonts/Syne-Bold.ttf'),
    'Syne-Extra-Bold': require('../assets/fonts/Syne-ExtraBold.ttf'),
    'Syne-Regular': require('../assets/fonts/Syne-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}