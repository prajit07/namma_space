-- Run this in your Supabase SQL Editor to create the messages table and enable realtime

CREATE TABLE public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read messages
CREATE POLICY "Allow anonymous read access"
ON public.messages FOR SELECT
USING (true);

-- Allow anyone to insert messages (for our community forum)
CREATE POLICY "Allow anonymous insert access"
ON public.messages FOR INSERT
WITH CHECK (true);

-- IMPORTANT: Enable Realtime for this table
-- You can also do this in the Supabase Dashboard: 
-- Database -> Replication -> 'supabase_realtime' publication -> Toggle 'messages'
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
