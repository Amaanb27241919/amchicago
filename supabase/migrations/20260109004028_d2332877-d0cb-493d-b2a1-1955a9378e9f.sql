-- Create contact inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'new'
);

-- Enable Row Level Security
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a contact inquiry
CREATE POLICY "Anyone can submit contact inquiry"
ON public.contact_inquiries
FOR INSERT
WITH CHECK (true);

-- Prevent reading other inquiries
CREATE POLICY "Inquiries are private"
ON public.contact_inquiries
FOR SELECT
USING (false);