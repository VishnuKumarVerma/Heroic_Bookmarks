package org.project.heroicbookmarksbackend.entity;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "user_collection", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "character_code"})
})
public class UserCollection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "character_code", nullable = false)
    private String characterCode;

    @Column(name = "timestamp", nullable = false)
    private Date timestamp;

    public UserCollection() {}

    public UserCollection(String userId, String characterCode) {
        this.userId = userId;
        this.characterCode = characterCode;
        this.timestamp = new Date();
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCharacterCode() {
        return characterCode;
    }

    public void setCharacterCode(String characterCode) {
        this.characterCode = characterCode;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}

