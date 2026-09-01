GRANT SELECT ON TABLE public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.site_content TO authenticated;
GRANT ALL ON TABLE public.site_content TO service_role;

GRANT INSERT ON TABLE public.enquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.enquiries TO authenticated;
GRANT ALL ON TABLE public.enquiries TO service_role;