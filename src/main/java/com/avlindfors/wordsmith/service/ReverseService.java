package com.avlindfors.wordsmith.service;

import static java.util.Objects.requireNonNull;
import static java.util.UUID.randomUUID;

import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.domain.model.Sentence;
import com.avlindfors.wordsmith.repository.SentenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.regex.Pattern;

@Service
public class ReverseService {

  @Autowired
  private SentenceRepository sentenceRepository;

  /**
   * Reverses each individual word in a sentence, preserving order and position of punctuation.
   * @param reverseRequest request containing sentence to reverse.
   * @return a sentence with each individual word reversed.
   */
  public String reverseSentence(ReverseRequest reverseRequest) {
    requireNonNull(reverseRequest);
    requireNonNull(reverseRequest.getSentence());

    String actualTextToReverse = reverseRequest.getSentence().trim();
    String reversedSentence = reverseSentence(actualTextToReverse);

    sentenceRepository.save(createReversedSentence(actualTextToReverse, reversedSentence));
    return reversedSentence;
  }

  private Sentence createReversedSentence(String originalSentence,
      String reversedSentence) {
    Sentence sentence = new Sentence();
    sentence.setId(randomUUID().toString());
    sentence.setCreatedTs(Instant.now());
    sentence.setOriginalSentence(originalSentence);
    sentence.setReversedSentence(reversedSentence);
    return sentence;
  }

  private String reverseSentence(String sentence) {
    StringBuilder sentenceBuilder = new StringBuilder();
    StringBuilder wordBuilder = new StringBuilder();
    for (char currentChar : sentence.toCharArray()) {
      if (Character.isWhitespace(currentChar)
          || isPunctuation(currentChar)
          && currentChar != '\'') {
        wordBuilder.reverse().append(currentChar);
        sentenceBuilder.append(wordBuilder);
        wordBuilder = new StringBuilder();
      } else {
        wordBuilder.append(currentChar);
      }
    }
    sentenceBuilder.append(wordBuilder.reverse().toString());
    return sentenceBuilder.toString();
  }

  private boolean isPunctuation(char c) {
    return Pattern.matches("\\p{Punct}", String.valueOf(c));
  }
}
