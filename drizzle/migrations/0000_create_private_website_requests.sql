CREATE TABLE public.website_requests (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), kind text NOT NULL, email text NOT NULL, name text NOT NULL DEFAULT '', details jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.website_requests TO service_role;
ALTER TABLE public.website_requests ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.newsletter_subscriptions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text NOT NULL UNIQUE, unsubscribe_token uuid NOT NULL DEFAULT gen_random_uuid(), subscribed boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.newsletter_subscriptions TO service_role;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;