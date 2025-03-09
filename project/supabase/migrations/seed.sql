-- Seed data for the Lawn Refresh app

-- Insert service areas
INSERT INTO service_areas (name, zip_codes, is_active)
VALUES
  ('Downtown', ARRAY['10001', '10002', '10003'], TRUE),
  ('Uptown', ARRAY['10021', '10022', '10023'], TRUE),
  ('Midtown', ARRAY['10016', '10017', '10018', '10019'], TRUE),
  ('Brooklyn Heights', ARRAY['11201', '11205'], TRUE),
  ('Williamsburg', ARRAY['11211', '11249'], TRUE);

-- Insert service types
INSERT INTO service_types (name, description, base_price, duration_minutes, image_url, is_active)
VALUES
  ('Basic Lawn Mowing', 'Standard lawn mowing service for residential properties.', 49.99, 60, 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=500', TRUE),
  ('Premium Lawn Care', 'Comprehensive lawn care including mowing, edging, and blowing.', 79.99, 90, 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=500', TRUE),
  ('Garden Maintenance', 'Weeding, pruning, and general garden maintenance.', 89.99, 120, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=500', TRUE),
  ('Hedge Trimming', 'Professional hedge and shrub trimming service.', 69.99, 90, 'https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=500', TRUE),
  ('Seasonal Cleanup', 'Comprehensive yard cleanup for spring or fall.', 129.99, 180, 'https://images.unsplash.com/photo-1508470829748-e71e9842cbfb?q=80&w=500', TRUE),
  ('Fertilization', 'Lawn fertilization treatment for healthier grass.', 59.99, 45, 'https://images.unsplash.com/photo-1458014854819-1a40aa70211c?q=80&w=500', TRUE),
  ('Weed Control', 'Targeted weed control treatment for lawns and gardens.', 49.99, 45, 'https://images.unsplash.com/photo-1527199372136-dff50c10ea34?q=80&w=500', TRUE),
  ('Aeration', 'Lawn aeration service to improve soil health.', 89.99, 60, 'https://images.unsplash.com/photo-1599598177991-ec67b5c37318?q=80&w=500', TRUE),
  ('Mulch Installation', 'Professional mulch installation for garden beds.', 99.99, 120, 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=500', TRUE),
  ('Lawn Seeding', 'Overseeding service for thicker, healthier lawns.', 79.99, 60, 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=500', TRUE);

-- Note: Users, customers, providers, bookings, and other data would typically be created
-- through the application as users sign up and use the system.
-- For testing purposes, you can create test users in the Supabase Auth system
-- and then create corresponding customer/provider records. 