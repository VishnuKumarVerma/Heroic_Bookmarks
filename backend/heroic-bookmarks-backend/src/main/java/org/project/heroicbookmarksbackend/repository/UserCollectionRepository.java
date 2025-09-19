package org.project.heroicbookmarksbackend.repository;

import org.project.heroicbookmarksbackend.entity.UserCollection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserCollectionRepository extends JpaRepository<UserCollection, Long> {
    List<UserCollection> findByUserId(String userId);
    Optional<UserCollection> findByUserIdAndCharacterCode(String userId, String characterCode);
}
