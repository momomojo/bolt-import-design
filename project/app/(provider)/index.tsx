import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Calendar, Clock, MapPin, DollarSign, Users, TrendingUp } from 'lucide-react-native';

export default function ProviderDashboard() {
  const upcomingJobs = [
    {
      id: 1,
      client: 'Sarah Johnson',
      service: 'Lawn Mowing',
      time: '9:00 AM',
      address: '742 Evergreen Terrace',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120',
    },
    {
      id: 2,
      client: 'Michael Brown',
      service: 'Landscaping',
      time: '11:30 AM',
      address: '123 Oak Street',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=120',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Welcome back, Mike!</Text>
          <Text style={styles.subtitle}>Here's your daily overview</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(2, 132, 199, 0.1)' }]}>
              <DollarSign size={24} color="#0284c7" />
            </View>
            <Text style={styles.statValue}>$345.00</Text>
            <Text style={styles.statLabel}>Today's Earnings</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(22, 163, 74, 0.1)' }]}>
              <Users size={24} color="#16a34a" />
            </View>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Today's Jobs</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(79, 70, 229, 0.1)' }]}>
              <TrendingUp size={24} color="#4f46e5" />
            </View>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
              <Clock size={24} color="#f59e0b" />
            </View>
            <Text style={styles.statValue}>5.2</Text>
            <Text style={styles.statLabel}>Avg. Hours/Job</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <Pressable>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>

        <View style={styles.timeline}>
          {upcomingJobs.map((job, index) => (
            <Pressable key={job.id} style={styles.jobCard}>
              <View style={styles.timeColumn}>
                <Text style={styles.jobTime}>{job.time}</Text>
                <View style={styles.timelineBar}>
                  <View style={styles.timelineDot} />
                  {index < upcomingJobs.length - 1 && <View style={styles.timelineLine} />}
                </View>
              </View>

              <View style={styles.jobContent}>
                <View style={styles.jobHeader}>
                  <View style={styles.clientInfo}>
                    <Image source={{ uri: job.avatar }} style={styles.clientAvatar} />
                    <View>
                      <Text style={styles.clientName}>{job.client}</Text>
                      <Text style={styles.serviceType}>{job.service}</Text>
                    </View>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Upcoming</Text>
                  </View>
                </View>

                <View style={styles.jobDetails}>
                  <View style={styles.detailRow}>
                    <MapPin size={16} color="#64748b" />
                    <Text style={styles.detailText}>{job.address}</Text>
                  </View>
                </View>

                <View style={styles.jobActions}>
                  <Pressable style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Start Navigation</Text>
                  </Pressable>
                  <Pressable style={[styles.actionButton, styles.actionButtonSecondary]}>
                    <Text style={styles.actionButtonTextSecondary}>View Details</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weekly Summary</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Jobs</Text>
              <Text style={styles.summaryValue}>23</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Revenue</Text>
              <Text style={styles.summaryValue}>$1,890</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Hours</Text>
              <Text style={styles.summaryValue}>45.5</Text>
            </View>
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
  statsContainer: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionHeader: {
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
    color: '#0284c7',
    fontWeight: '500',
  },
  timeline: {
    gap: 24,
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  timeColumn: {
    padding: 16,
    alignItems: 'center',
    width: 80,
  },
  jobTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0284c7',
    marginBottom: 8,
  },
  timelineBar: {
    flex: 1,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0284c7',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e2e8f0',
    marginTop: 8,
  },
  jobContent: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e2e8f0',
    padding: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  serviceType: {
    fontSize: 14,
    color: '#64748b',
  },
  statusBadge: {
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#0284c7',
    fontWeight: '500',
  },
  jobDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
  },
  jobActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#0284c7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: '#f1f5f9',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  actionButtonTextSecondary: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
  },
});