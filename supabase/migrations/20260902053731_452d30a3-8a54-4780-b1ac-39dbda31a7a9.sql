INSERT INTO public.site_content (key, value)
VALUES (
  'vehicle',
  jsonb_build_object(
    'video', jsonb_build_object(
      'src', 'uploads/1787851154869-1000115433.mp4',
      'poster', '',
      'title', 'See The Car In Motion',
      'description', 'A short walkaround of the Hyundai Venue Facelift used for all Tony Tour & Travels trips.'
    )
  )
)
ON CONFLICT (key) DO UPDATE SET value = public.site_content.value || EXCLUDED.value;