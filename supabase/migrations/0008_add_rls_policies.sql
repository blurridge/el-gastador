ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "transactions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "loans" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user_profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "user_profiles_policy" ON "user_profiles" AS PERMISSIVE FOR ALL TO "authenticated" USING ("user_profiles".id = auth.uid()) WITH CHECK ("user_profiles".id = auth.uid());--> statement-breakpoint
CREATE POLICY "categories_delete_policy" ON "categories" AS PERMISSIVE FOR DELETE TO "authenticated" USING ("categories".user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "categories_insert_policy" ON "categories" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ("categories".user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "categories_policy" ON "categories" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("categories".user_id = auth.uid() OR ("categories".user_id IS NULL AND "categories".default = true));--> statement-breakpoint
CREATE POLICY "categories_update_policy" ON "categories" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ("categories".user_id = auth.uid()) WITH CHECK ("categories".user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "transactions_policy" ON "transactions" AS PERMISSIVE FOR ALL TO "authenticated" USING ("transactions".user_id = auth.uid()) WITH CHECK ("transactions".user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "loans_policy" ON "loans" AS PERMISSIVE FOR ALL TO "authenticated" USING ("loans".user_id = auth.uid()) WITH CHECK ("loans".user_id = auth.uid());
