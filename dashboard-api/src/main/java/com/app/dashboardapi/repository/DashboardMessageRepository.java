package com.app.dashboardapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.app.dashboardapi.model.DashboardDataMessage;

public interface DashboardMessageRepository extends MongoRepository<DashboardDataMessage, String> {

}
