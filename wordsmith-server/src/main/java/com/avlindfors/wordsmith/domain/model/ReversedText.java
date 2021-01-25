package com.avlindfors.wordsmith.domain.model;

import java.time.Instant;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reversed_texts")
public class ReversedText {

  @Indexed(unique = true)
  @NotNull
  private String id;

  @NotBlank
  private String originalText;

  @NotBlank
  private String reversedText;

  @NotNull
  private Instant createdTs;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getOriginalText() {
    return originalText;
  }

  public void setOriginalText(String originalText) {
    this.originalText = originalText;
  }

  public String getReversedText() {
    return reversedText;
  }

  public void setReversedText(String reversedText) {
    this.reversedText = reversedText;
  }

  public Instant getCreatedTs() {
    return createdTs;
  }

  public void setCreatedTs(Instant createdTs) {
    this.createdTs = createdTs;
  }

  @Override
  public String toString() {
    return "ReversedText{"
        + "id='" + id + '\''
        + ", originalText='" + originalText + '\''
        + ", reversedText='" + reversedText + '\''
        + ", createdTs=" + createdTs
        + '}';
  }
}
