export interface EnvVarRule {
  readonly envKey: string;
  readonly required: boolean;
  readonly pattern?: RegExp;
  readonly description: string;
}

export const configSchema = {
  clerkFrontendApi: {
    envKey: 'EXPO_PUBLIC_CLERK_FRONTEND_API',
    required: true,
    pattern: /^https:\/\//,
    description: 'Clerk frontend API URL (e.g. https://your-instance.clerk.accounts.dev)',
  },
  clerkOAuthClientId: {
    envKey: 'EXPO_PUBLIC_CLERK_OAUTH_CLIENT_ID',
    required: true,
    description: 'Clerk OAuth application client ID (public/native client)',
  },
  apiUrl: {
    envKey: 'EXPO_PUBLIC_API_URL',
    required: true,
    pattern: /^https?:\/\//,
    description: 'API base URL (e.g. http://localhost:3000)',
  },
} as const satisfies Record<string, EnvVarRule>;

type Schema = typeof configSchema;

export type AppConfig = {
  readonly [K in keyof Schema]: Schema[K]['required'] extends true
    ? string
    : string | undefined;
};
