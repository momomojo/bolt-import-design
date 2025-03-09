import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { MapPin, Users, Calendar, TrendingUp, ChevronRight } from 'lucide-react-native';

export default function ServiceAreas() {
  const areas = [
    {
      id: 1,
      name: 'Downtown',
      status: 'active',
      providers: 8,
      customers: 124,
      monthlyJobs: 89,
      growth: '+12%',
    },
    {
      id: 2,
      name: 'Westside',
      status: 'active',
      providers: 6,
      customers: 98,
      monthlyJobs: 67,
      growth: '+8%',
    },
    {
      id: 3,
      name: 'Northside',
      status: 'expanding',
      providers: 4,
      customers: 45,
      monthlyJobs: 34,
      growth: '+24%',
    },
    {
      id: 4,
      name: 'Eastside',
      status: 'pending',
      providers: 0,
      customers: 0,
      monthlyJobs: 0,
      growth: '0%',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return {
          container: { backgroundColor: 'rgba(22, 163, 74, 0.1)' },
          text: { color: '#16a34a' },
        };
      case 'expanding':
        return {
          container: { backgroundColor: 'rgba(2, 132, 199, 0.1)' },
          text: { color: '#0284c7' },
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
        <Text style={styles.title}>Service Areas</Text>
        <Text style={styles.subtitle}>Manage coverage zones and performance</Text>
      </View>

      <View style={styles.actionBar}>
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Area</Text>
        </Pressable>
      </View>

      <View style={styles.areasList}>
        {areas.map((area) => (
          <Pressable key={area.id} style={styles.areaCard}>
            <View style={styles.areaHeader}>
              <View style={styles.areaInfo}>
                <MapPin size={20} color="#7c3aed" />
                <Text style={styles.areaName}>{area.name}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  getStatusStyle(area.status).container,
                ]}>
                <Text
                  style={[styles.statusText, getStatusStyle(area.status).text]}>
                  {area.status.charAt(0).toUpperCase() + area.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Users size={20} color="#64748b" />
                <View>
                  <Text style={styles.statValue}>{area.providers}</Text>
                  <Text style={styles.statLabel}>Providers</Text>
                </View>
              </View>

              <View style={styles.statItem}>
                <MapPin size={20} color="#64748b" />
                <View>
                  <Text style={styles.statValue}>{area.customers}</Text>
                  <Text style={styles.statLabel}>Customers</Text>
                </View>
              </View>

              <View style={styles.statItem}>
                <Calendar size={20} color="#64748b" />
                <View>
                  <Text style={styles.statValue}>{area.monthlyJobs}</Text>
                  <Text style={styles.statLabel}>Monthly Jobs</Text>
                </View>
              </View>

              <View style={styles.statItem}>
                <TrendingUp size={20} color="#64748b" />
                <View>
                  <Text style={styles.statValue}>{area.growth}</Text>
                  <Text style={styles.statLabel}>Growth</Text>
                </View>
              </View>
            </View>

            <View style={styles.areaActions}>
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionButtonText}>View Details</Text>
                <ChevronRight size={20} color="#64748b" />
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
  actionBar: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  areasList: {
    padding: 16,
    gap: 16,
  },
  areaCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  areaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  areaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  areaName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
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
  areaActions: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
    alignItems: 'flex-end',
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
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
});