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
