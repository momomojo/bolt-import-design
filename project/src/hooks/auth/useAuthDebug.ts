import { supabase } from '../../api/supabase';

/**
 * Custom hook for debugging auth issues
 * This hook provides helper functions to debug auth-related issues
 */
export function useAuthDebug() {
  /**
   * Test a direct signup with Supabase
   */
  const testDirectSignup = async (
    email: string,
    password: string,
    userData: Record<string, any> = {}
  ) => {
    console.log('Testing direct signup with Supabase:', {
      email,
      userData,
    });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      console.log('Direct signup result:', {
        success: !error,
        userId: data?.user?.id,
        error: error ? error.message : null,
      });

      return { data, error };
    } catch (err) {
      console.error('Exception during direct signup:', err);
      throw err;
    }
  };

  /**
   * Test database permissions
   */
  const testDatabasePermissions = async () => {
    console.log('Testing database permissions...');

    try {
      // Try to read from profiles table
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('count(*)')
        .limit(1);

      console.log('Profiles read test:', {
        success: !profilesError,
        data: profilesData,
        error: profilesError ? profilesError.message : null,
      });

      // Try to insert a test record (will be rolled back)
      // Note: We'll just try to read with RLS instead of testing insert
      console.log('Skipping insert test as it requires proper type checking');

      const { data: privateData, error: privateError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);

      console.log('RLS test - private data access:', {
        success: !privateError,
        error: privateError ? privateError.message : null,
      });

      return {
        canRead: !profilesError,
        hasRlsProtection: !!privateError, // If there's an error, RLS is working
      };
    } catch (err) {
      console.error('Exception during permissions test:', err);
      return {
        canRead: false,
        hasRlsProtection: false,
        error: err,
      };
    }
  };

  /**
   * Check for existing session
   */
  const checkSession = async () => {
    console.log('Checking for existing session...');

    try {
      const { data, error } = await supabase.auth.getSession();

      console.log('Session check result:', {
        hasSession: !!data.session,
        error: error ? error.message : null,
      });

      return { session: data.session, error };
    } catch (err) {
      console.error('Exception during session check:', err);
      return { session: null, error: err };
    }
  };

  return {
    testDirectSignup,
    testDatabasePermissions,
    checkSession,
  };
}
