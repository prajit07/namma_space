-- Run this in your Supabase SQL Editor to add the evidence column

ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS evidence_urls TEXT[] DEFAULT '{}';
