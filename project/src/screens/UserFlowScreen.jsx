import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserFlowDiagram from '../components/UserFlowDiagram';

/**
 * Screen component that displays the user flow diagram
 * This can be accessed from settings or help sections to provide
 * users and developers with a clear understanding of the application flow
 */
const UserFlowScreen = () => {
  return (
    <View style={styles.container}>
      <UserFlowDiagram />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default UserFlowScreen;
