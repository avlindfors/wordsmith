package com.avlindfors.wordsmith.controller;

import static com.avlindfors.wordsmith.util.ReverseUtil.REVERSED_TEXT;
import static com.avlindfors.wordsmith.util.ReverseUtil.ORIGINAL_TEXT;
import static com.avlindfors.wordsmith.util.ReverseUtil.createReverseRequest;
import static java.time.temporal.ChronoUnit.SECONDS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.avlindfors.wordsmith.WordsmithApplication;
import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.domain.api.ReverseResponse;
import com.avlindfors.wordsmith.domain.model.ReversedText;
import com.avlindfors.wordsmith.repository.ReversedTextRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.Instant;
import java.util.List;

@SpringBootTest(classes = WordsmithApplication.class)
@AutoConfigureMockMvc
public class ReverseControllerIntegrationTest {

  private static final String URL = "/api/v1/reverse";

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ReversedTextRepository reversedTextRepository;

  @AfterEach
  public void clearDatabase() {
    reversedTextRepository.deleteAll();
  }

  @Test
  public void canReverseText() throws Exception {
    // Test a reversal from REST call to DB persistence.

    // Assert på svar
    ReverseResponse response = reverseText(ORIGINAL_TEXT);
    assertThat(response.getOriginalText()).isEqualTo(ORIGINAL_TEXT);
    assertThat(response.getReversedText()).isEqualTo(REVERSED_TEXT);

    // Assert på databas
    List<ReversedText> reversedTexts = reversedTextRepository.findAll();
    assertThat(reversedTexts).hasSize(1);
    ReversedText reversedText = reversedTexts.get(0);
    assertPersistedReversedText(reversedText, ORIGINAL_TEXT, REVERSED_TEXT);
  }

  private void assertPersistedReversedText(ReversedText actualReversedText,
      String expectedOriginalText, String expectedReversedText) {
    assertThat(actualReversedText.getOriginalText()).isEqualTo(expectedOriginalText);
    assertThat(actualReversedText.getReversedText()).isEqualTo(expectedReversedText);
    assertThat(actualReversedText.getCreatedTs())
        .isBetween(Instant.now().minus(5, SECONDS), Instant.now());
  }

  private ReverseResponse reverseText(String textToReverse) throws Exception {
    ReverseRequest request = createReverseRequest(textToReverse);
    MvcResult result = mockMvc.perform(post(URL)
        .content(objectMapper.writeValueAsString(request))
        .contentType(APPLICATION_JSON_VALUE))
        .andExpect(status().isOk())
        .andDo(print())
        .andReturn();
    return objectMapper.readValue(result.getResponse().getContentAsString(), ReverseResponse.class);
  }

}
