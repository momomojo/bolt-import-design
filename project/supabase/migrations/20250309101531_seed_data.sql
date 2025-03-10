-- Seed data for service categories
INSERT INTO service_categories (id, name, description, icon)
VALUES 
  (gen_random_uuid(), 'Lawn Care', 'Basic and premium lawn maintenance services', 'grass'),
  (gen_random_uuid(), 'Garden Services', 'Garden planting and maintenance', 'spa'),
  (gen_random_uuid(), 'Landscaping', 'Landscape design and installation', 'landscape'),
  (gen_random_uuid(), 'Tree Care', 'Tree trimming, removal, and health services', 'forest'),
  (gen_random_uuid(), 'Hardscaping', 'Patios, walkways, and retaining walls', 'foundation');

-- Get the IDs for service categories (for reference in services)
DO $$
DECLARE
  lawn_care_id UUID;
  garden_services_id UUID;
  landscaping_id UUID;
  tree_care_id UUID;
  hardscaping_id UUID;
BEGIN
  SELECT id INTO lawn_care_id FROM service_categories WHERE name = 'Lawn Care' LIMIT 1;
  SELECT id INTO garden_services_id FROM service_categories WHERE name = 'Garden Services' LIMIT 1;
  SELECT id INTO landscaping_id FROM service_categories WHERE name = 'Landscaping' LIMIT 1;
  SELECT id INTO tree_care_id FROM service_categories WHERE name = 'Tree Care' LIMIT 1;
  SELECT id INTO hardscaping_id FROM service_categories WHERE name = 'Hardscaping' LIMIT 1;

  -- Seed data for services
  INSERT INTO services (id, name, description, category_id, base_price, duration_minutes, active)
  VALUES
    -- Lawn Care services
    (gen_random_uuid(), 'Basic Lawn Mowing', 'Standard lawn mowing service for residential properties.', lawn_care_id, 49.99, 60, true),
    (gen_random_uuid(), 'Premium Lawn Care', 'Comprehensive lawn care including mowing, edging, and blowing.', lawn_care_id, 79.99, 90, true),
    (gen_random_uuid(), 'Fertilization', 'Lawn fertilization treatment for healthier grass.', lawn_care_id, 59.99, 45, true),
    (gen_random_uuid(), 'Weed Control', 'Targeted weed control treatment for lawns.', lawn_care_id, 49.99, 45, true),
    (gen_random_uuid(), 'Aeration', 'Lawn aeration service to improve soil health.', lawn_care_id, 89.99, 60, true),
    (gen_random_uuid(), 'Lawn Seeding', 'Overseeding service for thicker, healthier lawns.', lawn_care_id, 79.99, 60, true),
    
    -- Garden Services
    (gen_random_uuid(), 'Garden Maintenance', 'Weeding, pruning, and general garden maintenance.', garden_services_id, 89.99, 120, true),
    (gen_random_uuid(), 'Mulch Installation', 'Professional mulch installation for garden beds.', garden_services_id, 99.99, 120, true),
    (gen_random_uuid(), 'Flower Planting', 'Seasonal flower planting service.', garden_services_id, 69.99, 90, true),
    
    -- Landscaping
    (gen_random_uuid(), 'Landscape Design', 'Custom landscape design for your property.', landscaping_id, 199.99, 180, true),
    (gen_random_uuid(), 'Irrigation Installation', 'Installation of irrigation systems.', landscaping_id, 249.99, 240, true),
    
    -- Tree Care
    (gen_random_uuid(), 'Hedge Trimming', 'Professional hedge and shrub trimming service.', tree_care_id, 69.99, 90, true),
    (gen_random_uuid(), 'Tree Pruning', 'Careful pruning of trees to improve health and appearance.', tree_care_id, 129.99, 120, true),
    
    -- Hardscaping
    (gen_random_uuid(), 'Patio Installation', 'Design and installation of stone or paver patios.', hardscaping_id, 399.99, 480, true),
    (gen_random_uuid(), 'Retaining Wall Construction', 'Building of retaining walls for erosion control and landscaping.', hardscaping_id, 349.99, 360, true);
END $$;

-- Seed data for service areas
INSERT INTO service_areas (id, name, description, coordinates, is_active)
VALUES
  (gen_random_uuid(), 'Downtown', 'Central business district area', '{"zipCodes": ["10001", "10002", "10003"]}', true),
  (gen_random_uuid(), 'Uptown', 'Residential northern area', '{"zipCodes": ["10021", "10022", "10023"]}', true),
  (gen_random_uuid(), 'Midtown', 'Middle part of the city', '{"zipCodes": ["10016", "10017", "10018", "10019"]}', true),
  (gen_random_uuid(), 'Brooklyn Heights', 'Historic neighborhood in Brooklyn', '{"zipCodes": ["11201", "11205"]}', true),
  (gen_random_uuid(), 'Williamsburg', 'Trendy Brooklyn neighborhood', '{"zipCodes": ["11211", "11249"]}', true);
