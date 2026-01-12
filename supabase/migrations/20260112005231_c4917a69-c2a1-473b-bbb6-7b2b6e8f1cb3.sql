-- Create enum for pre-order status
CREATE TYPE public.preorder_status AS ENUM ('pending', 'contacted', 'converted', 'cancelled');

-- Create preorders table
CREATE TABLE public.preorders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  product_handle TEXT NOT NULL,
  product_title TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  variant_title TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_order DECIMAL(10,2),
  status preorder_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  fulfilled_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.preorders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit pre-orders
CREATE POLICY "Anyone can submit preorders"
ON public.preorders
FOR INSERT
WITH CHECK (true);

-- Preorders are private (admin access via service role)
CREATE POLICY "Preorders are private"
ON public.preorders
FOR SELECT
USING (false);

-- Create index for common queries
CREATE INDEX idx_preorders_product_handle ON public.preorders(product_handle);
CREATE INDEX idx_preorders_status ON public.preorders(status);
CREATE INDEX idx_preorders_created_at ON public.preorders(created_at DESC);