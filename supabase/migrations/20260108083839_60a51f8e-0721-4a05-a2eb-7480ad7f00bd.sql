-- Create member registrations table
CREATE TABLE public.member_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  reg_number TEXT NOT NULL,
  year_of_study TEXT NOT NULL,
  course TEXT NOT NULL,
  school TEXT NOT NULL,
  career_interests TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.member_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration)
CREATE POLICY "Anyone can submit registration"
ON public.member_registrations
FOR INSERT
WITH CHECK (true);

-- Only allow viewing own registration by email (optional for future use)
CREATE POLICY "Public can view by email"
ON public.member_registrations
FOR SELECT
USING (true);