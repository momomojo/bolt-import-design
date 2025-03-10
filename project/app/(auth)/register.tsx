import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Mail, Lock, User, ArrowRight, Building2 } from 'lucide-react-native';
import authService from '../../src/api/auth';
import { supabase } from '../../src/api/supabase';
import { useAuthDebug } from '../../src/hooks/auth/useAuthDebug';

export default function Register() {
  const authDebug = useAuthDebug();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugMode, setDebugMode] = useState(__DEV__); // Enable in development by default

  // Debug functions
  const runDebugChecks = async () => {
    setLoading(true);
    try {
      console.log('Running debug checks...');

      // Check for existing session
      await authDebug.checkSession();

      // Test database permissions
      await authDebug.testDatabasePermissions();

      console.log('Debug checks completed');
      Alert.alert(
        'Debug Checks',
        'Debug checks completed. Check console logs for details.'
      );
    } catch (error: any) {
      console.error('Debug checks error:', error);
      Alert.alert(
        'Debug Error',
        error.message || 'An error occurred during debugging'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError('');

    // Basic validation
    if (Object.values(formData).some((value) => !value)) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      console.log('Starting registration with:', {
        email: formData.email,
        name: formData.name,
        role: formData.role,
        password: '********', // Don't log actual password
      });

      // Try using our auth service first
      try {
        let response;
        if (formData.role === 'provider') {
          response = await authService.signUpProvider(
            formData.email,
            formData.password,
            formData.name
          );
        } else {
          response = await authService.signUpCustomer(
            formData.email,
            formData.password,
            formData.name
          );
        }

        if (response.error) {
          throw response.error;
        }

        console.log(
          'Registration with auth service successful:',
          response.data ? 'Data exists' : 'No data'
        );
      } catch (authServiceError: any) {
        console.error(
          'Auth service registration failed, trying direct Supabase call:',
          authServiceError.message
        );

        // Fallback to direct Supabase API call
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
              user_role: formData.role || 'customer',
            },
          },
        });

        if (error) {
          throw error;
        }

        console.log(
          'Direct Supabase registration successful:',
          data ? 'Data exists' : 'No data'
        );
      }

      // Show success message
      Alert.alert(
        'Registration Successful',
        'Your account has been created successfully',
        [{ text: 'OK', onPress: () => router.push('/login') }]
      );
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: 'customer',
      label: 'Customer',
      description: 'Book and manage lawn care services',
    },
    {
      id: 'provider',
      label: 'Service Provider',
      description: 'Offer professional lawn care services',
    },
  ];

  // Add debug mode controls at the bottom of the form
  const renderDebugControls = () => {
    if (!__DEV__) return null; // Only show in development

    return (
      <View style={styles.debugContainer}>
        <View style={styles.debugRow}>
          <Text style={styles.debugText}>Debug Mode</Text>
          <Switch
            value={debugMode}
            onValueChange={setDebugMode}
            trackColor={{ false: '#64748b', true: '#15803d' }}
            thumbColor={debugMode ? '#22c55e' : '#e2e8f0'}
          />
        </View>

        {debugMode && (
          <Pressable
            style={styles.debugButton}
            onPress={runDebugChecks}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.debugButtonText}>Run Debug Checks</Text>
            )}
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?q=80&w=1920',
        }}
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
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                textContentType="name"
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
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                textContentType="emailAddress"
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
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                textContentType="newPassword"
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
                onChangeText={(text) =>
                  setFormData({ ...formData, confirmPassword: text })
                }
                textContentType="newPassword"
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
                <Text
                  style={[
                    styles.roleTitle,
                    formData.role === role.id && styles.roleTextSelected,
                  ]}
                >
                  {role.label}
                </Text>
                <Text style={styles.roleDescription}>{role.description}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.registerButton,
              pressed && styles.registerButtonPressed,
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Text style={styles.registerButtonText}>Create Account</Text>
                <ArrowRight size={20} color="#ffffff" />
              </>
            )}
          </Pressable>

          <Link href="/login" asChild>
            <Pressable style={styles.loginLink}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginTextBold}>Sign in</Text>
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {renderDebugControls()}
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
  debugContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  debugRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  debugText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  debugButton: {
    backgroundColor: '#334155',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  debugButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});
