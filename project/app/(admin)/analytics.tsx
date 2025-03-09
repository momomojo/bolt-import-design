import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { DollarSign, Users, Calendar, TrendingUp, ChevronDown } from 'lucide-react-native';

export default function Analytics() {
  const metrics = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$48,256',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: '#16a34a',
    },
    {
      id: 2,
      title: 'Active Customers',
      value: '1,284',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: '#0284c7',
    },
    {
      id: 3,
      title: 'Completed Jobs',
      value: '856',
      change: '+15.3%',
      trend: 'up',
      icon: Calendar,
      color: '#7c3aed',
    },
    {
      id: 4,
      title: 'Provider Growth',
      value: '24',
      change: '+4',
      trend: 'up',
      icon: TrendingUp,
      color: '#ea580c',
    },
  ];

  const topProviders = [
    {
      id: 1,
      name: 'Johnson\'s Lawn Care',
      revenue: '$5,840',
      jobs: 45,
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Green Thumb Services',
      revenue: '$4,920',
      jobs: 38,
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Miller Landscaping',
      revenue: '$4,256',
      jobs: 32,
      rating: 4.7,
    },
  ];

  const serviceMetrics = [
    {
      id: 1,
      service: 'Lawn Mowing',
      bookings: 425,
      revenue: '$21,250',
      growth: '+15%',
    },
    {
      id: 2,
      service: 'Garden Maintenance',
      bookings: 286,
      revenue: '$17,160',
      growth: '+12%',
    },
    {
      id: 3,
      service: 'Tree Trimming',
      bookings: 145,
      revenue: '$9,846',
      growth: '+8%',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Business metrics and insights</Text>
      </View>

      <View style={styles.filterBar}>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Last 30 Days</Text>
          <ChevronDown size={20} color="#64748b" />
        </Pressable>
      </View>

      <View style={styles.metricsGrid}>
        {metrics.map((metric) => (
          <View key={metric.id} style={styles.metricCard}>
            <View style={[styles.iconContainer, { backgroundColor: `${metric.color}10` }]}>
              <metric.icon size={24} color={metric.color} />
            </View>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricTitle}>{metric.title}</Text>
            <Text style={[styles.metricChange, { color: metric.color }]}>
              {metric.change}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performing Providers</Text>
        <View style={styles.providersList}>
          {topProviders.map((provider) => (
            <View key={provider.id} style={styles.providerCard}>
              <View style={styles.providerHeader}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerRevenue}>{provider.revenue}</Text>
              </View>
              <View style={styles.providerStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{provider.jobs}</Text>
                  <Text style={styles.statLabel}>Jobs</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{provider.rating}</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Performance</Text>
        <View style={styles.servicesList}>
          {serviceMetrics.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceName}>{service.service}</Text>
                <Text style={styles.serviceGrowth}>{service.growth}</Text>
              </View>
              <View style={styles.serviceStats}>
                <View style={styles.serviceStatItem}>
                  <Text style={styles.serviceStatValue}>{service.bookings}</Text>
                  <Text style={styles.serviceStatLabel}>Bookings</Text>
                </View>
                <View style={styles.serviceStatItem}>
                  <Text style={styles.serviceStatValue}>{service.revenue}</Text>
                  <Text style={styles.serviceStatLabel}>Revenue</Text>
                </View>
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
  filterBar: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  metricChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 24,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  providersList: {
    gap: 16,
  },
  providerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  providerRevenue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
  },
  providerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex : 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7c3aed',
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
    marginHorizontal: 16,
  },
  servicesList: {
    gap: 16,
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
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  serviceGrowth: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
  },
  serviceStats: {
    flexDirection: 'row',
    gap: 24,
  },
  serviceStatItem: {
    flex: 1,
  },
  serviceStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7c3aed',
    marginBottom: 4,
  },
  serviceStatLabel: {
    fontSize: 14,
    color: '#64748b',
  },
});