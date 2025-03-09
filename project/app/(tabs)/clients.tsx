import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';

export default function Clients() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Clients</Text>
        <Text style={styles.subtitle}>Manage your client list</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search clients..."
          placeholderTextColor="#64748b"
        />
      </View>

      <ScrollView style={styles.clientList}>
        {['John Smith', 'Sarah Johnson', 'Mike Brown', 'Emily Davis'].map(
          (client) => (
            <View key={client} style={styles.clientCard}>
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>{client}</Text>
                <Text style={styles.clientDetails}>Last service: 2 weeks ago</Text>
              </View>
              <View style={styles.clientStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Jobs</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>$960</Text>
                  <Text style={styles.statLabel}>Revenue</Text>
                </View>
              </View>
            </View>
          ),
        )}
      </ScrollView>
    </View>
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
  searchContainer: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#0f172a',
  },
  clientList: {
    paddingHorizontal: 20,
  },
  clientCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clientInfo: {
    marginBottom: 12,
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  clientDetails: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  clientStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
    gap: 24,
  },
  statItem: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#16a34a',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
});