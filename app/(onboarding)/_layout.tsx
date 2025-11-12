import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ThemeProvider } from '../../context/ThemeContext';


SplashScreen.preventAutoHideAsync();

export default function Onboarding() {

  return (
    <ThemeProvider>
      {/* <StatusBar style="inverted" /> */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        {/* <Stack.Screen name="(main)" /> */}
      </Stack>
    </ThemeProvider>
  );
}