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


export function validateRequestParams(request:object, requiredParams:object) : boolean{
  const keys = Object.keys(request);
  const paramKeys = Object.keys(requiredParams);
  for (const param of paramKeys) {
    if (!keys.includes(param)) {
      return false;
    }
  }
  return (
    keys.filter((value) => {
      return paramKeys.includes(value);
    }).length === 0
  )
}