import HttpError from "./http-error";

class ConflictError extends HttpError {
  constructor(message?: string) {
    super(409, message);
  }
}

export default ConflictError;
