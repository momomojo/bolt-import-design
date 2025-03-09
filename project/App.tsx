import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from './src/providers/NativeBaseProvider';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      {/* Your app components will go here */}
    </NativeBaseProvider>
  );
}
