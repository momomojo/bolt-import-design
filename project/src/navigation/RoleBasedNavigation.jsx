import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import authService from '../api/auth.ts';

// Auth screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProviderSignupScreen from '../screens/auth/ProviderSignupScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';

// Customer screens
import CustomerDashboard from '../screens/customer/CustomerDashboard';
import BookServiceScreen from '../screens/customer/BookServiceScreen';
import ServiceTypeScreen from '../screens/customer/ServiceTypeScreen';
import DateTimeScreen from '../screens/customer/DateTimeScreen';
import PriceEstimateScreen from '../screens/customer/PriceEstimateScreen';
import ConfirmationScreen from '../screens/customer/ConfirmationScreen';

// Provider screens
import ProviderDashboard from '../screens/provider/ProviderDashboard';
import CalendarScreen from '../screens/provider/CalendarScreen';
import ManageBookingsScreen from '../screens/provider/ManageBookingsScreen';
import BookingDetailsScreen from '../screens/provider/BookingDetailsScreen';

// Admin screens
import AdminDashboard from '../screens/admin/AdminDashboard';
import ManageProvidersScreen from '../screens/admin/ManageProvidersScreen';
import ServiceAreasScreen from '../screens/admin/ServiceAreasScreen';
import ServiceTypesScreen from '../screens/admin/ServiceTypesScreen';
import AnalyticsScreen from '../screens/admin/AnalyticsScreen';

// UserFlow screen
import UserFlowScreen from '../screens/UserFlowScreen';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Customer Tab Navigator
const CustomerTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={CustomerDashboard} />
      <Tab.Screen name="Book" component={BookServiceScreen} />
      <Tab.Screen name="Profile" component={CustomerProfileScreen} />
    </Tab.Navigator>
  );
};

// Customer Stack Navigator
const CustomerStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerTabs"
        component={CustomerTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserFlow"
        component={UserFlowScreen}
        options={{ title: 'Application User Flow' }}
      />
      <Stack.Screen name="ServiceType" component={ServiceTypeScreen} />
      <Stack.Screen name="DateTime" component={DateTimeScreen} />
      <Stack.Screen name="PriceEstimate" component={PriceEstimateScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
};

// Provider Tab Navigator
const ProviderTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={ProviderDashboard} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Bookings" component={ManageBookingsScreen} />
      <Tab.Screen name="Profile" component={ProviderProfileScreen} />
    </Tab.Navigator>
  );
};

// Provider Stack Navigator
const ProviderStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProviderTabs"
        component={ProviderTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserFlow"
        component={UserFlowScreen}
        options={{ title: 'Application User Flow' }}
      />
      <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
    </Stack.Navigator>
  );
};

// Admin Tab Navigator
const AdminTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={AdminDashboard} />
      <Tab.Screen name="Providers" component={ManageProvidersScreen} />
      <Tab.Screen name="ServiceAreas" component={ServiceAreasScreen} />
      <Tab.Screen name="ServiceTypes" component={ServiceTypesScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    </Tab.Navigator>
  );
};

// Auth Navigator
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="ProviderSignup"
        component={ProviderSignupScreen}
        options={{ title: 'Provider Registration' }}
      />
      <Stack.Screen
        name="UserFlow"
        component={UserFlowScreen}
        options={{ title: 'Application User Flow' }}
      />
    </Stack.Navigator>
  );
};

// Main component that decides which navigator to render based on auth state and user role
const RoleBasedNavigation = () => {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const setupAuthListener = async () => {
      try {
        // Initial session check
        await checkSession();

        // Listen for auth changes
        const { data: authListener } =
          await authService.supabase.auth.onAuthStateChange(
            async (event, newSession) => {
              console.log('Auth state changed:', event);
              setSession(newSession);

              if (newSession) {
                const profile = await authService.getUserProfile();
                setUserProfile(profile);
              } else {
                setUserProfile(null);
              }
            }
          );

        return () => {
          if (authListener?.subscription) {
            authListener.subscription.unsubscribe();
          }
        };
      } catch (error) {
        console.error('Error setting up auth listener:', error);
        setLoading(false);
      }
    };

    // Initial session check
    const checkSession = async () => {
      try {
        console.log('Checking initial session');
        const { data, error } = await authService.getSession();

        if (error) {
          throw error;
        }

        console.log(
          'Session check result:',
          data.session ? 'Session exists' : 'No session'
        );
        setSession(data.session);

        if (data.session) {
          console.log('Getting user profile');
          const profile = await authService.getUserProfile();
          console.log(
            'User profile:',
            profile ? `Role: ${profile.role}` : 'No profile found'
          );
          setUserProfile(profile);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setLoading(false);
      }
    };

    setupAuthListener();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!session ? (
        <AuthNavigator />
      ) : (
        <>
          {userProfile?.role === 'customer' && <CustomerStackNavigator />}
          {userProfile?.role === 'provider' && <ProviderStackNavigator />}
          {userProfile?.role === 'admin' && <AdminTabNavigator />}
          {!userProfile && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>Loading profile...</Text>
            </View>
          )}
        </>
      )}
    </NavigationContainer>
  );
};

// Placeholder screens (replace with actual implementations)
const CustomerProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Customer Profile Screen</Text>
  </View>
);

const ProviderProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Provider Profile Screen</Text>
  </View>
);

export default RoleBasedNavigation;
