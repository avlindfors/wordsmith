package com.avlindfors.wordsmith.repository;

import static com.avlindfors.wordsmith.util.ReverseUtil.ORIGINAL_TEXT;
import static com.avlindfors.wordsmith.util.ReverseUtil.REVERSED_TEXT;
import static com.avlindfors.wordsmith.util.ReverseUtil.createReversedText;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.avlindfors.wordsmith.domain.model.ReversedText;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.function.Consumer;
import javax.validation.ConstraintViolationException;

@SpringBootTest
public class ReversedTextRepositoryTest {

  @Autowired
  private ReversedTextRepository reversedTextRepository;

  @AfterEach
  public void clearDatabase() {
    reversedTextRepository.deleteAll();
  }

  @Test
  public void canSave() {
    ReversedText reversedText = createReversedText(ORIGINAL_TEXT, REVERSED_TEXT);
    reversedTextRepository.save(reversedText);

    assertPersistedReversedText(reversedText);
  }

  @Test
  public void canNotSaveWithInvalidFields() {
    // Test simple validation errors.
    attemptSaveAndAssertException((textToReverse) -> textToReverse.setId(null),
        "id: must not be null");
    attemptSaveAndAssertException((textToReverse) -> textToReverse.setOriginalText(null),
        "originalText: must not be blank");
    attemptSaveAndAssertException((textToReverse) -> textToReverse.setOriginalText("   "),
        "originalText: must not be blank");
    attemptSaveAndAssertException((textToReverse) -> textToReverse.setReversedText(null),
        "reversedText: must not be blank");
    attemptSaveAndAssertException((textToReverse) -> textToReverse.setReversedText("   "),
        "reversedText: must not be blank");
    attemptSaveAndAssertException((textToReverse) -> textToReverse.setCreatedTs(null),
        "createdTs: must not be null");
  }

  private void attemptSaveAndAssertException(Consumer<ReversedText> textConsumer,
      String message) {
    ReversedText reversedText = createReversedText(ORIGINAL_TEXT, REVERSED_TEXT);
    textConsumer.accept(reversedText);

    ConstraintViolationException exception =
        assertThrows(ConstraintViolationException.class,
            () -> reversedTextRepository.save(reversedText));
    assertThat(exception).hasMessage(message);
    assertThat(reversedTextRepository.findAll()).isEmpty();
  }

  private void assertPersistedReversedText(ReversedText expectedReversedText) {
    Optional<ReversedText> actualReversedText = reversedTextRepository.findById(
        expectedReversedText.getId());
    assertThat(actualReversedText).isPresent();
    // Ignore createdTs.
    assertThat(actualReversedText.get()).usingRecursiveComparison().ignoringFields("createdTs")
        .isEqualTo(expectedReversedText);
  }

}
