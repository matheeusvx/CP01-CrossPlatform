import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111111',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Challenge Hub FIAP' }}
      />
      <Stack.Screen
        name="avisos"
        options={{ title: 'Portal de Avisos' }}
      />
      <Stack.Screen
        name="empresa"
        options={{ title: 'Contato com a Empresa' }}
      />
      <Stack.Screen
        name="comunidade"
        options={{ title: 'Comunidade' }}
      />
      <Stack.Screen
        name="calendario"
        options={{ title: 'Calendário' }}
      />
    </Stack>
  );
}