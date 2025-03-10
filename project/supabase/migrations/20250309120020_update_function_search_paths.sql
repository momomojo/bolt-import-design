-- Update function search paths for security definer functions
-- This update ensures all functions use the same consistent search path to prevent schema poisoning vulnerabilities

-- Update create_profile_with_rls_bypass function to use public, auth search path
CREATE OR REPLACE FUNCTION public.create_profile_with_rls_bypass(
  user_id uuid, 
  role user_role, 
  full_name text, 
  avatar_url text DEFAULT NULL::text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, auth  -- Updated search path to match handle_new_user
AS $function$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, avatar_url)
  VALUES (user_id, role, full_name, avatar_url);
END;
$function$;

-- Update create_provider_profile_with_rls_bypass function to use public, auth search path
CREATE OR REPLACE FUNCTION public.create_provider_profile_with_rls_bypass(
  id uuid, 
  user_id uuid, 
  full_name text, 
  bio text DEFAULT ''::text, 
  services_offered jsonb DEFAULT '{}'::jsonb, 
  availability jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, auth  -- Updated search path to match handle_new_user
AS $function$
BEGIN
  INSERT INTO public.provider_profiles (
    id, 
    user_id, 
    full_name, 
    bio, 
    services_offered, 
    availability,
    rating,
    num_ratings,
    created_at,
    updated_at
  )
  VALUES (
    id, 
    user_id, 
    full_name, 
    bio,
    services_offered,
    availability,
    0,
    0,
    NOW(),
    NOW()
  );
END;
$function$;

-- Update create_customer_profile_with_rls_bypass function to use public, auth search path
CREATE OR REPLACE FUNCTION public.create_customer_profile_with_rls_bypass(
  id uuid, 
  user_id uuid, 
  full_name text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, auth  -- Updated search path to match handle_new_user
AS $function$
BEGIN
  INSERT INTO public.customer_profiles (
    id, 
    user_id, 
    full_name,
    created_at,
    updated_at
  )
  VALUES (
    id, 
    user_id, 
    full_name,
    NOW(),
    NOW()
  );
END;
$function$; 