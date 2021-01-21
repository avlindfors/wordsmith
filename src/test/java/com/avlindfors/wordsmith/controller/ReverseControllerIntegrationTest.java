package com.avlindfors.wordsmith.controller;

import static com.avlindfors.wordsmith.util.ReverseUtil.REVERSED_SENTENCE;
import static com.avlindfors.wordsmith.util.ReverseUtil.ORIGINAL_SENTENCE;
import static com.avlindfors.wordsmith.util.ReverseUtil.createReverseRequest;
import static java.time.temporal.ChronoUnit.SECONDS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.avlindfors.wordsmith.WordsmithApplication;
import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.domain.model.Sentence;
import com.avlindfors.wordsmith.repository.SentenceRepository;
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
  private SentenceRepository sentenceRepository;

  @AfterEach
  public void clearDatabase() {
    sentenceRepository.deleteAll();
  }

  @Test
  public void canReverseSentence() throws Exception {
    // Testar hela kedjan, gör ett rest-anrop till controller, gå hela vägen ner till DB.

    String actualReversedSentence = reverseSentence(ORIGINAL_SENTENCE);
    assertThat(actualReversedSentence).isEqualTo(REVERSED_SENTENCE);

    List<Sentence> sentences = (List<Sentence>) sentenceRepository.findAll();
    assertThat(sentences).hasSize(1);
    Sentence sentence = sentences.get(0);
    assertPersistedSentence(sentence, ORIGINAL_SENTENCE, REVERSED_SENTENCE);
  }

  private void assertPersistedSentence(Sentence actualSentence, String expectedOriginalSentence,
      String expectedReversedString) {
    assertThat(actualSentence.getOriginalSentence()).isEqualTo(expectedOriginalSentence);
    assertThat(actualSentence.getReversedSentence()).isEqualTo(expectedReversedString);
    assertThat(actualSentence.getCreatedTs())
        .isBetween(Instant.now().minus(5, SECONDS), Instant.now());
  }

  private String reverseSentence(String sentenceToReverse) throws Exception {
    ReverseRequest request = createReverseRequest(sentenceToReverse);
    MvcResult result = mockMvc.perform(post(URL)
        .content(objectMapper.writeValueAsString(request))
        .contentType(APPLICATION_JSON_VALUE))
        .andExpect(status().isOk())
        .andDo(print())
        .andReturn();
    return result.getResponse().getContentAsString();
  }

}
