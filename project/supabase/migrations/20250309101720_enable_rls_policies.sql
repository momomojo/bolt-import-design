-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Customer Profiles RLS policies
CREATE POLICY "Customers can view own profile" 
  ON customer_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Customers can update own profile" 
  ON customer_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all customer profiles" 
  ON customer_profiles FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Provider Profiles RLS policies
CREATE POLICY "Provider profiles are viewable by everyone" 
  ON provider_profiles FOR SELECT 
  USING (true);

CREATE POLICY "Providers can update own profile" 
  ON provider_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

-- Admin Profiles RLS policies
CREATE POLICY "Only admins can view admin profiles" 
  ON admin_profiles FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Service Categories RLS policies
CREATE POLICY "Service categories are viewable by everyone" 
  ON service_categories FOR SELECT 
  USING (true);

-- Service Areas RLS policies
CREATE POLICY "Service areas are viewable by everyone" 
  ON service_areas FOR SELECT 
  USING (true);

-- Services RLS policies
CREATE POLICY "Services are viewable by everyone" 
  ON services FOR SELECT 
  USING (true);

-- Provider Services RLS policies
CREATE POLICY "Provider services are viewable by everyone" 
  ON provider_services FOR SELECT 
  USING (true);

-- Bookings RLS policies
CREATE POLICY "Customers can view own bookings" 
  ON bookings FOR SELECT 
  USING (customer_id IN (
    SELECT id FROM customer_profiles
    WHERE customer_profiles.user_id = auth.uid()
  ));

CREATE POLICY "Providers can view assigned bookings" 
  ON bookings FOR SELECT 
  USING (provider_id IN (
    SELECT id FROM provider_profiles
    WHERE provider_profiles.user_id = auth.uid()
  ));

CREATE POLICY "Customers can create bookings" 
  ON bookings FOR INSERT 
  WITH CHECK (customer_id IN (
    SELECT id FROM customer_profiles
    WHERE customer_profiles.user_id = auth.uid()
  ));

CREATE POLICY "Customers can update own pending bookings" 
  ON bookings FOR UPDATE 
  USING (
    customer_id IN (
      SELECT id FROM customer_profiles
      WHERE customer_profiles.user_id = auth.uid()
    ) 
    AND status = 'pending'
  );

CREATE POLICY "Providers can update assigned bookings" 
  ON bookings FOR UPDATE 
  USING (provider_id IN (
    SELECT id FROM provider_profiles
    WHERE provider_profiles.user_id = auth.uid()
  ));

-- Payment Transactions RLS policies
CREATE POLICY "Customers can view own payment transactions" 
  ON payment_transactions FOR SELECT 
  USING (customer_id IN (
    SELECT id FROM customer_profiles
    WHERE customer_profiles.user_id = auth.uid()
  ));

CREATE POLICY "Providers can view assigned payment transactions" 
  ON payment_transactions FOR SELECT 
  USING (provider_id IN (
    SELECT id FROM provider_profiles
    WHERE provider_profiles.user_id = auth.uid()
  ));

-- Reviews RLS policies
CREATE POLICY "Reviews are viewable by everyone" 
  ON reviews FOR SELECT 
  USING (true);

CREATE POLICY "Users can create reviews for completed bookings" 
  ON reviews FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM bookings
    WHERE 
      bookings.id = reviews.booking_id
      AND bookings.status = 'completed'
      AND (
        reviews.reviewer_id = auth.uid()
        AND reviews.reviewee_id IN (
          SELECT provider_profiles.user_id FROM provider_profiles
          WHERE provider_profiles.id = bookings.provider_id
          UNION
          SELECT customer_profiles.user_id FROM customer_profiles
          WHERE customer_profiles.id = bookings.customer_id
        )
      )
  ));

-- Notifications RLS policies
CREATE POLICY "Users can view own notifications" 
  ON notifications FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" 
  ON notifications FOR UPDATE 
  USING (user_id = auth.uid());

-- Analytics Data RLS policies
CREATE POLICY "Only admins can view analytics data" 
  ON analytics_data FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));
