import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { Search, Users, Star, MapPin, Calendar, ChevronRight } from 'lucide-react-native';

export default function Providers() {
  const [searchQuery, setSearchQuery] = useState('');

  const providers = [
    {
      id: 1,
      name: 'Mike Johnson',
      company: 'Johnson\'s Lawn Care',
      status: 'active',
      rating: 4.9,
      customers: 156,
      monthlyJobs: 45,
      serviceArea: 'Downtown',
      revenue: '$5,840',
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      company: 'Green Thumb Services',
      status: 'pending',
      rating: 0,
      customers: 0,
      monthlyJobs: 0,
      serviceArea: 'Westside',
      revenue: '$0',
    },
    {
      id: 3,
      name: 'David Miller',
      company: 'Miller Landscaping',
      status: 'active',
      rating: 4.7,
      customers: 89,
      monthlyJobs: 32,
      serviceArea: 'Northside',
      revenue: '$4,256',
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
        <Text style={styles.title}>Service Providers</Text>
        <Text style={styles.subtitle}>Manage and monitor service providers</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search providers..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Provider</Text>
        </Pressable>
      </View>

      <View style={styles.providersList}>
        {providers.map((provider) => (
          <Pressable key={provider.id} style={styles.providerCard}>
            <View style={styles.providerHeader}>
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
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Star size={20} color="#64748b" />
                  <View>
                    <Text style={styles.statValue}>{provider.rating}</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                  </View>
                </View>

                <View style={styles.statItem}>
                  <Users size={20} color="#64748b" />
                  <View>
                    <Text style={styles.statValue}>{provider.customers}</Text>
                    <Text style={styles.statLabel}>Customers</Text>
                  </View>
                </View>

                <View style={styles.statItem}>
                  <Calendar size={20} color="#64748b" />
                  <View>
                    <Text style={styles.statValue}>{provider.monthlyJobs}</Text>
                    <Text style={styles.statLabel}>Monthly Jobs</Text>
                  </View>
                </View>

                <View style={styles.statItem}>
                  <MapPin size={20} color="#64748b" />
                  <View>
                    <Text style={styles.statValue}>{provider.serviceArea}</Text>
                    <Text style={styles.statLabel}>Service Area</Text>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.providerFooter}>
              {provider.status === 'active' && (
                <Text style={styles.revenue}>Revenue: {provider.revenue}</Text>
              )}
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
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#0f172a',
  },
  addButton: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  providersList: {
    padding: 16,
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
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  providerName: {
    fontSize: 18,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  providerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  revenue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#16a34a',
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
});