import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Clock, Calendar, MapPin } from 'lucide-react-native';

export default function Services() {
  const services = [
    {
      id: 1,
      type: 'Lawn Mowing',
      date: 'May 15, 2024',
      time: '9:00 AM - 10:30 AM',
      address: '123 Main Street',
      status: 'upcoming',
      price: '$45.00',
    },
    {
      id: 2,
      type: 'Landscaping',
      date: 'May 10, 2024',
      time: '2:00 PM - 4:00 PM',
      address: '123 Main Street',
      status: 'completed',
      price: '$120.00',
    },
    {
      id: 3,
      type: 'Irrigation Check',
      date: 'May 5, 2024',
      time: '11:00 AM - 12:00 PM',
      address: '123 Main Street',
      status: 'completed',
      price: '$85.00',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'upcoming':
        return {
          container: { backgroundColor: 'rgba(2, 132, 199, 0.1)' },
          text: { color: '#0284c7' },
        };
      case 'completed':
        return {
          container: { backgroundColor: 'rgba(22, 163, 74, 0.1)' },
          text: { color: '#16a34a' },
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
        <Text style={styles.title}>My Services</Text>
        <Text style={styles.subtitle}>View and manage your services</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.filterContainer}>
          <Pressable style={[styles.filterButton, styles.filterButtonActive]}>
            <Text style={styles.filterTextActive}>All</Text>
          </Pressable>
          <Pressable style={styles.filterButton}>
            <Text style={styles.filterText}>Upcoming</Text>
          </Pressable>
          <Pressable style={styles.filterButton}>
            <Text style={styles.filterText}>Completed</Text>
          </Pressable>
        </View>

        <View style={styles.servicesList}>
          {services.map((service) => (
            <Pressable key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceType}>{service.type}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    getStatusStyle(service.status).container,
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      getStatusStyle(service.status).text,
                    ]}>
                    {service.status.charAt(0).toUpperCase() +
                      service.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.serviceDetails}>
                <View style={styles.detailRow}>
                  <Calendar size={16} color="#64748b" />
                  <Text style={styles.detailText}>{service.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Clock size={16} color="#64748b" />
                  <Text style={styles.detailText}>{service.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#64748b" />
                  <Text style={styles.detailText}>{service.address}</Text>
                </View>
              </View>

              <View style={styles.serviceFooter}>
                <Text style={styles.priceText}>{service.price}</Text>
                <Pressable style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </Pressable>
              </View>
            </Pressable>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  content: {
    padding: 24,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  filterButtonActive: {
    backgroundColor: '#16a34a',
  },
  filterText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  filterTextActive: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
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
  serviceType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  serviceDetails: {
    gap: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
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
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#16a34a',
  },
  detailsButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
});