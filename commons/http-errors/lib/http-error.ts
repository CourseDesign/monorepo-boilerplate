class HttpError extends Error {
  constructor(public readonly status: number, message?: string) {
    super(message);
  }
}

export default HttpError;
