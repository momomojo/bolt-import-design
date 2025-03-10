import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';
import authService from '../../src/api/auth';
import { supabase } from '../../src/api/supabase';
import { useAuthDebug } from '../../src/hooks/auth/useAuthDebug';

export default function Login() {
  const authDebug = useAuthDebug();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting login with email:', email);

      // Try using auth service first
      try {
        const response = await authService.signIn(email, password);

        if (response.error) {
          throw response.error;
        }

        console.log(
          'Login successful with auth service:',
          response.data ? 'Session exists' : 'No session'
        );

        // Navigate to appropriate screen based on role
        if (response.data?.session) {
          router.replace('/');
        }
      } catch (authServiceError: any) {
        console.error(
          'Auth service login failed, trying direct Supabase call:',
          authServiceError.message
        );

        // Fallback to direct Supabase API call
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        console.log(
          'Direct Supabase login successful:',
          data ? 'Session exists' : 'No session'
        );

        // Navigate to appropriate screen
        if (data?.session) {
          router.replace('/');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

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

  // Determine if we need a form element based on platform
  // We'll use a real form element for web, but not for native
  const FormContainer = Platform.OS === 'web' ? 'form' : View;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1920',
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>GreenCare</Text>
          <Text style={styles.subtitle}>
            Welcome back! Please sign in to continue.
          </Text>
        </View>

        <FormContainer
          style={styles.form}
          onSubmit={
            Platform.OS === 'web'
              ? (e) => {
                  e.preventDefault();
                  handleLogin();
                }
              : undefined
          }
        >
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                textContentType="emailAddress"
                {...(Platform.OS === 'web'
                  ? {
                      name: 'email',
                      autoComplete: 'email',
                    }
                  : {})}
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#64748b"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                textContentType="password"
                {...(Platform.OS === 'web'
                  ? {
                      name: 'password',
                      autoComplete: 'current-password',
                    }
                  : {})}
              />
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.loginButtonPressed,
            ]}
            onPress={handleLogin}
            disabled={loading}
            // Use type="submit" for web form
            {...(Platform.OS === 'web' ? { type: 'submit' } : {})}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Text style={styles.loginButtonText}>Sign In</Text>
                <ArrowRight size={20} color="#ffffff" />
              </>
            )}
          </Pressable>

          <Link href="/register" asChild>
            <Pressable style={styles.registerLink}>
              <Text style={styles.registerText}>
                Don't have an account?{' '}
                <Text style={styles.registerTextBold}>Sign up</Text>
              </Text>
            </Pressable>
          </Link>

          {renderDebugControls()}
        </FormContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
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
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  loginButtonPressed: {
    backgroundColor: '#15803d',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerLink: {
    marginTop: 24,
    padding: 12,
  },
  registerText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  registerTextBold: {
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
