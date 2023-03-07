package com.app.dashboardapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.app.dashboardapi.model.EventMessage;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends MongoRepository<EventMessage, String> {
    Optional<List<EventMessage>> findAllByClientId(String clientId);

    Optional<List<EventMessage>> findAllBySiteId(String siteId);
}
