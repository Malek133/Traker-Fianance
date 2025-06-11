DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'public');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_visibility" AS ENUM('public', 'private');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" uuid,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"visibility" "user_visibility" DEFAULT 'private' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
