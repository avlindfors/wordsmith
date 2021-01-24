package com.avlindfors.wordsmith.domain.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@JsonDeserialize(builder = ReverseRequest.Builder.class)
public class ReverseRequest {

  @NotBlank
  @Length(max = 200)
  private final String textToReverse;

  private ReverseRequest(Builder builder) {
    textToReverse = builder.textToReverse;
  }

  public String getTextToReverse() {
    return textToReverse;
  }

  public static Builder newBuilder() {
    return new Builder();
  }

  @Override
  public String toString() {
    return "ReverseRequest{"
        + "textToReverse='" + textToReverse + '\''
        + '}';
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public static final class Builder {
    private String textToReverse;

    private Builder() {
    }

    public Builder withTextToReverse(String textToReverse) {
      this.textToReverse = textToReverse;
      return this;
    }

    public ReverseRequest build() {
      return new ReverseRequest(this);
    }
  }
}
