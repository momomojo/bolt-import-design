-- Test table creation
CREATE TABLE public.test_table (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Grant permissions explicitly
GRANT ALL ON TABLE public.test_table TO postgres;
GRANT SELECT ON TABLE public.test_table TO anon;
GRANT SELECT ON TABLE public.test_table TO authenticated;
GRANT USAGE ON SEQUENCE public.test_table_id_seq TO postgres;
GRANT USAGE ON SEQUENCE public.test_table_id_seq TO anon;
GRANT USAGE ON SEQUENCE public.test_table_id_seq TO authenticated;
