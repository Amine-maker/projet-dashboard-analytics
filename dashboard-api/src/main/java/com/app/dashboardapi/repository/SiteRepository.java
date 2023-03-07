package com.app.dashboardapi.repository;

import com.app.dashboardapi.model.Site;
import com.app.dashboardapi.model.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SiteRepository extends MongoRepository<Site, String> {

    Optional<Site> findAllByUser(String username);


}