/**
 * Production-ready logging utility
 * Replaces console.log with proper logging levels
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(this.formatMessage('info', message, context));
    }
    // In production, you might want to send to a logging service
    // e.g., Sentry, LogRocket, Datadog, etc.
  }

  warn(message: string, context?: LogContext): void {
    // eslint-disable-next-line no-console
    console.warn(this.formatMessage('warn', message, context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = {
      ...context,
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
    };
    // eslint-disable-next-line no-console
    console.error(this.formatMessage('error', message, errorContext));
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.debug(this.formatMessage('debug', message, context));
    }
  }
}

export const logger = new Logger();

