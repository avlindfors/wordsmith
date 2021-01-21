package com.avlindfors.wordsmith.repository;

import static com.avlindfors.wordsmith.util.ReverseUtil.ORIGINAL_SENTENCE;
import static com.avlindfors.wordsmith.util.ReverseUtil.REVERSED_SENTENCE;
import static com.avlindfors.wordsmith.util.ReverseUtil.createSentence;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.avlindfors.wordsmith.domain.model.Sentence;
import com.avlindfors.wordsmith.util.ReverseUtil;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.function.Consumer;
import javax.validation.ConstraintViolationException;

@SpringBootTest
public class SentenceRepositoryTest {

  @Autowired
  private SentenceRepository sentenceRepository;

  @AfterEach
  public void clearDatabase() {
    sentenceRepository.deleteAll();
  }

  @Test
  public void canSave() {
    Sentence sentence = createSentence(ORIGINAL_SENTENCE, REVERSED_SENTENCE);
    sentenceRepository.save(sentence);

    assertPersistedSentence(sentence);
  }

  @Test
  public void canNotSaveWithInvalidFields() {
    // Testar enklare valideringsfel
    attemptSaveAndAssertException((sentence) -> sentence.setId(null),
        "id: must not be null");
    attemptSaveAndAssertException((sentence) -> sentence.setOriginalSentence(null),
        "originalSentence: must not be blank");
    attemptSaveAndAssertException((sentence) -> sentence.setOriginalSentence("   "),
        "originalSentence: must not be blank");
    attemptSaveAndAssertException((sentence) -> sentence.setReversedSentence(null),
        "reversedSentence: must not be blank");
    attemptSaveAndAssertException((sentence) -> sentence.setReversedSentence("   "),
        "reversedSentence: must not be blank");
    attemptSaveAndAssertException((sentence) -> sentence.setCreatedTs(null),
        "createdTs: must not be null");
  }

  private void attemptSaveAndAssertException(Consumer<Sentence> sentenceConsumer, String message) {
    Sentence sentence = createSentence(ORIGINAL_SENTENCE, REVERSED_SENTENCE);
    sentenceConsumer.accept(sentence);

    ConstraintViolationException exception =
        assertThrows(ConstraintViolationException.class,
            () -> sentenceRepository.save(sentence));
    assertThat(exception).hasMessage(message);
    assertThat(sentenceRepository.findAll()).isEmpty();
  }

  private void assertPersistedSentence(Sentence expectedSentence) {
    Optional<Sentence> actualSentence = sentenceRepository.findById(expectedSentence.getId());
    assertThat(actualSentence).isPresent();
    // TODO: Undersök varför createdTs får fel precision.
    assertThat(actualSentence.get()).usingRecursiveComparison().ignoringFields("createdTs")
        .isEqualTo(expectedSentence);
  }

}
