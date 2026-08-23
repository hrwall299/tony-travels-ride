DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can read media') THEN
    CREATE POLICY "Admins can read media" ON storage.objects FOR SELECT TO authenticated
      USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can upload media') THEN
    CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT TO authenticated
      WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can update media') THEN
    CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE TO authenticated
      USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'))
      WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can delete media') THEN
    CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE TO authenticated
      USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;