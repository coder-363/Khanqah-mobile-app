import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // We check if fonts are available; if not, we gracefully fallback
  const [loaded, error] = useFonts({
    // Uncomment these once you place the .ttf files in assets/fonts/
    // 'NotoNastaliqUrdu': require('../../assets/fonts/NotoNastaliqUrdu-Regular.ttf'),
    // 'Amiri': require('../../assets/fonts/Amiri-Regular.ttf'),
    // 'AmiriBold': require('../../assets/fonts/Amiri-Bold.ttf'),
    // 'PlusJakartaSans': require('../../assets/fonts/PlusJakartaSans-Regular.ttf'),
  });

  useEffect(() => {
    // Hide splash screen immediately while using default system fonts
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="bayan" options={{ headerShown: false }} />
      <Stack.Screen name="nazmain" options={{ headerShown: false }} />
      <Stack.Screen name="tafseer" options={{ headerShown: false }} />
      <Stack.Screen name="fiqh" options={{ headerShown: false }} />
      <Stack.Screen name="maamulat" options={{ headerShown: false }} />
      <Stack.Screen name="admin-dashboard-mock" options={{ title: 'Admin Dashboard' }} />
    </Stack>
  );
}
