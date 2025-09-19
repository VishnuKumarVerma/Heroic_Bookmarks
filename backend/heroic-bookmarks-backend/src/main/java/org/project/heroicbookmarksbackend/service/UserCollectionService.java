package org.project.heroicbookmarksbackend.service;

import org.project.heroicbookmarksbackend.entity.UserCollection;
import org.project.heroicbookmarksbackend.repository.UserCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserCollectionService {

    @Autowired
    private UserCollectionRepository repository;

    public boolean addCharacterToCollection(String userId, String characterCode) {
        Optional<UserCollection> existing = repository.findByUserIdAndCharacterCode(userId, characterCode);
        if (existing.isPresent()) return false;

        repository.save(new UserCollection(userId, characterCode));
        return true;
    }

    public List<UserCollection> getUserCollection(String userId) {
        return repository.findByUserId(userId);
    }
}

