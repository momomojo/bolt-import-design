-- Create tables for the Lawn Refresh app

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  service_area TEXT[] DEFAULT '{}',
  service_types TEXT[] DEFAULT '{}',
  rating NUMERIC(3,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create service_areas table
CREATE TABLE IF NOT EXISTS service_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  zip_codes TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create service_types table
CREATE TABLE IF NOT EXISTS service_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  base_price NUMERIC(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  service_date DATE NOT NULL,
  service_time TIME NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  price NUMERIC(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT NOT NULL,
  payment_intent_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create provider_availability table
CREATE TABLE IF NOT EXISTS provider_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  availability JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('booking', 'payment', 'system', 'reminder')),
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  related_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for customers
CREATE POLICY "Customers can view their own data" 
  ON customers FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Providers can view customer data for their bookings" 
  ON customers FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM bookings 
    WHERE bookings.customer_id = customers.id 
    AND bookings.provider_id IN (
      SELECT id FROM providers WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Admins can view all customer data" 
  ON customers FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  ));

-- Create policies for providers
CREATE POLICY "Providers can view their own data" 
  ON providers FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Customers can view provider data" 
  ON providers FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage all provider data" 
  ON providers FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  ));

-- Create policies for service_areas
CREATE POLICY "Service areas are viewable by all authenticated users" 
  ON service_areas FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage service areas" 
  ON service_areas FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  ));

-- Create policies for service_types
CREATE POLICY "Service types are viewable by all authenticated users" 
  ON service_types FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage service types" 
  ON service_types FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  ));

-- Create policies for bookings
CREATE POLICY "Customers can view their own bookings" 
  ON bookings FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM customers 
    WHERE customers.id = bookings.customer_id 
    AND customers.user_id = auth.uid()
  ));

CREATE POLICY "Providers can view bookings assigned to them" 
  ON bookings FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM providers 
    WHERE providers.id = bookings.provider_id 
    AND providers.user_id = auth.uid()
  ));

CREATE POLICY "Customers can create bookings" 
  ON bookings FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM customers 
    WHERE customers.id = bookings.customer_id 
    AND customers.user_id = auth.uid()
  ));

CREATE POLICY "Providers can update their bookings" 
  ON bookings FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM providers 
    WHERE providers.id = bookings.provider_id 
    AND providers.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all bookings" 
  ON bookings FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  ));

-- Create policies for payments
CREATE POLICY "Customers can view their own payments" 
  ON payments FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM customers 
    WHERE customers.id = payments.customer_id 
    AND customers.user_id = auth.uid()
  ));

CREATE POLICY "Providers can view payments for their bookings" 
  ON payments FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM providers 
    WHERE providers.id = payments.provider_id 
    AND providers.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all payments" 
  ON payments FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  ));

-- Create policies for provider_availability
CREATE POLICY "Providers can manage their own availability" 
  ON provider_availability FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM providers 
    WHERE providers.id = provider_availability.provider_id 
    AND providers.user_id = auth.uid()
  ));

CREATE POLICY "Customers can view provider availability" 
  ON provider_availability FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage all provider availability" 
  ON provider_availability FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  ));

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications" 
  ON notifications FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
  ON notifications FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications" 
  ON notifications FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  ));

-- Create policies for reviews
CREATE POLICY "Reviews are viewable by all authenticated users" 
  ON reviews FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Customers can create reviews for their bookings" 
  ON reviews FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM customers 
    WHERE customers.id = reviews.customer_id 
    AND customers.user_id = auth.uid()
  ));

CREATE POLICY "Customers can update their own reviews" 
  ON reviews FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM customers 
    WHERE customers.id = reviews.customer_id 
    AND customers.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all reviews" 
  ON reviews FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  ));

-- Create functions and triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_providers_updated_at
BEFORE UPDATE ON providers
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_service_areas_updated_at
BEFORE UPDATE ON service_areas
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_service_types_updated_at
BEFORE UPDATE ON service_types
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_provider_availability_updated_at
BEFORE UPDATE ON provider_availability
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to update provider rating when a new review is added
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE providers
  SET rating = (
    SELECT AVG(rating)
    FROM reviews
    WHERE provider_id = NEW.provider_id
  )
  WHERE id = NEW.provider_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating provider rating
CREATE TRIGGER update_provider_rating_on_review
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_provider_rating(); 