import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { User, Bell, CreditCard, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';

export default function Settings() {
  const menuItems = [
    { icon: User, label: 'Account', screen: 'account' },
    { icon: Bell, label: 'Notifications', screen: 'notifications' },
    { icon: CreditCard, label: 'Billing', screen: 'billing' },
    { icon: HelpCircle, label: 'Help & Support', screen: 'support' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your preferences</Text>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map(({ icon: Icon, label, screen }) => (
          <Pressable
            key={screen}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.menuItemPressed,
            ]}>
            <View style={styles.menuItemContent}>
              <Icon size={24} color="#64748b" />
              <Text style={styles.menuItemLabel}>{label}</Text>
            </View>
            <ChevronRight size={20} color="#64748b" />
          </Pressable>
        ))}
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  menuSection: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuItemPressed: {
    backgroundColor: '#f1f5f9',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 12,
  },
  versionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#64748b',
  },
});