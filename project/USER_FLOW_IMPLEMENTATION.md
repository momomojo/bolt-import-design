# User Flow Implementation

This document explains how the user flow from the provided Mermaid diagram has been implemented in the application.

## Overview

The application implements a role-based authentication system with different user interfaces and flows for Customers, Providers, and Admins. The user flow follows the diagram:

```mermaid
graph TD
    Start[User Accesses Platform] --> Auth{Authenticated?}
    Auth -->|No| Login[Login/Register]
    Auth -->|Yes| Role{User Role}

    %% Customer Flow
    Role -->|Customer| C1[Customer Dashboard]
    C1 --> C2[Book Service]
    C2 --> C3[Select Service Type]
    C3 --> C4[Choose Date/Time]
    C4 --> C5[View Price Estimate]
    C5 --> C6{Confirm Booking?}
    C6 -->|Yes| C7[Process Booking]
    C6 -->|No| C2
    C7 --> CN[Receive Confirmation]

    %% Service Provider Flow
    Role -->|Provider| P1[Provider Dashboard]
    P1 --> P2[View Calendar]
    P2 --> P3[Manage Bookings]
    P3 --> P4{Action Type}
    P4 -->|Update| P5[Modify Booking]
    P4 -->|Complete| P6[Mark Complete]
    P4 -->|Cancel| P7[Cancel Service]

    %% Admin Flow
    Role -->|Admin| A1[Admin Dashboard]
    A1 --> A2[Manage Providers]
    A1 --> A3[Define Service Areas]
    A1 --> A4[Set Service Types]
    A1 --> A5[View Analytics]

    %% Notification System
    C7 --> N1[Send Notifications]
    N1 --> N2[Email Confirmation]
    N1 --> N3[SMS Reminder]
    N1 --> N4[Status Updates]

    %% Service Area Management
    A3 --> M1[Map Integration]
    M1 --> M2[Define Coverage Zones]
    M2 --> M3[Route Optimization]
```

## Implementation Components

### 1. Role-based Authentication System

We've implemented a comprehensive authentication system that:

- Supports different user roles (customer, provider, admin)
- Automatically assigns roles during signup
- Uses Supabase Auth with Row Level Security
- Provides dedicated signup flows for customers and providers

Key files:

- `handle_new_user()` function in the database
- `auth-helpers.js` with role-specific signup functions
- Auth screens: LoginScreen, RegisterScreen, ProviderSignupScreen

### 2. Navigation Flow

The navigation system routes users to different UIs based on their role:

- **RoleBasedNavigation.jsx**: Main navigation component that:
  - Checks authentication state
  - Retrieves user profile and role
  - Routes to the appropriate navigator based on role (Customer, Provider, or Admin)

### 3. Customer Flow

Supports the complete customer journey:

- Customer Dashboard
- Service booking flow:
  1. Book Service
  2. Select Service Type
  3. Choose Date/Time
  4. View Price Estimate
  5. Confirm Booking
  6. Receive Confirmation

### 4. Provider Flow

Supports the provider workflow:

- Provider Dashboard
- Calendar View
- Booking Management (Accept, Update, Complete, Cancel)
- Accessing assigned bookings through RLS

### 5. Admin Flow

Supports administrative functions:

- Managing providers
- Defining service areas
- Setting service types
- Viewing analytics

### 6. Database Structure

The database supports this flow with:

- Core tables for user profiles and roles
- Service-related tables (categories, areas, services)
- Booking-related tables (bookings, payments, reviews)
- RLS policies to enforce access control

## How to Test

1. **Register a Customer**:

   - Use the Register screen to create a customer account
   - After email confirmation, access the customer dashboard
   - Follow the booking flow

2. **Register a Provider**:

   - Use the Provider Signup screen to create a provider account
   - After email confirmation, access the provider dashboard
   - View and manage assigned bookings

3. **Admin Access**:
   - Admin accounts need to be manually created in the database
   - Set role to 'admin' in the profiles table
   - Create a corresponding entry in admin_profiles

## Remote Database Setup

To deploy these changes to your remote Supabase database:

1. Follow the steps in REMOTE_DB_SETUP.md to connect to your remote project
2. Push migrations using `supabase db push`
3. Verify database structure and RLS policies

## Next Steps

- Implement notifications system (email, SMS, in-app)
- Add service area management with map integration
- Create analytics dashboards for admin users
