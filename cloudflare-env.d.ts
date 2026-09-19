declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    RATE_LIMIT_SECRET?: string;
    SITE_URL?: string;
    ENQUIRY_WEBHOOK_URL?: string;
    ENQUIRY_WEBHOOK_TOKEN?: string;
  }
}
