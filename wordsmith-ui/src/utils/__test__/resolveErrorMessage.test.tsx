import React from 'react';
import ErrorName from '../../enums/ErrorName';
import { ErrorObject } from '../../providers/DataProvider';

import resolveErrorMessage, { 
  BAD_INPUT_ERROR_MESSAGE, 
  NETWORK_ERROR_MESSAGE, 
  UNKNOWN_ERROR_MESSAGE } from '../resolveErrorMessage';

test('can resolve PARAMETER_VALIDATION error message', () => {
  const errorObject = createErrorObject(ErrorName.PARAMETER_VALIDATION_ERROR, 
    "errorObject.badField: The validation did not pass.");
  const resolvedErrorMessage = resolveErrorMessage(errorObject);
  expect(resolvedErrorMessage).toEqual(BAD_INPUT_ERROR_MESSAGE);
});

test('can resolve NETWORK_ERROR error message', () => {
  const errorObject = createErrorObject(ErrorName.NETWORK_ERROR, 
    "Oh oh! Could not connect!");
  const resolvedErrorMessage = resolveErrorMessage(errorObject);
  expect(resolvedErrorMessage).toEqual(NETWORK_ERROR_MESSAGE);
});

test('can resolve UNKNOWN_ERROR error message', () => {
  const errorObject = createErrorObject(ErrorName.UNKNOWN_ERROR, 
    "I have a bad feeling about this.");
  const resolvedErrorMessage = resolveErrorMessage(errorObject);
  expect(resolvedErrorMessage).toEqual(UNKNOWN_ERROR_MESSAGE);
});

test('can handle unknown error objects', () => {
  const errorObject = createErrorObject("AN_UNDEFINED_ERROR", 
    "There seems to be an error in the space time continuum!");
  const resolvedErrorMessage = resolveErrorMessage(errorObject);
  expect(resolvedErrorMessage).toEqual("There seems to be an error in the space time continuum!");
});

function createErrorObject(errorName: string, description: string) : ErrorObject {
  return {
    errorName,
    description
  }
}