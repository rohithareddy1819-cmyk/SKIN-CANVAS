/*
# Lock public catalog writes

1. Purpose
- Keeps the Skin Canvas catalog readable by the no-login landing page.
- Prevents anonymous browser visitors from changing shared products or retailer prices.

2. Modified Tables
- `skin_canvas_products`: replaces public INSERT, UPDATE, and DELETE policies with deny policies.
- `skin_canvas_retailer_prices`: replaces public INSERT, UPDATE, and DELETE policies with deny policies.

3. Security
- Anonymous and authenticated visitors retain SELECT access.
- Browser roles cannot insert, update, or delete shared catalog records.
- Future trusted ingestion can write through a protected server-side process using the service role.

4. Important Notes
- No product or price data is deleted or changed.
- The existing four-policy CRUD structure remains in place for both tables.
*/

DROP POLICY IF EXISTS "Public can add Skin Canvas products" ON public.skin_canvas_products;
CREATE POLICY "Public can add Skin Canvas products"
ON public.skin_canvas_products FOR INSERT
TO anon, authenticated
WITH CHECK (false);

DROP POLICY IF EXISTS "Public can update Skin Canvas products" ON public.skin_canvas_products;
CREATE POLICY "Public can update Skin Canvas products"
ON public.skin_canvas_products FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Public can remove Skin Canvas products" ON public.skin_canvas_products;
CREATE POLICY "Public can remove Skin Canvas products"
ON public.skin_canvas_products FOR DELETE
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Public can add Skin Canvas retailer prices" ON public.skin_canvas_retailer_prices;
CREATE POLICY "Public can add Skin Canvas retailer prices"
ON public.skin_canvas_retailer_prices FOR INSERT
TO anon, authenticated
WITH CHECK (false);

DROP POLICY IF EXISTS "Public can update Skin Canvas retailer prices" ON public.skin_canvas_retailer_prices;
CREATE POLICY "Public can update Skin Canvas retailer prices"
ON public.skin_canvas_retailer_prices FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Public can remove Skin Canvas retailer prices" ON public.skin_canvas_retailer_prices;
CREATE POLICY "Public can remove Skin Canvas retailer prices"
ON public.skin_canvas_retailer_prices FOR DELETE
TO anon, authenticated
USING (false);
