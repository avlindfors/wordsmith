package com.avlindfors.wordsmith.repository;

import com.avlindfors.wordsmith.domain.model.Sentence;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SentenceRepository extends MongoRepository<Sentence, String> {

}
