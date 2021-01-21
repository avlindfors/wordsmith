package com.avlindfors.wordsmith.domain.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(builder = ErrorData.Builder.class)
public class ErrorData {

  private final String errorName;
  private final String description;

  private ErrorData(Builder builder) {
    errorName = builder.errorName;
    description = builder.description;
  }

  public String getDescription() {
    return description;
  }

  public String getErrorName() {
    return errorName;
  }

  public static Builder newBuilder() {
    return new Builder();
  }

  @Override
  public String toString() {
    return "ErrorData{"
        + "error='" + errorName + '\''
        + ", description='" + description + '\''
        + '}';
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public static final class Builder {
    private String description;
    private String errorName;

    private Builder() {
    }

    public Builder withDescription(String description) {
      this.description = description;
      return this;
    }

    public Builder withErrorName(String errorName) {
      this.errorName = errorName;
      return this;
    }

    public ErrorData build() {
      return new ErrorData(this);
    }

  }
}
