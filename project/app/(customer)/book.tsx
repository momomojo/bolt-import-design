import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Calendar, Clock, MapPin, Scissors, Leaf, Droplets } from 'lucide-react-native';

export default function BookService() {
  const [selectedService, setSelectedService] = useState('');

  const services = [
    {
      id: 'mowing',
      icon: Scissors,
      title: 'Lawn Mowing',
      price: '$45',
      description: 'Professional mowing service for your lawn',
    },
    {
      id: 'landscaping',
      icon: Leaf,
      title: 'Landscaping',
      price: '$120',
      description: 'Complete landscape maintenance and design',
    },
    {
      id: 'irrigation',
      icon: Droplets,
      title: 'Irrigation',
      price: '$85',
      description: 'Sprinkler system maintenance and repair',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book a Service</Text>
        <Text style={styles.subtitle}>Select a service and schedule your appointment</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Service</Text>
        <View style={styles.serviceGrid}>
          {services.map((service) => (
            <Pressable
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService === service.id && styles.serviceCardSelected,
              ]}
              onPress={() => setSelectedService(service.id)}>
              <View
                style={[
                  styles.iconContainer,
                  selectedService === service.id && styles.iconContainerSelected,
                ]}>
                <service.icon
                  size={24}
                  color={selectedService === service.id ? '#16a34a' : '#64748b'}
                />
              </View>
              <Text
                style={[
                  styles.serviceTitle,
                  selectedService === service.id && styles.serviceTitleSelected,
                ]}>
                {service.title}
              </Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Details</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your address"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Date</Text>
            <View style={styles.inputContainer}>
              <Calendar size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Select date"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Time</Text>
            <View style={styles.inputContainer}>
              <Clock size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Select time"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Special Instructions</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add any special instructions or notes"
                placeholderTextColor="#64748b"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </Pressable>
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
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  serviceGrid: {
    gap: 16,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  serviceCardSelected: {
    borderColor: '#16a34a',
    backgroundColor: 'rgba(22, 163, 74, 0.05)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconContainerSelected: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  serviceTitleSelected: {
    color: '#16a34a',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    height: 48,
    padding: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  textAreaContainer: {
    minHeight: 120,
    alignItems: 'flex-start',
  },
  textArea: {
    height: 'auto',
    textAlignVertical: 'top',
  },
  footer: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  bookButton: {
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});