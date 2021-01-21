package com.avlindfors.wordsmith.controller;

import static com.avlindfors.wordsmith.util.ReverseUtil.REVERSED_SENTENCE;
import static com.avlindfors.wordsmith.util.ReverseUtil.ORIGINAL_SENTENCE;
import static com.avlindfors.wordsmith.util.ReverseUtil.createReverseRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.avlindfors.wordsmith.domain.api.ErrorData;
import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.service.ReverseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@WebMvcTest(ReverseController.class)
public class ReverseControllerUnitTest {

  private static final String URL = "/api/v1/reverse";

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private ReverseService reverseServiceMock;

  @Test
  public void canReverseSentence() throws Exception {

    Mockito.doReturn(REVERSED_SENTENCE)
        .when(reverseServiceMock)
        .reverseSentence(any(ReverseRequest.class));

    String actualReversedSentence = performRequest(ORIGINAL_SENTENCE);
    assertThat(actualReversedSentence).isEqualTo(REVERSED_SENTENCE);
  }

  @Test
  public void canHandleBadSentenceInRequest() throws Exception {

    String[] badRequestData = {
        null,
        "",
        " "
    };
    for (String data : badRequestData) {
      ErrorData errorData = performBadRequest(data, BAD_REQUEST);
      assertThat(errorData.getErrorName()).isEqualTo("PARAMETER_VALIDATION_ERROR");
      assertThat(errorData.getDescription()).isEqualTo("sentence: must not be blank");
    }
  }

  private String performRequest(String sentenceToReverse) throws Exception {
    ReverseRequest request = createReverseRequest(sentenceToReverse);
    MvcResult result = mockMvc.perform(post(URL)
        .content(objectMapper.writeValueAsString(request))
        .contentType(APPLICATION_JSON_VALUE))
        .andExpect(status().isOk())
        .andDo(print())
        .andReturn();
    return result.getResponse().getContentAsString();
  }

  private ErrorData performBadRequest(String sentenceToReverse, HttpStatus status) throws Exception {
    ReverseRequest request = createReverseRequest(sentenceToReverse);
    MvcResult result = mockMvc.perform(post(URL)
        .content(objectMapper.writeValueAsString(request))
        .contentType(APPLICATION_JSON_VALUE))
        .andExpect(status().is(status.value()))
        .andDo(print())
        .andReturn();
    return objectMapper.readValue(result.getResponse().getContentAsString(), ErrorData.class);
  }
}
