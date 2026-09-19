import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const enquiries=sqliteTable('enquiries',{
 id:text('id').primaryKey(),createdAt:integer('created_at').notNull(),payload:text('payload').notNull(),attachments:text('attachments').notNull(),notification:text('notification').notNull().default('unconfigured'),
});
export const submissionLimits=sqliteTable('submission_limits',{
 key:text('key').primaryKey(),count:integer('count').notNull(),expiresAt:integer('expires_at').notNull(),
},t=>[index('idx_submission_limits_expiry').on(t.expiresAt)]);
