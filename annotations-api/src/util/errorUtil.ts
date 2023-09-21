export class CustomError extends Error {
  custom: boolean;
  constructor(public message: string, public code: number) {
    super(message);
    this.custom = true;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
