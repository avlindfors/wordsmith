package com.avlindfors.wordsmith.service;

import static java.util.Objects.requireNonNull;
import static java.util.UUID.randomUUID;

import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.domain.model.ReversedText;
import com.avlindfors.wordsmith.repository.ReversedTextRepository;

import java.time.Instant;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReverseService {

  @Autowired
  private ReversedTextRepository reversedTextRepository;

  /**
   * Reverses each individual word in some text, preserving order and position of punctuation.
   * @param reverseRequest request containing text to reverse.
   * @return a text with each individual word reversed.
   */
  public ReversedText reverseText(ReverseRequest reverseRequest) {
    requireNonNull(reverseRequest);
    requireNonNull(reverseRequest.getTextToReverse());

    String actualTextToReverse = reverseRequest.getTextToReverse().trim();
    String reversedText = reverseText(actualTextToReverse);

    return reversedTextRepository.save(createReversedText(actualTextToReverse, reversedText));
  }

  private String reverseText(String text) {
    StringBuilder textBuilder = new StringBuilder();
    StringBuilder wordBuilder = new StringBuilder();
    for (char currentChar : text.toCharArray()) {
      if (Character.isWhitespace(currentChar)
          || isPunctuation(currentChar)
          && currentChar != '\'') {
        wordBuilder.reverse().append(currentChar);
        textBuilder.append(wordBuilder);
        wordBuilder = new StringBuilder();
      } else {
        wordBuilder.append(currentChar);
      }
    }
    textBuilder.append(wordBuilder.reverse().toString());
    return textBuilder.toString();
  }

  private boolean isPunctuation(char c) {
    return Pattern.matches("\\p{Punct}", String.valueOf(c));
  }

  private ReversedText createReversedText(String originalText, String reversedText) {
    ReversedText text = new ReversedText();
    text.setId(randomUUID().toString());
    text.setCreatedTs(Instant.now());
    text.setOriginalText(originalText);
    text.setReversedText(reversedText);
    return text;
  }

  /**
   * Gets the 5 most recent reversed texts.
   * @return a list of {@link ReversedText} ordered by createdTs.
   */
  public List<ReversedText> getRecentReversals() {
    return reversedTextRepository.findFirst5ByOrderByCreatedTsAsc();
  }
}
