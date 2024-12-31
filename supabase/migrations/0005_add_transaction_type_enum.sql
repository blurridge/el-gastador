CREATE TYPE "public"."transaction_type" AS ENUM('income', 'expense');--> statement-breakpoint
ALTER TYPE "public"."loanType" RENAME TO "loan_type";--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "transactionType" "transaction_type" NOT NULL;
