package com.avlindfors.wordsmith.controller;

import static com.avlindfors.wordsmith.domain.api.ErrorName.INTERNAL_SERVER_ERROR;
import static com.avlindfors.wordsmith.domain.api.ErrorName.PARAMETER_VALIDATION_ERROR;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

import com.avlindfors.wordsmith.domain.api.ErrorData;

import java.util.stream.Collectors;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    String allMessages = ex.getBindingResult().getAllErrors().stream()
        .map(this::createErrorObjectMessage)
        .collect(Collectors.joining(" "));

    ErrorData errorData = createErrorData(PARAMETER_VALIDATION_ERROR.name(), allMessages);
    return handleExceptionInternal(ex, errorData, headers, status, request);
  }

  /**
   * Handle {@link RuntimeException} and create error object.
   */
  @ExceptionHandler(value = RuntimeException.class)
  public ResponseEntity<Object> handleRuntimeException(RuntimeException e, HttpHeaders headers,
      HttpStatus status, WebRequest request) {
    ErrorData errorData = createErrorData(INTERNAL_SERVER_ERROR.name(), e.getMessage());
    return handleExceptionInternal(e, errorData, new HttpHeaders(),
        HttpStatus.INTERNAL_SERVER_ERROR, request);
  }

  /**
   * Handle {@link ConstraintViolationException} and create error object.
   */
  @ExceptionHandler({ConstraintViolationException.class})
  @ResponseStatus(BAD_REQUEST)
  public ErrorData handleConstraintViolationException(ConstraintViolationException ex) {
    return createErrorData(PARAMETER_VALIDATION_ERROR.name(), ex.getMessage());
  }

  private String createErrorObjectMessage(ObjectError objectError) {
    if (objectError instanceof FieldError) {
      FieldError fieldError = (FieldError) objectError;
      return String.format("%s: %s", fieldError.getField(), objectError.getDefaultMessage());
    }
    return String.format("%s: %s", objectError.getObjectName(), objectError.getDefaultMessage());
  }

  private ErrorData createErrorData(String errorName, String description) {
    return ErrorData.newBuilder()
        .withErrorName(errorName)
        .withDescription(description)
        .build();
  }
}
