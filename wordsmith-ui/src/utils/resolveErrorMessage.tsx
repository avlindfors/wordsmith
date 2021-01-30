import ErrorName from "../enums/ErrorName";
import { ErrorObject } from "../providers/DataProvider";

export const BAD_INPUT_ERROR_MESSAGE =
  "The text must be between 1 and 200 characters";
export const NETWORK_ERROR_MESSAGE =
  "Could not connect to server. Try again later";
export const UNKNOWN_ERROR_MESSAGE =
  "Something has gone wrong. Try again later";

/**
 * Converts returned errorObjects to user friendly error messages.
 * @param errorObject returned from backend.
 */
function resolveErrorMessage(errorObject: ErrorObject): string | undefined {
  if (errorObject === undefined) {
    return UNKNOWN_ERROR_MESSAGE;
  }

  switch (errorObject.errorName) {
    case ErrorName.PARAMETER_VALIDATION_ERROR:
      return BAD_INPUT_ERROR_MESSAGE;
    case ErrorName.NETWORK_ERROR:
      return NETWORK_ERROR_MESSAGE;
    case ErrorName.UNKNOWN_ERROR:
      return UNKNOWN_ERROR_MESSAGE;
    default:
      return errorObject.description;
  }
}

export default resolveErrorMessage;
