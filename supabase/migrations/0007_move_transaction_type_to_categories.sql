ALTER TABLE "categories" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN "transaction_type";
