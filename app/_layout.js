import { Stack } from 'expo-router';
import { AppDataProvider } from '../context/AppDataContext';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AppDataProvider>
    </AuthProvider>
  );
}