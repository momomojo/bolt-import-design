import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react-native';

export default function CustomerDashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Welcome back, John!</Text>
          <Text style={styles.subtitle}>Your lawn care dashboard</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=180' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.upcomingService}>
        <View style={styles.serviceHeader}>
          <Text style={styles.sectionTitle}>Next Service</Text>
          <Pressable>
            <Text style={styles.viewAllText}>View Schedule</Text>
          </Pressable>
        </View>

        <View style={styles.serviceCard}>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceType}>Lawn Mowing</Text>
            <View style={styles.serviceDetails}>
              <View style={styles.detailItem}>
                <Calendar size={16} color="#64748b" />
                <Text style={styles.detailText}>Tomorrow, May 15</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={16} color="#64748b" />
                <Text style={styles.detailText}>9:00 AM - 10:30 AM</Text>
              </View>
              <View style={styles.detailItem}>
                <MapPin size={16} color="#64748b" />
                <Text style={styles.detailText}>123 Main Street</Text>
              </View>
            </View>
          </View>
          <View style={styles.providerSection}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' }}
              style={styles.providerAvatar}
            />
            <Text style={styles.providerName}>Mike Johnson</Text>
            <Text style={styles.providerRole}>Your Service Provider</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <Pressable style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(22, 163, 74, 0.1)' }]}>
              <Calendar size={24} color="#16a34a" />
            </View>
            <Text style={styles.actionTitle}>Book Service</Text>
            <Text style={styles.actionDescription}>Schedule your next lawn care service</Text>
            <ArrowRight size={20} color="#16a34a" style={styles.actionArrow} />
          </Pressable>

          <Pressable style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(2, 132, 199, 0.1)' }]}>
              <Clock size={24} color="#0284c7" />
            </View>
            <Text style={styles.actionTitle}>Reschedule</Text>
            <Text style={styles.actionDescription}>Change your service date or time</Text>
            <ArrowRight size={20} color="#0284c7" style={styles.actionArrow} />
          </Pressable>
        </View>
      </View>

      <View style={styles.recentServices}>
        <Text style={styles.sectionTitle}>Service History</Text>
        <View style={styles.historyList}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.historyItem}>
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>Lawn Mowing</Text>
                <Text style={styles.historyDate}>May {item}, 2024</Text>
              </View>
              <View style={styles.historyStatus}>
                <Text style={styles.statusText}>Completed</Text>
              </View>
            </View>
          ))}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  welcomeSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 16,
  },
  upcomingService: {
    padding: 24,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  viewAllText: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '500',
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceInfo: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 16,
    marginBottom: 16,
  },
  serviceType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  serviceDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
  },
  providerSection: {
    alignItems: 'center',
  },
  providerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  providerRole: {
    fontSize: 14,
    color: '#64748b',
  },
  quickActions: {
    padding: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  actionArrow: {
    alignSelf: 'flex-end',
  },
  recentServices: {
    padding: 24,
    paddingTop: 0,
  },
  historyList: {
    marginTop: 16,
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    color: '#64748b',
  },
  historyStatus: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '500',
  },
});