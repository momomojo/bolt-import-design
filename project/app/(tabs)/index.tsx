import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back!</Text>
        <Text style={styles.subtitle}>Here's your daily overview</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Today's Jobs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$1,248</Text>
          <Text style={styles.statLabel}>Today's Revenue</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Jobs</Text>
        <View style={styles.jobCard}>
          <Text style={styles.jobTime}>9:00 AM</Text>
          <View style={styles.jobDetails}>
            <Text style={styles.jobClient}>John Smith</Text>
            <Text style={styles.jobAddress}>123 Main St, City</Text>
          </View>
        </View>
        <View style={styles.jobCard}>
          <Text style={styles.jobTime}>11:30 AM</Text>
          <View style={styles.jobDetails}>
            <Text style={styles.jobClient}>Sarah Johnson</Text>
            <Text style={styles.jobAddress}>456 Oak Ave, City</Text>
          </View>
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
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16a34a',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  jobTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    width: 80,
  },
  jobDetails: {
    flex: 1,
  },
  jobClient: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  jobAddress: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
});