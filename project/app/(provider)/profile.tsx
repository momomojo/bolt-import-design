import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { User, MapPin, Star, Clock, DollarSign, Settings, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function Profile() {
  const menuSections = [
    {
      title: 'Business',
      items: [
        { icon: User, label: 'Business Profile', screen: 'business-profile' },
        { icon: MapPin, label: 'Service Areas', screen: 'service-areas' },
        { icon: DollarSign, label: 'Pricing & Services', screen: 'pricing' },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: Settings, label: 'Preferences', screen: 'preferences' },
        { icon: Shield, label: 'Privacy & Security', screen: 'privacy' },
        { icon: HelpCircle, label: 'Help & Support', screen: 'support' },
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
              uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=180',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Mike Johnson</Text>
            <Text style={styles.businessName}>Johnson's Lawn Care</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#f59e0b" fill="#f59e0b" />
              <Text style={styles.rating}>4.9</Text>
              <Text style={styles.ratingCount}>(128 reviews)</Text>
            </View>
          </View>
        </View>
        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </View>

      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Customers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.9</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2 yrs</Text>
          <Text style={styles.statLabel}>Experience</Text>
        </View>
      </View>

      <View style={styles.performanceCard}>
        <Text style={styles.sectionTitle}>Performance</Text>
        <View style={styles.performanceStats}>
          <View style={styles.performanceItem}>
            <Clock size={20} color="#0284c7" />
            <View>
              <Text style={styles.performanceValue}>98%</Text>
              <Text style={styles.performanceLabel}>On-time</Text>
            </View>
          </View>
          <View style={styles.performanceItem}>
            <Star size={20} color="#0284c7" />
            <View>
              <Text style={styles.performanceValue}>96%</Text>
              <Text style={styles.performanceLabel}>Satisfaction</Text>
            </View>
          </View>
          <View style={styles.performanceItem}>
            <DollarSign size={20} color="#0284c7" />
            <View>
              <Text style={styles.performanceValue}>$48K</Text>
              <Text style={styles.performanceLabel}>Revenue</Text>
            </View>
          </View>
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
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  businessName: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
  },
  ratingCount: {
    fontSize: 14,
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
  profileStats: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0284c7',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
  },
  performanceCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0284c7',
  },
  performanceLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionMargin: {
    marginTop: 16,
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