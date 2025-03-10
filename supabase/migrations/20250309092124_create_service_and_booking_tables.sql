-- Create service categories table
CREATE TABLE public.service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Set ownership and permissions
ALTER TABLE public.service_categories OWNER TO postgres;
GRANT ALL ON TABLE public.service_categories TO postgres;
GRANT SELECT ON TABLE public.service_categories TO anon;
GRANT SELECT ON TABLE public.service_categories TO authenticated;

-- Add RLS policies
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service categories are viewable by everyone" 
ON public.service_categories FOR SELECT 
USING (true);

-- Create service areas table
CREATE TABLE public.service_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    coordinates JSONB NOT NULL, -- GeoJSON format
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Set ownership and permissions
ALTER TABLE public.service_areas OWNER TO postgres;
GRANT ALL ON TABLE public.service_areas TO postgres;
GRANT SELECT ON TABLE public.service_areas TO anon;
GRANT SELECT ON TABLE public.service_areas TO authenticated;

-- Add RLS policies
ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service areas are viewable by everyone" 
ON public.service_areas FOR SELECT 
USING (true);

-- Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES public.service_categories(id),
    base_price DECIMAL(10, 2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Set ownership and permissions
ALTER TABLE public.services OWNER TO postgres;
GRANT ALL ON TABLE public.services TO postgres;
GRANT SELECT ON TABLE public.services TO anon;
GRANT SELECT ON TABLE public.services TO authenticated;

-- Add RLS policies
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are viewable by everyone" 
ON public.services FOR SELECT 
USING (true);

-- Create provider_services join table for services offered by providers
CREATE TABLE public.provider_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    price_adjustment DECIMAL(10, 2) DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ,
    UNIQUE(provider_id, service_id)
);

-- Set ownership and permissions
ALTER TABLE public.provider_services OWNER TO postgres;
GRANT ALL ON TABLE public.provider_services TO postgres;
GRANT SELECT ON TABLE public.provider_services TO anon;
GRANT SELECT ON TABLE public.provider_services TO authenticated;

-- Add RLS policies
ALTER TABLE public.provider_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Provider services are viewable by everyone" 
ON public.provider_services FOR SELECT 
USING (true);

-- Create booking status enum
CREATE TYPE public.booking_status AS ENUM (
    'pending', 
    'confirmed', 
    'in_progress',
    'completed',
    'cancelled'
);

-- Create bookings table
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES public.customer_profiles(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services(id),
    status public.booking_status NOT NULL DEFAULT 'pending',
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Set ownership and permissions
ALTER TABLE public.bookings OWNER TO postgres;
GRANT ALL ON TABLE public.bookings TO postgres;
GRANT SELECT ON TABLE public.bookings TO anon;
GRANT SELECT, INSERT, UPDATE ON TABLE public.bookings TO authenticated;

-- Add RLS policies
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Customers can see their own bookings
CREATE POLICY "Customers can view own bookings" 
ON public.bookings FOR SELECT 
TO authenticated
USING (
    customer_id IN (
        SELECT id FROM public.customer_profiles
        WHERE user_id = auth.uid()
    )
);

-- Providers can see bookings assigned to them
CREATE POLICY "Providers can view assigned bookings" 
ON public.bookings FOR SELECT 
TO authenticated
USING (
    provider_id IN (
        SELECT id FROM public.provider_profiles
        WHERE user_id = auth.uid()
    )
);

-- Customers can create bookings
CREATE POLICY "Customers can create bookings" 
ON public.bookings FOR INSERT 
TO authenticated
WITH CHECK (
    customer_id IN (
        SELECT id FROM public.customer_profiles
        WHERE user_id = auth.uid()
    )
);

-- Customers can update their own bookings if not yet confirmed
CREATE POLICY "Customers can update own pending bookings" 
ON public.bookings FOR UPDATE 
TO authenticated
USING (
    customer_id IN (
        SELECT id FROM public.customer_profiles
        WHERE user_id = auth.uid()
    )
    AND status = 'pending'
);

-- Providers can update bookings assigned to them
CREATE POLICY "Providers can update assigned bookings" 
ON public.bookings FOR UPDATE 
TO authenticated
USING (
    provider_id IN (
        SELECT id FROM public.provider_profiles
        WHERE user_id = auth.uid()
    )
);

-- Create notification type enum
CREATE TYPE public.notification_type AS ENUM (
    'email', 
    'sms', 
    'in_app'
);

-- Create notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type public.notification_type NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    data JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Set ownership and permissions
ALTER TABLE public.notifications OWNER TO postgres;
GRANT ALL ON TABLE public.notifications TO postgres;
GRANT SELECT, UPDATE ON TABLE public.notifications TO authenticated;

-- Add RLS policies
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can only view their own notifications
CREATE POLICY "Users can view own notifications" 
ON public.notifications FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

-- Users can mark their own notifications as read
CREATE POLICY "Users can update own notifications" 
ON public.notifications FOR UPDATE 
TO authenticated
USING (user_id = auth.uid());

-- Create reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES auth.users(id),
    reviewee_id UUID NOT NULL REFERENCES auth.users(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ,
    UNIQUE(booking_id, reviewer_id, reviewee_id)
);

-- Set ownership and permissions
ALTER TABLE public.reviews OWNER TO postgres;
GRANT ALL ON TABLE public.reviews TO postgres;
GRANT SELECT ON TABLE public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE ON TABLE public.reviews TO authenticated;

-- Add RLS policies
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Reviews are viewable by everyone
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews FOR SELECT 
USING (true);

-- Users can create reviews for completed bookings they're involved in
CREATE POLICY "Users can create reviews for completed bookings" 
ON public.reviews FOR INSERT 
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.bookings
        WHERE 
            bookings.id = booking_id AND 
            bookings.status = 'completed' AND 
            (
                (reviewer_id = auth.uid() AND reviewee_id IN (
                    SELECT user_id FROM public.provider_profiles WHERE id = bookings.provider_id
                    UNION
                    SELECT user_id FROM public.customer_profiles WHERE id = bookings.customer_id
                ))
            )
    )
);

-- Create payment_transaction_status enum
CREATE TYPE public.payment_transaction_status AS ENUM (
    'pending', 
    'processing',
    'completed',
    'failed',
    'refunded'
);

-- Create payment_transactions table
CREATE TABLE public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.customer_profiles(id),
    provider_id UUID NOT NULL REFERENCES public.provider_profiles(id),
    amount DECIMAL(10, 2) NOT NULL,
    status public.payment_transaction_status NOT NULL DEFAULT 'pending',
    payment_method TEXT,
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Set ownership and permissions
ALTER TABLE public.payment_transactions OWNER TO postgres;
GRANT ALL ON TABLE public.payment_transactions TO postgres;
GRANT SELECT ON TABLE public.payment_transactions TO authenticated;

-- Add RLS policies
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Customers can view their own payment transactions
CREATE POLICY "Customers can view own payment transactions" 
ON public.payment_transactions FOR SELECT 
TO authenticated
USING (
    customer_id IN (
        SELECT id FROM public.customer_profiles
        WHERE user_id = auth.uid()
    )
);

-- Providers can view payment transactions related to them
CREATE POLICY "Providers can view assigned payment transactions" 
ON public.payment_transactions FOR SELECT 
TO authenticated
USING (
    provider_id IN (
        SELECT id FROM public.provider_profiles
        WHERE user_id = auth.uid()
    )
);

-- Create analytics_data table for admin dashboards
CREATE TABLE public.analytics_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data_type TEXT NOT NULL,
    time_period TEXT NOT NULL,
    metrics JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Set ownership and permissions
ALTER TABLE public.analytics_data OWNER TO postgres;
GRANT ALL ON TABLE public.analytics_data TO postgres;
GRANT SELECT ON TABLE public.analytics_data TO authenticated;

-- Add RLS policies
ALTER TABLE public.analytics_data ENABLE ROW LEVEL SECURITY;

-- Only admins can view analytics data
CREATE POLICY "Only admins can view analytics data" 
ON public.analytics_data FOR SELECT 
USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
));
