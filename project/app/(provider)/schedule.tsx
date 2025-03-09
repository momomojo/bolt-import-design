import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      id: 1,
      time: '9:00 AM',
      client: 'Emma Wilson',
      service: 'Lawn Mowing',
      duration: '1.5 hours',
      address: '456 Pine Street',
      status: 'confirmed',
    },
    {
      id: 2,
      time: '11:30 AM',
      client: 'James Miller',
      service: 'Garden Maintenance',
      duration: '2 hours',
      address: '789 Oak Avenue',
      status: 'pending',
    },
    {
      id: 3,
      time: '2:30 PM',
      client: 'Sophie Taylor',
      service: 'Hedge Trimming',
      duration: '1 hour',
      address: '321 Maple Road',
      status: 'confirmed',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed':
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
        <Text style={styles.title}>Schedule</Text>
        <Text style={styles.subtitle}>Manage your appointments</Text>
      </View>

      <View style={styles.calendarHeader}>
        <Pressable style={styles.navigationButton}>
          <ChevronLeft size={24} color="#64748b" />
        </Pressable>
        <View style={styles.dateDisplay}>
          <CalendarIcon size={24} color="#0284c7" style={styles.calendarIcon} />
          <Text style={styles.currentDate}>May 15, 2024</Text>
        </View>
        <Pressable style={styles.navigationButton}>
          <ChevronRight size={24} color="#64748b" />
        </Pressable>
      </View>

      <View style={styles.timeline}>
        {appointments.map((appointment, index) => (
          <View key={appointment.id} style={styles.appointmentContainer}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>{appointment.time}</Text>
              <View style={styles.timelineBar}>
                <View style={styles.timelineDot} />
                {index < appointments.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>
            </View>

            <View style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View>
                  <Text style={styles.clientName}>{appointment.client}</Text>
                  <Text style={styles.serviceType}>{appointment.service}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    getStatusStyle(appointment.status).container,
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      getStatusStyle(appointment.status).text,
                    ]}>
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.appointmentDetails}>
                <View style={styles.detailRow}>
                  <Clock size={16} color="#64748b" />
                  <Text style={styles.detailText}>{appointment.duration}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#64748b" />
                  <Text style={styles.detailText}>{appointment.address}</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <Pressable style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Start Service</Text>
                </Pressable>
                <Pressable style={[styles.actionButton, styles.secondaryButton]}>
                  <Text style={styles.secondaryButtonText}>Reschedule</Text>
                </Pressable>
              </View>
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
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  navigationButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  calendarIcon: {
    marginRight: 8,
  },
  currentDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  timeline: {
    padding: 24,
    gap: 32,
  },
  appointmentContainer: {
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
  appointmentCard: {
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
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  serviceType: {
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
  appointmentDetails: {
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
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#0284c7',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#f1f5f9',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '500',
  },
});