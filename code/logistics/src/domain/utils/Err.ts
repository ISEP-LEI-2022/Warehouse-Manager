type ErrorCode = 400 | 401 | 404 | 409 | 500;
type ErrorType =
  | "BussinessRuleError"
  | "BadRequest"
  | "Unauthorized"
  | "NotFound"
  | "Conflict"
  | "InternalServerError"
  | "PersistanceError";

export class Err extends Error {
  private errorCode: ErrorCode;
  private errors: (string)[];

  constructor(message: ErrorType, errorCode: ErrorCode) {
    super(message);
    this.name = "Error";
    this.errorCode = errorCode;
    this.errors = [];
  }

  /**
   * Adds an error to the error list
   * @param {string} error the error message
   */
  public addError(error: string): void {
    this.errors.push(error);
  }

  /**
   * Returns if there are errors
   * @returns {boolean} true if there are errors, false otherwise
   */
  public hasErrors(): boolean {
    return this.errors.length !== 0;
  }

  get code(): ErrorCode {
    return this.errorCode;
  }

  get errorList(): (string )[] {
    return this.errors;
  }

  /**
   * @returns {Object} the error object
   */

  public object(): {
    message: string;
    code: ErrorCode;
    errors: (string)[];
  } {
    return {
      message: this.message,
      code: this.errorCode,
      errors: this.errors,
    };
  }
}

// Factory functions

/**
 * Creates an error when business rule is not satisfied
 */
export function businessRuleErrorFactory(): Err {
  return new Err("BussinessRuleError", 400);
}

/**
 * Creates and error when the server cannot process the request
 */
export function internetServerErrorFactory(): Err {
  return new Err("InternalServerError", 500);
}

/**
 * Creates an error for bad requests
 */
export function badRequestErrorFactory(): Err {
  return new Err("BadRequest", 400);
}

/**
 * Creates an error when persistance fails
 */
export function persistanceErrorFactory(): Err {
  return new Err("PersistanceError", 409);
}

/**
 * Creates an error no data is found
 */
 export function getDataErrorFactory(): Err {
  return new Err("NotFound", 404);
}
