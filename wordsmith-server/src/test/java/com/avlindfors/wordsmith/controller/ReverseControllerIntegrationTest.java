package com.avlindfors.wordsmith.controller;

import static com.avlindfors.wordsmith.util.ReverseUtil.ORIGINAL_TEXT;
import static com.avlindfors.wordsmith.util.ReverseUtil.REVERSED_TEXT;
import static com.avlindfors.wordsmith.util.ReverseUtil.createReverseRequest;
import static java.time.temporal.ChronoUnit.SECONDS;
import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.avlindfors.wordsmith.WordsmithApplication;
import com.avlindfors.wordsmith.domain.api.GetRecentReversalsResponse;
import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.domain.api.ReverseResponse;
import com.avlindfors.wordsmith.domain.model.ReversedText;
import com.avlindfors.wordsmith.repository.ReversedTextRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.Instant;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;


@SpringBootTest(classes = WordsmithApplication.class)
@AutoConfigureMockMvc
public class ReverseControllerIntegrationTest {

  private static final String BASE_URL = "/api/v1";

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

  @Test
  public void canGetMostRecentReversals() throws Exception {
    // Test getting the most recent reversals.

    // Create some reversals
    int numberOfReversedText = 6;
    for (int i = 0; i < numberOfReversedText; i++) {
      reverseText(ORIGINAL_TEXT);
    }
    assertThat(reversedTextRepository.findAll()).hasSize(numberOfReversedText);

    // Get 5 most recent reversals
    GetRecentReversalsResponse response = getRecentReversals();
    List<ReversedText> reversedTexts = response.getRecentReversals();
    assertThat(reversedTexts).hasSize(5);
    List<ReversedText> reversedTextsInExpectedOrder = reversedTexts.stream()
        .sorted(comparing(ReversedText::getCreatedTs))
        .collect(toList());
    assertThat(reversedTexts).usingRecursiveComparison().isEqualTo(reversedTextsInExpectedOrder);
  }

  @Test
  public void canGetMostRecentReversals_listIsEmptyIfDatabaseIsEmpty() throws Exception {
    // Test getting the most recent reversals when database is empty.

    assertThat(reversedTextRepository.findAll()).isEmpty();

    // Get 5 most recent reversals
    GetRecentReversalsResponse response = getRecentReversals();
    List<ReversedText> reversedTexts = response.getRecentReversals();
    assertThat(reversedTexts).isNotNull().isEmpty();
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
    MvcResult result = mockMvc.perform(post(BASE_URL + "/reverse")
        .content(objectMapper.writeValueAsString(request))
        .contentType(APPLICATION_JSON_VALUE))
        .andExpect(status().isOk())
        .andDo(print())
        .andReturn();
    return objectMapper.readValue(result.getResponse().getContentAsString(), ReverseResponse.class);
  }

  private GetRecentReversalsResponse getRecentReversals() throws Exception {
    MvcResult result = mockMvc.perform(get(BASE_URL + "/reversals")
        .contentType(APPLICATION_JSON_VALUE))
        .andExpect(status().isOk())
        .andDo(print())
        .andReturn();
    return objectMapper.readValue(result.getResponse().getContentAsString(),
        GetRecentReversalsResponse.class);
  }
}
