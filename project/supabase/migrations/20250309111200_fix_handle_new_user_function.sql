-- Drop existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop existing function
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved handle_new_user function with better role handling and logging
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_role user_role := 'customer';
    user_desired_role text;
    user_full_name text;
    user_bio text;
BEGIN
    -- Extract data from metadata with better error handling
    BEGIN
        user_full_name := NEW.raw_user_meta_data->>'full_name';
    EXCEPTION WHEN OTHERS THEN
        user_full_name := '';
    END;
    
    BEGIN
        user_desired_role := COALESCE(NEW.raw_user_meta_data->>'user_role', 'customer');
        -- Log the role that is being detected
        RAISE LOG 'User signup: % with desired role: %', NEW.email, user_desired_role;
    EXCEPTION WHEN OTHERS THEN
        user_desired_role := 'customer';
        RAISE LOG 'User signup: % with default role (exception)', NEW.email;
    END;
    
    BEGIN
        user_bio := COALESCE(NEW.raw_user_meta_data->>'bio', '');
    EXCEPTION WHEN OTHERS THEN
        user_bio := '';
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
    
    -- Create base profile with appropriate role
    INSERT INTO public.profiles (id, role, full_name, avatar_url)
    VALUES (NEW.id, default_role, user_full_name, NULL);
    
    -- Create role-specific profile based on the actual database schema
    IF default_role = 'provider' THEN
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
            gen_random_uuid(), 
            NEW.id, 
            user_full_name, 
            user_bio,
            '{}',
            '{}',
            0,
            0,
            NOW(),
            NOW()
        );
        RAISE LOG 'Created provider profile for %', NEW.email;
    ELSIF default_role = 'admin' THEN
        INSERT INTO public.admin_profiles (
            id, 
            user_id, 
            full_name,
            created_at,
            updated_at
        )
        VALUES (
            gen_random_uuid(), 
            NEW.id, 
            user_full_name,
            NOW(),
            NOW()
        );
        RAISE LOG 'Created admin profile for %', NEW.email;
    ELSE
        INSERT INTO public.customer_profiles (
            id, 
            user_id, 
            full_name,
            created_at,
            updated_at
        )
        VALUES (
            gen_random_uuid(), 
            NEW.id, 
            user_full_name,
            NOW(),
            NOW()
        );
        RAISE LOG 'Created customer profile for %', NEW.email;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
