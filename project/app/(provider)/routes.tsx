import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { MapPin, Navigation, Clock, Calendar, ChevronRight } from 'lucide-react-native';

export default function Routes() {
  const routes = [
    {
      id: 1,
      date: 'Today, May 15',
      stops: [
        {
          id: 1,
          time: '9:00 AM',
          client: 'Sarah Johnson',
          address: '742 Evergreen Terrace',
          duration: '1.5 hours',
          distance: '2.3 miles',
          status: 'next',
        },
        {
          id: 2,
          time: '11:30 AM',
          client: 'Michael Brown',
          address: '123 Oak Street',
          duration: '2 hours',
          distance: '1.8 miles',
          status: 'upcoming',
        },
        {
          id: 3,
          time: '2:30 PM',
          client: 'Emma Wilson',
          address: '456 Pine Avenue',
          duration: '1 hour',
          distance: '3.1 miles',
          status: 'upcoming',
        },
      ],
    },
    {
      id: 2,
      date: 'Tomorrow, May 16',
      stops: [
        {
          id: 4,
          time: '10:00 AM',
          client: 'James Miller',
          address: '789 Maple Drive',
          duration: '2 hours',
          distance: '4.2 miles',
          status: 'upcoming',
        },
        {
          id: 5,
          time: '1:30 PM',
          client: 'Sophie Taylor',
          address: '321 Cedar Lane',
          duration: '1.5 hours',
          distance: '2.7 miles',
          status: 'upcoming',
        },
      ],
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'next':
        return {
          container: { backgroundColor: 'rgba(2, 132, 199, 0.1)' },
          text: { color: '#0284c7' },
        };
      case 'upcoming':
        return {
          container: { backgroundColor: '#f1f5f9' },
          text: { color: '#64748b' },
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
        <Text style={styles.title}>Routes</Text>
        <Text style={styles.subtitle}>Optimize your service routes</Text>
      </View>

      <View style={styles.content}>
        {routes.map((route) => (
          <View key={route.id} style={styles.routeSection}>
            <View style={styles.dateHeader}>
              <Calendar size={20} color="#0284c7" />
              <Text style={styles.dateText}>{route.date}</Text>
            </View>

            <View style={styles.timeline}>
              {route.stops.map((stop, index) => (
                <View key={stop.id} style={styles.stopContainer}>
                  <View style={styles.timeColumn}>
                    <Text style={styles.timeText}>{stop.time}</Text>
                    <View style={styles.timelineBar}>
                      <View style={styles.timelineDot} />
                      {index < route.stops.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                    </View>
                  </View>

                  <View style={styles.stopCard}>
                    <View style={styles.stopHeader}>
                      <Text style={styles.clientName}>{stop.client}</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          getStatusStyle(stop.status).container,
                        ]}>
                        <Text
                          style={[
                            styles.statusText,
                            getStatusStyle(stop.status).text,
                          ]}>
                          {stop.status === 'next' ? 'Next Stop' : 'Upcoming'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.stopDetails}>
                      <View style={styles.detailRow}>
                        <MapPin size={16} color="#64748b" />
                        <Text style={styles.detailText}>{stop.address}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Clock size={16} color="#64748b" />
                        <Text style={styles.detailText}>Duration: {stop.duration}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Navigation size={16} color="#64748b" />
                        <Text style={styles.detailText}>Distance: {stop.distance}</Text>
                      </View>
                    </View>

                    <View style={styles.stopActions}>
                      <Pressable
                        style={[
                          styles.actionButton,
                          stop.status === 'next' && styles.primaryButton,
                        ]}>
                        <Text
                          style={[
                            styles.actionButtonText,
                            stop.status === 'next' && styles.primaryButtonText,
                          ]}>
                          {stop.status === 'next'
                            ? 'Start Navigation'
                            : 'View Details'}
                        </Text>
                        <ChevronRight
                          size={20}
                          color={stop.status === 'next' ? '#ffffff' : '#0f172a'}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
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
  content: {
    padding: 16,
  },
  routeSection: {
    marginBottom: 32,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0284c7',
  },
  timeline: {
    gap: 24,
  },
  stopContainer: {
    flexDirection: 'row',
  },
  timeColumn: {
    width: 80,
    alignItems: 'center',
  },
  timeText: {
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
  stopCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginLeft: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientName: {
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
  stopDetails: {
    gap: 8,
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
  stopActions: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#0284c7',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
});