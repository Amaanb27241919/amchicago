-- Create table for launch email subscribers
CREATE TABLE public.launch_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.launch_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe for launch notifications"
ON public.launch_subscribers
FOR INSERT
WITH CHECK (true);

-- Subscribers cannot read other emails
CREATE POLICY "Subscribers cannot read emails"
ON public.launch_subscribers
FOR SELECT
USING (false);