import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/providers/AppProvider';

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="auto" />
      {/* Your app components will go here */}
    </AppProvider>
  );
}
