-- Create custom user role enum type
CREATE TYPE public.user_role AS ENUM ('customer', 'provider', 'admin');

-- Create main profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    role public.user_role NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Set ownership and permissions
ALTER TABLE public.profiles OWNER TO postgres;
GRANT ALL ON TABLE public.profiles TO postgres;
GRANT SELECT ON TABLE public.profiles TO anon;
GRANT SELECT, UPDATE ON TABLE public.profiles TO authenticated;

-- Add RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can view profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

-- Users can update only their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create customer_profiles table for customer-specific details
CREATE TABLE public.customer_profiles (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    default_address TEXT,
    payment_info JSONB,
    preferences JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Set ownership and permissions
ALTER TABLE public.customer_profiles OWNER TO postgres;
GRANT ALL ON TABLE public.customer_profiles TO postgres;
GRANT SELECT ON TABLE public.customer_profiles TO anon;
GRANT SELECT ON TABLE public.customer_profiles TO authenticated;

-- Add RLS policies
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

-- Customers can view and update only their own profile
CREATE POLICY "Customers can view own profile" 
ON public.customer_profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Customers can update own profile" 
ON public.customer_profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Admins can view all customer profiles
CREATE POLICY "Admins can view all customer profiles" 
ON public.customer_profiles FOR SELECT 
USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
));

-- Create provider_profiles table for service provider details
CREATE TABLE public.provider_profiles (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    bio TEXT,
    services_offered JSONB,
    availability JSONB,
    rating NUMERIC,
    num_ratings INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Set ownership and permissions
ALTER TABLE public.provider_profiles OWNER TO postgres;
GRANT ALL ON TABLE public.provider_profiles TO postgres;
GRANT SELECT ON TABLE public.provider_profiles TO anon;
GRANT SELECT ON TABLE public.provider_profiles TO authenticated;

-- Add RLS policies
ALTER TABLE public.provider_profiles ENABLE ROW LEVEL SECURITY;

-- Provider profiles are viewable by everyone
CREATE POLICY "Provider profiles are viewable by everyone" 
ON public.provider_profiles FOR SELECT 
USING (true);

-- Providers can update only their own profile
CREATE POLICY "Providers can update own profile" 
ON public.provider_profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Create admin_profiles table for admin-specific details
CREATE TABLE public.admin_profiles (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Set ownership and permissions
ALTER TABLE public.admin_profiles OWNER TO postgres;
GRANT ALL ON TABLE public.admin_profiles TO postgres;
GRANT SELECT ON TABLE public.admin_profiles TO anon;
GRANT SELECT ON TABLE public.admin_profiles TO authenticated;

-- Add RLS policies
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Only admins can view admin profiles
CREATE POLICY "Only admins can view admin profiles" 
ON public.admin_profiles FOR SELECT 
USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
));

-- Create trigger function to set up profile based on role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, role, full_name, avatar_url)
    VALUES (NEW.id, 'customer', NEW.raw_user_meta_data->>'full_name', NULL);
    
    INSERT INTO public.customer_profiles (id, user_id, full_name)
    VALUES (gen_random_uuid(), NEW.id, NEW.raw_user_meta_data->>'full_name');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
