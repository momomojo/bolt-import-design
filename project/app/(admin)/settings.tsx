import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Settings as SettingsIcon, DollarSign, MapPin, Bell, Shield, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';

export default function Settings() {
  const menuSections = [
    {
      title: 'Platform',
      items: [
        { icon: DollarSign, label: 'Pricing & Fees', screen: 'pricing' },
        { icon: MapPin, label: 'Service Areas', screen: 'areas' },
        { icon: SettingsIcon, label: 'Service Types', screen: 'services' },
      ],
    },
    {
      title: 'System',
      items: [
        { icon: Bell, label: 'Notifications', screen: 'notifications' },
        { icon: Shield, label: 'Security', screen: 'security' },
        { icon: HelpCircle, label: 'Support', screen: 'support' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Platform configuration</Text>
      </View>

      <View style={styles.content}>
        {menuSections.map((section, index) => (
          <View
            key={section.title}
            style={[styles.section, index > 0 && styles.sectionMargin]}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuList}>
              {section.items.map((item) => (
                <Pressable
                  key={item.label}
                  style={({ pressed }) => [
                    styles.menuItem,
                    pressed && styles.menuItemPressed,
                  ]}>
                  <View style={styles.menuItemContent}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: '#7c3aed10' },
                      ]}>
                      <item.icon size={20} color="#7c3aed" />
                    </View>
                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                  </View>
                  <ChevronRight size={20} color="#64748b" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.copyright}>© 2024 GreenCare. All rights reserved.</Text>
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
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionMargin: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  menuList: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuItemPressed: {
    backgroundColor: '#f1f5f9',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    color: '#0f172a',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 14,
    color: '#94a3b8',
  },
});