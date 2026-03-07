-- Fix overly permissive RLS policies
-- This migration restricts access to require authentication

-- Drop old permissive policies
DROP POLICY IF EXISTS "Anyone can submit registration" ON public.member_registrations;
DROP POLICY IF EXISTS "Public can view by email" ON public.member_registrations;

-- New stricter policies for member_registrations
CREATE POLICY "Authenticated users can insert registration"
ON public.member_registrations
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own registration"
ON public.member_registrations
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND (
    email = auth.jwt() ->> 'email'
    OR public.has_role(auth.uid(), 'admin'::public.app_role)
  )
);

CREATE POLICY "Admins can view all registrations"
ON public.member_registrations
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update registrations"
ON public.member_registrations
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete registrations"
ON public.member_registrations
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Restrict newsletter subscriptions to authenticated users
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;

CREATE POLICY "Authenticated users can subscribe"
ON public.newsletter_subscriptions
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Keep admin view policy for subscriptions (already secure)
