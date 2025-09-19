package org.project.heroicbookmarksbackend.controller;

import org.project.heroicbookmarksbackend.entity.CharacterEntity;
import org.project.heroicbookmarksbackend.entity.UserCollection;
import org.project.heroicbookmarksbackend.repository.CharacterRepository;
import org.project.heroicbookmarksbackend.service.UserCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/collection")
@CrossOrigin(origins = "http://localhost:5173")
public class UserCollectionController {

    @Autowired
    private UserCollectionService service;

    @Autowired
    private CharacterRepository characterRepo;

    @PostMapping("/add")
    public Map<String, Object> addCharacter(@RequestParam String userId, @RequestParam String characterCode) {
        boolean added = service.addCharacterToCollection(userId, characterCode);
        Map<String, Object> response = new HashMap<>();
        response.put("success", added);
        response.put("message", added ? "Character added." : "Character already exists.");
        return response;
    }

    @GetMapping("/{userId}")
    public List<CharacterEntity> getCollection(@PathVariable String userId) {
        List<UserCollection> collected = service.getUserCollection(userId);
        List<CharacterEntity> characters = new ArrayList<>();

        for (UserCollection uc : collected) {
            characterRepo.findByCode(uc.getCharacterCode()).ifPresent(characters::add);
        }

        return characters;
    }
}
