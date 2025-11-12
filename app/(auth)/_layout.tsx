import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '../../context/ThemeContext';
import { StatusBar } from 'react-native';


SplashScreen.preventAutoHideAsync();

export default function Auth() {

  return (
    <ThemeProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#e30000ff"
        translucent={false} 
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        {/* <Stack.Screen name="(main)" /> */}
      </Stack>
    </ThemeProvider>
  );
}