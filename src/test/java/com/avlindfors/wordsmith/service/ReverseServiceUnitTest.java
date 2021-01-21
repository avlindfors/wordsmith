package com.avlindfors.wordsmith.service;

import static com.avlindfors.wordsmith.util.ReverseUtil.createReverseRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

import com.avlindfors.wordsmith.repository.SentenceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

public class ReverseServiceUnitTest {

  private final ReverseService reverseService;

  public ReverseServiceUnitTest() {
    reverseService = new ReverseService();

    // Hackar in en mock för att slippa starta hela contexten
    ReflectionTestUtils.setField(reverseService, "sentenceRepository",
        mock(SentenceRepository.class));
  }

  @Test
  public void canReverseWord() {
    // Testar att vi kan göra enklare speglingar av ord.

    String input = "alphadev";
    String expectedOutput = "vedahpla";
    String actualOutput = reverseService.reverseSentence(createReverseRequest(input));
    assertThat(actualOutput).isEqualTo(expectedOutput);
  }

  @Test
  public void canReverseSimpleSentence() {
    // Testar att vi kan göra enklare speglingar av hela meningar inkl. punkt.

    String input = "The red fox crosses the ice.";
    String expectedOutput = "ehT der xof sessorc eht eci.";
    String actualOutput = reverseService.reverseSentence(createReverseRequest(input));
    assertThat(actualOutput).isEqualTo(expectedOutput);
  }

  @Test
  public void canReverseComplexSentence() {
    // Testar att vi kan göra något mer komplicerade speglingar av hela meningar inkl. punkt.

    String input = "The red fox crosses the ice, intent on none of my business.";
    String expectedOutput = "ehT der xof sessorc eht eci, tnetni no enon fo ym ssenisub.";
    String actualOutput = reverseService.reverseSentence(createReverseRequest(input));
    assertThat(actualOutput).isEqualTo(expectedOutput);
  }

  @Test
  public void canReverseMultipleComplexSentences() {
    // Testar att vi kan göra något mer komplicerade speglingar med flera
    // meningar inkl. diverse skiljetecken

    String input = "The red fox crosses the ice, intent on none of my business."
        + " It's winter and slim pickings, wouldn't you say?";
    String expectedOutput = "ehT der xof sessorc eht eci, tnetni no enon fo ym ssenisub."
        + " s'tI retniw dna mils sgnikcip, t'ndluow uoy yas?";
    String actualOutput = reverseService.reverseSentence(createReverseRequest(input));
    assertThat(actualOutput).isEqualTo(expectedOutput);
  }
}
