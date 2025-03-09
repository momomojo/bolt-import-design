import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native';
import { Search, Star, MapPin, Calendar, Phone, Mail, ChevronRight } from 'lucide-react-native';

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120',
      rating: 4.9,
      location: 'Downtown Area',
      lastService: '2 weeks ago',
      phone: '(555) 123-4567',
      email: 'sarah.j@example.com',
      totalServices: 12,
      totalSpent: 960,
    },
    {
      id: 2,
      name: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=120',
      rating: 4.7,
      location: 'Westside',
      lastService: '1 month ago',
      phone: '(555) 987-6543',
      email: 'michael.b@example.com',
      totalServices: 8,
      totalSpent: 720,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120',
      rating: 5.0,
      location: 'Northside',
      lastService: '1 week ago',
      phone: '(555) 456-7890',
      email: 'emma.w@example.com',
      totalServices: 15,
      totalSpent: 1200,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
        <Text style={styles.subtitle}>Manage your customer relationships</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search customers..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.customersList}>
        {customers.map((customer) => (
          <Pressable key={customer.id} style={styles.customerCard}>
            <View style={styles.customerHeader}>
              <View style={styles.customerInfo}>
                <Image
                  source={{ uri: customer.avatar }}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.customerName}>{customer.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={16} color="#f59e0b" fill="#f59e0b" />
                    <Text style={styles.ratingText}>{customer.rating}</Text>
                  </View>
                </View>
              </View>
              <ChevronRight size={20} color="#64748b" />
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#64748b" />
                <Text style={styles.detailText}>{customer.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Calendar size={16} color="#64748b" />
                <Text style={styles.detailText}>Last service: {customer.lastService}</Text>
              </View>
              <View style={styles.detailRow}>
                <Phone size={16} color="#64748b" />
                <Text style={styles.detailText}>{customer.phone}</Text>
              </View>
              <View style={styles.detailRow}>
                <Mail size={16} color="#64748b" />
                <Text style={styles.detailText}>{customer.email}</Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{customer.totalServices}</Text>
                <Text style={styles.statLabel}>Services</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>${customer.totalSpent}</Text>
                <Text style={styles.statLabel}>Total Spent</Text>
              </View>
            </View>

            <View style={styles.actionsContainer}>
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Schedule Service</Text>
              </Pressable>
              <Pressable style={[styles.actionButton, styles.secondaryButton]}>
                <Text style={styles.secondaryButtonText}>View History</Text>
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
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
  },
  customersList: {
    padding: 16,
    gap: 16,
  },
  customerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '500',
  },
  detailsContainer: {
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
  statsContainer: {
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
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0284c7',
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
  },
  actionsContainer: {
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