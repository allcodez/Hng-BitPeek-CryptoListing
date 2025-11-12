import { useTheme } from '@/context/ThemeContext';
import { createGlobalStyles } from '@/globalStyle';
import { useUserStore } from '@/store/userStore';
import { Link, Redirect } from 'expo-router';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window')
export default function Index() {
  const { theme } = useTheme();
  const globalStyle = createGlobalStyles(theme);
  const { isAuthenticated, hasCompletedOnboarding } = useUserStore();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  if (hasCompletedOnboarding) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <ImageBackground source={require('../assets/images/bg1.png')} style={styles.backgroundImage}>

      <View style={styles.screenContainer}>
        {/* <Link href={'/OnboardingOne'} asChild>
          <Text style={styles.skip}>Skip</Text>
        </Link> */}
        <View style={styles.containerBoard}>
          {/* <Image
            source={require('../assets/images/img1.png')}
            style={{ width: '100%', height: height / 3, borderRadius: 40, position: 'absolute', top: 180, left: 0 }}
            resizeMode='contain'
            accessibilityLabel="Sample image"
          /> */}
          <View style={styles.boardText}>
            <Text style={globalStyle.pText}>Welcome</Text>
            <Text style={globalStyle.pText}>to Bitpeek.</Text>

          </View>

          <Link href={'/(onboarding)'} asChild>
            <TouchableOpacity style={globalStyle.solidButton}>
              <Text style={globalStyle.solidButtonText}>CONTINUE</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    // height: '100%',
    resizeMode: 'cover',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingBottom: 60,
    // backgroundColor: 'red',
  },
  containerBoard: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'f'
    // backgroundColor: 'red',
  },
  boardText: {
    // paddingHorizontal: 40,
    marginBottom: 40,
    // backgroundColor: 'green',

  }
});