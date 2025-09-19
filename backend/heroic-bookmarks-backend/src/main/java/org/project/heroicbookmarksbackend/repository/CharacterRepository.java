package org.project.heroicbookmarksbackend.repository;

import org.project.heroicbookmarksbackend.entity.CharacterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CharacterRepository extends JpaRepository<CharacterEntity, Long> {
    Optional<CharacterEntity> findByCode(String code);
}
