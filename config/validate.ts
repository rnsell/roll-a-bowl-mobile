import type { EnvVarRule, AppConfig } from './schema';

export class ConfigValidationError extends Error {
  constructor(public readonly errors: string[]) {
    super(`Config validation failed:\n  - ${errors.join('\n  - ')}`);
    this.name = 'ConfigValidationError';
  }
}

export function validateConfig(
  schema: Record<string, EnvVarRule>,
  env: Record<string, string | undefined>,
): AppConfig {
  const errors: string[] = [];
  const result: Record<string, string | undefined> = {};

  for (const [key, rule] of Object.entries(schema)) {
    const value = env[rule.envKey];

    if (rule.required && (!value || value.length === 0)) {
      errors.push(`${rule.envKey} is required (${rule.description})`);
      continue;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors.push(
        `${rule.envKey} does not match expected pattern ${rule.pattern} (${rule.description})`,
      );
    }

    result[key] = value;
  }

  if (errors.length > 0) {
    throw new ConfigValidationError(errors);
  }

  return result as AppConfig;
}
