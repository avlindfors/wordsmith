package com.avlindfors.wordsmith.domain.api;

import com.avlindfors.wordsmith.domain.model.ReversedText;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.List;
import javax.validation.constraints.NotNull;

@JsonDeserialize(builder = GetRecentReversalsResponse.Builder.class)
public class GetRecentReversalsResponse {

  @NotNull
  private final List<ReversedText> recentReversals;

  private GetRecentReversalsResponse(Builder builder) {
    recentReversals = builder.recentReversals;
  }

  public List<ReversedText> getRecentReversals() {
    return recentReversals;
  }

  public static Builder newBuilder() {
    return new Builder();
  }

  @Override
  public String toString() {
    return "GetRecentReversalsResponse{"
        + "recentReversals=" + recentReversals
        + '}';
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public static final class Builder {
    private List<ReversedText> recentReversals;

    private Builder() {
    }

    public Builder withRecentReversals(List<ReversedText> recentReversals) {
      this.recentReversals = recentReversals;
      return this;
    }

    public GetRecentReversalsResponse build() {
      return new GetRecentReversalsResponse(this);
    }
  }
}
