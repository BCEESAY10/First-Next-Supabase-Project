ALTER TABLE "signup" ALTER COLUMN "first_name" SET DATA TYPE varchar(15);--> statement-breakpoint
ALTER TABLE "signup" ALTER COLUMN "last_name" SET DATA TYPE varchar(15);--> statement-breakpoint
ALTER TABLE "signup" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup" ADD CONSTRAINT "signup_email_unique" UNIQUE("email");