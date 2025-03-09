import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Mail, Lock, User, ArrowRight, Building2 } from 'lucide-react-native';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');
    
    // Basic validation
    if (Object.values(formData).some(value => !value)) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // TODO: Implement actual registration logic
    console.log('Register:', formData);
  };

  const roles = [
    { id: 'customer', label: 'Customer', description: 'Book and manage lawn care services' },
    { id: 'provider', label: 'Service Provider', description: 'Offer professional lawn care services' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?q=80&w=1920' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>GreenCare</Text>
          <Text style={styles.subtitle}>Create your account</Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <User size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor="#64748b"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Mail size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#64748b"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#64748b"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>I want to...</Text>
          <View style={styles.roleContainer}>
            {roles.map((role) => (
              <Pressable
                key={role.id}
                style={[
                  styles.roleCard,
                  formData.role === role.id && styles.roleCardSelected,
                ]}
                onPress={() => setFormData({ ...formData, role: role.id })}
              >
                <Building2
                  size={24}
                  color={formData.role === role.id ? '#16a34a' : '#64748b'}
                />
                <Text style={[
                  styles.roleTitle,
                  formData.role === role.id && styles.roleTextSelected
                ]}>
                  {role.label}
                </Text>
                <Text style={styles.roleDescription}>{role.description}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.registerButton,
              pressed && styles.registerButtonPressed
            ]}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Create Account</Text>
            <ArrowRight size={20} color="#ffffff" />
          </Pressable>

          <Link href="/login" asChild>
            <Pressable style={styles.loginLink}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginTextBold}>Sign in</Text>
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  form: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  errorContainer: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
  },
  inputGroup: {
    gap: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    height: 56,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  roleContainer: {
    gap: 16,
    marginBottom: 24,
  },
  roleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 8,
  },
  roleCardSelected: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    borderColor: '#16a34a',
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  roleTextSelected: {
    color: '#16a34a',
  },
  roleDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  registerButtonPressed: {
    backgroundColor: '#15803d',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 24,
    padding: 12,
  },
  loginText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  loginTextBold: {
    color: '#ffffff',
    fontWeight: '600',
  },
});