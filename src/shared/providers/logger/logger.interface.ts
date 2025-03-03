export abstract class ILogger {
  abstract log(message: string): void;
  abstract error(message: string, stackTrace?: string): void;
  abstract warn(message: string): void;
}
