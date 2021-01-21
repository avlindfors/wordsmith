package com.avlindfors.wordsmith.util;

import static java.util.UUID.randomUUID;

import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.domain.model.Sentence;

import java.time.Instant;
import java.time.ZoneId;
import java.util.UUID;

public class ReverseUtil {

  public static final String ORIGINAL_SENTENCE = "Reverse me, please. And me too,"
      + " if you don't mind?";
  public static final String REVERSED_SENTENCE = "esreveR em, esaelp. dnA em oot,"
      + " fi uoy t'nod dnim?";

  public static ReverseRequest createReverseRequest(String withSentence) {
    return ReverseRequest.newBuilder()
        .withSentence(withSentence)
        .build();
  }

  public static Sentence createSentence(String original, String reversed) {
    Sentence sentence = new Sentence();
    sentence.setId(randomUUID().toString());
    sentence.setCreatedTs(Instant.now());
    sentence.setOriginalSentence(original);
    sentence.setReversedSentence(reversed);
    return sentence;
  }
}
