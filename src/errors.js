export class ApiError extends Error {
  constructor(status, code, clientMessage, internalMessage) {
    super(internalMessage || clientMessage);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.clientMessage = clientMessage;
    this.internalMessage = internalMessage || clientMessage;
  }
}

export function createApiError(status, code, clientMessage, internalMessage) {
  return new ApiError(status, code, clientMessage, internalMessage);
}

