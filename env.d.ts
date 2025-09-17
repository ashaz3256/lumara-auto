/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      OPENAI_API_KEY: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
      SENTRY_DSN?: string
      POSTHOG_KEY?: string
      POSTHOG_HOST?: string
    }
  }
}

export {}
