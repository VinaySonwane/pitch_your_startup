import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2d241790e149ad790ee25df43ba5e9b7@o4509141529067520.ingest.us.sentry.io/4509141626978304",
  integrations: [
    Sentry.feedbackIntegration({
      colorScheme: "system", // or "light" | "dark"
    }),
  ],
  tracesSampleRate: 1.0, // capture 100% of transactions — reduce in production
});
 