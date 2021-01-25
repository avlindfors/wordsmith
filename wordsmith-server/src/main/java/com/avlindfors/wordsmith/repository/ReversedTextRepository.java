package com.avlindfors.wordsmith.repository;

import com.avlindfors.wordsmith.domain.model.ReversedText;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReversedTextRepository extends MongoRepository<ReversedText, String> {

  List<ReversedText> findFirst5ByOrderByCreatedTsAsc();
}
