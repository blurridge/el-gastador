ALTER TABLE "user_profiles" RENAME COLUMN "name" TO "display_name";--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "updated_at" timestamp;