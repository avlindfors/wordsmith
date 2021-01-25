package com.avlindfors.wordsmith.repository;

import static com.avlindfors.wordsmith.util.ReverseUtil.ORIGINAL_TEXT;
import static com.avlindfors.wordsmith.util.ReverseUtil.REVERSED_TEXT;
import static com.avlindfors.wordsmith.util.ReverseUtil.createReversedText;
import static java.util.Comparator.comparing;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.avlindfors.wordsmith.domain.model.ReversedText;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import javax.validation.ConstraintViolationException;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ReversedTextRepositoryTest {

  @Autowired
  private ReversedTextRepository reversedTextRepository;

  @AfterEach
  public void clearDatabase() {
    reversedTextRepository.deleteAll();
  }

  @Test
  public void canSaveValidReversedText() {
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

  @Test
  public void canGet5MostRecentlySavedReversedText() {
    // Test custom repository method returns 5 recent reversals in correct order.

    Instant baseTime = Instant.now();
    List<ReversedText> reversedTexts = new ArrayList<>();
    int numberOfEntriesToSave = 6;
    for (int i = 0; i < numberOfEntriesToSave; i++) {
      ReversedText reversedText = createReversedText("Text no " + i, REVERSED_TEXT);
      reversedText.setCreatedTs(baseTime.minusSeconds(i * 60));
      reversedTexts.add(reversedTextRepository.save(reversedText));
    }

    assertThat(reversedTextRepository.findAll()).hasSize(numberOfEntriesToSave);
    List<ReversedText> mostRecentlyReversed = reversedTextRepository
        .findFirst5ByOrderByCreatedTsAsc();
    assertThat(mostRecentlyReversed).hasSize(5);

    reversedTexts.sort(comparing(ReversedText::getCreatedTs));
    for (int i = 0; i < mostRecentlyReversed.size(); i++) {
      // createdTs precision changes after persistence. Ignoring for now.
      assertThat(mostRecentlyReversed.get(i)).usingRecursiveComparison()
          .ignoringFields("createdTs")
          .isEqualTo(reversedTexts.get(i));
    }

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
