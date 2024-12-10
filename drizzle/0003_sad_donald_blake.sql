ALTER TABLE "links" RENAME COLUMN "index" TO "messageId";--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_messageId_unique" UNIQUE("messageId");