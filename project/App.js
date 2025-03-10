import React from 'react';
import { StatusBar } from 'react-native';
import RoleBasedNavigation from './src/navigation/RoleBasedNavigation';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <RoleBasedNavigation />
    </>
  );
}
