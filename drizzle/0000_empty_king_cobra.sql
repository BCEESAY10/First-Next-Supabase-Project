CREATE TABLE IF NOT EXISTS "signup" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" varchar(256),
	"password" varchar(256)
);
