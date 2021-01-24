package com.avlindfors.wordsmith.service;

import static com.avlindfors.wordsmith.util.ReverseUtil.createReverseRequest;
import static java.util.UUID.randomUUID;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;

import com.avlindfors.wordsmith.domain.model.ReversedText;
import com.avlindfors.wordsmith.repository.ReversedTextRepository;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.Instant;
import java.util.UUID;

public class ReverseServiceUnitTest {

  private final ReverseService reverseService;

  private final ReversedTextRepository reversedTextRepositoryMock;

  public ReverseServiceUnitTest() {
    reverseService = new ReverseService();
    reversedTextRepositoryMock = mock(ReversedTextRepository.class);

    // Hackar in en mock för att slippa starta hela contexten
    ReflectionTestUtils.setField(reverseService, "reversedTextRepository",
        reversedTextRepositoryMock);
  }

  @Test
  public void canReverseWord() {
    // Test reversal of simple words.

    String input = "alexander";
    String expectedOutput = "rednaxela";
    mockRepositorySave(input, expectedOutput);

    ReversedText reversedText = reverseService.reverseText(createReverseRequest(input));
    assertReversedText(reversedText, input, expectedOutput);
  }

  @Test
  public void canReverseSimpleSentence() {
    // Test simple reversal of full sentences including punctuations.

    String input = "The red fox crosses the ice.";
    String expectedOutput = "ehT der xof sessorc eht eci.";
    mockRepositorySave(input, expectedOutput);

    ReversedText reversedText = reverseService.reverseText(createReverseRequest(input));

    assertReversedText(reversedText, input, expectedOutput);
  }

  @Test
  public void canReverseComplexSentence() {
    // Test more complex text including punctuations.

    String input = "The red fox crosses the ice, intent on none of my business.";
    String expectedOutput = "ehT der xof sessorc eht eci, tnetni no enon fo ym ssenisub.";
    mockRepositorySave(input, expectedOutput);

    ReversedText reversedText = reverseService.reverseText(createReverseRequest(input));
    assertReversedText(reversedText, input, expectedOutput);
  }

  @Test
  public void canReverseMultipleComplexSentences() {
    // Test multiple sentences including punctuations.

    String input = "The red fox crosses the ice, intent on none of my business."
        + " It's winter and slim pickings, wouldn't you say?";
    String expectedOutput = "ehT der xof sessorc eht eci, tnetni no enon fo ym ssenisub."
        + " s'tI retniw dna mils sgnikcip, t'ndluow uoy yas?";
    mockRepositorySave(input, expectedOutput);

    ReversedText reversedText = reverseService.reverseText(createReverseRequest(input));
    assertReversedText(reversedText, input, expectedOutput);
  }

  private void mockRepositorySave(String input, String expectedOutput) {
    ReversedText reversedText = new ReversedText();
    reversedText.setId(randomUUID().toString());
    reversedText.setCreatedTs(Instant.now());
    reversedText.setOriginalText(input);
    reversedText.setReversedText(expectedOutput);

    doReturn(reversedText)
        .when(reversedTextRepositoryMock)
        .save(any(ReversedText.class));
  }

  private void assertReversedText(ReversedText reversedText, String expectedInput,
      String expectedOutput) {
    assertThat(reversedText.getOriginalText()).isEqualTo(expectedInput);
    assertThat(reversedText.getReversedText()).isEqualTo(expectedOutput);
  }
}
