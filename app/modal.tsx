import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});


// 'Circular-Std-Medium': require('./assets/fonts/CircularStd-Medium.otf'),
//   'Circular-Std-Bold': require('./assets/fonts/circular-std-bold.ttf'),
//   'CircularStd-Regular': require('./assets/fonts/CircularStd-Regular.otf'),
//   'CircularStd-Light': require('./assets/fonts/CircularStd-Light.otf'),
//   'Syne-Medium': require('./assets/fonts/Syne-Medium.ttf'),
//   'Syne-Bold': require('./assets/fonts/Syne-Bold.ttf'),
//   'Syne-Extra-Bold': require('./assets/fonts/Syne-ExtraBold.ttf'),
//   'Syne-Regular': require('./assets/fonts/Syne-Regular.ttf'),