package com.avlindfors.wordsmith.domain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Document(collection = "sentences")
public class Sentence {

  @Indexed(unique = true)
  @NotNull
  private String id;

  @NotBlank
  private String originalSentence;

  @NotBlank
  private String reversedSentence;

  @NotNull
  private Instant createdTs;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getOriginalSentence() {
    return originalSentence;
  }

  public void setOriginalSentence(String originalSentence) {
    this.originalSentence = originalSentence;
  }

  public String getReversedSentence() {
    return reversedSentence;
  }

  public void setReversedSentence(String reversedSentence) {
    this.reversedSentence = reversedSentence;
  }

  public Instant getCreatedTs() {
    return createdTs;
  }

  public void setCreatedTs(Instant createdTs) {
    this.createdTs = createdTs;
  }

  @Override
  public String toString() {
    return "Sentence{"
        + "id='" + id + '\''
        + ", originalSentence='" + originalSentence + '\''
        + ", reversedSentence='" + reversedSentence + '\''
        + ", createdTs=" + createdTs
        + '}';
  }
}
