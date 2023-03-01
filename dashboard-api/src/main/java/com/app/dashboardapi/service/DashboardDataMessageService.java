package com.app.dashboardapi.service;

import com.app.dashboardapi.model.DashboardDataMessage;
import com.app.dashboardapi.repository.DashboardMessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardDataMessageService {

    @Autowired
    private DashboardMessageRepository dashboardRepository;

    // code métier
    public void sendMessage(DashboardDataMessage message) {
        dashboardRepository.save(message);
    }
}
