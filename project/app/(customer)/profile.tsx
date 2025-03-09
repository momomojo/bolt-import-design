import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { User, MapPin, CreditCard, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function Profile() {
  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Personal Information', screen: 'personal-info' },
        { icon: MapPin, label: 'Addresses', screen: 'addresses' },
        { icon: CreditCard, label: 'Payment Methods', screen: 'payment' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', screen: 'notifications' },
        { icon: Shield, label: 'Privacy & Security', screen: 'privacy' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', screen: 'help' },
        { icon: LogOut, label: 'Sign Out', screen: 'logout' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=180',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>John Smith</Text>
            <Text style={styles.email}>john.smith@example.com</Text>
          </View>
        </View>
        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Services</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.9</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>6</Text>
          <Text style={styles.statLabel}>Months</Text>
        </View>
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
                    <item.icon size={20} color="#64748b" />
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#64748b',
  },
  editButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16a34a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e2e8f0',
  },
  content: {
    padding: 24,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
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
  },
});