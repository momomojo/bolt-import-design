-- Create INSERT policies for profile tables
CREATE POLICY "Allow public to create profiles" 
ON public.profiles 
FOR INSERT
TO authenticated, anon
WITH CHECK (true);

CREATE POLICY "Allow public to create provider profiles" 
ON public.provider_profiles 
FOR INSERT
TO authenticated, anon
WITH CHECK (true);

CREATE POLICY "Allow public to create customer profiles" 
ON public.customer_profiles 
FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- Create a security definer function to bypass RLS for the handle_new_user function
CREATE OR REPLACE FUNCTION public.create_profile_with_rls_bypass(
  user_id uuid,
  role user_role,
  full_name text,
  avatar_url text DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, avatar_url)
  VALUES (user_id, role, full_name, avatar_url);
END;
$$;

CREATE OR REPLACE FUNCTION public.create_provider_profile_with_rls_bypass(
  id uuid,
  user_id uuid,
  full_name text,
  bio text DEFAULT '',
  services_offered jsonb DEFAULT '{}',
  availability jsonb DEFAULT '{}'
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.create_customer_profile_with_rls_bypass(
  id uuid,
  user_id uuid,
  full_name text
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Update the handle_new_user function to use the security definer functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    default_role user_role := 'customer';
    user_desired_role text;
    user_full_name text;
    user_bio text;
    profile_id uuid;
BEGIN
    -- Log the entry into the function
    RAISE LOG 'handle_new_user called for: % with metadata: %', NEW.email, NEW.raw_user_meta_data;
    
    -- Extract data from metadata with better error handling
    BEGIN
        user_full_name := NEW.raw_user_meta_data->>'full_name';
    EXCEPTION WHEN OTHERS THEN
        user_full_name := '';
        RAISE LOG 'Error extracting full_name for %: %', NEW.email, SQLERRM;
    END;
    
    BEGIN
        user_desired_role := COALESCE(NEW.raw_user_meta_data->>'user_role', 'customer');
        -- Log the role that is being detected
        RAISE LOG 'User signup: % with desired role: %', NEW.email, user_desired_role;
    EXCEPTION WHEN OTHERS THEN
        user_desired_role := 'customer';
        RAISE LOG 'User signup: % with default role (exception): %', NEW.email, SQLERRM;
    END;
    
    BEGIN
        user_bio := COALESCE(NEW.raw_user_meta_data->>'bio', '');
    EXCEPTION WHEN OTHERS THEN
        user_bio := '';
        RAISE LOG 'Error extracting bio for %: %', NEW.email, SQLERRM;
    END;
    
    -- Determine the role to assign
    IF user_desired_role = 'provider' THEN
        default_role := 'provider';
    ELSIF user_desired_role = 'admin' THEN
        default_role := 'admin';
    ELSE
        default_role := 'customer';
    END IF;
    
    -- Log the final role assignment
    RAISE LOG 'Creating user % with role %', NEW.email, default_role;
    
    -- Create base profile with appropriate role using security definer function
    PERFORM public.create_profile_with_rls_bypass(NEW.id, default_role, user_full_name, NULL);
    RAISE LOG 'Created base profile for %', NEW.email;
    
    -- Create role-specific profile based on the actual database schema
    profile_id := gen_random_uuid();
    
    IF default_role = 'provider' THEN
        PERFORM public.create_provider_profile_with_rls_bypass(
            profile_id,
            NEW.id, 
            user_full_name, 
            user_bio,
            '{}',
            '{}'
        );
        RAISE LOG 'Created provider profile for %', NEW.email;
    ELSIF default_role = 'admin' THEN
        PERFORM public.create_customer_profile_with_rls_bypass(
            profile_id,
            NEW.id, 
            user_full_name
        );
        RAISE LOG 'Created admin profile for %', NEW.email;
    ELSE
        PERFORM public.create_customer_profile_with_rls_bypass(
            profile_id,
            NEW.id, 
            user_full_name
        );
        RAISE LOG 'Created customer profile for %', NEW.email;
    END IF;
    
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user for %: %', NEW.email, SQLERRM;
    RETURN NEW;
END;
$$;

-- Make sure the trigger is correctly set for the handle_new_user function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
