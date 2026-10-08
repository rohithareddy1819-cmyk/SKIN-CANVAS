/*
# Create the Skin Canvas product catalog

1. Purpose
- Adds the shared catalog data needed for product discovery, matching, comparison, and retailer price intelligence.
- This project currently has no sign-in screen, so the catalog is intentionally shared between visitors.

2. New Tables
- `skin_canvas_products`
  - `id`: stable UUID identifier.
  - `brand`: product brand name.
  - `name`: product name.
  - `category`: discovery category such as Serums or Sunscreens.
  - `size`: displayed package size.
  - `image_url`: product photography URL.
  - `match_score`: illustrative Skin Canvas match percentage.
  - `price`: current displayed product price.
  - `original_price`: reference price used for savings display.
  - `rating`: displayed review rating.
  - `review_count`: displayed review count.
  - `key_ingredients`: searchable ingredient labels.
  - `match_reasons`: explainable recommendation reasons.
  - `attributes`: structured hydration, texture, and sensitivity values.
  - `created_at`, `updated_at`: record timestamps.
- `skin_canvas_retailer_prices`
  - `id`: stable UUID identifier.
  - `product_id`: product reference.
  - `retailer_name`: retailer label.
  - `price`: current retailer price.
  - `product_url`: optional future outbound product URL.
  - `checked_at`: timestamp of the last price check.

3. Security
- Enables Row Level Security on both tables.
- Allows anonymous and authenticated visitors to read the intentionally shared catalog.
- Allows anonymous and authenticated CRUD for this prototype's shared catalog, which contains only public product metadata and mock pricing. Production retailer ingestion should use a protected server process instead.

4. Important Notes
- No user accounts, personal photos, skin profiles, or medical information are stored by this migration.
- Seed rows are idempotent and will not overwrite existing catalog data.
- Retailer prices are mock values for the current prototype and can later be replaced by a protected pricing ingestion flow.
*/

CREATE TABLE IF NOT EXISTS public.skin_canvas_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  size text NOT NULL,
  image_url text NOT NULL,
  match_score integer NOT NULL DEFAULT 0 CHECK (match_score BETWEEN 0 AND 100),
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  original_price numeric(10, 2) NOT NULL CHECK (original_price >= price),
  rating numeric(2, 1) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  review_count integer NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  key_ingredients text[] NOT NULL DEFAULT '{}',
  match_reasons text[] NOT NULL DEFAULT '{}',
  attributes jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (brand, name, size)
);

CREATE TABLE IF NOT EXISTS public.skin_canvas_retailer_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.skin_canvas_products(id) ON DELETE CASCADE,
  retailer_name text NOT NULL,
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  product_url text,
  checked_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, retailer_name)
);

CREATE INDEX IF NOT EXISTS skin_canvas_products_category_idx
  ON public.skin_canvas_products (category);

CREATE INDEX IF NOT EXISTS skin_canvas_products_match_score_idx
  ON public.skin_canvas_products (match_score DESC);

CREATE INDEX IF NOT EXISTS skin_canvas_retailer_prices_product_idx
  ON public.skin_canvas_retailer_prices (product_id, price);

ALTER TABLE public.skin_canvas_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skin_canvas_retailer_prices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read Skin Canvas products" ON public.skin_canvas_products;
CREATE POLICY "Public can read Skin Canvas products"
ON public.skin_canvas_products FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Public can add Skin Canvas products" ON public.skin_canvas_products;
CREATE POLICY "Public can add Skin Canvas products"
ON public.skin_canvas_products FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update Skin Canvas products" ON public.skin_canvas_products;
CREATE POLICY "Public can update Skin Canvas products"
ON public.skin_canvas_products FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can remove Skin Canvas products" ON public.skin_canvas_products;
CREATE POLICY "Public can remove Skin Canvas products"
ON public.skin_canvas_products FOR DELETE
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Public can read Skin Canvas retailer prices" ON public.skin_canvas_retailer_prices;
CREATE POLICY "Public can read Skin Canvas retailer prices"
ON public.skin_canvas_retailer_prices FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Public can add Skin Canvas retailer prices" ON public.skin_canvas_retailer_prices;
CREATE POLICY "Public can add Skin Canvas retailer prices"
ON public.skin_canvas_retailer_prices FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update Skin Canvas retailer prices" ON public.skin_canvas_retailer_prices;
CREATE POLICY "Public can update Skin Canvas retailer prices"
ON public.skin_canvas_retailer_prices FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can remove Skin Canvas retailer prices" ON public.skin_canvas_retailer_prices;
CREATE POLICY "Public can remove Skin Canvas retailer prices"
ON public.skin_canvas_retailer_prices FOR DELETE
TO anon, authenticated
USING (true);

INSERT INTO public.skin_canvas_products (
  brand, name, category, size, image_url, match_score, price, original_price, rating, review_count, key_ingredients, match_reasons, attributes
) VALUES
  ('Aqualis', 'Hydrating Serum', 'Serums', '50ml', 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 94, 899, 1099, 4.7, 2847, ARRAY['Hyaluronic Acid', 'Glycerin', 'Panthenol'], ARRAY['Hydration support', 'Lightweight texture', 'Suitable for sensitive skin', 'Fits your routine'], '{"hydration":"Excellent","texture":"Light","sensitivity":"Low"}'::jsonb),
  ('Floreum', 'Nourishing Serum', 'Serums', '40ml', 'https://images.pexels.com/photos/29675492/pexels-photo-29675492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 91, 749, 899, 4.6, 1953, ARRAY['Niacinamide', 'Squalane', 'Ceramides'], ARRAY['Barrier support', 'Medium texture', 'Good for combination skin'], '{"hydration":"Good","texture":"Medium","sensitivity":"Low"}'::jsonb),
  ('Ovelle', 'Radiance Serum', 'Serums', '50ml', 'https://images.pexels.com/photos/27357181/pexels-photo-27357181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 87, 999, 1299, 4.5, 3201, ARRAY['Vitamin C', 'Ferulic Acid', 'Peptides'], ARRAY['Tone improvement', 'Light texture', 'Antioxidant support'], '{"hydration":"Good","texture":"Light","sensitivity":"Medium"}'::jsonb),
  ('Aqualis', 'Gentle Gel Cleanser', 'Cleansers', '150ml', 'https://images.pexels.com/photos/16378446/pexels-photo-16378446.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 89, 549, 699, 4.5, 4120, ARRAY['Amino Acids', 'Aloe Vera', 'Chamomile'], ARRAY['Gentle cleansing', 'pH-balanced', 'Non-stripping'], '{"hydration":"Good","texture":"Light","sensitivity":"Low"}'::jsonb),
  ('Floreum', 'Barrier Repair Cream', 'Moisturizers', '50ml', 'https://images.pexels.com/photos/4173450/pexels-photo-4173450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 92, 1199, 1499, 4.8, 1856, ARRAY['Ceramides', 'Cholesterol', 'Fatty Acids'], ARRAY['Barrier support', 'Rich texture', 'Long-lasting hydration'], '{"hydration":"Excellent","texture":"Rich","sensitivity":"Low"}'::jsonb),
  ('Ovelle', 'Mineral Shield SPF 50', 'Sunscreens', '50ml', 'https://images.pexels.com/photos/32110926/pexels-photo-32110926.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 88, 699, 849, 4.4, 5672, ARRAY['Zinc Oxide', 'Green Tea', 'Vitamin E'], ARRAY['Broad spectrum', 'No white cast', 'Suitable for sensitive skin'], '{"hydration":"Good","texture":"Light","sensitivity":"Low"}'::jsonb)
ON CONFLICT (brand, name, size) DO NOTHING;

INSERT INTO public.skin_canvas_retailer_prices (product_id, retailer_name, price)
SELECT p.id, retailer.retailer_name, retailer.price
FROM public.skin_canvas_products p
CROSS JOIN (VALUES
  ('Nykaa', 749::numeric),
  ('Amazon', 799::numeric),
  ('Brand Website', 849::numeric),
  ('Sephora', 899::numeric)
) AS retailer(retailer_name, price)
WHERE p.brand = 'Floreum' AND p.name = 'Nourishing Serum' AND p.size = '40ml'
ON CONFLICT (product_id, retailer_name) DO NOTHING;

INSERT INTO public.skin_canvas_retailer_prices (product_id, retailer_name, price)
SELECT p.id, retailer.retailer_name, retailer.price
FROM public.skin_canvas_products p
CROSS JOIN (VALUES
  ('Nykaa', 899::numeric),
  ('Amazon', 949::numeric),
  ('Brand Website', 1099::numeric),
  ('Sephora', 1149::numeric)
) AS retailer(retailer_name, price)
WHERE p.brand = 'Aqualis' AND p.name = 'Hydrating Serum' AND p.size = '50ml'
ON CONFLICT (product_id, retailer_name) DO NOTHING;
