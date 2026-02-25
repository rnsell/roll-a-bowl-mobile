import { configSchema, type AppConfig } from './schema';
import { validateConfig } from './validate';

// Expo's Metro bundler replaces process.env.EXPO_PUBLIC_* at build time via
// static analysis. Dynamic access (process.env[key]) does NOT work — each var
// must be listed explicitly here.
function readEnv(): Record<string, string | undefined> {
  return {
    EXPO_PUBLIC_CLERK_FRONTEND_API:
      process.env.EXPO_PUBLIC_CLERK_FRONTEND_API,
    EXPO_PUBLIC_CLERK_OAUTH_CLIENT_ID:
      process.env.EXPO_PUBLIC_CLERK_OAUTH_CLIENT_ID,
    EXPO_PUBLIC_API_URL:
      process.env.EXPO_PUBLIC_API_URL,
  };
}

export const config: AppConfig = Object.freeze(
  validateConfig(configSchema, readEnv()),
);
