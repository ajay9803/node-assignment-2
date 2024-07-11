// base class for unauthenticated error
export class UnauthenticatedError extends Error {
  constructor(message = "Authentication failed.") {
    super(message);

    this.message = message;
  }
}
