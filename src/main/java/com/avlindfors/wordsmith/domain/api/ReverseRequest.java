package com.avlindfors.wordsmith.domain.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@JsonDeserialize(builder = ReverseRequest.Builder.class)
public class ReverseRequest {

  @NotBlank
  @Length(max = 200)
  private final String sentence;

  private ReverseRequest(Builder builder) {
    sentence = builder.sentence;
  }

  public String getSentence() {
    return sentence;
  }

  public static Builder newBuilder() {
    return new Builder();
  }

  @Override
  public String toString() {
    return "ReverseRequest{"
        + "sentence='" + sentence + '\''
        + '}';
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public static final class Builder {
    private String sentence;

    private Builder() {
    }

    public Builder withSentence(String sentence) {
      this.sentence = sentence;
      return this;
    }

    public ReverseRequest build() {
      return new ReverseRequest(this);
    }
  }
}
