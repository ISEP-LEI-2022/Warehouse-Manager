// File with code that is used multiple tiomes in the project

/**
 * Function validates if the identifier is valid for strings
 * @param {string} identifier
 * @returns {boolean} true if valid, false otherwise
 */
export function isValidStringIdentifier(identifier: string): boolean {
  return (
    identifier !== undefined &&
    identifier !== null &&
    typeof identifier === "string" &&
    identifier.length > 0
  );
}

/**
 * Function validates if the number is valid
 * @param {number} number
 * @returns {boolean} true if valid, false otherwise
 */
export function isValidNumber(number: number): boolean {
  return (
    number !== undefined &&
    number !== null &&
    typeof number === "number" &&
    number >= 0
  );
}


/**
 * Function validates if the registration is valid
 * @param {string} registration
 * @returns {boolean} true if valid, false otherwise
 */
export function isValidRegistration(registration: string): boolean {
  const regex = /^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/;
  return (
    regex.test(registration)
  );
}

/**
 * Function validates if all parameters are valid
 * @param {object} request body to be validated
 * @param {string[]} required Names of the required params
 * @param {string[]} required Names of the optional params
 * @returns {boolean} true if valid, false otherwise
 */
export function validateRequestParams(request:object, requiredParams:string[], optionalParams?:string[]) : boolean{
  const keys = Object.keys(request);
  for (const param of requiredParams) {
    if (!keys.includes(param)) {
      return false;
    }
  }
  return(
    !(keys.filter((key) => requiredParams.includes(key) || optionalParams?.includes(key)).length === 0)
  )

  return true;
}


