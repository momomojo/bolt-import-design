import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Schedule() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <Text style={styles.subtitle}>Manage your appointments</Text>
      </View>

      <View style={styles.dateList}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
          <View
            key={day}
            style={[styles.dateItem, index === 0 && styles.activeDateItem]}>
            <Text style={[styles.dayText, index === 0 && styles.activeDayText]}>
              {day}
            </Text>
            <Text
              style={[styles.dateText, index === 0 && styles.activeDateText]}>
              {index + 15}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.timeline}>
        {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
          <View key={hour} style={styles.timeSlot}>
            <Text style={styles.timeText}>
              {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
            </Text>
            <View style={styles.slotContent} />
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
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  dateList: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  dateItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeDateItem: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 4,
  },
  activeDayText: {
    color: '#ffffff',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  activeDateText: {
    color: '#ffffff',
  },
  timeline: {
    padding: 20,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  timeText: {
    width: 80,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  slotContent: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});