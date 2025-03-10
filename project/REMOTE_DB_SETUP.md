# Remote Database Setup and Reset

This guide explains how to set up and reset the remote database for the Lawn Service application.

## Prerequisites

1. Make sure you have the Supabase CLI installed and properly configured
2. Ensure you have access to your Supabase project ID and database password

## Linking Your Project

Before you can push migrations to your remote database, you need to link your local project to your Supabase project:

```bash
# Link your local project to your remote Supabase project
supabase link --project-ref your-project-ref
```

Replace `your-project-ref` with your actual Supabase project reference ID. You can find this in your Supabase dashboard URL.

## Pushing Migrations to Remote Database

Once your project is linked, you can push all migrations to the remote database:

```bash
# Push all migrations to the remote database
supabase db push
```

This will apply all migrations in the correct order:

1. `20250309101430_initial_schema.sql` - Creates the database schema
2. `20250309101720_enable_rls_policies.sql` - Sets up Row Level Security
3. `20250309101531_seed_data.sql` - Adds initial seed data
4. `20250309102516_update_handle_new_user_function.sql` - Updates the handle_new_user function

## Verifying the Setup

After pushing the migrations, you can verify everything was set up correctly:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following queries to check:

```sql
-- Check if all tables were created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Verify RLS policies are in place
SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public';

-- Check the handle_new_user function
SELECT prosrc FROM pg_proc WHERE proname = 'handle_new_user';

-- Check seed data
SELECT * FROM service_categories;
SELECT * FROM service_areas;
```

## Troubleshooting

If you encounter issues with the migration, you can:

1. Check the migration history table:

```sql
SELECT * FROM supabase_migrations.schema_migrations ORDER BY version;
```

2. Repair the migration history if needed:

```bash
supabase migration repair --status applied --version your-migration-version
```

## Complete Reset

If you need to completely reset your remote database (USE WITH CAUTION):

1. Go to the Supabase dashboard
2. Navigate to Database → SQL Editor
3. Execute:

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

4. Then push all migrations again:

```bash
supabase db push
```

**WARNING**: This will delete ALL data in your database. Only use in development.
