export interface IFormattedError {
  message: string;
  stackTrace?: string;
}

/**
 * Formats an unknown error message and stack trace.
 */
export function formatError(error: unknown): IFormattedError {
  if (error instanceof Error) {
    return formatStandardError(error);
  }

  if (error === Object(error)) {
    return { message: JSON.stringify(error) };
  }

  return {
    message: String(error),
  };
}
function formatStandardError(error: Error): IFormattedError {
  return {
    message: error.message,
    stackTrace: error.stack,
  };
}
