package com.avlindfors.wordsmith.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.TEXT_PLAIN_VALUE;

import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.service.ReverseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("/api/v1")
public class ReverseController {

  @Autowired
  private ReverseService reverseService;

  @PostMapping(value = "/reverse", produces = {TEXT_PLAIN_VALUE, APPLICATION_JSON_VALUE},
      consumes = APPLICATION_JSON_VALUE)
  public String reverseWordInSentence(@RequestBody @NotNull @Valid ReverseRequest request) {
    return reverseService.reverseSentence(request);
  }
}
