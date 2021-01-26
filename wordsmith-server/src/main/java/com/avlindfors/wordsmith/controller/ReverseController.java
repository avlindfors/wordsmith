package com.avlindfors.wordsmith.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.avlindfors.wordsmith.domain.api.GetRecentReversalsResponse;
import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.domain.api.ReverseResponse;
import com.avlindfors.wordsmith.domain.model.ReversedText;
import com.avlindfors.wordsmith.service.ReverseService;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/v1")
public class ReverseController {

  @Autowired
  private ReverseService reverseService;

  /**
   * Creates, stores and returns a representation of some text with each individual word reversed.
   */
  @CrossOrigin(origins = {"*"})
  @PostMapping(value = "/reverse", produces = APPLICATION_JSON_VALUE,
      consumes = APPLICATION_JSON_VALUE)
  public ReverseResponse reverseWordsInSentence(
      @RequestBody @NotNull @Valid ReverseRequest request) {
    ReversedText reversedText = reverseService.reverseText(request);
    return ReverseResponse.newBuilder()
        .withOriginalText(reversedText.getOriginalText())
        .withReversedText(reversedText.getReversedText())
        .withCreatedTs(reversedText.getCreatedTs())
        .withId(reversedText.getId())
        .build();
  }

  /**
   * Gets the most recently reversed texts, ordered by creation.
   */
  @CrossOrigin(origins = {"*"})
  @GetMapping(value = "/reversals", produces = APPLICATION_JSON_VALUE)
  public GetRecentReversalsResponse getRecentReversals() {
    List<ReversedText> recentReversals = reverseService.getRecentReversals();
    return GetRecentReversalsResponse.newBuilder()
        .withRecentReversals(recentReversals)
        .build();
  }
}
