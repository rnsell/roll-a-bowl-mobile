interface Logger {
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
}

export function createLogger(tag: string): Logger {
  const prefix = `[${tag}]`;

  return {
    error: (...args: unknown[]) => console.error(prefix, ...args),
    warn: (...args: unknown[]) => console.warn(prefix, ...args),
    info: (...args: unknown[]) => console.info(prefix, ...args),
    debug: (...args: unknown[]) => {
      if (__DEV__) {
        console.log(prefix, ...args);
      }
    },
  };
}

export const logger = createLogger('App');
