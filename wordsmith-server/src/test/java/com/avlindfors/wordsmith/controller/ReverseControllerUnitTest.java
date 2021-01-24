package com.avlindfors.wordsmith.controller;

import static com.avlindfors.wordsmith.util.ReverseUtil.REVERSED_TEXT;
import static com.avlindfors.wordsmith.util.ReverseUtil.ORIGINAL_TEXT;
import static com.avlindfors.wordsmith.util.ReverseUtil.createReverseRequest;
import static java.util.UUID.randomUUID;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.avlindfors.wordsmith.domain.api.ErrorData;
import com.avlindfors.wordsmith.domain.api.ReverseRequest;
import com.avlindfors.wordsmith.domain.api.ReverseResponse;
import com.avlindfors.wordsmith.domain.model.ReversedText;
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

import java.time.Instant;

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
  public void canReverseText() throws Exception {

    Mockito.doReturn(createText(ORIGINAL_TEXT, REVERSED_TEXT))
        .when(reverseServiceMock)
        .reverseText(any(ReverseRequest.class));

    ReverseResponse response = performRequest(ORIGINAL_TEXT);
    assertThat(response.getOriginalText()).isEqualTo(ORIGINAL_TEXT);
    assertThat(response.getReversedText()).isEqualTo(REVERSED_TEXT);
  }

  private ReversedText createText(String originalText, String reversedText) {
    ReversedText text = new ReversedText();
    text.setId(randomUUID().toString());
    text.setCreatedTs(Instant.now());
    text.setOriginalText(originalText);
    text.setReversedText(reversedText);
    return text;
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
      assertThat(errorData.getDescription()).isEqualTo("textToReverse: must not be blank");
    }
  }

  private ReverseResponse performRequest(String textToReverse) throws Exception {
    ReverseRequest request = createReverseRequest(textToReverse);
    MvcResult result = mockMvc.perform(post(URL)
        .content(objectMapper.writeValueAsString(request))
        .contentType(APPLICATION_JSON_VALUE))
        .andExpect(status().isOk())
        .andDo(print())
        .andReturn();
    return objectMapper.readValue(result.getResponse().getContentAsString(),
        ReverseResponse.class);
  }

  private ErrorData performBadRequest(String textToReverse, HttpStatus status) throws Exception {
    ReverseRequest request = createReverseRequest(textToReverse);
    MvcResult result = mockMvc.perform(post(URL)
        .content(objectMapper.writeValueAsString(request))
        .contentType(APPLICATION_JSON_VALUE))
        .andExpect(status().is(status.value()))
        .andDo(print())
        .andReturn();
    return objectMapper.readValue(result.getResponse().getContentAsString(), ErrorData.class);
  }
}
