# Lawn Refresh - Lawn Care Service Platform

A mobile application that connects customers with lawn care service providers. Built with React Native (Expo), Supabase, and Stripe.

## Features

- **User Roles**: Customer, Service Provider, and Admin interfaces
- **Service Booking**: Easy booking flow for lawn care services
- **Provider Management**: Service providers can manage their schedule and bookings
- **Payment Processing**: Secure payment handling with Stripe
- **Notifications**: Real-time notifications for booking updates
- **Reviews & Ratings**: Customer feedback system for service providers

## Tech Stack

### Frontend

- **Framework**: React Native (Expo)
- **State Management**: Zustand
- **Navigation**: Expo Router
- **UI Components**: Native components with custom styling

### Backend

- **Database & Auth**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Functions**: Supabase Edge Functions
- **Payments**: Stripe

## Project Structure

```
project/
├── app/                      # Expo Router pages
│   ├── (auth)/               # Authentication routes
│   ├── (customer)/           # Customer routes
│   ├── (provider)/           # Provider routes
│   ├── (admin)/              # Admin routes
│   └── _layout.tsx           # Root layout
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   ├── api/                  # API integration
│   │   ├── supabase.ts       # Supabase client
│   │   ├── database.ts       # Database service
│   │   └── services/         # Service-specific API functions
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand state management
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   └── constants/            # App constants
├── assets/                   # Static assets
├── supabase/                 # Supabase-related files
│   ├── migrations/           # Database migrations
│   │   ├── schema.sql        # Database schema
│   │   └── seed.sql          # Seed data
└── .env                      # Environment variables
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Expo CLI
- Supabase account
- Stripe account (for payment processing)

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/lawn-refresh.git
   cd lawn-refresh
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:

   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. Start the development server
   ```
   npm run dev
   ```

### Database Setup

1. Create a new Supabase project
2. Run the schema.sql file in the Supabase SQL editor to create the database schema
3. Run the seed.sql file to populate the database with initial data

## User Flows

### Customer Flow

1. Register/Login
2. Browse service providers
3. Select service type
4. Choose date/time
5. View price estimate
6. Confirm booking
7. Make payment
8. Receive confirmation

### Provider Flow

1. Register/Login
2. Set up profile and service areas
3. View calendar and bookings
4. Accept/reject booking requests
5. Complete services
6. Receive payments

### Admin Flow

1. Login
2. Manage service providers
3. Define service areas
4. Set service types
5. View analytics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [React Native](https://reactnative.dev/)

# Lawn Service App - Database Migrations

This document outlines the database migration process and verification steps for the Lawn Service application.

## Migration Files

The database schema is defined in the following migration files:

1. `20250309101430_initial_schema.sql` - Creates all tables, enum types, and the user handling function/trigger
2. `20250309101502_enable_rls_policies.sql` - Implements Row Level Security (RLS) policies for all tables
3. `20250309101531_seed_data.sql` - Provides initial seed data for categories, services, and service areas

## How to Apply Migrations

To apply all migrations and reset the database:

```bash
# Navigate to the project directory
cd project

# Reset the database and apply all migrations
supabase db reset

# Verify that migrations were applied successfully
supabase migration list
```

## Verification Process

After applying migrations, you can verify that everything was set up correctly:

1. Check that all tables were created:

```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

2. Verify RLS policies are in place:

```sql
SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public';
```

3. Check seed data was loaded:

```sql
SELECT * FROM service_categories;
SELECT * FROM services;
SELECT * FROM service_areas;
```

## Database Schema

The database includes the following main tables:

- `profiles` - Basic user profile information
- `customer_profiles` - Customer-specific profile data
- `provider_profiles` - Service provider-specific profile data
- `admin_profiles` - Admin-specific profile data
- `service_categories` - Categories of services offered
- `services` - Specific services that can be booked
- `service_areas` - Geographic areas where services are available
- `provider_services` - Services offered by specific providers
- `bookings` - Service bookings made by customers
- `payment_transactions` - Payment records for bookings
- `reviews` - Customer reviews of completed services
- `notifications` - System notifications for users
- `analytics_data` - Tracking data for business analytics

## User Handling

New user registration is handled automatically by the `handle_new_user()` function, which is triggered on user creation in the `auth.users` table. This function:

1. Creates a basic profile record for the user
2. Creates a customer profile by default for all new users, or a provider profile if specified

### Signing Up as a Provider

To sign up a user as a provider, you need to include `user_role: 'provider'` in the `raw_user_meta_data` when creating the user. For example:

```javascript
// Using Supabase JS client
const { data, error } = await supabase.auth.signUp({
  email: 'provider@example.com',
  password: 'securepassword',
  options: {
    data: {
      full_name: 'Provider Name',
      user_role: 'provider', // This is the key part for provider signup
    },
  },
});
```

This will automatically:

1. Create a profile with role set to 'provider'
2. Create a provider_profile entry for the user

If no `user_role` is specified, users will be registered as customers by default.

## Row Level Security

All tables have RLS policies that:

- Restrict data access based on user roles
- Allow users to view and modify only their own data
- Provide broader access for admin users where appropriate
