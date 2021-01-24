package com.avlindfors.wordsmith.domain.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.time.Instant;
import javax.validation.constraints.NotNull;

@JsonDeserialize(builder = ReverseResponse.Builder.class)
public class ReverseResponse {

  @NotNull
  private final String id;

  @NotNull
  private final String originalText;

  @NotNull
  private final String reversedText;

  @NotNull
  private final Instant createdTs;


  private ReverseResponse(Builder builder) {
    id = builder.id;
    originalText = builder.originalText;
    reversedText = builder.reversedText;
    createdTs = builder.createdTs;
  }

  public String getId() {
    return id;
  }

  public String getOriginalText() {
    return originalText;
  }

  public String getReversedText() {
    return reversedText;
  }

  public Instant getCreatedTs() {
    return createdTs;
  }

  public static Builder newBuilder() {
    return new Builder();
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public static final class Builder {
    private String originalText;
    private String reversedText;
    private Instant createdTs;
    private String id;

    private Builder() {
    }

    public Builder withOriginalText(String originalText) {
      this.originalText = originalText;
      return this;
    }

    public Builder withReversedText(String reversedText) {
      this.reversedText = reversedText;
      return this;
    }

    public Builder withCreatedTs(Instant createdTs) {
      this.createdTs = createdTs;
      return this;
    }

    public ReverseResponse build() {
      return new ReverseResponse(this);
    }

    public Builder withId(String id) {
      this.id = id;
      return this;
    }
  }
}
