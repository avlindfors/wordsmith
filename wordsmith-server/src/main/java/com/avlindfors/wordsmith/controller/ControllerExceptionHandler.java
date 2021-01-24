package com.avlindfors.wordsmith.controller;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import com.avlindfors.wordsmith.domain.api.ErrorData;
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

import java.util.stream.Collectors;
import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

  private static final String PARAMETER_VALIDATION_ERROR = "PARAMETER_VALIDATION_ERROR";

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    String allMessages = ex.getBindingResult().getAllErrors().stream()
        .map(this::createErrorObjectMessage)
        .collect(Collectors.joining(" "));

    ErrorData errorData = createErrorData(PARAMETER_VALIDATION_ERROR, allMessages);
    return handleExceptionInternal(ex, errorData, headers, status, request);
  }

  private String createErrorObjectMessage(ObjectError objectError) {
    if (objectError instanceof FieldError) {
      FieldError fieldError = (FieldError) objectError;
    return String.format("%s: %s", fieldError.getField(), objectError.getDefaultMessage());
    }
    return String.format("%s: %s", objectError.getObjectName(), objectError.getDefaultMessage());
  }

  @ResponseStatus(BAD_REQUEST)
  @ExceptionHandler({ConstraintViolationException.class})
  public ErrorData handleConstraintViolationException(ConstraintViolationException ex) {
    return createErrorData(PARAMETER_VALIDATION_ERROR, ex.getMessage());
  }

  private ErrorData createErrorData(String errorName, String description) {
    return ErrorData.newBuilder()
        .withErrorName(errorName)
        .withDescription(description)
        .build();
  }
}
