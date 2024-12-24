ALTER TABLE "loans" RENAME COLUMN "dscription" TO "description";--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "loans" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "loans" ALTER COLUMN "loanType" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "loans" ALTER COLUMN "contact" SET NOT NULL;