CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`payload` text NOT NULL,
	`attachments` text NOT NULL,
	`notification` text DEFAULT 'unconfigured' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `submission_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_submission_limits_expiry` ON `submission_limits` (`expires_at`);