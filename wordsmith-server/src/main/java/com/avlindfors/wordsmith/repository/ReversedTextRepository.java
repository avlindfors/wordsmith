package com.avlindfors.wordsmith.repository;

import com.avlindfors.wordsmith.domain.model.ReversedText;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReversedTextRepository extends MongoRepository<ReversedText, String> {

}
