-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    category TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add RLS policies for services table
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Anyone can view services
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT TO public USING (true);

-- Only admins can insert, update, delete services
CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO public
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id),
    provider_id UUID NOT NULL REFERENCES public.profiles(id),
    service_id UUID NOT NULL REFERENCES public.services(id),
    status TEXT NOT NULL DEFAULT 'pending',
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add RLS policies for bookings table
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Customers can see their own bookings
CREATE POLICY "Customers can view own bookings" 
ON public.bookings FOR SELECT 
TO public
USING (customer_id = auth.uid());

-- Providers can see bookings assigned to them
CREATE POLICY "Providers can view assigned bookings" 
ON public.bookings FOR SELECT 
TO public
USING (
    provider_id = auth.uid() OR
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role = 'admin'
    )
);

-- Create reviews table 
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id),
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id),
    reviewee_id UUID NOT NULL REFERENCES public.profiles(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(booking_id, reviewer_id, reviewee_id)
);

-- Add RLS policies for reviews table
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create payment_transactions table
CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id),
    customer_id UUID NOT NULL REFERENCES public.profiles(id),
    provider_id UUID NOT NULL REFERENCES public.profiles(id),
    amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    payment_method TEXT,
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add RLS policies for payment_transactions table
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
