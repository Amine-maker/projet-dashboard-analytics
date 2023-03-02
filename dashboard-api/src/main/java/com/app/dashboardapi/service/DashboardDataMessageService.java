package com.app.dashboardapi.service;

import com.app.dashboardapi.model.DashboardDataMessage;
import com.app.dashboardapi.repository.DashboardMessageRepository;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardDataMessageService {

    @Autowired
    private DashboardMessageRepository dashboardRepository;

    public void sendMessage(DashboardDataMessage message) {

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        message.setServerTimestamp(timestamp.getTime());


        dashboardRepository.save(message);
    }
}
