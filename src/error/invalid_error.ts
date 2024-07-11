export class InvalidError extends Error {
  constructor(message = "Invalid.") {
    super(message);

    this.message = message;
  }
}
