import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Users, MapPin, DollarSign, TrendingUp, ChevronRight } from 'lucide-react-native';

export default function AdminDashboard() {
  const stats = [
    {
      id: 1,
      title: 'Active Providers',
      value: '24',
      change: '+3',
      icon: Users,
      color: '#7c3aed',
    },
    {
      id: 2,
      title: 'Service Areas',
      value: '12',
      change: '+2',
      icon: MapPin,
      color: '#0891b2',
    },
    {
      id: 3,
      title: 'Monthly Revenue',
      value: '$48.2K',
      change: '+12%',
      icon: DollarSign,
      color: '#16a34a',
    },
    {
      id: 4,
      title: 'Customer Growth',
      value: '156',
      change: '+8%',
      icon: TrendingUp,
      color: '#ea580c',
    },
  ];

  const recentProviders = [
    {
      id: 1,
      name: 'Mike Johnson',
      company: 'Johnson\'s Lawn Care',
      status: 'active',
      rating: 4.9,
      completedJobs: 156,
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      company: 'Green Thumb Services',
      status: 'pending',
      rating: 0,
      completedJobs: 0,
    },
    {
      id: 3,
      name: 'David Miller',
      company: 'Miller Landscaping',
      status: 'active',
      rating: 4.7,
      completedJobs: 89,
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return {
          container: { backgroundColor: 'rgba(22, 163, 74, 0.1)' },
          text: { color: '#16a34a' },
        };
      case 'pending':
        return {
          container: { backgroundColor: 'rgba(245, 158, 11, 0.1)' },
          text: { color: '#f59e0b' },
        };
      default:
        return {
          container: { backgroundColor: '#f1f5f9' },
          text: { color: '#64748b' },
        };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Platform overview and metrics</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View key={stat.id} style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: `${stat.color}10` }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
            <Text style={[styles.statChange, { color: stat.color }]}>
              {stat.change}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Provider Applications</Text>
          <Pressable>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>

        <View style={styles.providersList}>
          {recentProviders.map((provider) => (
            <Pressable key={provider.id} style={styles.providerCard}>
              <View style={styles.providerInfo}>
                <View>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <Text style={styles.companyName}>{provider.company}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    getStatusStyle(provider.status).container,
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      getStatusStyle(provider.status).text,
                    ]}>
                    {provider.status.charAt(0).toUpperCase() +
                      provider.status.slice(1)}
                  </Text>
                </View>
              </View>

              {provider.status === 'active' && (
                <View style={styles.providerStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statItemValue}>{provider.rating}</Text>
                    <Text style={styles.statItemLabel}>Rating</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statItemValue}>
                      {provider.completedJobs}
                    </Text>
                    <Text style={styles.statItemLabel}>Jobs</Text>
                  </View>
                </View>
              )}

              <View style={styles.providerActions}>
                <Pressable
                  style={[
                    styles.actionButton,
                    provider.status === 'pending' && styles.primaryButton,
                  ]}>
                  <Text
                    style={[
                      styles.actionButtonText,
                      provider.status === 'pending' && styles.primaryButtonText,
                    ]}>
                    {provider.status === 'pending' ? 'Review Application' : 'View Details'}
                  </Text>
                  <ChevronRight
                    size={20}
                    color={provider.status === 'pending' ? '#ffffff' : '#64748b'}
                  />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Service Area Coverage</Text>
          <Pressable>
            <Text style={styles.viewAllText}>Manage Areas</Text>
          </Pressable>
        </View>

        <View style={styles.coverageCard}>
          <View style={styles.coverageStats}>
            <View style={styles.coverageItem}>
              <Text style={styles.coverageValue}>12</Text>
              <Text style={styles.coverageLabel}>Active Areas</Text>
            </View>
            <View style={styles.coverageDivider} />
            <View style={styles.coverageItem}>
              <Text style={styles.coverageValue}>85%</Text>
              <Text style={styles.coverageLabel}>Provider Coverage</Text>
            </View>
            <View style={styles.coverageDivider} />
            <View style={styles.coverageItem}>
              <Text style={styles.coverageValue}>3</Text>
              <Text style={styles.coverageLabel}>Expanding</Text>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 16,
  },
  statCard: {
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
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 24,
    paddingTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  viewAllText: {
    fontSize: 14,
    color: '#7c3aed',
    fontWeight: '500',
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
  providerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  providerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statItemValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7c3aed',
    marginBottom: 4,
  },
  statItemLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
  },
  providerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 4,
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  coverageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  coverageStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverageItem: {
    flex: 1,
    alignItems: 'center',
  },
  coverageValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7c3aed',
    marginBottom: 4,
  },
  coverageLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  coverageDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
  },
});