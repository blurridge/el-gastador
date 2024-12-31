ALTER TABLE "categories" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "default" boolean DEFAULT false NOT NULL;
