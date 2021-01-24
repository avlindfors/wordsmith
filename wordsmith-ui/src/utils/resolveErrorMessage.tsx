import ErrorName from "../enums/ErrorName";
import { ErrorObject } from "../providers/ApiProvider";

const BAD_INPUT_ERROR_MESSAGE = "The text can not be empty";

/**
 * Converts returned errorObjects to user friendly error messages.
 * @param errorObject returnerad feldata från backend.
 */
function resolveErrorMessage(errorObject: ErrorObject): string | undefined {
  if (errorObject === undefined) {
    console.error("Can not resolve undefined errorObjects.");
    return undefined;
  }

  if (errorObject.errorName === ErrorName.PARAMETER_VALIDATION_ERROR) {
    if (errorObject.description === "textToReverse: must not be blank") {
      return BAD_INPUT_ERROR_MESSAGE;
    }
  }

  return errorObject.description;
}

export default resolveErrorMessage;
