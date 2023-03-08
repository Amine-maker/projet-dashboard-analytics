package com.app.dashboardapi.repository;

import com.app.dashboardapi.model.Site;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SiteRepository extends MongoRepository<Site, String> {

    Optional<Site> findAllByUserId(String userId);

}