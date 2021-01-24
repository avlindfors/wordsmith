package com.avlindfors.wordsmith.util;

import static java.util.UUID.randomUUID;

import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.domain.model.ReversedText;

import java.time.Instant;

public class ReverseUtil {

  public static final String ORIGINAL_TEXT = "Reverse me, please. And me too,"
      + " if you don't mind?";
  public static final String REVERSED_TEXT = "esreveR em, esaelp. dnA em oot,"
      + " fi uoy t'nod dnim?";

  public static ReverseRequest createReverseRequest(String withText) {
    return ReverseRequest.newBuilder()
        .withTextToReverse(withText)
        .build();
  }

  public static ReversedText createReversedText(String original, String reversed) {
    ReversedText reversedText = new ReversedText();
    reversedText.setId(randomUUID().toString());
    reversedText.setCreatedTs(Instant.now());
    reversedText.setOriginalText(original);
    reversedText.setReversedText(reversed);
    return reversedText;
  }
}
