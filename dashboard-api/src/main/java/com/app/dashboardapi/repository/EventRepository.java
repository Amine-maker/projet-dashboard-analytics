package com.app.dashboardapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.app.dashboardapi.model.EventMessage;

public interface EventRepository extends MongoRepository<EventMessage, String> {

}
