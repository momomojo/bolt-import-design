// Re-exporting from the TypeScript implementation to standardize
// This file exists for backward compatibility with any imports that might still use .js extension
export {
  supabase,
  handleSupabaseResponse,
  isAuthenticated,
  getCurrentUser,
  getUserProfile,
  getUserRole,
} from './supabase.ts';
export default supabase;
