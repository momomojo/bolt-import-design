-- Create services table with explicit ownership and permissions
DROP TABLE IF EXISTS public.services CASCADE;
CREATE TABLE public.services (
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

-- Set explicit ownership
ALTER TABLE public.services OWNER TO postgres;

-- Grant permissions explicitly
GRANT ALL ON TABLE public.services TO postgres;
GRANT SELECT ON TABLE public.services TO anon;
GRANT SELECT ON TABLE public.services TO authenticated;

-- Add RLS policies
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);

-- Create bookings table with explicit ownership and permissions
DROP TABLE IF EXISTS public.bookings CASCADE;
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL,
    provider_id UUID NOT NULL,
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

-- Set explicit ownership
ALTER TABLE public.bookings OWNER TO postgres;

-- Grant permissions explicitly
GRANT ALL ON TABLE public.bookings TO postgres;
GRANT SELECT ON TABLE public.bookings TO anon;
GRANT SELECT, INSERT, UPDATE ON TABLE public.bookings TO authenticated;

-- Add RLS policies
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create reviews table with explicit ownership and permissions
DROP TABLE IF EXISTS public.reviews CASCADE;
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id),
    reviewer_id UUID NOT NULL,
    reviewee_id UUID NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(booking_id, reviewer_id, reviewee_id)
);

-- Set explicit ownership
ALTER TABLE public.reviews OWNER TO postgres;

-- Grant permissions explicitly
GRANT ALL ON TABLE public.reviews TO postgres;
GRANT SELECT ON TABLE public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE ON TABLE public.reviews TO authenticated;

-- Add RLS policies
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create payment_transactions table with explicit ownership and permissions
DROP TABLE IF EXISTS public.payment_transactions CASCADE;
CREATE TABLE public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id),
    customer_id UUID NOT NULL,
    provider_id UUID NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    payment_method TEXT,
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Set explicit ownership
ALTER TABLE public.payment_transactions OWNER TO postgres;

-- Grant permissions explicitly
GRANT ALL ON TABLE public.payment_transactions TO postgres;
GRANT SELECT ON TABLE public.payment_transactions TO anon;
GRANT SELECT, INSERT, UPDATE ON TABLE public.payment_transactions TO authenticated;

-- Add RLS policies
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
